import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const IndiaMapPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);
  const markersRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search') || '';
  const imageSearchData = location.state?.imageSearch;
  const imageResults = location.state?.imageResults;


  useEffect(() => {
    if (imageSearchData && imageResults) {
      // Map backend response to your frontend format
      const formatted = imageResults.map(item => ({
        id: item.id,
        name: item.name,
        cuisine: item.cuisine,
        rating: item.rating,
        reviewsCount: item.reviewsCount,
        recommendedDish: item.recommendedDish,
        image: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg', // placeholder
        latitude: parseFloat(item.latitude),
        longitude: parseFloat(item.longitude),
      }));
      setRestaurants(formatted);
    } else {
      // fallback to query search
      fetchRestaurants();
    }
  }, [imageSearchData, imageResults]);
  // Fetch restaurants from backend
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/restaurants/search', {
          query: searchQuery
        });

        const formatted = response.data.results.map(item => {
          const restaurant = item.restaurant;
          console.log('Restaurant coordinates:', restaurant.name, restaurant.latitude, restaurant.longitude);

          return {
            id: restaurant._id,
            name: restaurant.name,
            cuisine: restaurant.cuisine_category.join(', '),
            rating: restaurant.rating,
            reviewsCount: restaurant.reviews.length,
            recommendedDish: item.dishes[0]?.name || 'Chef Special',
            image: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg',
            latitude: parseFloat(restaurant.latitude),
            longitude: parseFloat(restaurant.longitude)
          };
        });

        console.log('Formatted restaurants:', formatted);
        setRestaurants(formatted);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, [searchQuery]);

  // Initialize map - only run when mapLoaded changes
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
    script.onload = () => {
      setMapLoaded(true);
    };
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
      // Clean up map
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Initialize map and markers when both map is loaded and restaurants are available
  useEffect(() => {
    if (mapLoaded && restaurants.length > 0) {
      initMap();
    }
  }, [mapLoaded, restaurants]);

  const initMap = () => {
    // Clean up existing map
    if (mapRef.current) {
      mapRef.current.remove();
      mapRef.current = null;
    }

    // Clean up existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Create new map
    const map = L.map('map-container').setView([20.5937, 78.9629], 5);
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Add markers
    restaurants.forEach(r => {
      // Validate coordinates
      if (r.latitude && r.longitude &&
        !isNaN(r.latitude) && !isNaN(r.longitude) &&
        Math.abs(r.latitude) <= 90 && Math.abs(r.longitude) <= 180) {

        console.log('Adding marker for:', r.name, 'at:', r.latitude, r.longitude);

        const marker = L.marker([r.latitude, r.longitude]).addTo(map);
        marker.bindPopup(`
          <div class="p-2">
            <h3 class="font-bold">${r.name}</h3>
            <p class="text-sm">${r.cuisine}</p>
            <div class="flex items-center mt-1">
              <span class="text-amber-500">★</span>
              <span class="ml-1 text-sm">${r.rating}</span>
            </div>
            <p class="text-sm mt-1">Recommended: ${r.recommendedDish}</p>
          </div>
        `);

        markersRef.current.push(marker);
      } else {
        console.warn('Invalid coordinates for restaurant:', r.name, r.latitude, r.longitude);
      }
    });

    // Fit map to show all markers if we have valid markers
    if (markersRef.current.length > 0) {
      const group = new L.featureGroup(markersRef.current);
      map.fitBounds(group.getBounds().pad(0.1));
    }
  };

  return (
    <div className="flex h-screen bg-white text-gray-900">
      {/* Left Sidebar */}
      <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Restaurants</h1>
          <div className="space-y-6">
            {restaurants.map(r => (
              <div
                key={r.id}
                className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer"
                onClick={() => navigate(`/restaurant/${r.id}`)}>
                <div className="flex">
                  {/* <h1>{r.id}</h1> */}
                  <img src={r.image} alt={r.name} className="w-24 h-24 object-cover rounded-lg" />
                  <div className="ml-4 flex-1">
                    <h3 className="font-bold text-lg">{r.name}</h3>
                    <p className="text-gray-600 text-sm">{r.cuisine}</p>
                    <div className="flex items-center mt-2 text-sm text-gray-700">
                      <span className="text-amber-500">★ {r.rating}</span>
                      <span className="mx-2">•</span>
                      <span>{r.reviewsCount} reviews</span>
                    </div>
                    <p className="text-gray-600 mt-1 text-sm">Recommended: {r.recommendedDish}</p>
                    <p className="text-gray-400 text-xs mt-1">
                      Coordinates: {r.latitude?.toFixed(4)}, {r.longitude?.toFixed(4)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side Map */}
      <div className="w-2/3 relative">
        <div id="map-container" className="h-full bg-gray-100">
          {!mapLoaded && <div className="h-full flex items-center justify-center">Loading map...</div>}
        </div>
      </div>
    </div>
  );
};

export default IndiaMapPage;
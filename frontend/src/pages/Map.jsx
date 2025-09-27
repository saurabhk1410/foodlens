import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const IndiaMapPage = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search') || '';

  // Fetch restaurants from backend
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await axios.post('http://localhost:5000/api/restaurants/search', {
          query: searchQuery
        });
        // Map the backend response to only the fields we want
        const formatted = response.data.results.map(item => {
          const restaurant = item.restaurant;
          return {
            id: restaurant._id,
            name: restaurant.name,
            cuisine: restaurant.cuisine_category.join(', '),
            rating: restaurant.rating,
            reviewsCount: restaurant.reviews.length,
            recommendedDish: item.dishes[0]?.name || 'Chef Special',
            image: 'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg' // Hardcoded image
          };
        });
        setRestaurants(formatted);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };

    fetchRestaurants();
  }, [searchQuery]);

  // Initialize map
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
    script.onload = () => {
      setMapLoaded(true);
      initMap();
    };
    document.body.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, [restaurants]);

  const initMap = () => {
    if (typeof L === 'undefined' || mapRef.current) return;

    const map = L.map('map-container').setView([20.5937, 78.9629], 5);
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Add markers
    restaurants.forEach(r => {
      const marker = L.marker([r.latitude || 19.0760, r.longitude || 72.8777]).addTo(map);
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
    });
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

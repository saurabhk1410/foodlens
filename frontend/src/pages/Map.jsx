import React, { useState, useEffect } from 'react';

const IndiaMapPage = () => {
  const [selectedState, setSelectedState] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapLoaded, setMapLoaded] = useState(false);

  // Sample restaurant data by state
  const restaurantsByState = {
    Maharashtra: [
      {
        id: 1,
        name: "Sai Palace",
        cuisine: "North Indian, Chinese",
        rating: 4.5,
        reviews: 428,
        distance: "1.2 km",
        price: "₹₹₹",
        image: "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg",
        coordinates: [25.6125, 85.1283] // Mumbai
      },
      {
        id: 2,
        name: "Coastal Spice",
        cuisine: "Seafood, South Indian",
        rating: 4.7,
        reviews: 312,
        distance: "2.5 km",
        price: "₹₹₹₹",
        image: "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg",
        coordinates: [18.5204, 73.8567] // Pune
      }
    ],
    Delhi: [
      {
        id: 3,
        name: "Punjabi Dhaba",
        cuisine: "North Indian, Punjabi",
        rating: 4.3,
        reviews: 289,
        distance: "0.8 km",
        price: "₹₹",
        image: "https://images.pexels.com/photos/674574/pexels-photo-674574.jpeg",
        coordinates: [28.7041, 77.1025] // Delhi
      }
    ],
    Karnataka: [
      {
        id: 4,
        name: "Mango Tree",
        cuisine: "South Indian, Coastal",
        rating: 4.6,
        reviews: 198,
        distance: "3.1 km",
        price: "₹₹₹",
        image: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
        coordinates: [12.9716, 77.5946] // Bangalore
      }
    ],
    TamilNadu: [
      {
        id: 5,
        name: "Chettinad House",
        cuisine: "South Indian, Chettinad",
        rating: 4.8,
        reviews: 256,
        distance: "1.9 km",
        price: "₹₹₹",
        image: "https://images.pexels.com/photos/1055058/pexels-photo-1055058.jpeg",
        coordinates: [13.0827, 80.2707] // Chennai
      }
    ],
    WestBengal: [
      {
        id: 6,
        name: "Kolkata Spices",
        cuisine: "Bengali, Asian",
        rating: 4.4,
        reviews: 176,
        distance: "2.2 km",
        price: "₹₹",
        image: "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg",
        coordinates: [22.5726, 88.3639] // Kolkata
      }
    ]
  };

  // Initialize the map when component mounts
  useEffect(() => {
    // Load Leaflet CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css';
    link.integrity = 'sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==';
    link.crossOrigin = '';
    document.head.appendChild(link);

    // Load Leaflet JS
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js';
    script.integrity = 'sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==';
    script.crossOrigin = '';
    script.onload = () => {
      setMapLoaded(true);
      initMap();
    };
    document.body.appendChild(script);

    return () => {
      // Clean up
      document.head.removeChild(link);
      document.body.removeChild(script);
    };
  }, []);

  // Initialize the map
  const initMap = () => {
    if (typeof L === 'undefined') return;

    // Create map centered on India
    const map = L.map('map-container').setView([20.5937, 78.9629], 5);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Add markers for each restaurant
    Object.values(restaurantsByState).flat().forEach(restaurant => {
      const marker = L.marker(restaurant.coordinates).addTo(map);
      marker.bindPopup(`
        <div class="p-2">
          <h3 class="font-bold">${restaurant.name}</h3>
          <p class="text-sm">${restaurant.cuisine}</p>
          <div class="flex items-center mt-1">
            <span class="text-amber-500">★</span>
            <span class="ml-1 text-sm">${restaurant.rating}</span>
          </div>
        </div>
      `);
    });

    // Add state boundaries (simplified)
    const stateLayer = L.geoJSON(statesData, {
      style: {
        color: '#4b5563',
        weight: 1,
        fillColor: '#f8fafc',
        fillOpacity: 0.4
      },
      onEachFeature: (feature, layer) => {
        layer.on({
          mouseover: (e) => {
            const layer = e.target;
            layer.setStyle({
              fillColor: '#e5e7eb',
              weight: 2
            });
          },
          mouseout: (e) => {
            const layer = e.target;
            layer.setStyle({
              fillColor: '#f8fafc',
              weight: 1
            });
          },
          click: (e) => {
            setSelectedState(feature.properties.name);
          }
        });
      }
    }).addTo(map);
  };

  // Simplified states data (in a real app, you'd use proper GeoJSON)
  const statesData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "Maharashtra" },
        // geometry: {
        //   type: "Polygon",
        //   coordinates: [[[72, 19], [73, 19], [73, 20], [72, 20], [72, 19]]]
        // }
      },
      {
        type: "Feature",
        properties: { name: "Delhi" },
        // geometry: {
        //   type: "Polygon",
        //   coordinates: [[[77, 28], [77.5, 28], [77.5, 28.5], [77, 28.5], [77, 28]]]
        // }
      },
      {
        type: "Feature",
        properties: { name: "Karnataka" },
        // geometry: {
        //   type: "Polygon",
        //   coordinates: [[[74, 12], [78, 12], [78, 18], [74, 18], [74, 12]]]
        // }
      },
      {
        type: "Feature",
        properties: { name: "TamilNadu" },
        // geometry: {
        //   type: "Polygon",
        //   coordinates: [[[76, 8], [80, 8], [80, 13], [76, 13], [76, 8]]]
        // }
      },
      {
        type: "Feature",
        properties: { name: "WestBengal" },
        // geometry: {
        //   type: "Polygon",
        //   coordinates: [[[86, 22], [89, 22], [89, 27], [86, 27], [86, 22]]]
        // }
      }
    ]
  };

  // Filter restaurants based on search query
  const filteredRestaurants = selectedState 
    ? restaurantsByState[selectedState].filter(restaurant => 
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : Object.values(restaurantsByState).flat().filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="flex h-screen bg-white text-gray-900">
      {/* Left Sidebar - Restaurant List */}
      <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
        <div className="p-6 sticky top-0 bg-white border-b border-gray-200 z-10">
          <h1 className="text-2xl font-bold mb-2">Discover Restaurants</h1>
          <p className="text-gray-600 mb-4">Explore the best dining experiences across India</p>
          
          {/* Search Bar */}
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search restaurants or cuisines..."
              className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 absolute left-3 top-3 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Filter Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">All</span>
            <span className="px-3 py-1 bg-gray-800 text-white rounded-full text-sm">North Indian</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">South Indian</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Chinese</span>
            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Street Food</span>
          </div>
        </div>

        {/* Restaurant List */}
        <div className="p-6">
          {selectedState && (
            <div className="flex items-center mb-6">
              <button 
                onClick={() => setSelectedState(null)}
                className="flex items-center text-gray-600 hover:text-gray-900 mr-3"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h2 className="text-xl font-semibold">Restaurants in {selectedState}</h2>
            </div>
          )}
          
          <div className="space-y-6">
            {filteredRestaurants.map(restaurant => (
              <div key={restaurant.id} className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer">
                <div className="flex">
                  <img 
                    src={restaurant.image} 
                    alt={restaurant.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="ml-4 flex-1">
                    <h3 className="font-bold text-lg">{restaurant.name}</h3>
                    <p className="text-gray-600 text-sm">{restaurant.cuisine}</p>
                    
                    <div className="flex items-center mt-2">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            xmlns="http://www.w3.org/2000/svg" 
                            className={`h-4 w-4 ${i < Math.floor(restaurant.rating) ? "fill-current" : ""}`} 
                            viewBox="0 0 20 20" 
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.54-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-1 text-sm font-medium text-gray-700">{restaurant.rating}</span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">{restaurant.reviews} reviews</span>
                    </div>
                    
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex items-center text-sm text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {restaurant.distance}
                      </div>
                      <div className="text-sm font-medium">{restaurant.price}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side - Interactive Map */}
      <div className="w-2/3 relative">
        {/* Map Container */}
        <div id="map-container" className="h-full bg-gray-100">
          {!mapLoaded && (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <div className="border inline-flex items-center justify-center w-16 h-16 bg-gray-200 rounded-full mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                </div>
                <p className="text-gray-500">Loading map...</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Stats overlay */}
        <div className="absolute top-6 right-6 bg-white p-4 rounded-xl shadow-lg border border-gray-200">
          <h3 className="font-bold mb-2">India Food Stats</h3>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Restaurants:</span>
              <span className="font-medium">1,247</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cities Covered:</span>
              <span className="font-medium">42</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Cuisine Types:</span>
              <span className="font-medium">18</span>
            </div>
          </div>
        </div>
        
        {/* Floating action button */}
        <button className="absolute bottom-6 right-6 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-all">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default IndiaMapPage;
import React from "react";
import { MapPin, Star, ChevronRight } from "lucide-react"; // ✅ Added missing icon imports

const RecommendedDishes = () => {
  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Recommended For You
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Discover places perfect for your specific occasions and preferences
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Recommendation Card 1 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
            <div
              className="h-60 bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://images.pexels.com/photos/32409324/pexels-photo-32409324.jpeg')",
              }}
            ></div>
            <div className="p-6">
              <div className="flex items-center mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  Romantic Dates
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                The Twilight Terrace
              </h3>
              <p className="text-gray-600 mb-4">
                Intimate rooftop setting with soft lighting, perfect for romantic
                evenings with a view of the city skyline.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin size={16} className="text-gray-500 mr-1" />
                  <span className="text-sm text-gray-500">2.3 km away</span>
                </div>
                <div className="flex items-center">
                  <Star size={16} className="text-amber-400 fill-current mr-1" />
                  <span className="text-sm font-medium text-gray-900">4.9</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendation Card 2 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
            <div
              className="h-60 bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://images.pexels.com/photos/745045/pexels-photo-745045.jpeg')",
              }}
            ></div>
            <div className="p-6">
              <div className="flex items-center mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  Friends Hangout
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                The Social Brew
              </h3>
              <p className="text-gray-600 mb-4">
                Lively café with board games, great music, and a menu designed
                for sharing. Perfect for group gatherings.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin size={16} className="text-gray-500 mr-1" />
                  <span className="text-sm text-gray-500">1.2 km away</span>
                </div>
                <div className="flex items-center">
                  <Star size={16} className="text-amber-400 fill-current mr-1" />
                  <span className="text-sm font-medium text-gray-900">4.7</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendation Card 3 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
            <div
              className="h-60 bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://images.pexels.com/photos/1648387/pexels-photo-1648387.jpeg')",
              }}
            ></div>
            <div className="p-6">
              <div className="flex items-center mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                  Family Dinner
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Hearth & Home
              </h3>
              <p className="text-gray-600 mb-4">
                Cozy restaurant with a diverse menu that pleases all ages.
                Kid-friendly options and comfortable seating.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin size={16} className="text-gray-500 mr-1" />
                  <span className="text-sm text-gray-500">3.5 km away</span>
                </div>
                <div className="flex items-center">
                  <Star size={16} className="text-amber-400 fill-current mr-1" />
                  <span className="text-sm font-medium text-gray-900">4.8</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 shadow-sm hover:shadow-md transition-all">
            View All Recommendations
            <ChevronRight size={20} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecommendedDishes;

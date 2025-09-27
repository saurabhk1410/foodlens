import React from 'react'
import { MapPin, Star } from "lucide-react";

const TrendingDishes = () => {
      const trendingDishess = [
    { name: "Masala Dosa", place: "Vidyarthi Bhavan", price: "₹90", rating: 4.8, reviews: 128, link: "../../public/dosa.png" },
    { name: "Chole Bhature", place: "Sita Ram Diwan Chand", price: "₹120", rating: 4.7, reviews: 96, link:  "../../public/cholebahture.png" },
    { name: "Pani Puri", place: "Shree Balaji", price: "₹50", rating: 4.9, reviews: 215, link:  "../../public/panipuri.png"},
    { name: "Biryani", place: "Cafe Bahar", price: "₹180", rating: 4.6, reviews: 182, link:  "../../public/biryani.png"}
  ];
  return (
     <div className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-base font-semibold text-gray-500 tracking-wide uppercase mb-2">
                  Trending Now
                </h2>
                <p className="text-3xl font-bold text-gray-900">
                  What's hot in your city
                </p>
              </div>
    
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {trendingDishess.map((dish, index) => (
                  <div
                    key={index}
                    className="relative group rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-100"
                  >
                    {/* Dish Image */}
                    <img
                      src={dish.link}
                      alt={dish.name}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src =
                          'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5YzlkYWEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                      }}
                    />
    
                    {/* Price Badge */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm text-xs font-semibold text-gray-900">
                      {dish.price}
                    </div>
    
                    {/* Bottom Overlay Info */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-4">
                      <h3 className="text-white text-lg font-bold truncate">{dish.name}</h3>
                      <p className="text-white/80 text-sm flex items-center truncate">
                        <MapPin size={14} className="mr-1 flex-shrink-0" />
                        {dish.place}
                      </p>
    
                      <div className="mt-2 flex items-center justify-between">
                        {/* Rating */}
                        <div className="flex items-center">
                          <div className="flex text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={i < Math.floor(dish.rating) ? "fill-current" : "text-gray-600"}
                              />
                            ))}
                          </div>
                          <span className="ml-1 text-xs font-medium text-white">
                            {dish.rating.toFixed(1)}
                          </span>
                        </div>
                        <span className="text-[11px] text-white/70">
                          {dish.reviews} reviews
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
    
  )
}

export default TrendingDishes
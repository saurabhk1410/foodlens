import React, { useState, useEffect } from 'react';
import { Star, MapPin, Clock, Phone, Globe, ChevronLeft, ChevronRight, Camera, Users } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const RestaurantPage = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [userExperiences, setUserExperiences] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/restaurants/${id}`);
        const data = res.data;
        setRestaurant({
          name: data.name,
          type: data.cuisine_category.join(", "),
          rating: data.rating,
          totalReviews: data.dishes.length,
          address: `${data.location}, ${data.city}`,
          openingHours: data.timing,
          phone: "+91 98765 43210", // fallback if not in API
          website: "#", // fallback
          priceRange: `₹₹₹ (Approx ${data.price_for_two} for two)`,
          description: "Authentic flavors with a great ambiance", // optional, can fetch from API if available
          images: data.dishes.slice(0, 4).map(d => `https://picsum.photos/seed/${d._id}/600/400`) // placeholder images
        });

        // Map dishes to user experiences for now as mock
        setUserExperiences(data.dishes.slice(0, 5).map((dish, index) => ({
          id: index + 1,
          userName: `User ${index + 1}`,
          userBadge: "Foodie",
          userImage: `https://i.pravatar.cc/150?img=${index + 10}`,
          reviewImage: `https://picsum.photos/seed/${dish._id}/400/300`,
          rating: dish.rating,
          reviewTitle: dish.name,
          review: `Tried the ${dish.name}. It was absolutely delicious!`,
          visitDate: "Visited recently"
        })));

      } catch (err) {
        console.error("Failed to fetch restaurant", err);
      }
    };

    fetchRestaurant();
  }, [id]);

  const nextImage = () => {
    if (!restaurant) return;
    setActiveImageIndex(prev => prev === restaurant.images.length - 1 ? 0 : prev + 1);
  };

  const prevImage = () => {
    if (!restaurant) return;
    setActiveImageIndex(prev => prev === 0 ? restaurant.images.length - 1 : prev - 1);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={16}
        className={i < Math.floor(rating) ? "text-amber-500 fill-current" : "text-gray-300"}
      />
    ));
  };

  if (!restaurant) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Restaurant Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
          <p className="text-gray-600 mb-4">{restaurant.type}</p>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center">
              <div className="flex">{renderStars(restaurant.rating)}</div>
              <span className="ml-2 text-gray-700 font-medium">{restaurant.rating}</span>
              <span className="ml-1 text-gray-500">({restaurant.totalReviews} reviews)</span>
            </div>
            <span className="text-gray-700">{restaurant.priceRange}</span>
          </div>

          <div className="flex flex-wrap gap-4 text-gray-600">
            <div className="flex items-center">
              <MapPin size={18} className="mr-1" />
              <span>{restaurant.address}</span>
            </div>
            <div className="flex items-center">
              <Clock size={18} className="mr-1" />
              <span>{restaurant.openingHours}</span>
            </div>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="relative mb-12 rounded-xl overflow-hidden h-96">
          <img
            src={restaurant.images[activeImageIndex]}
            alt="Restaurant interior"
            className="w-full h-full object-cover"
          />

          <button onClick={prevImage} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all">
            <ChevronLeft size={24} />
          </button>

          <button onClick={nextImage} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all">
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {restaurant.images.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${index === activeImageIndex ? 'bg-white' : 'bg-white/50'}`}
                onClick={() => setActiveImageIndex(index)}
              />
            ))}
          </div>
        </div>

        {/* Restaurant Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4">About {restaurant.name}</h2>
            <p className="text-gray-700 mb-6">{restaurant.description}</p>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl h-fit">
            <h3 className="text-xl font-bold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone size={20} className="text-gray-600 mr-3" />
                <span className="text-gray-700">{restaurant.phone}</span>
              </div>
              <div className="flex items-center">
                <Globe size={20} className="text-gray-600 mr-3" />
                <a href={restaurant.website} className="text-blue-600 hover:underline">{restaurant.website}</a>
              </div>
              <div className="flex items-center">
                <Clock size={20} className="text-gray-600 mr-3" />
                <span className="text-gray-700">Open today: {restaurant.openingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Powered Insights Section */} 
        <div className="bg-white rounded-xl p-8 mb-12 border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              AI-Powered Review Insights
            </h2>
            <span className="bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1 rounded-full">
              Updated 2 hours ago
            </span>
          </div>

          <p className="text-gray-600 mb-8 max-w-3xl">
            Our AI analyzed 428 reviews from the past 6 months to bring you these key insights about Sai Palace:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Sentiment Overview */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Overall Sentiment
              </h3>
              <div className="flex items-center mb-4">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-green-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <span className="ml-4 text-sm font-medium text-gray-900">85% Positive</span>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">72%</div>
                  <div className="text-xs text-gray-500">Excellent</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-500">13%</div>
                  <div className="text-xs text-gray-500">Good</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-500">15%</div>
                  <div className="text-xs text-gray-500">Average & Below</div>
                </div>
              </div>
            </div>

            {/* Rating Distribution */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                </svg>
                Rating Distribution
              </h3>
              {[
                { stars: 5, percentage: 58, count: 248 },
                { stars: 4, percentage: 27, count: 116 },
                { stars: 3, percentage: 9, count: 39 },
                { stars: 2, percentage: 4, count: 17 },
                { stars: 1, percentage: 2, count: 8 }
              ].map((item, index) => (
                <div key={index} className="flex items-center mb-2">
                  <div className="w-10 text-sm text-gray-600">{item.stars} stars</div>
                  <div className="flex-1 mx-2">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="h-2.5 rounded-full bg-gray-800"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="w-16 text-right text-sm text-gray-600">{item.percentage}%</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Highlights */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                What Customers Love
              </h3>
              <ul className="space-y-3">
                {[
                  { aspect: "Butter Chicken", mentions: 189, sentiment: "98% positive" },
                  { aspect: "Biryani", mentions: 167, sentiment: "94% positive" },
                  { aspect: "Service Staff", mentions: 142, sentiment: "91% positive" },
                  { aspect: "Ambiance", mentions: 125, sentiment: "89% positive" },
                  { aspect: "Paneer Tikka", mentions: 98, sentiment: "92% positive" }
                ].map((item, index) => (
                  <li key={index} className="flex justify-between items-center pb-3 border-b border-gray-200 last:border-b-0 last:pb-0">
                    <div>
                      <div className="font-medium text-gray-900">{item.aspect}</div>
                      <div className="text-xs text-gray-500">{item.mentions} mentions</div>
                    </div>
                    <span className="text-sm font-medium text-green-600">{item.sentiment}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Areas for Improvement */}
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Areas for Improvement
              </h3>
              <ul className="space-y-3">
                {[
                  { aspect: "Waiting Time", mentions: 87, sentiment: "42% negative" },
                  { aspect: "Price Value", mentions: 63, sentiment: "38% negative" },
                  { aspect: "Portion Size", mentions: 45, sentiment: "35% negative" },
                  { aspect: "Beverage Options", mentions: 32, sentiment: "41% negative" },
                  { aspect: "Parking Availability", mentions: 28, sentiment: "47% negative" }
                ].map((item, index) => (
                  <li key={index} className="flex justify-between items-center pb-3 border-b border-gray-200 last:border-b-0 last:pb-0">
                    <div>
                      <div className="font-medium text-gray-900">{item.aspect}</div>
                      <div className="text-xs text-gray-500">{item.mentions} mentions</div>
                    </div>
                    <span className="text-sm font-medium text-blue-600">{item.sentiment}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200 flex items-center text-sm text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Analysis generated by AI based on 428 reviews from the past 6 months
          </div>
        </div>

        {/* User Experiences */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Customer Experiences</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userExperiences.map(experience => (
              <div key={experience.id} className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 border border-gray-100">
                <div className="flex items-start mb-4">
                  <img
                    src={experience.userImage}
                    alt={experience.userName}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="flex items-center">
                      <h3 className="font-bold text-gray-900">{experience.userName}</h3>
                      <span className="ml-2 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {experience.userBadge}
                      </span>
                    </div>
                    <div className="flex items-center mt-1">
                      <div className="flex">{renderStars(experience.rating)}</div>
                      <span className="ml-2 text-gray-500 text-sm">{experience.visitDate}</span>
                    </div>
                  </div>
                </div>

                <h4 className="font-bold text-lg mb-2">{experience.reviewTitle}</h4>
                <p className="text-gray-700 mb-4">{experience.review}</p>

                <div className="rounded-lg overflow-hidden h-48 mb-4">
                  <img
                    src={experience.reviewImage}
                    alt="Dining experience"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Users size={16} className="mr-1" />
                    <span>Group of 4</span>
                  </div>
                  <span>Dinner</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default RestaurantPage;

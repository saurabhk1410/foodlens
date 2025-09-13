import React, { useState } from 'react';
import { Star, MapPin, Clock, Phone, Globe, ChevronLeft, ChevronRight, Camera, Users, Award, CheckCircle, Brain } from 'lucide-react';

const RestaurantPage = () => {
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const restaurantInfo = {
        name: "Sai Palace",
        type: "North Indian, Chinese, Mughlai",
        rating: 4.5,
        totalReviews: 428,
        address: "123 Food Street, Culinary Road, Mumbai",
        openingHours: "11:00 AM - 11:00 PM (Today)",
        phone: "+91 98765 43210",
        website: "www.saipalacemumbai.com",
        priceRange: "₹₹₹ (Mid-range)",
        description: "Sai Palace is known for its authentic North Indian flavors and elegant ambiance. Established in 2005, we take pride in serving traditional recipes passed down through generations, with a modern twist."
    };

    const userExperiences = [
        {
            id: 1,
            userName: "Rahul Sharma",
            userBadge: "Food Critic",
            userImage: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
            reviewImage: "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg",
            rating: 5,
            reviewTitle: "Best Butter Chicken in Mumbai!",
            review: "The butter chicken here is absolutely divine. Creamy, flavorful, and perfectly spiced. The naan was fresh out of the tandoor. Will definitely come back!",
            visitDate: "Visited on March 15, 2023"
        },
        {
            id: 2,
            userName: "Priya Patel",
            userBadge: "Regular Diner",
            userImage: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
            reviewImage: "https://images.pexels.com/photos/674574/pexels-photo-674574.jpeg",
            rating: 4,
            reviewTitle: "Great family dinner spot",
            review: "Took my family here for dinner. The ambiance is lovely and the staff is very attentive. The paneer tikka was excellent. Portions are generous.",
            visitDate: "Visited on February 28, 2023"
        },
        {
            id: 3,
            userName: "Vikram Malhotra",
            userBadge: "Food Blogger",
            userImage: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg",
            reviewImage: "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
            rating: 4.5,
            reviewTitle: "Authentic flavors, great presentation",
            review: "As a food blogger, I've tried many Indian restaurants. Sai Palace stands out for its authentic flavors and beautiful presentation. The biryani is a must-try!",
            visitDate: "Visited on January 10, 2023"
        },
        {
            id: 4,
            userName: "Ananya Singh",
            userBadge: "New Foodie",
            userImage: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
            reviewImage: "https://images.pexels.com/photos/1055058/pexels-photo-1055058.jpeg",
            rating: 5,
            reviewTitle: "Perfect anniversary dinner",
            review: "Celebrated our anniversary here. The staff decorated our table with flowers without us even asking! Food was exceptional, especially the dal makhani.",
            visitDate: "Visited on December 20, 2022"
        },
        {
            id: 5,
            userName: "Arjun Kapoor",
            userBadge: "Local Guide",
            userImage: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
            reviewImage: "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg",
            rating: 4,
            reviewTitle: "Consistently good food",
            review: "I've been coming here for years. The quality never disappoints. Their lunch buffet is great value for money. Try the chicken tandoori!",
            visitDate: "Visited on November 5, 2022"
        }
    ];

    const restaurantImages = [
        "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg",
        "https://images.pexels.com/photos/1581554/pexels-photo-1581554.jpeg",
        "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg",
        "https://images.pexels.com/photos/674574/pexels-photo-674574.jpeg"
    ];

    const nextImage = () => {
        setActiveImageIndex((prevIndex) =>
            prevIndex === restaurantImages.length - 1 ? 0 : prevIndex + 1
        );
    };

    const prevImage = () => {
        setActiveImageIndex((prevIndex) =>
            prevIndex === 0 ? restaurantImages.length - 1 : prevIndex - 1
        );
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

    return (
        <div className="min-h-screen bg-white text-gray-900">


            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Restaurant Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{restaurantInfo.name}</h1>
                    <p className="text-gray-600 mb-4">{restaurantInfo.type}</p>

                    <div className="flex flex-wrap items-center gap-4 mb-4">
                        <div className="flex items-center">
                            <div className="flex">
                                {renderStars(restaurantInfo.rating)}
                            </div>
                            <span className="ml-2 text-gray-700 font-medium">{restaurantInfo.rating}</span>
                            <span className="ml-1 text-gray-500">({restaurantInfo.totalReviews} reviews)</span>
                        </div>
                        <span className="text-gray-700">{restaurantInfo.priceRange}</span>
                    </div>

                    <div className="flex flex-wrap gap-4 text-gray-600">
                        <div className="flex items-center">
                            <MapPin size={18} className="mr-1" />
                            <span>{restaurantInfo.address}</span>
                        </div>
                        <div className="flex items-center">
                            <Clock size={18} className="mr-1" />
                            <span>{restaurantInfo.openingHours}</span>
                        </div>
                    </div>
                </div>



                {/* Image Gallery */}
                <div className="relative mb-12 rounded-xl overflow-hidden h-96">
                    <img
                        src={restaurantImages[activeImageIndex]}
                        alt="Restaurant interior"
                        className="w-full h-full object-cover"
                    />

                    <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-all"
                    >
                        <ChevronRight size={24} />
                    </button>

                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {restaurantImages.map((_, index) => (
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
                        <h2 className="text-2xl font-bold mb-4">About {restaurantInfo.name}</h2>
                        <p className="text-gray-700 mb-6">{restaurantInfo.description}</p>

                        <div className="bg-gray-50 p-6 rounded-xl">
                            <h3 className="text-xl font-bold mb-4">Dining Highlights</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-600 mr-2" />
                                    <span className="text-gray-700">Family Friendly</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-600 mr-2" />
                                    <span className="text-gray-700">Vegetarian Options</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-600 mr-2" />
                                    <span className="text-gray-700">Buffet Available</span>
                                </li>
                                <li className="flex items-center">
                                    <CheckCircle size={18} className="text-green-600 mr-2" />
                                    <span className="text-gray-700">Home Delivery</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl h-fit">
                        <h3 className="text-xl font-bold mb-4">Contact Information</h3>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <Phone size={20} className="text-gray-600 mr-3" />
                                <span className="text-gray-700">{restaurantInfo.phone}</span>
                            </div>
                            <div className="flex items-center">
                                <Globe size={20} className="text-gray-600 mr-3" />
                                <a href="#" className="text-blue-600 hover:underline">{restaurantInfo.website}</a>
                            </div>
                            <div className="flex items-center">
                                <Clock size={20} className="text-gray-600 mr-3" />
                                <span className="text-gray-700">Open today: 11:00 AM - 11:00 PM</span>
                            </div>
                        </div>

                        <button className="w-full bg-black text-white py-3 rounded-lg font-medium mt-6 hover:bg-gray-800 transition-all">
                            Make Reservation
                        </button>
                    </div>
                </div>


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
          <div className="bg-green-600 h-2.5 rounded-full" style={{width: '85%'}}></div>
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
        {stars: 5, percentage: 58, count: 248},
        {stars: 4, percentage: 27, count: 116},
        {stars: 3, percentage: 9, count: 39},
        {stars: 2, percentage: 4, count: 17},
        {stars: 1, percentage: 2, count: 8}
      ].map((item, index) => (
        <div key={index} className="flex items-center mb-2">
          <div className="w-10 text-sm text-gray-600">{item.stars} stars</div>
          <div className="flex-1 mx-2">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="h-2.5 rounded-full bg-gray-800" 
                style={{width: `${item.percentage}%`}}
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
          {aspect: "Butter Chicken", mentions: 189, sentiment: "98% positive"},
          {aspect: "Biryani", mentions: 167, sentiment: "94% positive"},
          {aspect: "Service Staff", mentions: 142, sentiment: "91% positive"},
          {aspect: "Ambiance", mentions: 125, sentiment: "89% positive"},
          {aspect: "Paneer Tikka", mentions: 98, sentiment: "92% positive"}
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
          {aspect: "Waiting Time", mentions: 87, sentiment: "42% negative"},
          {aspect: "Price Value", mentions: 63, sentiment: "38% negative"},
          {aspect: "Portion Size", mentions: 45, sentiment: "35% negative"},
          {aspect: "Beverage Options", mentions: 32, sentiment: "41% negative"},
          {aspect: "Parking Availability", mentions: 28, sentiment: "47% negative"}
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
                        <button className="flex items-center text-blue-600 font-medium hover:underline">
                            <Camera size={18} className="mr-1" />
                            Add Your Experience
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {userExperiences.map(experience => (
                            <div
                                key={experience.id}
                                className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-6 border border-gray-100"
                            >
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
                                            <div className="flex">
                                                {renderStars(experience.rating)}
                                            </div>
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

              {/* Add Review CTA */}
<div className="relative rounded-xl overflow-hidden mb-12">
  {/* Background pattern */}
  <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white z-0"></div>
  <div className="absolute right-0 top-0 w-40 h-40 -mr-20 -mt-20 bg-gray-100 rounded-full z-0"></div>
  <div className="absolute left-0 bottom-0 w-32 h-32 -ml-16 -mb-16 bg-gray-100 rounded-full z-0"></div>
  
  <div className="relative z-10 border border-gray-200 rounded-xl bg-white/80 backdrop-blur-sm p-8 text-center">
    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-black mb-6">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
      </svg>
    </div>
    
    <h2 className="text-2xl font-bold mb-4 text-gray-900">Share Your Dining Experience</h2>
    
    <div className="max-w-2xl mx-auto mb-6">
      <p className="text-gray-700 mb-4">
        Your review helps others discover the best dishes at Sai Palace. Share your photos and honest feedback about your dining experience.
      </p>
      
      <div className="flex items-center justify-center bg-green-50 border border-green-100 rounded-lg py-3 px-4 mb-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <span className="ml-2 text-green-700 font-medium">
            Earn 50 reward points for each review • Redeem for discounts on your next visit!
          </span>
        </div>
      </div>
    </div>
    
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
      <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-all flex items-center shadow-md hover:shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
        Write a Review
      </button>
      
      <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        Upload Photos
      </button>
    </div>
    
    <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
      Your review will be posted publicly on your profile
    </div>
  </div>
</div>

            </main>


        </div>
    );
};

export default RestaurantPage;
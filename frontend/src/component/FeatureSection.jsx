import React from "react";
import { Users, Camera, TrendingUp, Shield, Brain, Search } from "lucide-react"; // ✅ Added Search

const features = [
  {
    icon: <Brain size={24} />,
    title: "AI-Powered Insights",
    description:
      "Get summarized reviews and personalized recommendations based on your preferences.",
  },
  {
    icon: <Search size={24} />,
    title: "Dish-Centric Discovery",
    description:
      "Find the best dishes, not just restaurants. Know what to order before you go.",
  },
  {
    icon: <Users size={24} />,
    title: "Community-Driven",
    description:
      "Add local food places yourself and earn points for contributions.",
  },
  {
    icon: <Shield size={24} />,
    title: "Trustworthy Reviews",
    description:
      "AI-powered fake review detection ensures you get authentic recommendations.",
  },
  {
    icon: <Camera size={24} />,
    title: "Visual Search",
    description:
      "Upload food photos to identify dishes and find similar options near you.",
  },
  {
    icon: <TrendingUp size={24} />,
    title: "Trend Forecasting",
    description:
      "Discover emerging food trends in your city before they become mainstream.",
  },
];

const FeatureSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Section Heading */}
      <div className="text-center mb-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Smarter Food Discovery
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Our AI-powered platform helps you find exactly what you're craving with precision and ease.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 text-center"
          >
            {/* Icon Container */}
            <div className="flex items-center justify-center h-20 w-20 mx-auto rounded-full bg-black text-white mb-6">
              {React.cloneElement(feature.icon, { size: 40 })}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div className="mt-16 text-center">
        <button className="bg-black text-white px-8 py-4 rounded-xl font-medium hover:bg-gray-800 transition-all shadow-md">
          Start Exploring
        </button>
      </div>
    </div>
  );
};

export default FeatureSection;

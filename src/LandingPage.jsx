import React, { useState, useEffect } from 'react';
import { ChevronRight, Search, Star, MapPin, Users, Camera, TrendingUp, Shield, Brain, PlusCircle, Apple, Play } from 'lucide-react';

const FoodLensLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Brain size={24} />,
      title: "AI-Powered Insights",
      description: "Get summarized reviews and personalized recommendations based on your preferences."
    },
    {
      icon: <Search size={24} />,
      title: "Dish-Centric Discovery",
      description: "Find the best dishes, not just restaurants. Know what to order before you go."
    },
    {
      icon: <Users size={24} />,
      title: "Community-Driven",
      description: "Add local food places yourself and earn points for contributions."
    },
    {
      icon: <Shield size={24} />,
      title: "Trustworthy Reviews",
      description: "AI-powered fake review detection ensures you get authentic recommendations."
    },
    {
      icon: <Camera size={24} />,
      title: "Visual Search",
      description: "Upload food photos to identify dishes and find similar options near you."
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Trend Forecasting",
      description: "Discover emerging food trends in your city before they become mainstream."
    }
  ];

  const trendingDishes = [
    { name: "Masala Dosa", place: "Vidyarthi Bhavan", price: "₹90", rating: 4.8, reviews: 128, link: "https://images.pexels.com/photos/12392915/pexels-photo-12392915.jpeg" },
    { name: "Chole Bhature", place: "Sita Ram Diwan Chand", price: "₹120", rating: 4.7, reviews: 96, link: "https://images.pexels.com/photos/11818239/pexels-photo-11818239.jpeg" },
    { name: "Pani Puri", place: "Shree Balaji", price: "₹50", rating: 4.9, reviews: 215, link: "https://images.pexels.com/photos/13041629/pexels-photo-13041629.jpeg" },
    { name: "Biryani", place: "Cafe Bahar", price: "₹180", rating: 4.6, reviews: 182, link: "https://images.pexels.com/photos/4224304/pexels-photo-4224304.jpeg" }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrollPosition > 50
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center h-20">
            
            {/* Left: Logo */}
            <div className="flex items-center space-x-2">
              <img
                src="https://i.postimg.cc/nLprcQxw/image-1-removebg-preview.png"
                className="w-12"
                alt="logo"
              />
              <span className="text-2xl font-bold text-black">
                Food<span className="text-gray-600">Lens</span>
              </span>
            </div>

            {/* Center: Search Bar */}
            <div className="hidden md:flex flex-1 justify-center px-6">
              <div className="w-full max-w-xl bg-white rounded-xl border border-gray-300 p-2 flex items-center shadow-sm">
                <div className="flex-1 flex items-center px-3">
                  <Search size={20} className="text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search for dishes, places, or experiences..."
                    className="w-full py-3 px-2 text-gray-700 placeholder-gray-500 outline-none bg-transparent"
                  />
                </div>
                <button className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-5 rounded-lg transition-all flex items-center">
                  Search <ChevronRight size={20} className="ml-1" />
                </button>
              </div>
            </div>

            {/* Right: Auth buttons + Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Desktop Auth */}
              <div className="hidden md:flex items-center space-x-4">
                <a
                  href="/login"
                  className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Login
                </a>
                <a
                  href="/signup"
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-black hover:bg-gray-800 transition-all shadow-sm hover:shadow-md"
                >
                  Sign Up
                </a>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-black focus:outline-none"
                >
                  <span className="sr-only">Open main menu</span>
                  {!isMenuOpen ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md rounded-b-xl shadow-xl border-b border-gray-200">
            <div className="pt-2 pb-3 space-y-1">
              <a
                href="/discover"
                className="block pl-3 pr-4 py-2 border-l-4 border-black text-base font-medium text-black bg-gray-50"
              >
                Discover
              </a>
              <a
                href="/trending"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50"
              >
                Trending
              </a>
              <a
                href="/categories"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50"
              >
                Categories
              </a>
              <a
                href="/addplace"
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:text-black hover:bg-gray-50"
              >
                Add Place
              </a>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-5">
                  <a
                    href="/login"
                    className="block px-4 py-2 rounded-md text-base font-medium text-gray-600 hover:text-black"
                  >
                    Login
                  </a>
                  <a
                    href="/signup"
                    className="ml-3 px-4 py-2 rounded-md text-base font-medium text-white bg-black hover:bg-gray-800"
                  >
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="bg-[url('https://i.postimg.cc/d1h2sJhh/image-4.png')] rounded-4xl bg-center bg-cover h-screen pt-28 mx-8">
        <div className="h-full flex items-center justify-center bg-black/40 rounded-4xl">
          <div className="text-center px-4 max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Discover Food. <span className="text-gray-300">Not Just Restaurants.</span>
            </h1>
            <p className="text-xl text-gray-200 mb-10 max-w-2xl mx-auto">
              AI-powered food discovery that helps you find the perfect dish for every occasion
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-black px-8 py-4 rounded-xl font-medium hover:bg-gray-100 transition-all shadow-lg">
                Get Started
              </button>
              <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-medium hover:bg-white/10 transition-all">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Dishes */}
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
            {trendingDishes.map((dish, index) => (
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

    {/* Features Section */}
<div className="py-16 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Section Heading */}
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Smarter Food Discovery
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Our AI-powered platform helps you find exactly what you're craving with precision and ease
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
          <div className="flex items-center justify-center h-20 w-20 mx-auto rounded-full bg-white text-black mb-6">
            {React.cloneElement(feature.icon, { size: 60, fill: "white" })}
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {feature.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600">
            {feature.description}
          </p>
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
</div>

      {/* Recommended For You Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Recommended For You
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Discover places perfect for your specific occasions and preferences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Recommendation Card 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="h-60 bg-[url('https://images.pexels.com/photos/32409324/pexels-photo-32409324.jpeg')] bg-center bg-cover"></div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    Romantic Dates
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">The Twilight Terrace</h3>
                <p className="text-gray-600 mb-4">Intimate rooftop setting with soft lighting, perfect for romantic evenings with a view of the city skyline.</p>
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
              <div className="h-60 bg-[url('https://images.pexels.com/photos/745045/pexels-photo-745045.jpeg')] bg-center bg-cover"></div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    Friends Hangout
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">The Social Brew</h3>
                <p className="text-gray-600 mb-4">Lively café with board games, great music, and a menu designed for sharing. Perfect for group gatherings.</p>
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
              <div className="h-60 bg-[url('https://images.pexels.com/photos/1648387/pexels-photo-1648387.jpeg')] bg-center bg-cover"></div>
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    Family Dinner
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Hearth & Home</h3>
                <p className="text-gray-600 mb-4">Cozy restaurant with a diverse menu that pleases all ages. Kid-friendly options and comfortable seating.</p>
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

          <div className="text-center mt-12">
            <button className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50 shadow-sm hover:shadow-md transition-all">
              View All Recommendations
              <ChevronRight size={20} className="ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      {/* <div className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to explore?
          </h2>
          <p className="text-gray-300 mb-8 text-xl">
            Discover India's food like never before.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="px-6 py-3 bg-white text-gray-900 font-medium rounded-xl shadow-md hover:bg-gray-100 transition-all"
            >
              Get Started
            </a>
            <a
              href="/demo"
              className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-xl hover:bg-white/10 transition-all"
            >
              Live Demo
            </a>
          </div>
        </div>
      </div> */}

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="mt-12 md:mt-0 rounded-3xl">
              <img src="https://i.postimg.cc/Znd63ZzC/pngtree-clink-glasses-to-celebrate-beer-cheers-oktoberfest-png-image-8377065-removebg-preview.png" className='w-56' alt="" />
            </div>
            
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Product</h3>
                  <ul className="mt-4 space-y-4">
                    <li><a href="/features" className="text-base text-gray-400 hover:text-white">Features</a></li>
                    <li><a href="/pricing" className="text-base text-gray-400 hover:text-white">Pricing</a></li>
                    <li><a href="/case-studies" className="text-base text-gray-400 hover:text-white">Case Studies</a></li>
                    <li><a href="/reviews" className="text-base text-gray-400 hover:text-white">Reviews</a></li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Company</h3>
                  <ul className="mt-4 space-y-4">
                    <li><a href="/about" className="text-base text-gray-400 hover:text-white">About</a></li>
                    <li><a href="/blog" className="text-base text-gray-400 hover:text-white">Blog</a></li>
                    <li><a href="/careers" className="text-base text-gray-400 hover:text-white">Careers</a></li>
                    <li><a href="/contact" className="text-base text-gray-400 hover:text-white">Contact</a></li>
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Legal</h3>
                  <ul className="mt-4 space-y-4">
                    <li><a href="/privacy" className="text-base text-gray-400 hover:text-white">Privacy</a></li>
                    <li><a href="/terms" className="text-base text-gray-400 hover:text-white">Terms</a></li>
                    <li><a href="/cookies" className="text-base text-gray-400 hover:text-white">Cookie Policy</a></li>
                  </ul>
                </div>

                <div className="space-y-8">
                  <div className="flex items-center justify-center">
                    <div className="flex items-center space-x-2">
                      <img src="https://i.postimg.cc/nLprcQxw/image-1-removebg-preview.png" className='w-12' alt="" />
                      <span className="text-xl font-bold text-white">
                        Food<span className="text-gray-400">Lens</span>
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-6 justify-center">
                    <a href="#" className="text-gray-400 hover:text-white">
                      <span className="sr-only">Facebook</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                      <span className="sr-only">Instagram</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                      </svg>
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white">
                      <span className="sr-only">Twitter</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8">
            <p className="text-base text-gray-400 text-center">
              &copy; 2023 FoodLens. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FoodLensLanding;
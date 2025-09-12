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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-slate-800">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${scrollPosition > 50 ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-24  ">
            <div className="flex items-center ">
              <div className=" flex items-center space-x-1">
                <img src="https://i.postimg.cc/nLprcQxw/image-1-removebg-preview.png" className='w-16 ' alt="" />
                <span className="text-2xl font-bold text-emerald-600">Food
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600">Lens
                  </span>
                </span>
              </div>
              <div className="hidden md:ml-6 md:flex md:space-x-8">
                <a href="/discover" className="text-slate-700 hover:text-orange-600 inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors">
                  Discover
                </a>
                <a href="/trending" className="text-slate-700 hover:text-orange-600 inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors">
                  Trending
                </a>
                <a href="/categories" className="text-slate-700 hover:text-orange-600 inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors">
                  Categories
                </a>
                <a href="/addplace" className="text-slate-700 hover:text-orange-600 inline-flex items-center px-1 pt-1 text-sm font-medium transition-colors">
                  Add Place
                </a>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <a href="/login" className="text-slate-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Login
              </a>
              <a href="/signup" className="px-4 py-2 rounded-md text-sm font-medium text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 transition-all shadow-md hover:shadow-lg">
                Sign Up
              </a>
            </div>
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-orange-600 focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {!isMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md rounded-b-2xl shadow-xl">
            <div className="pt-2 pb-3 space-y-1">
              <a href="/discover" className="block pl-3 pr-4 py-2 border-l-4 border-orange-500 text-base font-medium text-orange-600 bg-orange-50">
                Discover
              </a>
              <a href="/trending" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50">
                Trending
              </a>
              <a href="/categories" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50">
                Categories
              </a>
              <a href="/addplace" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50">
                Add Place
              </a>
              <div className="pt-4 pb-3 border-t border-slate-200">
                <div className="flex items-center px-5">
                  <a href="/login" className="block px-4 py-2 rounded-md text-base font-medium text-slate-600 hover:text-slate-900">
                    Login
                  </a>
                  <a href="/signup" className="ml-3 px-4 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700">
                    Sign Up
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden ">
        {/* <video
              src="https://www.pexels.com/download/video/1560989/"
              autoPlay
              muted
              loop
              playsInline
              className="w-160 object-cover rounded-3xl shadow-xl"
            /> */}
        <img src="" className='absolute top-0' alt="" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/4 top-0 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute left-1/2 top-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute left-1/3 top-40 w-96 h-96 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">

          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              <span className="block">Discover India's</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600 py-2">
                Hidden Food Gems
              </span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 md:mt-6">
              AI-powered food discovery that goes beyond restaurants. Find the best dishes, local experiences, and authentic flavors across India.
            </p>

            {/* Search Bar */}
            <div className="mt-8 max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-2 flex items-center">
              <div className="flex-1 flex items-center px-4">
                <Search size={20} className="text-slate-400" />
                <input
                  type="text"
                  placeholder="Search for dishes, places, or experiences..."
                  className="w-full py-4 px-3 text-slate-700 placeholder-slate-400 outline-none bg-transparent"
                />
              </div>
              <button className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-medium py-3 px-6 rounded-xl transition-all flex items-center">
                Search <ChevronRight size={20} className="ml-1" />
              </button>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="/discover"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 text-white font-medium shadow-md hover:shadow-lg transition-all flex items-center"
              >
                Explore Food <ChevronRight size={20} className="ml-1" />
              </a>
              <a
                href="/howitworks"
                className="px-6 py-3 rounded-xl bg-white text-slate-700 font-medium shadow-md hover:shadow-lg transition-all flex items-center border border-slate-200"
              >
                How It Works
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Trending Dishes */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-orange-600 tracking-wide uppercase">Trending Now</h2>
            <p className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              What's hot in your city
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {trendingDishes.map((dish, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={dish.link}
                    alt={dish.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJtb25vc3BhY2UiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IiM5YzlkYWEiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';
                    }}
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                    <span className="font-bold text-slate-900 text-sm">{dish.price}</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900 mb-1 truncate">{dish.name}</h3>
                  <p className="text-slate-600 text-sm flex items-center mb-3">
                    <MapPin size={12} className="mr-1 flex-shrink-0" />
                    <span className="truncate">{dish.place}</span>
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={i < Math.floor(dish.rating) ? "fill-current" : "text-amber-200"}
                          />
                        ))}
                      </div>
                      <span className="ml-1 text-sm font-medium text-slate-900">{dish.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-xs text-slate-500">{dish.reviews} reviews</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-orange-600 tracking-wide uppercase">AI-Powered Features</h2>
            <p className="mt-2 text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Why FoodLens is Different
            </p>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600">
              We're transforming how India discovers food with AI-powered insights
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-slate-100"
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className="inline-flex items-center justify-center p-3 bg-orange-100 rounded-xl text-orange-600">
                    {feature.icon}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-orange-600 to-amber-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Ready to explore?
            </h2>
            <p className="mt-4 text-xl text-orange-100">
              Discover India's food like never before.
            </p>
            <div className="mt-8 flex justify-center space-x-4">
              <a
                href="/signup"
                className="px-6 py-3 bg-white text-orange-600 font-medium rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                Get Started
              </a>
              <a
                href="/demo"
                className="px-6 py-3 bg-transparent border-2 border-white text-white font-medium rounded-xl hover:bg-white hover:text-orange-600 transition-all"
              >
                Live Demo
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">

 {/* niche */}
                <div className="mt-12 md:mt-0 rounded-3xl">
           <img src="https://images.pexels.com/photos/7149165/pexels-photo-7149165.jpeg" className='rounded-3xl' alt="" />
                </div>


      
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">Product</h3>
                  <ul className="mt-4 space-y-4">
                    <li><a href="/features" className="text-base text-slate-400 hover:text-white">Features</a></li>
                    <li><a href="/pricing" className="text-base text-slate-400 hover:text-white">Pricing</a></li>
                    <li><a href="/case-studies" className="text-base text-slate-400 hover:text-white">Case Studies</a></li>
                    <li><a href="/reviews" className="text-base text-slate-400 hover:text-white">Reviews</a></li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">Company</h3>
                  <ul className="mt-4 space-y-4">
                    <li><a href="/about" className="text-base text-slate-400 hover:text-white">About</a></li>
                    <li><a href="/blog" className="text-base text-slate-400 hover:text-white">Blog</a></li>
                    <li><a href="/careers" className="text-base text-slate-400 hover:text-white">Careers</a></li>
                    <li><a href="/contact" className="text-base text-slate-400 hover:text-white">Contact</a></li>
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-slate-300 tracking-wider uppercase">Legal</h3>
                  <ul className="mt-4 space-y-4">
                    <li><a href="/privacy" className="text-base text-slate-400 hover:text-white">Privacy</a></li>
                    <li><a href="/terms" className="text-base text-slate-400 hover:text-white">Terms</a></li>
                    <li><a href="/cookies" className="text-base text-slate-400 hover:text-white">Cookie Policy</a></li>
                  </ul>
                </div>


      {/* upar */}
            <div className="space-y-8 xl:col-span-1 ">
              <div className="flex items-center  justify-center ">
                {/* <span className="text-2xl font-bold text-white">FoodLens</span> */}
              <div className=" flex items-center space-x-1">
                <img src="https://i.postimg.cc/nLprcQxw/image-1-removebg-preview.png" className='w-16 ' alt="" />
                <span className="text-2xl font-bold text-emerald-600">Food
                  <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600">Lens
                  </span>
                </span>
              </div>
              </div>
              {/* <p className="text-slate-400 text-base">
                Discovering India's food culture through AI-powered insights and community contributions.
              </p> */}
              <div className="flex space-x-6">
                <a href="#" className="text-slate-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-white">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-slate-400 hover:text-white">
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
          <div className="mt-12 border-t border-slate-800 pt-8">
            <p className="text-base text-slate-400 text-center">
              &copy; 2023 FoodLens. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Add custom animation styles */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default FoodLensLanding;
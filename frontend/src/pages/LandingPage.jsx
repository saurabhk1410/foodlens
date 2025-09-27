import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ChevronRight, MapPinPlusInside, Plus, Search, Upload, Star, X } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext';
import Hero from '../component/Hero';
import axios from 'axios';
import TrendingDishes from '../component/TrendingDishes';
import FeatureSection from '../component/FeatureSection';
import RecommendedDishes from '../component/RecommendedDishes';
import Footer from '../component/Footer';

const FoodLensLanding = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadOption, setShowUploadOption] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageReviews, setImageReviews] = useState([]);
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    const token = localStorage.getItem("userId");
    if (token) {
      setIsLoggedIn(true);
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      // Call backend logout API
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      // Clear local storage
      localStorage.removeItem("userId");
      setIsLoggedIn(false);
      setIsProfileOpen(false);
      setAuthUser(null);
      // Navigate to home page
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setShowUploadOption(false);
      
      // Simulate fetching reviews for the uploaded image
      const mockReviews = [
        { id: 1, user: "Food Explorer", rating: 4, comment: "This looks delicious! Where was this taken?", date: "2 days ago" },
        { id: 2, user: "Chef Master", rating: 5, comment: "Amazing presentation! The colors are vibrant.", date: "1 week ago" },
        { id: 3, user: "Food Blogger", rating: 4, comment: "I've been here! The portion size is generous.", date: "3 days ago" }
      ];
      setImageReviews(mockReviews);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageReviews([]);
  };

  const handleSearch = () => {
    if (selectedImage) {
      // If image is uploaded, search by image
      navigate("/map", { state: { imageSearch: true, imageUrl: selectedImage } });
    } else {
      // Regular text search
      navigate("/map", { state: { searchQuery } });
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${scrollPosition > 50 ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200' : 'bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center h-20">
            {/* Left: Logo */}
            <div className="flex items-center space-x-2">
              <img src="https://i.postimg.cc/nLprcQxw/image-1-removebg-preview.png" className="w-12" alt="logo" />
              <span className="text-2xl font-bold text-black">
                Food<span className="text-gray-600">Lens</span>
              </span>
            </div>

            {/* Center: Search Bar */}
            <div className="hidden md:flex flex-1 justify-center px-6">
              <div className="w-full max-w-xl bg-white rounded-xl border border-gray-300 p-2 flex items-center shadow-sm">
                <div className="flex-1 flex items-center px-3">
                  <Search size={20} className="text-gray-500" />
                  
                  {/* Image Preview in Search Bar */}
                  {selectedImage ? (
                    <div className="flex items-center ml-8 space-x-3 flex-1">
                      <div className="relative">
                        <img 
                          src={selectedImage} 
                          alt="Uploaded preview" 
                          className="w-10 h-10 object-cover rounded-lg border border-gray-300"
                        />
                        <button 
                          onClick={handleRemoveImage}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <input 
                      type="text" 
                      placeholder="Search for dishes, places, or experiences..." 
                      className="w-full py-3 px-2 text-gray-700 placeholder-gray-500 outline-none bg-transparent" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  )}
                  
                  <div className="relative">
                    <button 
                      onClick={() => setShowUploadOption(!showUploadOption)}
                      className="p-2 text-gray-500 hover:text-black transition-colors"
                    >
                      <Upload size={20} />
                    </button>
                    
                    {showUploadOption && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-10">
                        <label className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
                          Upload Image
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleImageUpload}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
                <button onClick={handleSearch} className="bg-black hover:bg-gray-800 text-white font-medium py-2 px-5 rounded-lg transition-all flex items-center">
                  Search <ChevronRight size={20} className="ml-1" />
                </button>
              </div>
            </div>

            {/* Right: Auth buttons + Mobile Menu */}
            <div className="flex items-center space-x-4">
              {/* Desktop Auth */}
              <div className="hidden md:flex items-center space-x-4">
                {!isLoggedIn ? (
                  <>
                    <a href="/login" className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium transition-colors">Login</a>
                    <a href="/signup" className="px-4 py-2 rounded-md text-sm font-medium text-white bg-black hover:bg-gray-800 transition-all shadow-sm hover:shadow-md">Sign Up</a>
                  </>
                ) : (
                 <div className="relative flex items-center gap-3">

                    {/* Add Button */}
<button onClick={() => navigate('/experience')}
  className="inline-flex items-center gap-2 px-4 py-4 bg-white text-black font-medium rounded-full border border-black hover:bg-black hover:text-white transition-all shadow-sm hover:shadow-md"
>
  <MapPinPlusInside size={24} className="transition-colors" />
  Add Experience
</button>


  {/* Profile Button */}
  <div className="relative">
    <button
      onClick={() => setIsProfileOpen(!isProfileOpen)}
      className="flex justify-center items-center h-16 w-16 rounded-full p-1 bg-black/50 hover:bg-gray-800 transition-all shadow-sm hover:shadow-md"
    >
      <div className="rounded-full overflow-hidden w-full h-full bg-white">
        <img
          src="https://randomuser.me/api/portraits/men/78.jpg"
          alt="Profile"
          className="w-full h-full object-cover rounded-full"
        />
      </div>
    </button>

    {isProfileOpen && (
      <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 border border-gray-200">
        <a
          href="/profile"
          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          View Profile
        </a>
        <button
          onClick={handleLogout}
          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
        >
          Logout
        </button>
      </div>
    )}
  </div>



</div>

                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-black focus:outline-none">
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
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md rounded-b-xl shadow-xl border-b border-gray-200">
            <div className="pt-2 pb-3 space-y-1">

              <div className="pt-4 pb-3 border-t border-gray-200">
                {!isLoggedIn ? (
                  <div className="flex items-center px-5 space-x-3">
                    <a href="/login" className="block px-4 py-2 rounded-md text-base font-medium text-gray-600 hover:text-black">Login</a>
                    <a href="/signup" className="px-4 py-2 rounded-md text-base font-medium text-white bg-black hover:bg-gray-800">Sign Up</a>
                  </div>
                ) : (
                  <div className="px-5 space-y-1">
                    <a
                      href="/profile"
                      className="block px-4 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                    >
                      View Profile
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Reviews Section (only shown when image is uploaded) */}
      {/* {selectedImage && imageReviews.length > 0 && (
        <div className="pt-24 px-4 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4">Image Analysis & Reviews</h2>
            <div className="space-y-3">
              {imageReviews.map((review) => (
                <div key={review.id} className="border-b pb-3 last:border-b-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium">{review.user}</span>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={14} 
                          className={i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"} 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">{review.comment}</p>
                  <span className="text-xs text-gray-400">{review.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )} */}

      <Hero />
      <TrendingDishes />
      <FeatureSection />
      <RecommendedDishes />
      <Footer />
    </div>
  );
};

export default FoodLensLanding;
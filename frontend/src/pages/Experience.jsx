import React, { useState, useEffect } from 'react';
import { Star, Camera, MapPin, Clock, Users, Award, ChevronDown, Search, X, Heart, Utensils, Briefcase, PartyPopper, User, Moon, Calendar, Coffee } from 'lucide-react';
import { useAuthContext } from '../context/AuthContext.jsx';
import axios from 'axios';

const ExperienceSharingPage = () => {
  const { authUser } = useAuthContext();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [review, setReview] = useState('');
  const [uploadedImages, setUploadedImages] = useState([]);
  const [expandedSection, setExpandedSection] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [customPlace, setCustomPlace] = useState({
    name: '',
    address: '',
    cuisine: '',
  });
  const [samplePlaces, setSamplePlaces] = useState([]);

  // Sample places data - in a real app this would come from an API
  // const samplePlaces = [
  //   {
  //     id: 1,
  //     name: "Sai Palace",
  //     type: "North Indian, Chinese, Mughlai",
  //     address: "123 Food Street, Culinary Road, Mumbai",
  //   },
  //   {
  //     id: 2,
  //     name: "Spice Garden",
  //     type: "South Indian, Vegetarian",
  //     address: "456 Spice Lane, Bangalore",
  //   },
  //   {
  //     id: 3,
  //     name: "Coastal Delights",
  //     type: "Seafood, Goan",
  //     address: "789 Beach Road, Goa",
  //   },
  //   {
  //     id: 4,
  //     name: "Urban Brew",
  //     type: "Cafe, Continental",
  //     address: "321 Downtown Avenue, Delhi",
  //   },
  // ];

  // const occasions = [
  //   { id: 1, name: "Date Night", icon: <Heart size={20} className="text-gray-700" /> },
  //   { id: 2, name: "Family Dinner", icon: <Users size={20} className="text-gray-700" /> },
  //   { id: 3, name: "Business Meeting", icon: <Briefcase size={20} className="text-gray-700" /> },
  //   { id: 4, name: "Friends Hangout", icon: <PartyPopper size={20} className="text-gray-700" /> },
  //   { id: 5, name: "Solo Dining", icon: <User size={20} className="text-gray-700" /> },
  //   { id: 6, name: "Late Night Bite", icon: <Moon size={20} className="text-gray-700" /> },
  //   { id: 7, name: "Celebration", icon: <Award size={20} className="text-gray-700" /> },
  //   { id: 8, name: "Casual Lunch", icon: <Coffee size={20} className="text-gray-700" /> },
  // ];

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/restaurants/getAll', {
          withCredentials: true,
        });
        const places = (res?.data?.restaurants || []).map((r) => ({
          id: r._id,
          name: r.name,
          type: `Rating: ${r.rating ?? 0}`,
          address: r.location || 'Unknown address',
        }));
        setSamplePlaces(places);
      } catch (_) {
        // silently ignore for now
      }
    };
    fetchRestaurants();
  }, []);

  const rewardTiers = [
    { points: 50, title: "Basic Review", description: "Earn 50 points for sharing your experience" },
    { points: 100, title: "Photo Upload", description: "Get an extra 50 points for each photo" },
    { points: 75, title: "Detailed Review", description: "Earn 75 points for reviews over 100 words" },
    { points: 150, title: "Complete Experience", description: "Bonus for rating, photos, and detailed review" },
  ];

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // In a real app, you would upload these to a server
    // For demo, we'll just create placeholder previews, but also keep the File for submit
    const newImages = files.map(file => ({
      id: Math.random(),
      name: file.name,
      url: URL.createObjectURL(file),
      file,
    }));
    setUploadedImages([...uploadedImages, ...newImages]);
  };

  const toggleOccasion = (occasion) => {
    if (selectedOccasions.includes(occasion)) {
      setSelectedOccasions(selectedOccasions.filter(item => item !== occasion));
    } else {
      setSelectedOccasions([...selectedOccasions, occasion]);
    }
  };

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  const calculateTotalPoints = () => {
    let points = 0;
    if (rating > 0) points += 50; // Basic review
    if (uploadedImages.length > 0) points += uploadedImages.length * 50; // Photos
    if (review.length > 100) points += 75; // Detailed review
    if (rating > 0 && uploadedImages.length > 0 && review.length > 100) points += 150; // Complete experience bonus
    return points;
  };

  const handleSubmit = async () => {
    if (!authUser) {
      alert('Please log in to submit a review.');
      return;
    }
    if (!selectedPlace) {
      alert('Please select a restaurant from the list.');
      return;
    }
    if (!rating || review.length < 20) {
      alert('Please provide a rating and a review of at least 20 characters.');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('restaurantId', selectedPlace.id);
      formData.append('rating', String(rating));
      formData.append('comment', review);
      uploadedImages.forEach(img => {
        if (img.file) formData.append('images', img.file);
      });

      await axios.post('http://localhost:5000/api/reviews/add', formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      // Reset minimal state after success
      setRating(0);
      setHoverRating(0);
      setReview('');
      setUploadedImages([]);
      alert('Review submitted successfully!');
    } catch (e) {
      const msg = e?.response?.data?.message || 'Something went wrong while submitting the review.';
      alert(msg);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setShowSearchResults(e.target.value.length > 0);
  };

  const selectPlace = (place) => {
    setSelectedPlace(place);
    setSearchQuery(place.name);
    setShowSearchResults(false);
  };

  const handleCustomPlaceChange = (field, value) => {
    setCustomPlace({
      ...customPlace,
      [field]: value
    });
  };

  const filteredPlaces = samplePlaces.filter(place => 
    place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    place.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Share Your Dining Experience</h1>
          <p className="text-gray-600">Help the community discover great food places and earn rewards</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Rewards & Tips */}
          <div className="lg:col-span-1 space-y-6">
            {/* Rewards Card */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <Award size={20} className="mr-2 text-gray-800" />
                <h2 className="text-xl font-bold text-gray-900">Earn Rewards</h2>
              </div>
              
              <div className="mb-6 p-4 bg-gray-100 rounded-lg border border-gray-200">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{calculateTotalPoints()}</div>
                  <div className="text-sm text-gray-600">Points you'll earn</div>
                </div>
                <div className="mt-2 text-xs text-gray-500 text-center">
                  Redeem points for discounts at participating restaurants
                </div>
              </div>

              <div 
                className={`overflow-hidden transition-all duration-300 ${expandedSection === 'rewards' ? 'max-h-96' : 'max-h-12'}`}
              >
                <button 
                  onClick={() => toggleSection('rewards')}
                  className="flex items-center justify-between w-full text-left mb-2"
                >
                  <span className="font-medium text-gray-900">How to earn points</span>
                  <ChevronDown size={16} className={`transform transition-transform ${expandedSection === 'rewards' ? 'rotate-180' : ''}`} />
                </button>
                
                <div className="space-y-3">
                  {rewardTiers.map((tier, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-gray-800 text-white text-xs font-medium rounded-full w-6 h-6 flex items-center justify-center mt-0.5 mr-3">
                        {tier.points}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{tier.title}</div>
                        <div className="text-sm text-gray-600">{tier.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tips Card */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Tips for Great Reviews</h2>
              <ul className="space-y-3 text-sm text-gray-700">
                <li className="flex items-start">
                  <div className="bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">1</div>
                  <span>Mention specific dishes you enjoyed</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">2</div>
                  <span>Describe the ambiance and service</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">3</div>
                  <span>Share what made your experience special</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">4</div>
                  <span>Note any dietary accommodations</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">5</div>
                  <span>Be honest and constructive</span>
                </li>
              </ul>
            </div>

            {/* Community Impact Card */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Your Impact</h2>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded-lg mr-3 border border-gray-200">
                    <Users size={18} className="text-gray-700" />
                  </div>
                  <span>Help others discover great food places</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded-lg mr-3 border border-gray-200">
                    <MapPin size={18} className="text-gray-700" />
                  </div>
                  <span>Support local businesses</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded-lg mr-3 border border-gray-200">
                    <Award size={18} className="text-gray-700" />
                  </div>
                  <span>Build your FoodLens reputation</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Review Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Share Your Experience</h2>
              
              {/* Place Selection */}
              <div className="mb-8">
                <h3 className="font-medium text-gray-900 mb-4">Where did you dine? <span className="text-red-500">*</span></h3>
                
                <div className="relative mb-3">
                  <div className="relative">
                    <Search size={20} className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search for a restaurant or add a new one"
                      value={searchQuery}
                      onChange={handleSearch}
                      className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedPlace(null);
                          setShowSearchResults(false);
                        }}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                  
                  {showSearchResults && (
                    <div className="absolute z-10 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto">
                      {filteredPlaces.length > 0 ? (
                        filteredPlaces.map(place => (
                          <div
                            key={place.id}
                            onClick={() => selectPlace(place)}
                            className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                          >
                            <div className="font-medium text-gray-900">{place.name}</div>
                            <div className="text-sm text-gray-600">{place.address}</div>
                            <div className="text-xs text-gray-500">{place.type}</div>
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-gray-500">
                          No results found for "{searchQuery}"
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                {/* {!selectedPlace && (
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h4 className="font-medium text-gray-900 mb-3">Add a new place</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Place Name <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          value={customPlace.name}
                          onChange={(e) => handleCustomPlaceChange('name', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                          placeholder="Enter restaurant name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          value={customPlace.address}
                          onChange={(e) => handleCustomPlaceChange('address', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                          placeholder="Enter full address"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Cuisine Type</label>
                        <input
                          type="text"
                          value={customPlace.cuisine}
                          onChange={(e) => handleCustomPlaceChange('cuisine', e.target.value)}
                          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                          placeholder="e.g., Italian, Mexican, Indian"
                        />
                      </div>
                    </div>
                  </div>
                )} */}
              </div>

              {/* Rating Section */}
              <div className="mb-8">
                <h3 className="font-medium text-gray-900 mb-4">Overall Rating <span className="text-red-500">*</span> </h3>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      className="focus:outline-none"
                    >
                      <Star
                        size={32}
                        className={
                          star <= (hoverRating || rating)
                            ? "text-gray-800 fill-current"
                            : "text-gray-300"
                        }
                      />
                    </button>
                  ))}
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  {rating > 0 ? `You rated it ${rating} star${rating > 1 ? 's' : ''}` : 'Select your rating'}
                </div>
              </div>

              {/* Occasion Selection */}
              {/* <div className="mb-8">
                <h3 className="font-medium text-gray-900 mb-4">What was the occasion? (Select all that apply)</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {occasions.map((occasion) => (
                    <button
                      key={occasion.id}
                      onClick={() => toggleOccasion(occasion.name)}
                      className={`p-3 rounded-lg border text-center transition-all flex flex-col items-center ${
                        selectedOccasions.includes(occasion.name)
                          ? "border-gray-800 bg-gray-100 font-medium"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <div className="mb-2">{occasion.icon}</div>
                      <div className="text-sm text-gray-900">{occasion.name}</div>
                    </button>
                  ))}
                </div>
              </div> */}

              {/* Review Text */}
              <div className="mb-8">
                <h3 className="font-medium text-gray-900 mb-4">Share your experience <span className="text-red-500">*</span></h3>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="What did you like about this place? What could be improved? What dishes would you recommend?"
                  className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
                />
                <div className="flex justify-between mt-1">
                  <div className="text-sm text-gray-500">
                    {review.length}/500 characters {review.length > 100 && <span className="text-gray-700">✓ Detailed</span>}
                  </div>
                  <div className="text-sm text-gray-500">
                    Minimum 20 characters required
                  </div>
                </div>
              </div>

              {/* Photo Upload */}
              <div className="mb-8">
                <h3 className="font-medium text-gray-900 mb-4">Add photos <span className="text-red-500">*</span></h3>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    id="photo-upload"
                    className="hidden"
                  />
                  <label
                    htmlFor="photo-upload"
                    className="inline-flex items-center px-4 py-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <Camera size={20} className="mr-2 text-gray-700" />
                    <span className="text-gray-900">Select photos</span>
                  </label>
                  <span className="text-sm text-gray-500">
                    {uploadedImages.length} photo{uploadedImages.length !== 1 ? 's' : ''} selected
                  </span>
                </div>
                
                {uploadedImages.length > 0 && (
                  <div className="mt-4">
                    <div className="grid grid-cols-3 gap-3">
                      {uploadedImages.map((image) => (
                        <div key={image.id} className="relative group">
                          <img
                            src={image.url}
                            alt="Preview"
                            className="w-full h-24 object-cover rounded-lg border border-gray-200"
                          />
                          <button
                            onClick={() => setUploadedImages(uploadedImages.filter(img => img.id !== image.id))}
                            className="absolute top-1 right-1 bg-white text-gray-700 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity border border-gray-300 shadow-sm"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center">
                  <Award size={20} className="mr-2 text-gray-700" />
                  <span className="text-sm text-gray-600">
                    You'll earn <span className="font-semibold text-gray-900">{calculateTotalPoints()} points</span>
                  </span>
                </div>
                <button 
                  className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={!rating || review.length < 20 || (!selectedPlace && !customPlace.name)}
                  onClick={handleSubmit}
                >
                  Submit Review
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceSharingPage;
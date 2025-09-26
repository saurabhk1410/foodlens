import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { FaStar, FaUserCircle, FaUtensils, FaEdit, FaMapMarkerAlt, FaCalendarAlt, FaCrown } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("reviews");
  const { authUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!authUser || !authUser._id) {
          setError("Not authenticated");
          navigate("/login");
          return;
        }
        const res = await axios.get(`http://localhost:5000/api/user/profile/${authUser._id}`, {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch profile");
      }
    };

    fetchProfile();
  }, [authUser, navigate]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Error Loading Profile</h3>
          <p className="text-red-500 mb-6">{error}</p>
          <button 
            onClick={() => navigate("/login")}
            className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Calculate user level based on points
  const getUserLevel = (points) => {
    if (points >= 1000) return { level: "Elite Foodie", icon: <FaCrown className="text-yellow-500" />, color: "from-yellow-400 to-yellow-600" };
    if (points >= 500) return { level: "Food Expert", icon: <FaStar className="text-purple-500" />, color: "from-purple-400 to-purple-600" };
    if (points >= 200) return { level: "Food Enthusiast", icon: <FaUtensils className="text-blue-500" />, color: "from-blue-400 to-blue-600" };
    return { level: "Food Explorer", icon: <FaMapMarkerAlt className="text-green-500" />, color: "from-green-400 to-green-600" };
  };

  const userLevel = getUserLevel(user.points);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-black to-gray-800 rounded-3xl shadow-xl overflow-hidden mb-8">
          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 text-white">
            {/* Avatar Section */}
            <div className="relative">
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg">
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src="https://randomuser.me/api/portraits/men/78.jpg"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                <button className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors duration-200">
                  <FaEdit className="text-white text-sm" />
                </button>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">{user.name}</h1>
                  <div className="flex items-center justify-center md:justify-start gap-4 text-gray-300 mb-4">
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-sm" />
                      <span>Food Explorer</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="text-sm" />
                      <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                {/* Points Badge */}
                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white py-2 px-4 rounded-full font-bold text-lg shadow-lg">
                  {user.points} pts
                </div>
              </div>

              {/* Level Badge */}
              <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${userLevel.color} text-white py-2 px-4 rounded-full font-semibold`}>
                {userLevel.icon}
                <span>{userLevel.level}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                  activeTab === "reviews" 
                    ? "text-black border-b-2 border-black" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("reviews")}
              >
                <FaUtensils className="inline-block mr-2" />
                Reviews ({(user.reviews && user.reviews.length) || 0})
              </button>
              <button
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors duration-200 ${
                  activeTab === "stats" 
                    ? "text-black border-b-2 border-black" 
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("stats")}
              >
                <FaStar className="inline-block mr-2" />
                Statistics
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6 md:p-8">
            {activeTab === "reviews" ? (
              <div>
                <h3 className="text-xl font-bold mb-6">Your Restaurant Reviews</h3>
                {(user.reviews && user.reviews.length) === 0 ? (
                  <div className="text-center py-12">
                    <FaUtensils className="text-6xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg mb-4">You haven't written any reviews yet</p>
                    <button className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200">
                      Write Your First Review
                    </button>
                  </div>
                ) : (
                  <div className="grid gap-6">
                    {(user.reviews || []).map((review) => (
                      <div
                        key={review._id}
                        className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                          <h4 className="text-lg font-semibold text-gray-900 mb-2 md:mb-0">
                            {review.restaurant?.name || "Unknown Restaurant"}
                          </h4>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1 bg-yellow-50 text-yellow-800 px-3 py-1 rounded-full">
                              <FaStar className="text-yellow-500" />
                              <span className="font-semibold">{review.rating.toFixed(1)}</span>
                            </div>
                            <span className="text-gray-500 text-sm">
                              {new Date(review.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        
                        {review.comment && (
                          <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>
                        )}

                        {Array.isArray(review.images) && review.images.length > 0 && (
                          <div className="flex gap-3 overflow-x-auto pb-2">
                            {(review.images || []).map((img, idx) => (
                              <img
                                key={idx}
                                src={img}
                                alt="Review"
                                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg shadow-sm hover:scale-105 transition-transform duration-200"
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold mb-6">Your Food Journey</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaUtensils className="text-white text-xl" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{user.reviews.length}</p>
                    <p className="text-gray-600">Reviews Written</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaStar className="text-white text-xl" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">
                      {user.reviews.length > 0 
                        ? (user.reviews.reduce((acc, review) => acc + review.rating, 0) / user.reviews.length).toFixed(1)
                        : "0.0"
                      }
                    </p>
                    <p className="text-gray-600">Average Rating</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                      <FaCrown className="text-white text-xl" />
                    </div>
                    <p className="text-3xl font-bold text-gray-900">{user.points}</p>
                    <p className="text-gray-600">Loyalty Points</p>
                  </div>
                </div>
                
                {/* Progress to next level */}
                <div className="mt-8 bg-gray-50 rounded-xl p-6">
                  <h4 className="font-semibold mb-3">Progress to Next Level</h4>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div 
                      className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((user.points / 500) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Food Explorer</span>
                    <span>{user.points} / 500 points</span>
                    <span>Food Enthusiast</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
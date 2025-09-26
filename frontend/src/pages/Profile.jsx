import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
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
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-6 rounded-xl shadow-md w-96 flex flex-col items-center">
        <img
          src={user.profilePic || "/default-avatar.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4 object-cover"
        />
        <h2 className="text-2xl font-bold mb-2">{user.name}</h2>
        <p className="text-gray-600 mb-1">{user.email}</p>
        {user.gender && <p className="text-gray-600 mb-1 capitalize">{user.gender}</p>}
        <p className="text-gray-600 mb-4">Points: {user.points}</p>

        <h3 className="text-xl font-semibold mb-2 self-start">Reviews</h3>
        <div className="w-full">
          {user.reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet</p>
          ) : (
            user.reviews.map((review) => (
              <div
                key={review._id}
                className="border rounded-lg p-3 mb-3 bg-gray-50"
              >
                <p className="font-semibold">
                  Restaurant: {review.restaurant?.name || "Unknown"}
                </p>
                <p>Rating: {review.rating} / 5</p>
                {review.comment && <p>Comment: {review.comment}</p>}
                {review.images.length > 0 && (
                  <div className="flex mt-2 gap-2 overflow-x-auto">
                    {review.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt="Review"
                        className="w-20 h-20 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

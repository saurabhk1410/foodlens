import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setAuthUser } = useAuthContext();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      const loggedInUser = res.data;
      localStorage.setItem("userId", JSON.stringify(loggedInUser));
      setAuthUser(loggedInUser);
      console.log("Logged in:", res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 px-6 md:px-10 py-10 md:py-0">
      {/* Left: Login Card */}
      <div className="w-full md:w-1/2 flex justify-center mb-10 md:mb-0">
        <form
          onSubmit={handleLogin}
          className="relative bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-2"
        >
          {/* Floating label on border */}
          <h2 className="absolute -top-4 left-4 bg-black text-white px-4 py-1 text-sm font-semibold rounded-full shadow">
            Welcome Back!
          </h2>

          {error && (
            <p className="text-red-600 text-sm mb-4 text-center font-medium">
              {error}
            </p>
          )}

          <div className="mb-4 mt-2">
            <label className="block text-gray-700 text-sm mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg font-semibold shadow-md transition-all hover:bg-gray-900 hover:scale-[1.01]"
          >
            Login
          </button>

          <p className="mt-6 text-sm text-center text-gray-600">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-black font-medium cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        </form>
      </div>

      {/* Right: Project Info */}
      <div className="w-full md:w-1/2 px-4 md:px-12 text-center md:text-left">
        <p className="text-gray-700 mb-4 leading-relaxed text-lg md:text-xl">
          Discover India’s vibrant food culture with <b>FoodLens</b> – an
          AI-powered food discovery platform that helps you explore dishes,
          hidden gems, and trending flavors around you.
        </p>

        <p className="mt-6 text-gray-500 italic md:text-lg">
          FoodLens – Discover experience, not just restaurants.
        </p>
      </div>
    </div>
  );
};

export default Login;

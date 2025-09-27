import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import FoodLensLanding from "./pages/LandingPage";
import RestaurantPage from "./pages/RestaurantPage";
import IndiaMapPage from "./pages/Map";
import ExperienceSharingPage from "./pages/Experience";
import { useAuthContext } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";

const App = () => {
  const { authUser } = useAuthContext(); // authUser is only userId
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FoodLensLanding />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/profile" 
          element={authUser? <Profile /> : <Navigate to="/login"/>}
        />
        <Route path="/restaurant/:id" element={<RestaurantPage />} />
        <Route path="/map" element={<IndiaMapPage />} />
        <Route 
          path="/experience" 
          element={authUser? <ExperienceSharingPage /> : <Navigate to="/login"/>} 
        />
      </Routes>
    </Router>
  );
};

export default App;

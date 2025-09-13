import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import FoodLensLanding from "./LandingPage";
import RestaurantPage from "./RestaurantPage";
import IndiaMapPage from "./Map";
import ExperienceSharingPage from "./Experience";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FoodLensLanding />} />
        <Route path="/restaurant" element={<RestaurantPage />} />
        <Route path="/map" element={<IndiaMapPage />} />
        <Route path="/experience" element={<ExperienceSharingPage />} />
      </Routes>
    </Router>
  );
};

export default App;

import { Restaurant } from "../models/restaurant.model.js";
import { Dish } from "../models/dish.model.js";
import { Review } from "../models/review.model.js";
import axios from "axios";

// Add a new restaurant (no auth required as requested)
export const addRestaurant = async (req, res) => {
  try {
    const { name, location, rating } = req.body;

    if (!name || !location) {
      return res.status(400).json({ message: "name and location are required" });
    }

    const existing = await Restaurant.findOne({ name, location });
    if (existing) {
      return res.status(409).json({ message: "Restaurant already exists at this location" });
    }

    const restaurant = new Restaurant({ name, location, rating });
    await restaurant.save();

    res.status(200).json({ restaurant });
  } catch (error) {
    console.error("Error adding restaurant:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


// Get all restaurants
export const getAllRestaurants = async (_req, res) => {
  try {
    const restaurants = await Restaurant.find()
      .populate("dishes")
      .populate("reviews");

    res.status(200).json({ restaurants });
  } catch (error) {
    console.error("Error fetching restaurants:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Search restaurants using AI/ML server
export const searchRestaurants = async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || query.trim() === "") {
      return res.status(400).json({ message: "Search query is required" });
    }

    // Call Python server search API
    const pythonServerResponse = await axios.post("http://127.0.0.1:8000/search", {
      query: query.trim()
    });

    const searchResults = pythonServerResponse.data;

    if (!searchResults.results || searchResults.results.length === 0) {
      return res.status(200).json({
        query: searchResults.query,
        results: [],
        message: "No results found"
      });
    }

    // Fetch detailed data for each result
    const detailedResults = await Promise.all(
      searchResults.results.map(async (result) => {
        // Find restaurant by legacy_id
        const restaurant = await Restaurant.findOne({ legacy_id: result.restaurant_id.toString() })
          .populate("reviews"); // keep restaurant-level reviews, not dishes

        if (!restaurant) return null;

        // Fetch only the dishes Python backend asked for
        const dishIds = result.dishes.map(d => d.dish_id.toString());
        const dishes = await Dish.find({ legacy_id: { $in: dishIds } });

        // Attach reviews to each dish if needed
        const dishesWithReviews = await Promise.all(
          result.dishes.map(async (dishResult) => {
            const dish = dishes.find(d => d.legacy_id === dishResult.dish_id.toString());
            if (!dish) return null;

            const reviews = dishResult.review_ids.length > 0
              ? await Review.find({ legacy_id: { $in: dishResult.review_ids.map(id => id.toString()) } })
              : [];

            return {
              ...dish.toObject(),
              reviews
            };
          })
        );

        // Fetch restaurant-level reviews
        const restaurantReviews = result.restaurant_reviews.length > 0
          ? await Review.find({ legacy_id: { $in: result.restaurant_reviews.map(id => id.toString()) } })
          : [];

        return {
          restaurant: restaurant.toObject(),
          dishes: dishesWithReviews.filter(dish => dish !== null),
          restaurantReviews
        };
      })
    );

    // Filter out null results
    const validResults = detailedResults.filter(result => result !== null);

    res.status(200).json({
      query: searchResults.query,
      results: validResults
    });

  } catch (error) {
    console.error("Error in search:", error.message);

    // Handle Python server connection errors
    if (error.code === 'ECONNREFUSED') {
      return res.status(503).json({
        message: "Search service is temporarily unavailable",
        error: "Python server not running"
      });
    }

    res.status(500).json({
      message: "Internal Server Error",
      error: error.message
    });
  }
};

// Get restaurant by ID
export const getRestaurantById = async (req, res) => {
  const { id } = req.params;

  try {
    // Fetch restaurant from Mongo
    const restaurant = await Restaurant.findById(id)
      .populate("dishes")
      .populate("reviews");

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    let summaryData = null;

    try {
      // Call Flask API using legacy_id (important: Flask expects "restaurant_id" as param)
      const pythonResponse = await axios.post("http://127.0.0.1:8000/summarize", {
        restaurant_id: Number(restaurant.legacy_id)
      });

      summaryData = pythonResponse.data.summary;
    } catch (err) {
      console.error("Error calling Flask summarization API:", err.message);
      // Fallback if Flask API is down
      summaryData = { error: "AI summary unavailable" };
    }

    res.status(200).json({
      ...restaurant.toObject(),
      ai_summary: summaryData   // attach insights here
    });
  } catch (error) {
    console.error("Error fetching restaurant:", error);
    res.status(500).json({ message: "Server error" });
  }
};

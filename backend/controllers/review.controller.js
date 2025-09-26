import { Review } from "../models/review.model.js";
import { Restaurant } from "../models/restaurant.model.js";
import { User } from "../models/user.model.js";

// Add a new review for a restaurant (auth required via protectRoute)
export const addReview = async (req, res) => {
  try {
    const authenticatedUser = req.user; // set by protectRoute
    if (!authenticatedUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { restaurantId, rating, comment, images } = req.body;

    if (!restaurantId || !rating) {
      return res.status(400).json({ message: "restaurantId and rating are required" });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "rating must be between 1 and 5" });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const review = new Review({
      user: authenticatedUser._id,
      restaurant: restaurantId,
      rating,
      comment,
      images: Array.isArray(images) ? images : [],
    });
    await review.save();

    // Link to restaurant
    restaurant.reviews.push(review._id);
    await restaurant.save();

    // Link to user so profile population returns the review
    await User.findByIdAndUpdate(authenticatedUser._id, {
      $push: { reviews: review._id },
    });

    res.status(201).json({ review });
  } catch (error) {
    console.error("Error adding review:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

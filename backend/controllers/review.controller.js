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

    const { restaurantId, rating, comment } = req.body;

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

    // Build absolute image URLs from uploaded files so frontend can render directly
    const uploaded = Array.isArray(req.files) ? req.files : [];
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const imageUrls = uploaded.map((f) => `${baseUrl}/uploads/reviews/${f.filename}`);

    const review = new Review({
      user: authenticatedUser._id,
      restaurant: restaurantId,
      rating,
      comment,
      images: imageUrls,
    });
    await review.save();

    // Link to restaurant
    restaurant.reviews.push(review._id);
    await restaurant.save();

    // Compute and add points to user, and link review to user
    const computePoints = () => {
      let pts = 0;
      if (rating > 0) pts += 50; // Basic review
      const numImages = imageUrls.length;
      if (numImages > 0) pts += numImages * 50; // Photos
      if (comment && comment.length > 100) pts += 75; // Detailed review
      if (rating > 0 && numImages > 0 && comment && comment.length > 100) pts += 150; // Complete experience bonus
      return pts;
    };

    const pointsAwarded = computePoints();

    const updatedUser = await User.findByIdAndUpdate(
      authenticatedUser._id,
      {
        $push: { reviews: review._id },
        $inc: { points: pointsAwarded },
      },
      { new: true }
    ).select("-password");

    res.status(201).json({ review, pointsAwarded, totalPoints: updatedUser?.points ?? undefined });
  } catch (error) {
    console.error("Error adding review:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

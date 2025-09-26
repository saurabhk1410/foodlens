// controllers/userController.js
import { User } from "../models/user.model.js";
import { Review } from "../models/review.model.js";

export const getProfile = async (req, res) => {
  try {
    const requestedUserId = req.params.id;
    const authenticatedUser = req.user; // set by protectRoute middleware
    if (!requestedUserId && !authenticatedUser) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userIdToFetch = requestedUserId || authenticatedUser._id;

    const user = await User.findById(userIdToFetch)
      .select("-password")
      .populate({
        path: "reviews",
        populate: { path: "restaurant", select: "name location" }, // fetch restaurant info
      });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

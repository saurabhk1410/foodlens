import { Restaurant } from "../models/restaurant.model.js";

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



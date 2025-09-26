import { Dish } from "../models/dish.model.js";
import { Restaurant } from "../models/restaurant.model.js";

// Add a new dish to a restaurant
export const addDish = async (req, res) => {
  try {
    const { restaurantId, name, cost, category, cuisine } = req.body;

    if (!restaurantId || !name || cost === undefined || !category || !cuisine) {
      return res.status(400).json({
        message: "restaurantId, name, cost, category, and cuisine are required",
      });
    }

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const dish = new Dish({
      restaurant: restaurant._id,
      name,
      cost,
      category,
      cuisine,
    });

    await dish.save();

    // Link dish to restaurant
    restaurant.dishes.push(dish._id);
    await restaurant.save();

    return res.status(201).json({ dish });
  } catch (error) {
    console.error("Error adding dish:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



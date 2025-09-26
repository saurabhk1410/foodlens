import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: { type: String, required: true },
    city: { type: String, required: true },
    latitude: { type: Number },
    longitude: { type: Number },
    rating: { type: Number, default: 0 },
    price_for_two: { type: Number },
    cuisine_category: [{ type: String }],
    restaurant_type: { type: String },
    timing: { type: String },
    legacy_id: { type: String, index: true, unique: false },
    dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dish" }],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  },
  { timestamps: true }
);

export const Restaurant = mongoose.model("Restaurant", restaurantSchema);

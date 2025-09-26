import mongoose from "mongoose";

const dishSchema = new mongoose.Schema(
  {
    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    name: { type: String, required: true },
    cost: { type: Number, required: true },
    category: { type: String },
    type: { type: String }, // veg/non-veg etc.
    cuisine: { type: String },
    rating: { type: Number, default: 0 },
    legacy_id: { type: String, index: true, unique: false }
  },
  { timestamps: true }
);

export const Dish = mongoose.model("Dish", dishSchema);

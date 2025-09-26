import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    location: { type: String },
    rating_count: { type: Number, default: 0 },
    preferred_cuisines: [{ type: String }], // store as array
    favourite_dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dish" }],
    legacy_id: { type: String, index: true, unique: false },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    points: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

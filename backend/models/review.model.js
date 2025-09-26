import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
    dish: { type: mongoose.Schema.Types.ObjectId, ref: "Dish" },
    rating: { type: Number, min: 1, max: 5, required: true },
    review_text: { type: String },
    ambiance: { type: String },
    occasion: { type: String },
    dietary: { type: String },
    features: [{
      type: String,
    }],
    sentiment: { type: String },
    legacy_id: { type: String, index: true, unique: false },
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);

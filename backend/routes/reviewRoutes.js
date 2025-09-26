import express from "express";
import { addReview } from "../controllers/review.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.post("/add", protectRoute, addReview);

export default router;



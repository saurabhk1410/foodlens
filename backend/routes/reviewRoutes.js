import express from "express";
import { addReview } from "../controllers/review.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";
import { upload } from "../middlewares/upload.js";

const router = express.Router();

router.post("/add", protectRoute, upload.array('images', 6), addReview);

export default router;



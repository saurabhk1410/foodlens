import express from "express";
import { getProfile } from "../controllers/user.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router();

router.get("/profile/:id", protectRoute, getProfile);

export default router;

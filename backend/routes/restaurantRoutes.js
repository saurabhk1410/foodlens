import express from "express";
import { addRestaurant, getAllRestaurants, searchRestaurants } from "../controllers/restaurant.controller.js";

const router = express.Router();

router.post("/add", addRestaurant);
router.get("/getAll", getAllRestaurants);
router.post("/search", searchRestaurants);

export default router;



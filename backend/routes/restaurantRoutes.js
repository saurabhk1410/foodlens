import express from "express";
import { addRestaurant, getAllRestaurants, getRestaurantById, searchRestaurants } from "../controllers/restaurant.controller.js";

const router = express.Router();

router.post("/add", addRestaurant);
router.get("/getAll", getAllRestaurants);
router.post("/search", searchRestaurants);
router.get("/:id", getRestaurantById);

export default router;



import express from "express";
import { addRestaurant, getAllRestaurants } from "../controllers/restaurant.controller.js";

const router = express.Router();

router.post("/add", addRestaurant);
router.get("/getAll", getAllRestaurants);

export default router;



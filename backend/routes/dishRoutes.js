import express from "express";
import { addDish } from "../controllers/dish.controller.js";

const router = express.Router();

router.post("/add", addDish);

export default router;



import express from "express";
import { addRestaurant, getAllRestaurants, getRestaurantById, searchRestaurants, searchByImage} from "../controllers/restaurant.controller.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" }); // temp storage

router.post("/add", addRestaurant);
router.get("/getAll", getAllRestaurants);
router.post("/search", searchRestaurants);
router.get("/:id", getRestaurantById);
router.post("/searchByImage", upload.single("file"), searchByImage);

export default router;



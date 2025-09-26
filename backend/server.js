import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import restaurantRoutes from './routes/restaurantRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import dishRoutes from './routes/dishRoutes.js';
import cookieParser from "cookie-parser";
import morgan from "morgan";
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

//Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(morgan('dev'));

// Serve uploads statically
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/dishes', dishRoutes);

// Basic Route to check if the server is working
app.get("/", (req, res) => {
  res.send("Working");
});

// Database Connection
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});
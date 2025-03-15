import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/db.js";
import userRouter from "./routes/user.routes.js";
import activityrouter from "./routes/activity.routes.js";
import workoutRoutes from "./routes/workout.routes.js";
import mealRoutes from "./routes/meal.routes.js";
import progressRoutes from "./routes/progress.routes.js"; 
import socialRoutes from "./routes/social.routes.js";
import leaderboardRoutes from "./routes/leaderboard.routes.js";
import adminRoutes from './routes/admin.routes.js';
import  contactRoutes from "./routes/contact.routes.js"
import paypalRoutes from "./routes/paypal.routes.js";



dotenv.config();

const app = express();

// ✅ Connect to MongoDB before starting the server
connectDB();

// ✅ Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'https://fitness-tracker-8.onrender.com',  // Allow only your production domain
}));


// ✅ Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/activity" , activityrouter);
app.use('/api/workouts', workoutRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/social", socialRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use('/api/admin', adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/paypal", paypalRoutes);

// ✅ Test Route
app.get("/", (req, res) => {
    res.send("Hello everyone");
});

const PORT = process.env.PORT || 3000;

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

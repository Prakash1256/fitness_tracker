import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/db.js";
import userRouter from "./routes/user.routes.js";
import activityrouter from "./routes/activity.routes.js";

dotenv.config();

const app = express();

// ✅ Connect to MongoDB before starting the server
connectDB();

// ✅ Middleware
app.use((req, res, next) => {
    if (req.method === "GET") {
        return next(); // Skip body parsing for GET requests
    }
    express.json()(req, res, next);
});

app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ✅ Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/activity" , activityrouter);


// ✅ Test Route
app.get("/", (req, res) => {
    res.send("Hello everyone");
});

const PORT = process.env.PORT || 3000;

// ✅ Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
});

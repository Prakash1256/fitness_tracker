import express from "express";
import { registerUser, loginUser } from "../controllers/user.controller.js";
import { getUserProfile, updateUserProfile} from "../controllers/user.controller.js";
import {authMiddleware} from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.get("/profile", authMiddleware, getUserProfile);
router.put("/profile", authMiddleware, updateUserProfile);


export default router;

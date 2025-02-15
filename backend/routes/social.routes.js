import express from "express";
import { sendFriendRequest, acceptFriendRequest, getFriends } from "../controllers/social.controller.js";

const router = express.Router();

router.post("/send-request", sendFriendRequest);
router.post("/accept-request", acceptFriendRequest);
router.get("/friends/:userId", getFriends);

export default router;

import express from "express";
import { getLeaderboard, updateLeaderboard  } from "../controllers/leaderboard.controller.js";

const router = express.Router();

// Route to get the leaderboard
router.get("/", getLeaderboard);

// Route to update the leaderboard for a specific user
router.put("/update/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    await updateLeaderboard(userId);
    res.status(200).json({ message: "Leaderboard updated successfully" });
  } catch (error) {
    console.error("Error updating leaderboard:", error);
    res.status(500).json({ error: "Error updating leaderboard" });
  }
});




export default router;

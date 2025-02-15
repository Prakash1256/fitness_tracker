import express from "express";
import {
  createProgress,
  getUserProgress,
  updateProgress,
  deleteProgress
} from "../controllers/progress.controller.js";

const router = express.Router();

router.post("/", createProgress); // Create progress entry
router.get("/:userId", getUserProgress); // Get all progress for a user
router.put("/:id", updateProgress); // Update progress entry
router.delete("/:id", deleteProgress); // Delete progress entry

export default router;

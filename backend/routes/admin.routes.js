import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/admin.controller.js";
import {
  getAllWorkoutsAdmin,
  getWorkoutByIdAdmin,
  updateWorkoutAdmin,
  deleteWorkoutAdmin,
  deleteAllWorkoutsAdmin
} from "../controllers/admin.controller.js";
import adminAuthMiddleware from "../middleware/adminAuth.middleware.js"; // Admin authentication middleware

const router = express.Router();

// ➤ Public Admin Routes
router.post("/login", loginAdmin);
router.post("/register", registerAdmin); // Can be removed in production

// ➤ Protected Admin Routes (Requires Authentication)
router.use(adminAuthMiddleware); // All routes below require admin authentication

router.get("/dashboard", (req, res) => {
  res.json({ message: "Welcome Admin!", admin: req.admin });
});

// ➤ Workout Management (Admin Only)
router.get("/workouts", getAllWorkoutsAdmin);
router.get("/workouts/:id", getWorkoutByIdAdmin);
router.put("/workouts/:id", updateWorkoutAdmin);
router.delete("/workouts/:id", deleteWorkoutAdmin);
router.delete("/workouts", deleteAllWorkoutsAdmin); // Delete all workouts (use cautiously)

export default router;

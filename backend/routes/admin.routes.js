import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/admin.controller.js";
import {
    getAllActivitiesAdmin,
    getActivityByIdAdmin,
    updateActivityAdmin,
    deleteActivityAdmin,
    deleteAllActivitiesAdmin
} from "../controllers/admin.controller.js";
import { adminAuthMiddleware } from "../middleware/auth.middleware.js"; // Admin authentication middleware

const router = express.Router();

// ➤ Public Admin Routes
router.post("/login", loginAdmin);
router.post("/register", registerAdmin); // Can be removed in production

// ➤ Protected Admin Routes (Requires Authentication)
router.use(adminAuthMiddleware); // All routes below require admin authentication

// ➤ Admin Dashboard
router.get("/dashboard", (req, res) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden: Admin access required" });
    }
    res.json({ message: "Welcome Admin!", admin: req.user });
});

// ➤ Activity Management (Admin Only)
router.get("/activities", getAllActivitiesAdmin);
router.get("/activities/:id", getActivityByIdAdmin);
router.put("/activities/:id", updateActivityAdmin);
router.delete("/activities/:id", deleteActivityAdmin);
router.delete("/activities", deleteAllActivitiesAdmin); // Delete all activities (use cautiously)

export default router;

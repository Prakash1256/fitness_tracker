import express from "express";
import {
  createMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal
} from "../controllers/meal.controller.js";

const router = express.Router();

router.post("/", createMeal); // Add a new meal
router.get("/", getAllMeals); // Get all meals
router.get("/:id", getMealById); // Get a specific meal by ID
router.put("/:id", updateMeal); // Update a meal
router.delete("/:id", deleteMeal); // Delete a meal

export default router;

import Meal from "../models/meal.model.js";
import mongoose from "mongoose";

// ➤ Create Meal
export const createMeal = async (req, res) => {
  try {
    const { userId, name, calories, protein, carbs, fats } = req.body;
    const meal = new Meal({ userId, name, calories, protein, carbs, fats });
    await meal.save();
    res.status(201).json(meal);
  } catch (error) {
    res.status(500).json({ error: "Failed to create meal" });
  }
};

// ➤ Get All Meals
export const getAllMeals = async (req, res) => {
  try {
    const meals = await Meal.find();
    res.status(200).json(meals);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch meals" });
  }
};

// ➤ Get Meal by ID
export const getMealById = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) return res.status(404).json({ error: "Meal not found" });
    res.status(200).json(meal);
  } catch (error) {
    res.status(500).json({ error: "Error fetching meal" });
  }
};

// ➤ Update Meal
export const updateMeal = async (req, res) => {
  try {
    const meal = await Meal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!meal) return res.status(404).json({ error: "Meal not found" });
    res.status(200).json(meal);
  } catch (error) {
    res.status(500).json({ error: "Failed to update meal" });
  }
};

// ➤ Delete Meal
export const deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findByIdAndDelete(req.params.id);
    if (!meal) return res.status(404).json({ error: "Meal not found" });
    res.status(200).json({ message: "Meal deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete meal" });
  }
};

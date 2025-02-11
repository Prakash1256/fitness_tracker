import express from "express";
import {
  createWorkout,
  getAllWorkouts,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
} from "../controllers/workout.controller.js";

const router = express.Router();

router.route("/").post(createWorkout).get(getAllWorkouts);
router
  .route("/:id")
  .get(getWorkoutById)
  .put(updateWorkout)
  .delete(deleteWorkout);

export default router;

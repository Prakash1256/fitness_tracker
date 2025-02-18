import express from "express"
import { createActivity ,deleteActivity } from "../controllers/user.controller.js";
import Activity from "../models/activity.model.js";
const router = express.Router();


router.post('/activities', async (req, res) => {
    try {
      const newActivity = await Activity.create(req.body);
      res.status(201).json(newActivity);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  router.get("/activities", async (req, res) => {
    try {
      const activities = await Activity.find();
      res.status(200).json(activities);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });  

  router.delete("/activities/:activityId", deleteActivity);

export default router;
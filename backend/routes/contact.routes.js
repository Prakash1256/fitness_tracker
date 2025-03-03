import express from "express";
import { sendContactForm } from "../controllers/contact.controller.js";

const router = express.Router();

// Route for handling form submission
router.post("/", sendContactForm);

export default router;

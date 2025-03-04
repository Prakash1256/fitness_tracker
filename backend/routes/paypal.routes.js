import express from "express";
import { createOrder, captureOrder, getClientID } from "../controllers/paypal.controller.js";

const router = express.Router();

// PayPal Routes
router.get("/client-id", getClientID); // ✅ Added this route
router.post("/create-order", createOrder);
router.post("/capture-order/:orderID", captureOrder);

export default router;

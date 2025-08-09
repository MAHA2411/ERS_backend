// ERS-backend/routes/registerEventRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { registerEvent } from "../controllers/registerEventController.js";
const router = express.Router();
router.post("/", protect, registerEvent);
export default router;

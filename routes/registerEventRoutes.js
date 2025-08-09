import express from "express";
import { registerEvent } from "../controllers/registerEventController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();
router.post("/", protect, registerEvent); // require token
export default router;

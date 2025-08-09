import express from "express";
import { getEvents, getEventById } from "../controllers/eventController.js";
const r = express.Router();
r.get("/", getEvents);
r.get("/:id", getEventById);
export default r;

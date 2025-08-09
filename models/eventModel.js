// ERS-backend/models/eventModel.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  date: Date,
  price: { type: Number, default: 0 }
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);

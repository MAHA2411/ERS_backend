import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  date: Date,
  venue: String,
  fee: Number,
  bannerUrl: String,
  ownerId: mongoose.Types.ObjectId
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);

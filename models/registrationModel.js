// ERS-backend/models/registrationModel.js
import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  paymentStatus: { type: String, default: "Paid" } // since skipping payment
}, { timestamps: true });

export default mongoose.model("Registration", registrationSchema);

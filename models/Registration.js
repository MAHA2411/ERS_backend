import mongoose from "mongoose";

const registrationSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
  name: String,
  email: String,
  phone: String,
  college: String,
  department: String,
  year: String,
  ticketId: String,   // unique ticket id
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Registration", registrationSchema);

// controllers/registerEventController.js
import Event from "../models/eventModel.js";
import Registration from "../models/registrationModel.js";
import { sendConfirmationMail } from "../utils/nodemailer.js";

export const registerEvent = async (req, res) => {
  try {
    const { eventId } = req.body;
    if (!eventId) return res.status(400).json({ message: "eventId required" });

    const ev = await Event.findById(eventId);
    if (!ev) return res.status(404).json({ message: "Event not found" });

    const already = await Registration.findOne({ user: req.user._id, event: ev._id });
    if (already) return res.status(400).json({ message: "Already registered" });

    const registration = await Registration.create({
      user: req.user._id,
      event: ev._id,
      paymentStatus: "Paid"
    });

    // send mail (don't block on failure)
    try {
      await sendConfirmationMail(req.user.email, ev.title, registration._id);
    } catch (mailErr) {
      console.error("Mail error:", mailErr.message);
    }

    res.status(201).json({ message: "Registered successfully", registration });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

import Event from "../models/Event.js";

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getEventById = async (req, res) => {
  try {
    const e = await Event.findById(req.params.id);
    if (!e) return res.status(404).json({ message: "Event not found" });
    res.json(e);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

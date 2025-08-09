// seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Event from "./models/eventModel.js";

dotenv.config();
mongoose.connect(process.env.MONGO_URI).then(async () => {
  console.log("Mongo connected");
  await Event.deleteMany({});
  await Event.insertMany([
    { title: "Tech Innovation Summit", description: "A full-day tech summit", date: new Date("2025-09-15"), price: 99, image: "/images/event1.svg" },
    { title: "Web Development Workshop", description: "Hands-on web dev", date: new Date("2025-10-10"), price: 0, image: "/images/event2.svg" },
    { title: "Business Networking Mixer", description: "Meet professionals", date: new Date("2025-11-05"), price: 25, image: "/images/event3.svg" }
  ]);
  console.log("Seed complete");
  process.exit();
}).catch(err => { console.error(err); process.exit(1); });

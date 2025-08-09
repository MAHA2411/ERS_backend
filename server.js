// server.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import registerEventRoutes from "./routes/registerEventRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/register", registerEventRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log("MongoDB connected");
    app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));

import Registration from "../models/Registration.js";
import Event from "../models/Event.js";
import PDFDocument from "pdfkit";
import nodemailer from "nodemailer";
import streamBuffers from "stream-buffers"; // npm i stream-buffers
import dotenv from 'dotenv';
dotenv.config();
export const registerEvent = async (req, res) => {
  try {
    const { eventId } = req.body; // frontend will send eventId
    const { name, email, phone, college, department, year } = req.body;

    if (!eventId || !name || !email) return res.status(400).json({ message: "Missing fields" });

    const ev = await Event.findById(eventId);
    if (!ev) return res.status(404).json({ message: "Event not found" });

    // create ticket id
    const ticketId = `TICKET-${Date.now().toString(36).toUpperCase().slice(-8)}`;

    // Save registration
    const reg = await Registration.create({
      eventId, name, email, phone, college, department, year, ticketId
    });

    // Create PDF ticket in memory
    const doc = new PDFDocument({ size: "A4", margin: 50 });
    const writableStreamBuffer = new streamBuffers.WritableStreamBuffer({
      initialSize: (100 * 1024),
      incrementAmount: (10 * 1024)
    });
    doc.fontSize(20).text("EventHub - E-Ticket", { align: "center" });
    doc.moveDown();
    doc.fontSize(16).text(`Event: ${ev.title}`);
    doc.text(`Date: ${ev.date ? ev.date.toDateString() : "TBA"}`);
    doc.text(`Venue: ${ev.venue || "TBA"}`);
    doc.moveDown();
    doc.text(`Attendee: ${name}`);
    doc.text(`Email: ${email}`);
    doc.text(`Phone: ${phone || "-"}`);
    doc.moveDown();
    doc.text(`Ticket ID: ${ticketId}`, { underline: true });
    doc.end();
    doc.pipe(writableStreamBuffer);

    await new Promise((resolve) => {
      doc.on("end", resolve);
    });

    const pdfBuffer = writableStreamBuffer.getContents();

    // send email with attachment
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });
    console.log(process.env.EMAIL_USER , process.env.EMAIL_PASS)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Registration Confirmation - ${ev.title}`,
      text: `Hello ${name},\n\nThanks for registering for ${ev.title}. Your ticket ID: ${ticketId}`,
      attachments: [{ filename: `Ticket-${ticketId}.pdf`, content: pdfBuffer }]
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Registered", registrationId: reg._id, ticketId });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Registration failed" });
  }
};

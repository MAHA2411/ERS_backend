// ERS-backend/utils/nodemailer.js
import nodemailer from "nodemailer";

export const sendConfirmationMail = async (to, eventName, registrationId) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS }
  });

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject: `Registration Confirmed for ${eventName}`,
    html: `<p>Hi,</p>
           <p>Your registration for <strong>${eventName}</strong> is confirmed.</p>
           <p><strong>Registration ID:</strong> ${registrationId}</p>
           <p>Thanks,<br/>Event Team</p>`
  };

  return transporter.sendMail(mailOptions);
};

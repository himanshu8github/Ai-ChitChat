import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

const otpStore = {};

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,       
    pass: process.env.MAIL_PASS,      
  },
});

router.post("/", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ success: false, message: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000);
  const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

  otpStore[email] = { otp, expiresAt };

  const mailOptions = {
    from: `"AI-Chat" <${process.env.MAIL_USER}>`,
    to: email,
    subject: "Your AI-Chat Email Verification OTP",
    text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "OTP sent to email" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

export { router as sendOtpRouter };
export { otpStore }; 

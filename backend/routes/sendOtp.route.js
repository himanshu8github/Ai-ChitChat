import express from "express";
import { transporter } from "../utils/sendEmail.js"; 
import dotenv from "dotenv";

dotenv.config();
export const otpStore = {}; 

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP required" });
  }

  try {
    otpStore[email] = otp;

    const mailOptions = {
      from: `"SafeChat" <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Verify your email (OTP)",
      text: `Your OTP is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "OTP sent successfully!" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Failed to send OTP." });
  }
});

export default router;

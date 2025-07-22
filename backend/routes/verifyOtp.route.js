import express from "express";
import { otpStore } from "./sendOtp.route.js"; 

const router = express.Router();

router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP required" });
  }

  const storedOtp = otpStore[email];
  if (storedOtp === otp) {
    res.status(200).json({ message: "OTP verified successfully!" });
    delete otpStore[email]; 
  } else {
    res.status(400).json({ error: "Invalid OTP." });
  }
});

export default router;

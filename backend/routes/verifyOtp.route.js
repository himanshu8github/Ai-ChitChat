import express from "express";
import { otpStore } from "./sendOtp.route.js";

const router = express.Router();

router.post("/", (req, res) => {

  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, message: "Email and OTP required" });
  }

  const stored = otpStore[email];

  if (!stored) {
    return res.status(400).json({ success: false, message: "OTP not found. Please request again." });
  }

  if (Date.now() > stored.expiresAt) {
    delete otpStore[email];
    return res.status(400).json({ success: false, message: "OTP expired. Please request again." });
  }

  if (stored.otp.toString() !== otp.toString()) {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }

  delete otpStore[email];
  return res.json({ success: true, message: "OTP verified" });
});

export { router as verifyOtpRouter };

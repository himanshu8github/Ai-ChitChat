import express from "express";
import User from "../models/User.model.js";

const router = express.Router();


router.post("/signup", async (req, res) => {
  try {
    const { name, username, email, uid } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const newUser = new User({ name, username, email, uid });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully." });
    
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

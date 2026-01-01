import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Sign Up Route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Please provide name, email, and password",
      });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        error: "User already exists with this email",
      });
    }

    // Create new user
    user = new User({
      name,
      email,
      password,
      phone,
    });

    await user.save();

    // Return user data (without password)
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };

    console.log("✅ [SIGNUP] User registered successfully:", email);
    res.status(201).json({
      message: "User registered successfully",
      user: userResponse,
    });
  } catch (err) {
    console.error("❌ [SIGNUP] Error:", err.message);
    res.status(500).json({
      error: err.message || "Error creating user",
    });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        error: "Please provide email and password",
      });
    }

    // Find user and include password field
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid credentials",
      });
    }

    // Return user data (without password)
    const userResponse = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    };

    console.log("✅ [LOGIN] User logged in successfully:", email);
    res.status(200).json({
      message: "Login successful",
      user: userResponse,
    });
  } catch (err) {
    console.error("❌ [LOGIN] Error:", err.message);
    res.status(500).json({
      error: err.message || "Error logging in",
    });
  }
});

// Get user profile by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("❌ [GET USER] Error:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;

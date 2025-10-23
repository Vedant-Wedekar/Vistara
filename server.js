// ==============================
// Vistara Learn Backend
// Using Express + MongoDB
// ==============================

import  express  from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// ==============================
// MongoDB Connection
// ==============================
const MONGO_URI = "mongodb+srv://TG_VED:IMFW8JhuVvdVMvXw@vistara.uxnovll.mongodb.net/?retryWrites=true&w=majority&appName=Vistara"; // change if using Atlas
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ==============================
// User Schema & Model
// ==============================
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  course: { type: String, default: "General" },
  isAdmin: { type: Boolean, default: false },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

// ==============================
// Routes
// ==============================

// Root route
app.get("/", (req, res) => {
  res.send("Vistara Learn Backend is Running 🚀");
});

// -------- Signup --------
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password, course } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check for admin email pattern (optional)
    const isAdmin = email === "admin@vedant.com";

    // Create user
    const newUser = new User({
      name,
      email,
      course,
      isAdmin,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "Signup successful!", user: newUser });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// -------- Login --------
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    // Check if user exists
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // Send response with admin status
    res.status(200).json({
      message: "Login successful!",
      user: {
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin, // Include admin status
        course: user.course
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// -------- Admin Check (optional route) --------
app.get("/admin/users", async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // hide passwords
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// ==============================
// Start Server
// ==============================
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);

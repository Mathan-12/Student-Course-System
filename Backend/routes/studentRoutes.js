const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Student = require("../models/Student");
const bcrypt = require("bcryptjs");

// ✅ REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const normalizedEmail = String(email).toLowerCase().trim();
    const existingStudent = await Student.findOne({ email: normalizedEmail });
    if (existingStudent) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      name,
      email: normalizedEmail,
      password: hashedPassword
    });

    res.json(student);
  } catch (err) {
    if (err && err.code === 11000) {
      return res.status(409).json({ message: "Email already registered" });
    }
    res.status(500).json(err);
  }
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    res.json(student);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ✅ GET STUDENTS
router.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ✅ DASHBOARD DATA
router.get("/dashboard/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await Student.findById(studentId).populate("enrolledCourses");
    const totalCourses = await mongoose.model("Course").countDocuments();

    res.json({
      name: student.name,
      totalCourses,
      enrolledCourses: student.enrolledCourses
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
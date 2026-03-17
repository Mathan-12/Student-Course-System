const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const bcrypt = require("bcryptjs");

// ✅ REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      name,
      email,
      password: hashedPassword
    });

    res.json(student);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ✅ LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) return res.send("User not found");

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.send("Invalid password");

    res.send("Login successful");
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

module.exports = router;
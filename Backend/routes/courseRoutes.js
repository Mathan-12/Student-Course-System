const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const Student = require("../models/Student");

// ✅ ADD COURSE
router.post("/courses", async (req, res) => {
  const course = await Course.create(req.body);
  res.json(course);
});

// ✅ GET COURSES
router.get("/courses", async (req, res) => {
  const courses = await Course.find();
  res.json(courses);
});

// ✅ ENROLL
router.post("/enroll", async (req, res) => {
  const { studentId, courseId } = req.body;

  const student = await Student.findById(studentId);
  student.enrolledCourses.push(courseId);

  await student.save();

  res.json({ message: "Enrolled successfully", student });
});

module.exports = router;
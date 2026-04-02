const express = require("express");
const router = express.Router();
const Course = require("../models/Course");
const Student = require("../models/Student");
const StudentInfo = require("../models/StudentInfo");

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
  try {
    const {
      studentId,
      courseId,
      courseTitle,
      name,
      regNo,
      collegeName,
      department,
      fromLocation,
      source,
      paymentMethod,
    } = req.body;

    if (
      !studentId ||
      !courseId ||
      !name ||
      !regNo ||
      !collegeName ||
      !department ||
      !fromLocation ||
      !source ||
      !paymentMethod
    ) {
      return res.status(400).json({ message: "All form fields are required" });
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const alreadyEnrolled = student.enrolledCourses.some(
      (id) => id.toString() === courseId
    );
    if (!alreadyEnrolled) {
      student.enrolledCourses.push(courseId);
      await student.save();
    }

    const studentInfo = await StudentInfo.create({
      studentId,
      courseId,
      courseTitle: courseTitle || "",
      name,
      regNo,
      collegeName,
      department,
      fromLocation,
      source,
      paymentMethod,
    });

    res.json({ message: "Enrolled successfully", student, studentInfo });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Enrollment failed" });
  }
});

module.exports = router;
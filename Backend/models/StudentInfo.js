const mongoose = require("mongoose");

const studentInfoSchema = new mongoose.Schema(
  {
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true },
    courseTitle: { type: String, default: "" },
    name: { type: String, required: true, trim: true },
    regNo: { type: String, required: true, trim: true },
    collegeName: { type: String, required: true, trim: true },
    department: { type: String, required: true, trim: true },
    fromLocation: { type: String, required: true, trim: true },
    source: { type: String, required: true, trim: true },
    paymentMethod: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("StudentInfo", studentInfoSchema, "student info");

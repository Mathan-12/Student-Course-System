import React from "react";
import { enrollCourse } from "../services/api";
import "./Coursecard.css";

function CourseCard({ course }) {

  const handleEnroll = async () => {
    try {
      const studentId = localStorage.getItem("studentId"); // store after login

      await enrollCourse({
        studentId,
        courseId: course._id,
      });

      alert("Enrolled Successfully ✅");
    } catch (err) {
      console.log(err);
      alert("Enrollment Failed ❌");
    }
  };

  return (
    <div className="course-card">
      <h3>{course.title}</h3>
      <p>{course.instructor}</p>
      <p>{course.duration}</p>

      <button onClick={handleEnroll}>Enroll</button>
    </div>
  );
}

export default CourseCard;
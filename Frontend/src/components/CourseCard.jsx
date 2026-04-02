import React from "react";
import { useNavigate } from "react-router-dom";
import "./Coursecard.css";

function CourseCard({ course }) {
  const navigate = useNavigate();

  const handleEnroll = () => {
    navigate(`/enroll/${course._id}`, { state: { course } });
  };

  return (
    <div className="catalog-course-card">
      <p className="catalog-course-pill">Open Enrollment</p>
      <h3>{course.title}</h3>
      <p className="catalog-course-meta"><span>Instructor:</span> {course.instructor}</p>
      <p className="catalog-course-meta"><span>Duration:</span> {course.duration}</p>

      <button onClick={handleEnroll}>Enroll</button>
    </div>
  );
}

export default CourseCard;
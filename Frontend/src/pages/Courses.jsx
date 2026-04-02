import React, { useEffect, useState } from "react";
import { getCourses } from "../services/api";
import CourseCard from "../components/CourseCard";
import "../styles/courses.css";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await getCourses();
      setCourses(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="courses-page">
        <div className="courses-shell courses-loading">Loading courses...</div>
      </div>
    );
  }

  return (
    <div className="courses-page">
      <div className="courses-shell">
        <header className="courses-header">
          <p className="courses-tag">Course Catalog</p>
          <h2>Available Courses</h2>
          <p className="courses-subtitle">Browse and enroll in courses that match your goals.</p>
        </header>

        {courses.length === 0 ? (
          <p className="courses-empty-state">No courses found right now. Please check back soon.</p>
        ) : (
          <div className="courses-grid">
            {courses.map((c) => (
              <CourseCard key={c._id} course={c} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Courses;
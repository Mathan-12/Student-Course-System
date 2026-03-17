import React, { useEffect, useState } from "react";
import { getCourses } from "../services/api";
import CourseCard from "../components/CourseCard";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await getCourses();
      console.log(res.data); // 🔥 IMPORTANT
      setCourses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2>Courses Page</h2>

      {courses.length === 0 ? (
        <p>No courses found</p>
      ) : (
        courses.map((c) => (
          <CourseCard key={c._id} course={c} />
        ))
      )}
    </div>
  );
}

export default Courses;
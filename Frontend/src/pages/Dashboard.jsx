import React, { useEffect, useState } from "react";
import { getDashboard } from "../services/api";

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const studentId = localStorage.getItem("studentId");

      const res = await getDashboard(studentId);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!data) return <h2>Loading...</h2>;

  return (
    <div>
      <h2>Dashboard</h2>

      <h3>Welcome, {data.name}</h3>

      <h4>Total Courses: {data.totalCourses}</h4>

      <h4>Enrolled Courses:</h4>

      {data.enrolledCourses.length === 0 ? (
        <p>No courses enrolled</p>
      ) : (
        data.enrolledCourses.map((course) => (
          <div key={course._id}>
            <p>{course.title}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
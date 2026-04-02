import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboard } from "../services/api";
import "../styles/dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const studentId = localStorage.getItem("studentId");
      if (!studentId) {
        navigate("/");
        return;
      }

      const res = await getDashboard(studentId);
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!data) {
    return (
      <div className="dashboard-page">
        <div className="dashboard-shell loading-state">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-shell">
        <header className="dashboard-header">
          <p className="dashboard-tag">Student Portal</p>
          <h2>Dashboard</h2>
          <p className="dashboard-subtitle">Welcome back, {data.name}</p>
        </header>

        <section className="dashboard-stats">
          <article className="stat-card">
            <p className="stat-label">Total Courses</p>
            <h3>{data.totalCourses}</h3>
          </article>
          <article className="stat-card">
            <p className="stat-label">Enrolled Courses</p>
            <h3>{data.enrolledCourses.length}</h3>
          </article>
        </section>

        <section className="courses-panel">
          <div className="courses-panel-head">
            <h4>Your Enrolled Courses</h4>
          </div>

          {data.enrolledCourses.length === 0 ? (
            <p className="empty-state">You are not enrolled in any course yet.</p>
          ) : (
            <div className="course-list">
              {data.enrolledCourses.map((course, index) => (
                <article key={course._id} className="course-card">
                  <span className="course-index">{String(index + 1).padStart(2, "0")}</span>
                  <p className="course-title">{course.title}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Dashboard;
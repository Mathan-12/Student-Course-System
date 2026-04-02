import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Courses from "./pages/Courses";
import EnrollmentForm from "./pages/EnrollmentForm";
import Navbar from "./components/Navbar";

function NotFound() {
  return (
    <div
      style={{
        minHeight: "60vh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        padding: "2rem",
      }}
    >
      <div>
        <h2>Page not found</h2>
        <p>The page you are looking for does not exist.</p>
        <Link to="/dashboard">Go to Dashboard</Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/enroll/:courseId" element={<EnrollmentForm />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
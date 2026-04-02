import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { enrollCourse } from "../services/api";
import "../styles/enrollmentForm.css";

function EnrollmentForm() {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const { state } = useLocation();

  const [formData, setFormData] = useState({
    name: "",
    regNo: "",
    collegeName: "",
    department: "",
    fromLocation: "",
    source: "",
    paymentMethod: "UPI",
  });
  const [submitting, setSubmitting] = useState(false);

  const courseTitle = state?.course?.title || "Selected Course";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const studentId = localStorage.getItem("studentId");
      if (!studentId) {
        alert("Please login first.");
        navigate("/");
        return;
      }

      await enrollCourse({
        studentId,
        courseId,
        courseTitle,
        name: formData.name,
        regNo: formData.regNo,
        collegeName: formData.collegeName,
        department: formData.department,
        fromLocation: formData.fromLocation,
        source: formData.source,
        paymentMethod: formData.paymentMethod,
      });

      alert("Form submitted and course enrolled successfully.");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Failed to submit form or enroll. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="enroll-page">
      <div className="enroll-shell">
        <header className="enroll-header">
          <p className="enroll-tag">Google Form Style</p>
          <h2>Course Enrollment Form</h2>
          <p className="enroll-subtitle">Course: {courseTitle}</p>
        </header>

        <form className="enroll-form" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" value={formData.name} onChange={handleChange} required />

          <label htmlFor="regNo">Register Number</label>
          <input id="regNo" name="regNo" value={formData.regNo} onChange={handleChange} required />

          <label htmlFor="collegeName">College Name</label>
          <input id="collegeName" name="collegeName" value={formData.collegeName} onChange={handleChange} required />

          <label htmlFor="department">Department</label>
          <input id="department" name="department" value={formData.department} onChange={handleChange} required />

          <label htmlFor="fromLocation">From</label>
          <input id="fromLocation" name="fromLocation" value={formData.fromLocation} onChange={handleChange} required />

          <label htmlFor="source">Where did you see this post?</label>
          <select id="source" name="source" value={formData.source} onChange={handleChange} required>
            <option value="" disabled>
              Select one
            </option>
            <option value="Instagram">Instagram</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="College Notice Board">College Notice Board</option>
            <option value="Friend">Friend</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="paymentMethod">Payment Method</label>
          <select id="paymentMethod" name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} required>
            <option value="UPI">UPI</option>
            <option value="Card">Card</option>
            <option value="Net Banking">Net Banking</option>
            <option value="Cash">Cash</option>
          </select>

          <button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Form"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EnrollmentForm;

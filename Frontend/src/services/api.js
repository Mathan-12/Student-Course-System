import axios from "axios";

// Base URL (your backend)
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// =================== STUDENT APIs ===================

// Register
export const registerUser = (data) => API.post("/register", data);

// Login
export const loginUser = (data) => API.post("/login", data);

export const getDashboard = (studentId) =>
  API.get(`/dashboard/${studentId}`);

// =================== COURSE APIs ===================

// Get all courses
export const getCourses = () => API.get("/courses");

// Enroll
export const enrollCourse = (data) => API.post("/enroll", data);




export default API;
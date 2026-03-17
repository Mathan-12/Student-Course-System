import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import "../styles/auth.css";
function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const res = await loginUser({ email, password });

            console.log(res.data); // 🔥 ADD THIS

            localStorage.setItem("studentId", res.data._id);
            localStorage.setItem("name", res.data.name);

            alert("Login Successful ✅");
            navigate("/dashboard");

        } catch (err) {
            console.log(err.response?.data); // 🔥 ADD THIS
            alert("Login Failed ❌");
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>

            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />

            <button onClick={handleLogin}>Login</button>
            <p onClick={() => navigate("/register")}>Don't have an account? Register</p>
        </div>
    );
}

export default Login;
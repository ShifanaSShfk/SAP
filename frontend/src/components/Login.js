import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api"; // Import API function
import "../styles/Login.css";
import googleLogo from "../assets/google.webp";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Use navigate for redirection

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginUser(email, password);
  
      // Store user details in localStorage
      localStorage.setItem("username", user.name);
      localStorage.setItem("email", user.email);
      localStorage.setItem("role", user.role);
  
      if (user.role === "student") {
        localStorage.setItem("studentID", user.id); // Ensure studentID is set
        navigate("/student-dashboard");
      } else if (user.role === "faculty") {
        localStorage.setItem("facultyID", user.id); // Ensure facultyID is set
        navigate("/faculty-dashboard");
      }
    } catch (error) {
      alert(error.message);
    }
  };
  
  return (
    <div className="login-container">
      <div className="background-overlay"></div>
      <div className="container">
        <h2 className="login-title">
          Log in to <span className="sap">SAP</span>
        </h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/*  Prevent unintended form submission */}
          <button
            type="button"
            className="forgot-password"
            onClick={() => console.log("Forgot Password clicked!")}
          >
            Forgot Password?
          </button>

          <button type="submit" className="login-btn" onClick={handleLogin}>
            Log In
          </button>
        </form>

        {/*  Use imported image correctly */}
        <button className="google-btn">
          <img src={googleLogo} alt="Google Logo" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;

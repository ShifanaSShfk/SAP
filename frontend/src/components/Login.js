import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import "../styles/Login.css";
import googleLogo from "../assets/google.webp";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const userData = await loginUser(id, password);
      
      // Redirect based on role
      if (userData.role === 'student') {
        navigate('/student-dashboard');
      } else if (userData.role === 'faculty') {
        navigate(userData.isFacultyAdvisor ? '/fa-dashboard' : '/faculty-dashboard');
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="background-overlay"></div>
      <div className="container">
        <h2 className="login-title">
          Log in to <span className="sap">SAP</span>
        </h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="button"
            className="forgot-password"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </button>

          <button 
            type="submit" 
            className="login-btn" 
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <button 
  className="google-btn" 
  onClick={() => window.location.href = "http://localhost:8080/oauth2/authorization/google"}
>
  <img src={googleLogo} alt="Google Logo" />
  Sign in with Google
</button>

      </div>
    </div>
  );
};

export default Login;
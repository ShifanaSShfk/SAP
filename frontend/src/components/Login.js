// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:8080/api/auth/login", {
//         email,
//         password,
//       });

//       if (response.data.role === "student") {
//         navigate("/student-dashboard");
//       } else if (response.data.role === "faculty") {
//         navigate("/faculty-dashboard");
//       }
//     } catch (error) {
//       alert("Invalid email or password");
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleLogin}>
//         <input type="email" placeholder="Campus Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default Login;

// import React from "react";
// import "./Login.css"; // Create this file for styling
// import backgroundImage from "../assets/background.png";

// const Login = () => {
//   return (
//     <div className="login-container">
//       <div className="background-overlay"></div>
//       <div className="container">
//         <h2 className="login-title">
//           Log in to <span className="sap">SAP</span>
//         </h2>
//         <input type="text" placeholder="Username" />
//         <input type="password" placeholder="Password" />
//         <a href="#" className="forgot-password">Forgot Password?</a>
//         <button className="login-btn">Log In</button>
//         <button className="google-btn">
//           <img src="/google.webp" alt="Google Logo" />
//           Sign in with Google
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from "react";
import { loginUser } from "../services/api"; // Import API function
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      console.log("Login Successful:", response);
      // Handle successful login (e.g., redirect, store token)
    } catch (error) {
      console.error("Login Failed:", error);
      alert("Invalid Credentials"); // Display an alert on failure
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
            value={password}As of now keep the forget password idle 
            will look into google auth later
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* As of now keep the forget password idle 
          will look into google auth later */}
          {/* <a href="#" className="forgot-password">
            Forgot Password?
          </a> */}
          <button className="forgot-password" onClick={() => console.log("Forgot Password clicked!")}>
          Forgot Password?
          </button>

          <button type="submit" className="login-btn">
            Log In
          </button>
        </form>
        <button className="google-btn">
          <img src="/google.webp" alt="Google Logo" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;

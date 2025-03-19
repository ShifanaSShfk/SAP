import React from "react";
import { Link } from "react-router-dom";
import "../styles/profile.css";

const Profile = () => {
  // Simulated user data from localStorage
  const user = {
    name: localStorage.getItem("username") || "User",
    email: localStorage.getItem("email") || "user@example.com",
    studentID: localStorage.getItem("studentID") || "B220492CS",
    branch: localStorage.getItem("branch") || "Computer Science and Engineering",
    section: localStorage.getItem("section") || "CS02",
    contact: localStorage.getItem("contact") || "+91 9119119110",
  };

  return (
    <div className="profile-container">
      <h2>Profile Details</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Student ID:</strong> {user.studentID}</p>
        <p><strong>Branch:</strong> {user.branch}</p>
        <p><strong>Section:</strong> {user.section}</p>
        <p><strong>Contact:</strong> {user.contact}</p>
      </div>
      <Link to="/student-dashboard" className="back-btn">← Back to Dashboard</Link>
    </div>
  );
};

export default Profile;

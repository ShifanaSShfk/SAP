import React from "react";
import { Link } from "react-router-dom";
import "../../styles/profile.css";

const Profile = () => {
  // Simulated user data from localStorage
  const user = {

    email: localStorage.getItem("email") || "faculty@example.com",
    facultyID: localStorage.getItem("facultyID") || "123",
    designation: localStorage.getItem("designation") || "Assistant Professor Computer Science and Engineering",
    contact: localStorage.getItem("contact") || "+91 9119119110",
  };

  return (
    <div className="profile-container">
      <h2>Profile Details</h2>
      <div className="profile-card">
        <p><strong>Faculty ID:</strong> {user.facultyID}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Designation </strong> {user.designation}</p>
        <p><strong>Contact:</strong> {user.contact}</p>
      </div>
      <Link to="/faculty-dashboard" className="back-btn">← Back to Dashboard</Link>
    </div>
  );
};

export default Profile;

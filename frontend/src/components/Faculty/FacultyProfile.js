import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    facultyID: "",
    facultyName: "",
    isFacultyAdvisor: false,
    department: "",
    designation: "",
    facultyRoom: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const facultyID = localStorage.getItem("facultyID");
        if (!facultyID) {
          throw new Error("Faculty ID not found");
        }

        const token = localStorage.getItem("authToken");
        const response = await fetch(`http://localhost:8080/api/faculty/${facultyID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch faculty profile");
        }

        const data = await response.json();
        
        // Convert isFacultyAdvisor to boolean explicitly
        const isAdvisor = Boolean(data.isFacultyAdvisor);
        
        setUser({
          facultyID: data.facultyId || "N/A",
          facultyName: data.facultyName || "N/A",
          isFacultyAdvisor: isAdvisor,
          department: data.department || "N/A",
          designation: data.designation || "N/A",
          facultyRoom: data.facultyRoom || "N/A",
        });

        // Store advisor status in localStorage
        localStorage.setItem("isFacultyAdvisor", isAdvisor.toString());
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching faculty profile:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSwitchView = () => {
    navigate("/fa-dashboard");
  };

  if (loading) {
    return <div className="profile-container">Loading profile...</div>;
  }

  if (error) {
    return (
      <div className="profile-container">
        <h2>Error</h2>
        <p>{error}</p>
        <Link to="/faculty-dashboard" className="back-btn">
          ← Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2>Profile Details</h2>
      <div className="profile-card">
        <p><strong>Faculty ID:</strong> {user.facultyID}</p>
        <p><strong>Name:</strong> {user.facultyName}</p>
        <p><strong>Faculty Advisor:</strong> {user.isFacultyAdvisor ? "Yes" : "No"}</p>
        <p><strong>Department:</strong> {user.department}</p>
        <p><strong>Designation:</strong> {user.designation}</p>
        <p><strong>Faculty Room:</strong> {user.facultyRoom}</p>
      </div>
      
      {/* Only show switch button for actual faculty advisors */}
      {user.isFacultyAdvisor && (
        <button onClick={handleSwitchView} className="switch-view-btn">
          Switch to Faculty Advisor View
        </button>
      )}
      
      <Link to="/faculty-dashboard" className="back-btn">← Back to Dashboard</Link>
    </div>
  );
};

export default Profile;
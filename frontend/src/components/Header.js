import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchFacultyDetails, fetchStudentDetails } from "../services/api";
import "../styles/header.css";

const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("User");
  const [userRole, setUserRole] = useState("");
  const [isFacultyAdvisor, setIsFacultyAdvisor] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      const role = localStorage.getItem("role");
      const userId = localStorage.getItem("userId");
      const storedName = localStorage.getItem("username");
      
      setUserRole(role);
      setUsername(storedName || "User");

      try {
        if (role === "faculty") {
          const facultyData = await fetchFacultyDetails(userId);
          setUsername(facultyData.facultyName);
          setIsFacultyAdvisor(facultyData.isFacultyAdvisor);
        } else if (role === "student") {
          const studentData = await fetchStudentDetails(userId);
          setUsername(studentData.studentName);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    loadUserData();
  }, []);

  const pageTitles = {
    "/student-dashboard": `Hi, ${username}`,
    "/faculty-dashboard": `Hi, ${username}`,
    "/fa-dashboard": `Hi, ${username} (FA)`,
    // ... other paths
  };

  const title = pageTitles[location.pathname] || "SAP Management System";

  const handleProfileClick = () => {
    navigate(userRole === "faculty" ? "/faculty-profile" : "/student-profile");
  };

  const handleSwitchView = () => {
    navigate(location.pathname === "/fa-dashboard" ? "/faculty-dashboard" : "/fa-dashboard");
  };

  return (
    <header className="header">
      <div className="header-left">
        <h1>{title}</h1>
      </div>
      
      <div className="header-right">
        {userRole === "faculty" && isFacultyAdvisor && (
          <button onClick={handleSwitchView} className="switch-view-btn">
            {location.pathname === "/fa-dashboard" 
              ? "Switch to Faculty View" 
              : "Switch to FA View"}
          </button>
        )}

        <button className="notification-btn" onClick={() => setShowNotifications(!showNotifications)}>
          <BellIcon />
          {showNotifications && <div className="notification-dropdown"><p>No new notifications</p></div>}
        </button>

        <div className="user-profile" onClick={handleProfileClick}>
          <UserIcon />
          <span>{username}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
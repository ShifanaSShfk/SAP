import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "../styles/header.css";

// BellIcon Component
const BellIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

// UserIcon Component
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate(); // For navigation
  const username = localStorage.getItem("username") || "User"; // Store username during login

  // Notification state
  const [showNotifications, setShowNotifications] = useState(false);

  // Define page titles based on path
  const pageTitles = {
    "/student-dashboard": `Hi, ${username}`,
    "/faculty-dashboard": `Hi, ${username}`,
    "/send-request": "Send Request",
    "/request-status": "Request Status",
    "/request-history": "Request History",
    "/faq": "FAQ",
    "/fac-events": "My Events",
    "/fac-overview": "Overview",
    "/fac-approved": "Approved Requests",
    "/fac-rejected": "Rejected Requests",
  };

  const title = pageTitles[location.pathname] || "SAP Management System";

  return (
    <header className="header">
      <h1>{title}</h1>
      
      <div className="header-actions">
        {/* 🔔 Notification Bell */}
        <button className="notification-btn" onClick={() => setShowNotifications(!showNotifications)}>
          <BellIcon />
          {showNotifications && (
            <div className="notification-dropdown">
              <p>No new notifications</p>
            </div>
          )}
        </button>

        {/* 👤 User Profile - Navigates to /profile on click */}
        <div className="user-profile" onClick={() => navigate("/profile")} style={{ cursor: "pointer" }}>
          <UserIcon />
        </div>
      </div>
    </header>
  );
};

export default Header;

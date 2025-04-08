import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/Student/sidebar.css";

const StudentSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
  // Clear stored data
  localStorage.clear();

  // Optional: Clear any other state if needed

  // Redirect to Google logout, then your login page
  window.location.href = "https://accounts.google.com/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost:3000";
};


  return (
    <aside className="sidebar">
      <h1 className="logo">SAP</h1>
      <nav>
        <ul>
          <li className={location.pathname === "/student-dashboard" ? "active" : ""}>
            <Link to="/student-dashboard">Dashboard</Link>
          </li>
          <li className={location.pathname === "/calendar" ? "active" : ""}>
            <Link to="/student-calendar">Calendar</Link>
          </li>
          <li className={location.pathname === "/send-request" ? "active" : ""}>
            <Link to="/send-request">Send Request</Link>
          </li>
          <li className={location.pathname === "/request-status" ? "active" : ""}>
            <Link to="/request-status">Request Status</Link>
          </li>
          {/* <li className={location.pathname === "/request-history" ? "active" : ""}>
            <Link to="/request-history">Request History</Link>
          </li> */}
          <li className={location.pathname === "/faq" ? "active" : ""}>
            <Link to="/faq">FAQ</Link>
          </li>
        </ul>
      </nav>
      <button className="logout" onClick={handleLogout}>Log Out</button>
    </aside>
  );
};

export default StudentSidebar;
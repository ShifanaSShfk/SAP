// FASidebar.js
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/Faculty/sidebar.css";

const FASidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <h1 className="logo">SAP</h1>
      <nav>
        <ul>
          <li className={location.pathname === "/fa-dashboard" ? "nav-item active" : "nav-item"}>
            <Link to="/fa-dashboard">Dashboard</Link>
          </li>
          
          <li className={location.pathname === "/fa-calendar" ? "nav-item active" : "nav-item"}>
            <Link to="/fa-calendar">Calendar</Link>
          </li>

          <li className={location.pathname === "/student-details" ? "nav-item active" : "nav-item"}>
            <Link to="/student-details">Student Details</Link>
          </li>

          <li className={location.pathname === "/generate-report" ? "nav-item active" : "nav-item"}>
            <Link to="/generate-report">Generate Report</Link>
          </li>
         
          <li className={location.pathname === "/fa-faq" ? "nav-item active" : "nav-item"}>
            <Link to="/fa-faq">FAQ</Link>
          </li>
        </ul>
      </nav>
      <button className="logout" onClick={handleLogout}>Log Out</button>
    </aside>
  );
};

export default FASidebar;
// FacultySidebar.js
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/Faculty/sidebar.css";

const FacultySidebar = () => {
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
          <li className={location.pathname === "/faculty-dashboard" ? "nav-item active" : "nav-item"}>
            <Link to="/faculty-dashboard">Dashboard</Link>
          </li>
          
          <li className={location.pathname === "/faculty-calendar" ? "nav-item active" : "nav-item"}>
            <Link to="/faculty-calendar">Calendar</Link>
          </li>

          <li className={location.pathname === "/fac-events" ? "nav-item active" : "nav-item"}>
            <Link to="/fac-events">My Events</Link>
          </li>
         
          <li className={location.pathname === "/faculty-faq" ? "nav-item active" : "nav-item"}>
            <Link to="/faculty-faq">FAQ</Link>
          </li>
        </ul>
      </nav>
      <button className="logout" onClick={handleLogout}>Log Out</button>
    </aside>
  );
};

export default FacultySidebar;
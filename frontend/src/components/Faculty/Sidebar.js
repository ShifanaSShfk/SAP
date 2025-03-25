import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/Faculty/sidebar.css";

const Sidebar = () => {
  const location = useLocation(); // Get current URL
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <h1 className="logo">SAP</h1>
      <nav>
        <ul>
          <li className={location.pathname === "/faculty-dashboard" ? "nav-item active" : "nav-item"}>
            <Link to="/faculty-dashboard">Dashboard</Link>
          </li>
          
          <li className={location.pathname === "/calendar" ? "nav-item active" : "nav-item"}>
                      <Link to="/calendar">Calendar</Link>
                    </li>

          <li className={location.pathname === "/fac-events" ? "nav-item active" : "nav-item"}>
            <Link to="/fac-events">My Events</Link>
          </li>
         
         
          <li className={location.pathname === "/faq" ? "nav-item active" : "nav-item"}>
            <Link to="/faq">FAQ</Link>
          </li>
        </ul>
      </nav>
      <button className="logout" onClick={handleLogout}>Log Out</button>
    </aside>
  );
};

export default Sidebar;
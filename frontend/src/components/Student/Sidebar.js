import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/Student/sidebar.css";

const StudentSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    navigate("/");
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
            <Link to="/calendar">Calendar</Link>
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
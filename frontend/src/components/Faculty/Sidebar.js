import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../../styles/Faculty/sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isFacultyAdvisor = localStorage.getItem("isFacultyAdvisor") === "true";
  const currentView = localStorage.getItem("currentView") || "faculty";

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Common items for both views
  const commonItems = [
    { path: "/calendar", label: "Calendar" },
    { path: "/faq", label: "FAQ" }
  ];

  // View-specific items
  const facultyItems = [
    { path: "/faculty-dashboard", label: "Dashboard" },
    { path: "/fac-events", label: "My Events" }
  ];

  const faItems = [
    { path: "/fa-dashboard", label: "Dashboard" },
    { path: "/student-details", label: "Student Details" },
    { path: "/generate-report", label: "Generate Report" }
  ];

  const items = [
    ...(isFacultyAdvisor && currentView === 'fa' ? faItems : facultyItems),
    ...commonItems
  ];

  return (
    <aside className="sidebar">
      <h1 className="logo">SAP</h1>
      <nav>
        <ul>
          {items.map((item) => (
            <li 
              key={item.path} 
              className={location.pathname === item.path ? "nav-item active" : "nav-item"}
              onClick={() => localStorage.setItem("currentView", currentView)} // Maintain view state
            >
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <button className="logout" onClick={handleLogout}>Log Out</button>
    </aside>
  );
};

export default Sidebar;
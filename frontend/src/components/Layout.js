import React from "react";
import FacultySidebar from "./Faculty/Sidebar"; // Faculty Sidebar
import StudentSidebar from "./Student/Sidebar"; // Student Sidebar
import { Outlet } from "react-router-dom";
import "../styles/layout.css";

const Layout = () => {
  const userRole = localStorage.getItem("role"); // Fetch role from localStorage

  return (
    <div className="layout">
      {userRole === "faculty" ? <FacultySidebar /> : <StudentSidebar />}
      <div className="content">
        <Outlet /> {/* Render the child page */}
      </div>
    </div>
  );
};

export default Layout;

import React from "react";
import FacultySidebar from "./Faculty/Sidebar";
import StudentSidebar from "./Student/Sidebar";
import Header from "./Header"; // Import Header
import { Outlet } from "react-router-dom";
import "../styles/layout.css";

const Layout = () => {
  const userRole = localStorage.getItem("role");

  return (
    <div className="layout">
      {userRole === "faculty" ? <FacultySidebar /> : <StudentSidebar />}
      <div className="content">
        <Header /> {/* Add Header Component */}
        <Outlet /> {/* Render the child page */}
      </div>
    </div>
  );
};

export default Layout;

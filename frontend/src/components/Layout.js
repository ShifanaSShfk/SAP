import React from "react";
import FacultySidebar from "./Faculty/Sidebar";
// import FASidebar from "./FA/Sidebar";
import StudentSidebar from "./Student/Sidebar";
import Header from "./Header";
import UpcomingEvents from "./UpcomingEvents";
import "../styles/layout.css";
import { Outlet } from "react-router-dom"; 

const Layout = () => {
  const userRole = localStorage.getItem("role");

  return (
    <div className="layout">
      {/* Sidebar based on user role */}
      {userRole === "faculty" ? (
        <FacultySidebar />
      ) : (
        <StudentSidebar />
      )}

      <div className="separator"></div> 

      <div className="content">
        <Header />
        <div className="page-content">
          {/* Main Content */}
          <div className="middle-content">
            <Outlet />
          </div>

          {/* Upcoming Events Section */}
          <div className="upcoming-events-container">
            <UpcomingEvents />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
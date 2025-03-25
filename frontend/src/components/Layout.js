import React, { useState, useEffect } from "react";
import FacultySidebar from "./Faculty/Sidebar";
import FASidebar from "./FA/Sidebar";
import StudentSidebar from "./Student/Sidebar";
import Header from "./Header";
import UpcomingEvents from "./UpcomingEvents";
import "../styles/layout.css";
import { Outlet, useLocation } from "react-router-dom";

const Layout = () => {
  const userRole = localStorage.getItem("role");
  const isFacultyAdvisor = localStorage.getItem("isFacultyAdvisor") === "true";
  const location = useLocation();
  const [currentView, setCurrentView] = useState(
    localStorage.getItem("currentView") || "faculty"
  );

  // Update view based on path
  useEffect(() => {
    if (location.pathname.includes("fa-dashboard")) {
      setCurrentView("fa");
    } else if (location.pathname.includes("faculty-dashboard")) {
      setCurrentView("faculty");
    }
  }, [location]);

  const toggleView = () => {
    const newView = currentView === "faculty" ? "fa" : "faculty";
    setCurrentView(newView);
    localStorage.setItem("currentView", newView);
  };

  return (
    <div className="layout">
      {/* Sidebar based on user role and current view */}
      {userRole === "faculty" ? (
        isFacultyAdvisor && currentView === "fa" ? (
          <FASidebar />
        ) : (
          <FacultySidebar />
        )
      ) : (
        <StudentSidebar />
      )}

      <div className="separator"></div>

      <div className="content">
        <Header onSwitchView={toggleView} />
        <div className="page-content">
          <div className="middle-content">
            <Outlet />
          </div>
          <div className="upcoming-events-container">
            <UpcomingEvents />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
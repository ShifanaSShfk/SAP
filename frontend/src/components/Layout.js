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
    if (userRole === "faculty" && isFacultyAdvisor) {
      // FA-specific paths
      if (location.pathname.startsWith("/fa-") || 
          location.pathname === "/student-details" || 
          location.pathname === "/generate-report") {
        setCurrentView("fa");
      } 
      // Faculty-specific paths
      else if (location.pathname.startsWith("/faculty-") || 
               location.pathname === "/fac-events") {
        setCurrentView("faculty");
      }
      // For shared paths (/calendar, /faq), keep current view
    }
  }, [location, userRole, isFacultyAdvisor]);

  const toggleView = () => {
    if (userRole === "faculty" && isFacultyAdvisor) {
      const newView = currentView === "faculty" ? "fa" : "faculty";
      setCurrentView(newView);
      localStorage.setItem("currentView", newView);
      // Navigate to the corresponding dashboard
      window.location.href = newView === "fa" ? "/fa-dashboard" : "/faculty-dashboard";
    }
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
        <Header 
          onSwitchView={toggleView} 
          showSwitchButton={userRole === "faculty" && isFacultyAdvisor}
          currentView={currentView}
        />
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
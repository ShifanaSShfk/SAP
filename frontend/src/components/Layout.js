import React, { useState, useEffect } from "react";
import FacultySidebar from "./Faculty/Sidebar";
import FASidebar from "./FA/Sidebar";
import StudentSidebar from "./Student/Sidebar";
import Header from "./Header";
import UpcomingEvents from "./UpcomingEvents";
import "../styles/layout.css";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

// Layout.js
const Layout = ({ sidebarType = null }) => {
  const userRole = localStorage.getItem("role");
  const isFacultyAdvisor = localStorage.getItem("isFacultyAdvisor") === "true";
  const location = useLocation();
  const navigate = useNavigate();
  
  // Determine view - prioritize explicitly passed sidebarType
  const [currentView, setCurrentView] = useState(() => {
    if (sidebarType) return sidebarType;
    const storedView = localStorage.getItem("currentView");
    return storedView || (userRole === "faculty" ? "faculty" : "");
  });

  // Update view when path changes (only for faculty advisors)
  useEffect(() => {
    if (userRole === "faculty" && isFacultyAdvisor && !sidebarType) {
      const path = location.pathname;
      
      // Don't auto-switch on shared routes
      if (path === "/faculty-calendar" || path === "/faculty-faq" || 
          path === "/fa-calendar" || path === "/fa-faq") {
        return;
      }

      // Check for FA-specific paths
      if (path.startsWith("/fa-") || path === "/student-details" || path === "/generate-report") {
        if (currentView !== "fa") {
          setCurrentView("fa");
          localStorage.setItem("currentView", "fa");
        }
      } 
      // Check for faculty-specific paths
      else if (path.startsWith("/faculty-") || path === "/fac-events") {
        if (currentView !== "faculty") {
          setCurrentView("faculty");
          localStorage.setItem("currentView", "faculty");
        }
      }
    }
  }, [location, userRole, isFacultyAdvisor, currentView, sidebarType]);

  const toggleView = () => {
    if (userRole === "faculty" && isFacultyAdvisor) {
      const newView = currentView === "faculty" ? "fa" : "faculty";
      setCurrentView(newView);
      localStorage.setItem("currentView", newView);
      navigate(newView === "fa" ? "/fa-dashboard" : "/faculty-dashboard");
    }
  };

  // Determine which sidebar to show
  const getSidebar = () => {
    if (userRole === "faculty") {
      if (isFacultyAdvisor && (currentView === "fa" || sidebarType === "fa")) {
        return <FASidebar />;
      }
      return <FacultySidebar />;
    }
    return <StudentSidebar />;
  };

  return (
    <div className="layout">
      {getSidebar()}
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
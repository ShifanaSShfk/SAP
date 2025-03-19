import React from "react";
import "../../styles/Student/RequestStatus.css";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const StudentDashboard = () => {
  return (
    <div className="dashboard-container">
     
      {/* Main Content */}
      <div className="main-content">
        <div className="header">Activity Points</div>
        <div className="info-card">
          <h3>Request Status</h3>
          <div className="request-card pending">NSS Level 1 Exam - Pending      <Link to="/request-details">View Details</Link> </div>
          <div className="request-card approved">Hackathon 2025 - Approved</div>
          <div className="request-card rejected">CodeInit() 2025 - Rejected</div>
        </div>
        
      </div>

      {/* Right Sidebar */}
      <div className="right-sidebar">
        <div className="events-section">
          <h3>Upcoming Events</h3>
          <div className="event">Talk on Web Development - 4th Feb, 10:30 AM</div>
          <div className="event">Talk on AI/ML - 5th Feb, 6:00 PM</div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

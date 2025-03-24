import React from "react";
import "../../styles/Student/RequestStatus.css";
import { Link } from "react-router-dom";

const RequestStatus = () => {
  return (
    <div className="dashboard-container">
      <div className="main-content">
        {/* <div className="header">Activity Points</div> */}
        
        <div className="info-card">
          <h3>Request Status</h3>
          <div className="request-card pending">
            NSS Level 1 Exam - Pending
            <Link to="/request-details">View Details</Link>
          </div>
          <div className="request-card approved">
            Hackathon 2025 - Approved
          </div>
          <div className="request-card rejected">
            CodeInit() 2025 - Rejected
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestStatus;
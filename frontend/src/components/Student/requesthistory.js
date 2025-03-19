import React from "react";
import "../../styles/Student/requesthistory.css";
import { Link } from "react-router-dom";

const requests = [
  { name: "NSS Level 1 Exam", date: "5/02/2025", status: "Pending" },
  { name: "Hackathon 2025", date: "2/02/2025", status: "Approved" },
  { name: "CodeInit() 2025", date: "1/02/2025", status: "Rejected" },
  { name: "NCC Level 3 Exam", date: "28/01/2025", status: "Approved" },
  { name: "GitHub Workshop", date: "20/01/2025", status: "Approved" },
  { name: "Talk on Astrophysics", date: "15/01/2025", status: "Approved" },
  { name: "Workshop on Clay Modelling", date: "10/01/2025", status: "Rejected" },
  { name: "Scopes of Food Technology", date: "1/01/2025", status: "Approved" },
];

const events = [
  { title: "Talk on Web Development", date: "Friday, 4th February, 10:30 AM" },
  { title: "Talk on AI/ML", date: "Wednesday, 5 February, 6:00 PM" },
];

const ActivityPoints = () => {
  return (
    <div className="activity-points-container">
     

      {/* Main Content */}
      <div className="main-content">
        {/* <h2 className="page-title">Activity Points</h2> */}
        <div className="request-history">
          <h3>Request History</h3>
          {requests.map((request, index) => (
            <div key={index} className="request-card">
              <div className="request-info">
                <strong>{request.name}</strong>
                <span>Date: {request.date}</span>
              </div>
              <span className={`status ${request.status.toLowerCase()}`}>
                {request.status}
              </span>
             
              <button className="details-btn"><Link to="/request-details">View Details</Link> </button>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="right-panel">
        <h3>Upcoming Events</h3>
        {events.map((event, index) => (
          <div key={index} className="event-card">
            <p>{event.title}</p>
            <span>{event.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityPoints;

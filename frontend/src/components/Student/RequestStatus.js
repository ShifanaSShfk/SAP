import React, { useState, useEffect } from "react";
import { fetchStudentRequests } from "../../services/api";
import "../../styles/Student/RequestStatus.css";

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z" stroke="#4A5568" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15.6947 13.7H15.7037M15.6947 16.7H15.7037M11.9955 13.7H12.0045M11.9955 16.7H12.0045M8.29431 13.7H8.30329M8.29431 16.7H8.30329" stroke="#4A5568" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PointsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 17V12M12 7.00001V7.01001M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="#4A5568" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const RequestStatus = () => {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const studentId = localStorage.getItem("userId");
        if (!studentId) {
          throw new Error("Student ID not found");
        }
        
        const response = await fetchStudentRequests(studentId);
        setRequests(response);
      } catch (error) {
        console.error("Error fetching requests:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const filteredRequests = requests.filter(request => {
    if (filter === "All") return true;
    return request.status.toLowerCase() === filter.toLowerCase();
  });

  if (loading) return (
    <div className="request-status-container">
      <div className="loading-state">Loading your requests...</div>
    </div>
  );

  if (error) return (
    <div className="request-status-container">
      <div className="error-state">{error}</div>
    </div>
  );

  return (
    <div className="request-status-container">
      <div className="content-box">
        <div className="section compact">
        <h2>Request Status</h2>
          <div className="filter-tabs">
            
            {["All", "Pending", "Approved", "Rejected"].map((tab) => (
              <button
                key={tab}
                className={filter === tab ? "active" : ""}
                onClick={() => setFilter(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          
          {filteredRequests.length > 0 ? (
            <div className="requests-list">
              {filteredRequests.map((request) => (
                <div 
                  key={request.request_id} 
                  className={`request-card ${request.status.toLowerCase()}`}
                >
                  <div className="request-info">
                    <h3>{request.event_name}</h3>
                    <div className="request-meta">
                      <span className={`status-badge ${request.status.toLowerCase()}`}>
                        {request.status}
                      </span>
                      <span className="meta-item">
                        <CalendarIcon />
                        <span>
                          {new Date(request.event_date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </span>
                      <span className="meta-item">
                        <PointsIcon />
                        <span>{request.activity_points} pts</span>
                      </span>
                    </div>
                    {request.status === "Rejected" && request.rejection_reason && (
                      <p className="rejection-reason">
                        {request.rejection_reason}
                      </p>
                    )}
                  </div>
                  <button 
                    className="view-details"
                    onClick={() => window.location.href = `/request-details?id=${request.request_id}`}
                  >
                    View Details
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <p>No requests found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestStatus;
// FacultyDashboard.js
import React, { useState, useEffect } from "react";
import "../../styles/Faculty/FacultyDashboard.css";
import { Link, useLocation } from "react-router-dom";
import { fetchFacultyRequests } from "../../services/api";

const FacultyDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

  const facultyId = localStorage.getItem("userId");
  const isFacultyAdvisor = localStorage.getItem("isFacultyAdvisor") === "true";
  const isFAView = location.pathname.includes("fa-dashboard");

  useEffect(() => {
    const loadRequests = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!facultyId) throw new Error("Faculty ID not found. Please login again.");
        
        const data = await fetchFacultyRequests(facultyId);
        // Sort requests by created_at in descending order (newest first)
        const sortedRequests = data.sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        );
        setRequests(sortedRequests);
      } catch (err) {
        console.error("Error loading requests:", err);
        setError(err.message || "Failed to load requests");
      } finally {
        setLoading(false);
      }
    };
  
    loadRequests();
  }, [facultyId]);

  const filteredRequests = requests
  .filter(request => {
    if (activeFilter === "all") return true;
    if (activeFilter === "pending") return request.status === "Pending";
    if (activeFilter === "completed") return request.status === "Approved" || request.status === "Rejected";
    return true;
  })
  .filter(request => {
    const lowerSearch = searchTerm.toLowerCase();
    return (
      request.student_name.toLowerCase().includes(lowerSearch) ||
      request.student_id.toLowerCase().includes(lowerSearch) ||
      request.event_name.toLowerCase().includes(lowerSearch)
    );
  });


  const getStatusClass = (status) => {
    switch (status) {
      case "Pending": return "status-pending";
      case "Approved": return "status-approved";
      case "Rejected": return "status-rejected";
      default: return "";
    }
  };

  // const formatDateTime = (dateString, timeString) => {
  //   try {
  //     if (!dateString) return "Date not specified";
      
  //     // Parse the date string (format: "YYYY-MM-DD")
  //     const [year, month, day] = dateString.split('-');
  //     const date = new Date(year, month - 1, day);
      
  //     if (isNaN(date.getTime())) return "Invalid date";
      
  //     const formattedDate = date.toLocaleDateString(undefined, { 
  //       year: 'numeric', 
  //       month: 'short', 
  //       day: 'numeric' 
  //     });
      
  //     if (!timeString) return formattedDate;
      
  //     // Parse the time string (format: "HH:MM:SS" or "HH:MM")
  //     const timeParts = timeString.split(':');
  //     const hours = timeParts[0];
  //     const minutes = timeParts[1];
      
  //     const hourInt = parseInt(hours, 10);
  //     const ampm = hourInt >= 12 ? 'PM' : 'AM';
  //     const displayHour = hourInt % 12 || 12;
      
  //     return `${formattedDate} at ${displayHour}:${minutes} ${ampm}`;
  //   } catch {
  //     return "Date not specified";
  //   }
  // };

  const renderRequestCards = () => {
    if (filteredRequests.length === 0) {
      return (
        <div className="empty-state">
          <i className="fas fa-inbox"></i>
          <h3>No {activeFilter !== "all" ? activeFilter : ""} requests found</h3>
          <p>When students submit requests where you're in charge, they'll appear here.</p>
        </div>
      );
    }

    return (
      <div className="requests-list">
        {filteredRequests.map(request => (
          <div key={request.request_id} className="request-card">
            <div className="request-header">
              <h3 className="request-title">
                {request.event_name}
              </h3>
              <span className={`request-status ${getStatusClass(request.status)}`}>
                {request.status}
              </span>
            </div>
            
            <div className="request-details">
              <div className="detail-row">
                <span className="detail-label">Student:</span>
                <span className="detail-value">
                  {request.student_name} ({request.student_id})<br />
                  {request.department} - {request.section}
                </span>
              </div>
              
              {/* <div className="detail-row">
                <span className="detail-label">Date & Time:</span>
                <span className="detail-value">
                  {formatDateTime(request.event_date, request.event_time)}
                </span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Location:</span>
                <span className="detail-value">
                  {request.location}
                </span>
              </div>
               */}
              {/* <div className="detail-row">
                <span className="detail-label">Points:</span>
                <span className="detail-value">
                  {request.activity_points} activity points
                </span>
              </div> */}
            </div>
            
            <div className="request-actions">
              {/* {request.proof_document && (
                <a 
                  href={request.proof_document} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="proof-link"
                >
                  <i className="fas fa-file-alt"></i> View Proof
                </a>
              )}
               */}
              {/* <Link 
                to={`${isFAView ? "/fa-request" : "/fac-request"}/${request.request_id}`}
                className="details-link"
              >
                <i className="fas fa-chevron-right"></i> View Details
              </Link> */}

<Link 
  to={`/fac-request/${request.request_id}`}
  className="details-link"
>
  <i className="fas fa-chevron-right"></i> View Details
</Link>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="faculty-dashboard">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h2 className="dashboard-title">
            {isFacultyAdvisor && isFAView ? "Faculty Advisor Dashboard" : "Faculty Dashboard"}
          </h2>
          {/* <div className="dashboard-subtitle">
            {isFAView ? "Review student requests" : "Manage assigned requests"}
          </div> */}
        </div>
        
        <div className="filter-tabs">
          {["all", "pending", "completed"].map(filter => (
            <button
              key={filter}
              className={`filter-tab ${activeFilter === filter ? "active" : ""}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
              {filter === "pending" && requests.some(r => r.status === "Pending") && (
                <span className="notification-badge">
                  {requests.filter(r => r.status === "Pending").length}
                </span>
              )}
            </button>
          ))}
        </div>
        <div className="search-bar-container">
  <input
    type="text"
    placeholder="Search by student name, roll no., or event name"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="search-input"
  />
</div>

        <div className="requests-container">
          {error ? (
            <div className="error-message">
              <i className="fas fa-exclamation-circle"></i>
              {error}
              <button onClick={() => window.location.reload()} className="retry-btn">
                Try Again
              </button>
            </div>
          ) : loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Loading requests...</p>
            </div>
          ) : (
            renderRequestCards()
          )}
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;
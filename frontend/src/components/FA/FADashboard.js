import React, { useState, useEffect } from "react";
import "../../styles/Faculty/FacultyDashboard.css";
import { Link, useLocation } from "react-router-dom";
import { fetchStudentRequests, fetchStudentsByFA } from "../../services/api";

const FADashboard = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("pending");
  const location = useLocation();
  const facultyId = localStorage.getItem("userId");
  const isFacultyAdvisor = localStorage.getItem("isFacultyAdvisor") === "true";
  const isFAView = location.pathname.includes("fa-dashboard");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
  
        if (!facultyId) throw new Error("Faculty ID not found. Please login again.");
  
        // 1. Get all students under this FA
        const students = await fetchStudentsByFA(facultyId);
        const studentIds = students.map(s => s.studentId);
  
        // 2. Get requests for each student using fetchStudentRequests
        const allRequests = [];
        for (const studentId of studentIds) {
          const studentRequests = await fetchStudentRequests(studentId);
          allRequests.push(...studentRequests);
        }
  
        // 3. Filter requests that are:
        // - Approved by faculty in-charge
        // - Pending approval by FA
        // 3. Filter requests that are approved by faculty in-charge (i.e., ready for FA to view)
// You want to include both pending and completed FA actions
const faRequests = allRequests.filter(request =>
  request.status === "Approved" || request.fa_status === "Approved" || request.fa_status === "Rejected"
);

  
        // 4. Sort by creation date (latest first)
        const sortedRequests = faRequests.sort((a, b) =>
          new Date(b.created_at) - new Date(a.created_at)
        );
  
        setRequests(sortedRequests);
        setFilteredRequests(sortedRequests);
      } catch (err) {
        console.error("Error loading data:", err);
        setError(err.message || "Failed to load requests");
      } finally {
        setLoading(false);
      }
    };
  
    loadData();
  }, [facultyId]);
  
  useEffect(() => {
    setSearchTerm(""); // Clear search on tab change
  }, [activeFilter]);
  

  useEffect(() => {
    const filtered = requests
      .filter(request => {
        if (activeFilter === "all") return true;
        if (activeFilter === "pending") return !request.fa_status || request.fa_status === "Pending";
        if (activeFilter === "completed") return request.fa_status === "Approved" || request.fa_status === "Rejected";
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
  
    setFilteredRequests(filtered);
  }, [activeFilter, requests, searchTerm]);
  

  const getStatusClass = (status) => {
    switch (status) {
      case "Approved":
        return "status-approved";
      case "Rejected":
        return "status-rejected";
      default:
        return "status-pending";
    }
  };

  const formatDateTime = (dateString, timeString) => {
    try {
      if (!dateString) return "Date not specified";
      
      // Parse the date string (format: "YYYY-MM-DD")
      const [year, month, day] = dateString.split('-');
      const date = new Date(year, month - 1, day);
      
      if (isNaN(date.getTime())) return "Invalid date";
      
      const formattedDate = date.toLocaleDateString(undefined, { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
      
      if (!timeString) return formattedDate;
      
      // Parse the time string (format: "HH:MM:SS" or "HH:MM")
      const timeParts = timeString.split(':');
      const hours = timeParts[0];
      const minutes = timeParts[1];
      
      const hourInt = parseInt(hours, 10);
      const ampm = hourInt >= 12 ? 'PM' : 'AM';
      const displayHour = hourInt % 12 || 12;
      
      return `${formattedDate} at ${displayHour}:${minutes} ${ampm}`;
    } catch {
      return "Date not specified";
    }
  };

  const renderRequestCards = () => {
    if (loading) return <div className="loading-message">Loading requests...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (filteredRequests.length === 0) return <div className="no-requests">No requests found</div>;
  
    return (
      <div className="requests-list">
        {filteredRequests.map((request) => (
          <div key={request.request_id} className="request-card">
            <div className="request-header">
              <h3 className="request-title">{request.event_name}</h3>
              <span className={`request-status ${getStatusClass(request.fa_status || "Pending")}`}>
                {request.fa_status || "Pending"}
              </span>
            </div>
  
            <div className="request-details">
              <div className="detail-row">
                <span className="detail-label">Student:</span>
                <span className="detail-value">{request.student_name} ({request.student_id})</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Date & Time:</span>
                <span className="detail-value">
                  {formatDateTime(request.event_date, request.event_time)}
                </span>
              </div>
              {request.location && (
                <div className="detail-row">
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">{request.location}</span>
                </div>
              )}
              <div className="detail-row">
                <span className="detail-label">Points:</span>
                <span className="detail-value">{request.activity_points}</span>
              </div>
            </div>
  
            <div className="request-actions">
              <Link 
                to={`/fa-request/${request.request_id}`} 
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
        </div>
        
        <div className="filter-tabs">
          {["all", "pending", "completed"].map(filter => (
            <button
            key={filter}
            className={`filter-tab ${activeFilter === filter ? "active" : ""}`}
            onClick={() => setActiveFilter(filter)}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
            
            {filter === "pending" && requests.some(r => !r.fa_status || r.fa_status === "Pending") && (
              <span className="notification-badge">
                {requests.filter(r => !r.fa_status || r.fa_status === "Pending").length}
              </span>
            )}
          </button>
          
          ))}
        </div>
        <div className="search-bar-container">
  <input
    type="text"
    placeholder="Search by student name, roll no., or event"
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

export default FADashboard;
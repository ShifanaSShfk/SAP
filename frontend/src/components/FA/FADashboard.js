import React, { useState, useEffect } from "react";
import "../../styles/Faculty/FacultyDashboard.css";
import { fetchFacultyRequests, fetchStudentsByFA, approveRequest, rejectRequest } from "../../services/api";

const FADashboard = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("pending");
  const facultyId = localStorage.getItem("userId");

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!facultyId) throw new Error("Faculty ID not found. Please login again.");
        
        // 1. Get all students under this faculty advisor
        const students = await fetchStudentsByFA(facultyId);
        const studentIds = students.map(s => s.studentId);
        
        // 2. Get all requests that need FA approval
        const allRequests = await fetchFacultyRequests(facultyId);
        
        // 3. Filter requests:
        // - From students under this FA
        // - With status "Approved" by faculty in-charge
        // - And fa_status is "Pending" (waiting for FA approval)
        const faRequests = allRequests.filter(request => 
          studentIds.includes(request.student_id) && 
          request.status === "Approved" &&
          (request.fa_status === "Pending" || !request.fa_status)
        );
        
        // Sort by created_at (newest first)
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
    // Apply filter based on fa_status
    const filtered = requests.filter(request => {
      if (activeFilter === "all") return true;
      if (activeFilter === "pending") return !request.fa_status || request.fa_status === "Pending";
      if (activeFilter === "completed") return request.fa_status === "Approved" || request.fa_status === "Rejected";
      return true;
    });
    setFilteredRequests(filtered);
  }, [activeFilter, requests]);

  const handleApprove = async (requestId) => {
    try {
      await approveRequest(requestId);
      // Update local state
      setRequests(prev => prev.map(req => 
        req.request_id === requestId ? { ...req, fa_status: "Approved" } : req
      ));
    } catch (error) {
      console.error("Error approving request:", error);
      alert("Failed to approve request");
    }
  };

  const handleReject = async (requestId) => {
    const reason = prompt("Please enter reason for rejection:");
    if (reason) {
      try {
        await rejectRequest(requestId, reason);
        // Update local state
        setRequests(prev => prev.map(req => 
          req.request_id === requestId ? { ...req, fa_status: "Rejected" } : req
        ));
      } catch (error) {
        console.error("Error rejecting request:", error);
        alert("Failed to reject request");
      }
    }
  };

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const renderRequestCards = () => {
    if (loading) return <div className="loading-message">Loading requests...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (filteredRequests.length === 0) return <div className="no-requests">No requests found</div>;

    return filteredRequests.map((request) => (
      <div key={request.request_id} className="request-card">
        <div className="request-header">
          <h3 className="request-title">{request.event_name}</h3>
          <span className={`request-status ${getStatusClass(request.fa_status || "Pending")}`}>
            {request.fa_status || "Pending"}
          </span>
        </div>
        
        <div className="request-details">
          <p><strong>Student:</strong> {request.student_name} ({request.student_id})</p>
          <p><strong>Department:</strong> {request.department}</p>
          <p><strong>Date:</strong> {formatDate(request.event_date)}</p>
          <p><strong>Activity Points:</strong> {request.activity_points}</p>
          {request.proof_document && (
            <a 
              href={`${request.proof_document}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="proof-link"
            >
              View Proof Document
            </a>
          )}
        </div>

        {(request.fa_status === "Pending" || !request.fa_status) && (
          <div className="request-actions">
            <button 
              className="approve-btn"
              onClick={() => handleApprove(request.request_id)}
            >
              Approve
            </button>
            <button 
              className="reject-btn"
              onClick={() => handleReject(request.request_id)}
            >
              Reject
            </button>
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="faculty-dashboard">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h2>Faculty Advisor Dashboard</h2>
          <p>Manage your students' approved requests</p>
        </div>
        
        <div className="filter-controls">
          <button
            className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            All Requests
          </button>
          <button
            className={`filter-btn ${activeFilter === "pending" ? "active" : ""}`}
            onClick={() => setActiveFilter("pending")}
          >
            Pending
          </button>
          <button
            className={`filter-btn ${activeFilter === "completed" ? "active" : ""}`}
            onClick={() => setActiveFilter("completed")}
          >
            Completed
          </button>
        </div>

        <div className="requests-container">
          {renderRequestCards()}
        </div>
      </div>
    </div>
  );
};

export default FADashboard;
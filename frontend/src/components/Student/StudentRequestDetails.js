import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Student/StudentRequestDetails.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const FacRequestDetails = () => {
  const queryParams = new URLSearchParams(window.location.search);
const requestId = queryParams.get("id");

  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRequestDetails = async () => {
      try {
        const facultyId = localStorage.getItem('userId');
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/requests/${requestId}`, {
          credentials: "include",
          method: "GET",
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
            'facultyId': facultyId
          }
        });
        const data = await response.json();
        setRequest(data);
      } catch (err) {
        setError(err.message || "Failed to load request details");
      } finally {
        setIsLoading(false);
      }
    };

    loadRequestDetails();
  }, [requestId]);

  const getFinalStatus = () => {
    if (request.fa_status === "Rejected" || request.status === "Rejected") {
      return "Rejected";
    } else if (request.fa_status === "Approved") {
      return "Approved";
    } else if (request.fa_status === "Pending" && request.status !== "Rejected") {
      return "Pending";
    } else {
      return "Pending"; // fallback
    }
  };
  

const handleApprove = async () => {
  setIsSubmitting(true);
  try {
    const facultyId = localStorage.getItem('userId'); // 👈 retrieve facultyId
    const response = await fetch(`${API_BASE_URL}/api/requests/${requestId}/approve`, {
      credentials: "include",
      method: "PUT",
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
        'facultyId': facultyId // 👈 include this header
      }
    });

    if (!response.ok) throw new Error('Approval failed');
    setRequest(prev => ({ ...prev, status: "Approved" }));
  } catch (err) {
    setError(err.message);
  } finally {
    setIsSubmitting(false);
  }
};


  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      setError("Please provide a reason for rejection");
      return;
    }

    setIsSubmitting(true);
    try {
      const facultyId = localStorage.getItem('userId');
      const response = await fetch(`${API_BASE_URL}/api/requests/${requestId}/reject`, {
        credentials: "include",
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'facultyId': facultyId 
        },
        body: JSON.stringify({ reason: rejectionReason })
      });

      if (!response.ok) throw new Error('Rejection failed');
      setRequest(prev => ({ ...prev, status: "Rejected", rejection_reason: rejectionReason }));
    } catch (err) {
      setError(err.message || "Failed to reject request");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="request-details-container">
        <div className="loading-message">
          <div className="spinner"></div>
          <p>Loading request details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="request-details-container">
        <div className="error-message">
          <i className="fas fa-exclamation-circle"></i>
          {error}
          <button onClick={() => window.location.reload()} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="request-details-container">
        <div className="error-message">Request not found</div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return <span className="status-badge approved">{status}</span>;
      case "Rejected":
        return <span className="status-badge rejected">{status}</span>;
      default:
        return <span className="status-badge pending">{status}</span>;
    }
  };

  return (
    <div className="request-details-container">
      <button onClick={() => navigate(-1)} className="back-btn">
        <i className="fas fa-arrow-left"></i> Back to Dashboard
      </button>

      <h2>Request Details</h2>

      <div className="info-row">
        <span className="label">Current Status:</span>
        <span className="value">{getStatusBadge(getFinalStatus())}</span>

      </div>

      <div className="info-row">
        <span className="label">Event Name:</span>
        <span className="value">{request.event_name}</span>
      </div>

      <div className="info-row">
        <span className="label">Student:</span>
        <span className="value">
          {request.student_name} ({request.student_id})<br />
          {request.department} - {request.section}
        </span>
      </div>

      <div className="info-row">
        <span className="label">Date & Time:</span>
        <span className="value">
          {request.event_date} {request.event_time && `at ${request.event_time}`}
        </span>
      </div>

      <div className="info-row">
        <span className="label">Location:</span>
        <span className="value">{request.location || "Not specified"}</span>
      </div>

      <div className="info-row">
        <span className="label">Activity Points:</span>
        <span className="value">{request.activity_points || 0}</span>
      </div>

             {/* Student Files Section */}
{request.student_file && (
  <div className="info-row">
    <span className="label">Proof File:</span>
    <div className="value">
      
          <a
            href={`http://localhost:8080/api/files/${request.student_file.fileName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="proof-link"
          >
            {request.student_file.fileName}
          </a>
        </div>
      
    </div>
)}

{request.faculty_in_charges && request.faculty_in_charges.length > 0 && (
  <div className="faculty-incharge-section">
    <h3>Faculty In-Charges</h3>
    <table className="faculty-incharge-table">
      <thead>
        <tr>
          <th>Faculty Name</th>
          <th>Faculty ID</th>
          <th>Status</th>
          <th>Rejection Reason</th>
        </tr>
      </thead>
      <tbody>
        {request.faculty_in_charges.map((faculty, index) => (
          <tr key={index}>
            <td>{faculty.faculty_name}</td>
            <td>{faculty.faculty_id}</td>
            <td>{faculty.status}</td>
            <td>{faculty.rejection_reason || "—"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}


      {request.status === "Pending" && (
        <div className="action-section">
          <h3>Take Action</h3>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="rejectionReason">Rejection Reason (required):</label>
            <textarea
              id="rejectionReason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Please provide a detailed reason for rejection..."
              rows="4"
              required
            />
          </div>

          <div className="action-buttons">
            <button 
              onClick={handleApprove}
              disabled={isSubmitting}
              className="approve-btn"
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Processing...
                </>
              ) : (
                <>
                  <i className="fas fa-check-circle"></i> Approve
                </>
              )}
            </button>
            <button 
              onClick={handleReject}
              disabled={isSubmitting || !rejectionReason.trim()}
              className="reject-btn"
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Processing...
                </>
              ) : (
                <>
                  <i className="fas fa-times-circle"></i> Reject
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacRequestDetails;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/Faculty/FacRequestDetails.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const FARequestDetails = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRequestDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/api/requests/${requestId}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('authToken')}`
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

  const handleFAApprove = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/requests/${requestId}/fa/approve`, {
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        }
      });

      if (!response.ok) throw new Error('FA Approval failed');
      setRequest(prev => ({ ...prev, status: "Approved" }));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFAReject = async () => {
    if (!rejectionReason.trim()) {
      setError("Please provide a reason for rejection");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/requests/${requestId}/fa/reject`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`
        },
        body: JSON.stringify({ reason: rejectionReason })
      });

      if (!response.ok) throw new Error('FA Rejection failed');
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

      <h2>Request Details (Faculty Advisor View)</h2>

      <div className="info-row">
        <span className="label">Current Status:</span>
        <span className="value">{getStatusBadge(request.status)}</span>
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

      {request.proof_document && (
        <div className="info-row">
          <span className="label">Proof Document:</span>
          <span className="value">
            <a 
              href={`${API_BASE_URL}/${request.proof_document}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="proof-link"
            >
              <i className="fas fa-file-alt"></i> View Document
            </a>
          </span>
        </div>
      )}

      {request.rejection_reason && (
        <div className="info-row">
          <span className="label">Rejection Reason:</span>
          <span className="value">{request.rejection_reason}</span>
        </div>
      )}

      {request.status === "Pending" && (
        <div className="action-section">
          <h3>Take Action (Faculty Advisor)</h3>
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
              onClick={handleFAApprove}
              disabled={isSubmitting}
              className="approve-btn"
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Processing...
                </>
              ) : (
                <>
                  <i className="fas fa-check-circle"></i> Approve as FA
                </>
              )}
            </button>
            <button 
              onClick={handleFAReject}
              disabled={isSubmitting || !rejectionReason.trim()}
              className="reject-btn"
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Processing...
                </>
              ) : (
                <>
                  <i className="fas fa-times-circle"></i> Reject as FA
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FARequestDetails;
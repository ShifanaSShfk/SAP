import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchRequestDetails, approveRequest, rejectRequest } from "../../services/api";
import "../../styles/Faculty/FacRequestDetails.css";

const FacRequestDetails = () => {
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
        const data = await fetchRequestDetails(requestId);
        setRequest(data);
        setError(null);
      } catch (err) {
        setError(err.message || "Failed to load request details");
      } finally {
        setIsLoading(false);
      }
    };

    loadRequestDetails();
  }, [requestId]);

  const handleApprove = async () => {
    setIsSubmitting(true);
    setError(null);
    try {
      await approveRequest(requestId);
      navigate(-1); // Go back to previous page
    } catch (err) {
      setError(err.message || "Failed to approve request");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason) {
      setError("Please provide a reason for rejection");
      return;
    }

    setIsSubmitting(true);
    setError(null);
    try {
      await rejectRequest(requestId, rejectionReason);
      navigate(-1); // Go back to previous page
    } catch (err) {
      setError(err.message || "Failed to reject request");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="request-details-container">
        <div className="loading-message">Loading request details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="request-details-container">
        <div className="error-message">{error}</div>
        <button onClick={() => window.location.reload()} className="retry-btn">
          Try Again
        </button>
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

  return (
    <div className="request-details-container">
      <h2>Request Details</h2>
      
      <div className="request-info">
        <div className="info-row">
          <span className="label">Event:</span>
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
            {new Date(request.event_date).toLocaleDateString()} at {request.event_time}
          </span>
        </div>
        <div className="info-row">
          <span className="label">Location:</span>
          <span className="value">{request.location}</span>
        </div>
        <div className="info-row">
          <span className="label">Points:</span>
          <span className="value">{request.activity_points}</span>
        </div>
        {request.proof_document && (
          <div className="info-row">
            <span className="label">Proof:</span>
            <a href={request.proof_document} target="_blank" rel="noopener noreferrer" className="value">
              View Document
            </a>
          </div>
        )}
        {request.rejection_reason && request.status === "Rejected" && (
          <div className="info-row">
            <span className="label">Rejection Reason:</span>
            <span className="value">{request.rejection_reason}</span>
          </div>
        )}
      </div>

      {request.status === "Pending" && (
        <div className="action-section">
          <h3>Request Action</h3>
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label htmlFor="rejectionReason">Rejection Reason (if applicable):</label>
            <textarea
              id="rejectionReason"
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter reason for rejection..."
              rows="3"
            />
          </div>

          <div className="action-buttons">
            <button 
              onClick={handleApprove} 
              disabled={isSubmitting}
              className="approve-btn"
            >
              {isSubmitting ? "Processing..." : "Approve Request"}
            </button>
            <button 
              onClick={handleReject} 
              disabled={isSubmitting || !rejectionReason}
              className="reject-btn"
            >
              {isSubmitting ? "Processing..." : "Reject Request"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FacRequestDetails;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../../styles/Faculty/FacRequestDetails.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

const FacRequestDetails = () => {
  const { requestId } = useParams();
  const navigate = useNavigate();
  const [request, setRequest] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [faculties, setFaculties] = useState([]);
const [selectedFaculties, setSelectedFaculties] = useState([]);
const [searchTerm, setSearchTerm] = useState('');


useEffect(() => {
  const loadRequestDetails = async () => {
    try {
      const facultyId = localStorage.getItem('userId');
      setIsLoading(true);

      // Fetch request details
      const response = await fetch(`${API_BASE_URL}/api/requests/${requestId}`, {
        method: "GET",
        credentials: "include",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          "Content-Type": "application/json",
          'facultyId': facultyId,
        },
      });
      const data = await response.json();

      console.log("Request Details:", data);

      if (data) {
        setRequest(data);
      } else {
        setError("No files associated with this request.");
      }

      // 🔥 Fetch faculties list
      const facultiesRes = await fetch(`${API_BASE_URL}/api/faculty/list`, {
        method: "GET",
        credentials: "include",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          "Content-Type": "application/json",
        },
      });
      const facultiesData = await facultiesRes.json();
      console.log("Faculties List:", facultiesData);
      setFaculties(facultiesData);

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
    try {
      const response = await fetch(`${API_BASE_URL}/api/requests/${requestId}/faapprove`, {
        credentials: "include",
        method: "PUT",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error('Approval failed');
      setRequest(prev => ({ ...prev, fa_status: "Approved" }));
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  console.log("Faculties:", faculties);

  const filteredFaculties = faculties.filter(
    (faculty) => 
      faculty.facultyName.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !request.faculty_in_charges?.some(f => f.faculty_id === faculty.facultyId) // Use `faculty_id` here
  );
  
  console.log("Filtered Faculties:", filteredFaculties);
  
  const handleFacultySelect = (facultyId) => {
    setSelectedFaculties(prevSelected => {
      // Check if the facultyId is already selected
      if (prevSelected.includes(facultyId)) {
        // Remove the facultyId if it is already selected
        return prevSelected.filter(id => id !== facultyId);
      } else {
        // Add the facultyId to the selected list if it's not already selected
        return [...prevSelected, facultyId];
      }
    });
  };
  
  
  const handleUpdateFacultyInCharge = async () => {
    console.log("Selected Faculties", selectedFaculties);
    try {
      setIsSubmitting(true);
      const response = await fetch(`${API_BASE_URL}/api/requests/${requestId}/add-faculties`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ facultyIds: selectedFaculties }),
      });
  
      if (!response.ok) throw new Error('Failed to update faculty in-charge');
  
      // Success
      alert('Faculty in-charge updated successfully!');
      setSelectedFaculties([]);
      window.location.reload(); // reload to refresh list
    } catch (error) {
      setError(error.message || 'Something went wrong');
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
      const response = await fetch(`${API_BASE_URL}/api/requests/${requestId}/fareject`, {
        credentials: "include",
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({ reason: rejectionReason })
      });

      if (!response.ok) throw new Error('Rejection failed');
      setRequest(prev => ({ ...prev, fa_status: "Rejected", rejection_reason: rejectionReason }));
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

  const getStatusBadge = (fa_status) => {
    switch (fa_status) {
      case "Approved":
        return <span className="status-badge approved">{fa_status}</span>;
      case "Rejected":
        return <span className="status-badge rejected">{fa_status}</span>;
      default:
        return <span className="status-badge pending">{fa_status}</span>;
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
        <span className="value">{getStatusBadge(request.fa_status)}</span>
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
          <span className="label">Student File:</span>
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
  
      {/* Faculty Files Section */}
      {request.faculty_files && request.faculty_files.length > 0 && (
        <div className="info-row">
          <span className="label">Faculty Files:</span>
          <div className="value">
            {request.faculty_files.map((file, index) => (
              <div key={index}>
                <a
                  href={`http://localhost:8080/api/files/${file.fileName}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="proof-link"
                >
                  <i className="fas fa-file-alt"></i> {file.fileName}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
  
      {request.rejection_reason && (
        <div className="info-row">
          <span className="label">Rejection Reason:</span>
          <span className="value">{request.rejection_reason}</span>
        </div>
      )}
  
      {/* ========== Faculty In-Charge Dropdown START ========== */}
      {request.fa_status === "Pending" && (
      <div className="info-row">
        <span className="label">Assign More Faculty In-Charge:</span>
        <div className="faculty-search-container">
          <input
            type="text"
            placeholder="Search faculty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="faculty-search"
          />
          <div className="faculty-select-container">
  {filteredFaculties.map(faculty => (
    <div
      key={faculty.facultyId}
      className={`faculty-option ${selectedFaculties.includes(faculty.facultyId) ? 'selected' : ''}`}
      onClick={() => handleFacultySelect(faculty.facultyId)}
    >
      {faculty.facultyName} ({faculty.department})
    </div>
  ))}
</div>

  
<div className="selected-faculties">
  {selectedFaculties.map(facultyId => {
    const faculty = faculties.find(f => f.facultyId === facultyId);
    return faculty ? (
      <span key={facultyId} className="selected-faculty">
        {faculty.facultyName}
        <button 
          type="button" 
          onClick={(e) => {
            e.stopPropagation();
            handleFacultySelect(facultyId); // Deselect faculty when clicking "×"
          }}
        >
          ×
        </button>
      </span>
    ) : null;
  })}
</div>

  
          <button 
            className="update-faculty-btn"
            onClick={handleUpdateFacultyInCharge}
            disabled={selectedFaculties.length === 0 || isSubmitting}
          >

            {isSubmitting ? "Updating..." : "Update Faculty In-Charge"}
          </button>
        </div>
      </div>
      )}
      {/* ========== Faculty In-Charge Dropdown END ========== */}
  
      {request.fa_status === "Pending" && (
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

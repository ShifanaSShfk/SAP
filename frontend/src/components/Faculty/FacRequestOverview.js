import React, { useState, useEffect } from 'react';
import '../../styles/Faculty/FacRequestOverview.css';
import { Link, useParams } from "react-router-dom";
import axios from 'axios';

function FacRequestOverview() {
  const [activeTab, setActiveTab] = useState('overview');
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const { facultyId } = useParams(); // Get faculty ID from URL

  useEffect(() => {
    // Fetch requests for this faculty member
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`/api/requests/faculty/${facultyId}`);
        setRequests(response.data);
        if (response.data.length > 0) {
          setSelectedRequest(response.data[0]); // Select first request by default
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, [facultyId]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    // You could add filtering here based on status if needed
  };

  const handleRequestSelect = (request) => {
    setSelectedRequest(request);
  };

  return (
    <div className="app">
      <div className="main-content">
        <div className="content-area">
          <div className="tabs">
            <div 
              className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => handleTabClick('overview')}
            >
              Overview
            </div>
            <div 
              className={`tab ${activeTab === 'approved' ? 'active' : ''}`}
              onClick={() => handleTabClick('approved')}
            >
              Approved
            </div>
            <div 
              className={`tab ${activeTab === 'rejected' ? 'active' : ''}`}
              onClick={() => handleTabClick('rejected')}
            >
              Rejected
            </div>
          </div>

          <div className="request-list">
            {requests.map(request => (
              <div 
                key={request.requestId} 
                className={`request-item ${selectedRequest?.requestId === request.requestId ? 'selected' : ''}`}
                onClick={() => handleRequestSelect(request)}
              >
                <div className="request-title">{request.eventName}</div>
                <div className="request-meta">
                  <span>{request.eventDate}</span>
                  <span>{request.student.studentId}</span>
                </div>
                <div className="request-status">{request.status}</div>
              </div>
            ))}
          </div>

          {selectedRequest && (
            <div className="request-details">
              <div className="detail-row">
                <div className="detail-label">Event</div>
                <div className="detail-value">{selectedRequest.eventName}</div>
              </div>
              
              <div className="detail-row">
                <div className="detail-label">Date</div>
                <div className="detail-value">
                  {selectedRequest.eventDate}, {selectedRequest.eventTime}
                </div>
              </div>
              
              <div className="detail-row">
                <div className="detail-label">Activity points</div>
                <div className="detail-value">{selectedRequest.activityPoints} points</div>
              </div>
              
              <div className="detail-row">
                <div className="detail-label">Faculty Incharge</div>
                <div className="detail-value">
                  {selectedRequest.facultyInCharge.map(f => f.facultyName).join(', ')}
                </div>
              </div>
              
              <div className="detail-row">
                <div className="detail-label">Student Name</div>
                <div className="detail-value">{selectedRequest.student.name}</div>
              </div>
              
              <div className="detail-row">
                <div className="detail-label">Student Roll no.</div>
                <div className="detail-value">{selectedRequest.student.studentId}</div>
              </div>
              
              <div className="detail-row">
                <div className="detail-label">FA</div>
                <div className="detail-value">
                  {selectedRequest.facultyAdvisors.map(f => f.facultyName).join(', ')}
                </div>
              </div>
              
              <div className="detail-row">
                <div className="detail-label">Proof</div>
                <div className="detail-value file-link">
                  <a href={`/${selectedRequest.proofDocument}`} target="_blank" rel="noopener noreferrer">
                    View Document
                  </a>
                </div>
              </div>

              <div className="action-buttons">
                <button className="approve-btn" onClick={() => handleApprove(selectedRequest.requestId)}>
                  Approve
                </button>
                <button className="reject-btn" onClick={() => handleReject(selectedRequest.requestId)}>
                  Reject
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  async function handleApprove(requestId) {
    try {
      await axios.put(`/api/requests/${requestId}/approve`);
      // Update local state or refresh data
      const updatedRequests = requests.map(req => 
        req.requestId === requestId ? {...req, status: 'APPROVED'} : req
      );
      setRequests(updatedRequests);
    } catch (error) {
      console.error('Error approving request:', error);
    }
  }

  async function handleReject(requestId) {
    try {
      await axios.put(`/api/requests/${requestId}/reject`);
      // Update local state or refresh data
      const updatedRequests = requests.map(req => 
        req.requestId === requestId ? {...req, status: 'REJECTED'} : req
      );
      setRequests(updatedRequests);
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  }
}

export default FacRequestOverview;
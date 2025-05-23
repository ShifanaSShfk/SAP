// App.js
import React, { useState } from 'react';
import '../../styles/Faculty/FacRequestOverview.css';

function App() {

  const [activeTab, setActiveTab] = useState('overview');
  
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="app">
     
      <div className="main-content">
        <div className="header">
          <h2>Request Details</h2>
          <div className="user-controls">
            <div className="notification-icon">🔔</div>
            <div className="user-avatar">👤</div>
          </div>
        </div>

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

          <div className="request-details">
            <div className="detail-row">
              <div className="detail-label">Event</div>
              <div className="detail-value">Technical Hackathon 2025</div>
            </div>
            
            <div className="detail-row">
              <div className="detail-label">Date</div>
              <div className="detail-value">January 25, 2025, 10:00 AM - 5:00 PM</div>
            </div>
            
            <div className="detail-row">
              <div className="detail-label">Activity points</div>
              <div className="detail-value">5 points</div>
            </div>
            
            <div className="detail-row">
              <div className="detail-label">Faculty Incharge</div>
              <div className="detail-value">Manjusha P, Anu Mary Chacko</div>
            </div>
            
            <div className="detail-row">
              <div className="detail-label">Student Name</div>
              <div className="detail-value">Ravipati Nikitha Chowdary</div>
            </div>
            
            <div className="detail-row">
              <div className="detail-label">Student_Roll no.</div>
              <div className="detail-value">B220492CS</div>
            </div>
            
            <div className="detail-row">
              <div className="detail-label">FA</div>
              <div className="detail-value">Hiran V Nath</div>
            </div>
            
            <div className="detail-row">
              <div className="detail-label">proof</div>
              <div className="detail-value file-link">student_proof.pdf</div>
            </div>

            <div className="detail-row">
              <div className="detail-label">comments</div>
              <div className="form-group">
              <input type="text" placeholder="Add Comments *" required />
            </div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="submit-btn">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

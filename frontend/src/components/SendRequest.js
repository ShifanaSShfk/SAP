import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SendRequest.css";
import { FaRegUserCircle, FaBell } from "react-icons/fa";

const SendRequest = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="sap-container">
      <aside className="sidebar">
        <h1 className="logo">SAP</h1>
        <nav>
          <ul>
            <li>Dashboard</li>
            <li>Calendar</li>
            <li>Doubts</li>
          </ul>
        </nav>
        <div className="activity-points">
          <button>Request Status</button>
          <button>Request History</button>
          <button className="active" onClick={() => navigate("/send-request")}>
            Send A New Request
          </button>
        </div>
        <button className="logout">Log Out</button>
      </aside>
      <main className="content">
        <header className="header">
          <h2>Activity Points</h2>
          <div className="icons">
            <FaBell className="icon" />
            <FaRegUserCircle className="icon" />
          </div>
        </header>
        <section className="send-request">
          <h3>New Request</h3>
          <form>
            <div className="form-group">
              <input type="text" placeholder="Name *" required />
              <input type="text" placeholder="Roll Number *" required />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Event Name *" required />
              <input type="date" />
            </div>
            <div className="form-group">
              <input type="time" />
              <input type="text" placeholder="Location" />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Faculty Name *" required />
              <input type="text" placeholder="Faculty Advisor Name *" required />
            </div>
            <div className="file-upload">
              <p>Select your file of proof or drag and drop (jpg, png allowed)</p>
              <button>Browse</button>
            </div>
            <div className="form-buttons">
              <button type="button" className="cancel-button">Cancel</button>
              <button type="submit" className="submit-button">Submit</button>
            </div>
          </form>
        </section>
      </main>
      <aside className="upcoming-events">
        <h3>Upcoming Events</h3>
        <div className="event">Talk on Web Development - Friday, 4th February, 10:30 AM</div>
        <div className="event">Talk on AI/ML - Wednesday, 5th February, 6:00 PM</div>
      </aside>
    </div>
  );
};

export default SendRequest;

import React from "react";
import '../../styles/Faculty/AddEvent.css';

const AddEvent = () => {
  return (
    <div className="add-event-container">
     

      {/* Main Content */}
      <div className="main-content">
        <header className="header">Add Event</header>
        <div className="event-details">
          <div className="event-row">
            <label>Event</label>
            <div className="form-group">
              <input type="text" placeholder="Name *" required />
            </div>
          </div>

          <div className="event-row">
            <label>Date</label>
            <div className="form-group">
            <input type="date" />
            </div>
          </div>

          <div className="event-row">
            <label>Venue</label>
            <div className="form-group">
              <input type="text" placeholder="Add Venue *" required />
            </div>
          </div>

          <div className="event-row">
            <label>Activity points</label>
            <div className="form-group">
              <input type="text" placeholder="Add Points *" required />
            </div>
          </div>

          <div className="event-row">
            <label>Faculty Incharge</label>
            <div className="form-group">
              <input type="text" placeholder="Add Faculty Incharge *" required />
            </div>
          </div>

          <div className="event-row">
            <label>Rewards</label>
            <div className="form-group">
              <input type="text" placeholder="Rewards *" required />
            </div>
          </div>

          <div className="event-row">
            <label>Description</label>
            <div className="form-group">
              <input type="text" placeholder="Add Description *" required />
            </div>
          </div>

          <button className="submit-button">Submit</button>
        </div>
      </div>
    </div>
  );
};

export default AddEvent;

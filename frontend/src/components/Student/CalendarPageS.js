// CalendarPageS.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "./calendarS";
import "./../../styles/CalendarPage.css";

const CalendarPageS = () => {
  const [selectedEvents, setSelectedEvents] = useState([]);
  const navigate = useNavigate();

  return (
    <div className="calendar-page">
      <div className="main-content">
        <div className="content-container">
          {/* Calendar Section */}
          <div className="calendar-container">
            <div className="calendar-wrapper">
              <h2 className="calendar-title">Event Calendar</h2>
              <Calendar onDateSelect={setSelectedEvents} />
            </div>
          </div>
          
          {/* Event Details Section */}
          <div className="event-details-container">
            {selectedEvents.length > 0 ? (
              <div className="event-details-content">
                {selectedEvents.map((event, index) => (
                  <div key={index} className="event-card">
                    <h3 className="event-title">
                      {event.event_name || event.eventName}
                    </h3>
                    <div className="event-info">
                      <p><strong>Venue:</strong> {event.location || event.Location}</p>
                      <p><strong>Time:</strong> {event.event_time || event.eventTime}</p>
                      <p><strong>Description:</strong> {event.event_description || event.eventDescription}</p>
                    </div>
                    
                    <button
                      className="view-details-btn"
                      onClick={() => navigate(`/event-details/${event.event_id || event.eventId}`)}
                    >
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-events-message">
                <p>Select an event date to see details.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPageS;
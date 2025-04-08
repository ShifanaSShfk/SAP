import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/UpcomingEvents.css";

const UpcomingEvents = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/events/all", {
          withCredentials: true,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
          }
        });
        const events = response.data;
        const now = new Date();
  
        const filteredEvents = events.filter(event => {
          const eventStartDate = new Date(event.eventStartDate);
          const eventStartDateTime = new Date(`${event.eventStartDate}T${event.eventStartTime}`);
          const eventEndDateTime = new Date(`${event.eventEndDate}T${event.eventEndTime}`);
          
          // Check if event is ongoing or in the future
          const isFutureEvent = eventEndDateTime >= now;
          
          // Check if event is within next 5 days (including today)
          const timeDiff = eventStartDate.getTime() - now.getTime();
          const daysDiff = timeDiff / (1000 * 3600 * 24);
          const isWithin5Days = daysDiff <= 5 && daysDiff >= -1; // Include events that started yesterday but are still ongoing
          
          return isFutureEvent && isWithin5Days;
        });
  
        // Sort events by start date/time
        filteredEvents.sort((a, b) => {
          const dateA = new Date(`${a.eventStartDate}T${a.eventStartTime}`);
          const dateB = new Date(`${b.eventStartDate}T${b.eventStartTime}`);
          return dateA - dateB;
        });
  
        setUpcomingEvents(filteredEvents);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
      }
    };
  
    fetchUpcomingEvents();
  }, []);
  
  return (
    <aside className="upcoming-events-sidebar">
      <div className="events-container">
        <h3 className="events-header">Upcoming Events</h3>
        
        {upcomingEvents.length > 0 ? (
          <div className="events-list">
            {upcomingEvents.map(event => (
              <div key={event.eventId} className="event-card">
                <div className="event-date-badge">
                  {new Date(event.eventStartDate).toLocaleDateString('en-US', { day: 'numeric' })}
                  <span className="event-month">
                    {new Date(event.eventStartDate).toLocaleDateString('en-US', { month: 'short' })}
                  </span>
                </div>
                <div className="event-details">
                  <h4 className="event-title">{event.eventName}</h4>
                  <div className="event-time">
                    <span className="time-icon">🕒</span>
                    {event.eventStartTime} - {event.eventEndTime}
                  </div>
                  {event.location && (
                    <div className="event-location">
                      <span className="location-icon">📍</span>
                      {event.location}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-events">
            <p>No upcoming events scheduled</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default UpcomingEvents;
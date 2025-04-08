import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventById } from "../services/api";
import "../styles/EventDetails.css";

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [facultyInCharge, setFacultyInCharge] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {

    if (!eventId) {
      console.error("eventId is undefined!");
      setLoading(false);
      return;
    }

    const fetchEvent = async () => {
      try {
        
        const eventData = await getEventById(eventId);
        if (!eventData) {
          console.error("Event not found or API error!");
        } else {
          setEvent(eventData);
          // Set faculty in charge name
          if (eventData.faculty_in_charge) {
            setFacultyInCharge(eventData.faculty_in_charge);
          } else if (eventData.faculties && eventData.faculties.length > 0) {
            // If using new faculties array structure
            setFacultyInCharge(
              eventData.faculties.map(f => f.name || f.facultyName).join(", ")
            );
          }
        }
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
    const userRole = localStorage.getItem("role");
    setRole(userRole);

  }, [eventId]);

  const handleSendRequest = () => {
    navigate(`/send-request/${eventId}`);
  };

  if (loading) {
    return <div className="loading-message">Loading event details...</div>;
  }

  if (!event) {
    return <div className="error-message">Event not found or failed to load.</div>;
  }

  return (
    <div className="event-container">
      <div className="main-content">
        <h2 className="event-title">{event.event_name}</h2>

        {/* Event Information */}
        <div className="event-info">
          <h3>Event Information</h3>
          <ul>
            <li><p><strong>Event Name:</strong> {event.eventName}</p></li>
            <li><p><strong>Date & Time:</strong> {event.eventStartDate} {event.eventStartTime} to {event.eventEndTime}</p></li>
            <li><p><strong>Conducted by:</strong> {facultyInCharge || "Not specified"}</p></li>
            <li><p><strong>Category:</strong> {event.eventType}</p></li>
            <li><p><strong>Venue:</strong> {event.location}</p></li>
          </ul>
        </div>

        {role === "student" && (
  <div className="request-section">
    <button 
      className="request-button"
      onClick={handleSendRequest}
    >
      Send Participation Request
    </button>
  </div>
)}
      </div>
    </div>
  );
};

export default EventDetails;
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/Faculty/eventdetails.css";

const EventDetails = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/events/${eventId}`,{
          withCredentials: true,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
          }
        });
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching event details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEventDetails();
  }, [eventId]);

  if (loading) return <div className="loading">Loading event details...</div>;
  if (!event) return <div className="error">Event not found</div>;

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    return timeString.slice(0, 5);
  };

  return (
    <div className="event-container">
      <div className="main-content">
        <h2 className="event-title">{event.eventName}</h2>

        <div className="event-info">
          <h3>Event Information</h3>
          <ul>
            <li><p><strong>Description:</strong> {event.description}</p></li>
            <li>
              <p>
                <strong>Date & Time:</strong> {formatDate(event.eventDate)}, {formatTime(event.eventTime)}
                {event.eventEndDate && ` to ${formatDate(event.eventEndDate)}, ${formatTime(event.eventEndTime)}`}
              </p>
            </li>
            <li>
              <p>
                <strong>Conducted by:</strong> {event.faculties?.map(f => f.facultyName).join(', ')}
              </p>
            </li>
            <li><p><strong>Category:</strong> {event.eventType}</p></li>
            <li><p><strong>Venue:</strong> {event.location}</p></li>
            <li><p><strong>Activity Points:</strong> {event.activityPoints}</p></li>
          </ul>
        </div>

        <div className="event-participation">
          <h3>Student Participation</h3>
          <p><strong>Total Participants:</strong> 0</p>
        </div>

        <div className="event-rewards">
          <h3>Rewards</h3>
          <p>No reward information available</p>
        </div>

        <div className="event-feedback">
          <h3>Student Feedback & Reviews</h3>
          <p>No feedback available yet</p>
        </div>

        <div className="event-attachments">
          <h3>Documents & Proofs</h3>
          <p>No attachments available</p>
        </div>

        <div className="event-comments">
          <h3>Comments</h3>
          <input type="text" className="comment-input" placeholder="Add comment" />
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
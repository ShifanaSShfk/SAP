import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchFacultyEvents } from '../../services/api'; // Import the API function
import '../../styles/Faculty/MyEvents.css';

// Event Card Component
const EventCard = ({ event }) => {
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const getStatus = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(`${startDate}T${event.eventStartTime}`);
    const end = new Date(`${endDate}T${event.eventEndTime}`);

    if (now > end) return 'Completed';
    if (now >= start && now <= end) return 'Ongoing';
    return 'Upcoming';
  };

  return (
    <div className="event-card">
      <h3 className="event-title">{event.eventName}</h3>
      
      <div className="event-info">
        <div className="event-time">
          <i className="icon-clock"></i>
          <span>
            {formatTime(event.eventStartTime)} - {formatTime(event.eventEndTime)}
          </span>
        </div>
        <div className="event-date">
          <i className="icon-calendar"></i>
          <span>{formatDate(event.eventStartDate)}</span>
          {event.eventStartDate !== event.eventEndDate && (
            <span> to {formatDate(event.eventEndDate)}</span>
          )}
        </div>
      </div>

      <div className="event-status">
        <span className="status-label">Status:</span>
        <span className={`status-value ${getStatus(event.eventStartDate, event.eventEndDate).toLowerCase()}`}>
          {getStatus(event.eventStartDate, event.eventEndDate)}
        </span>
      </div>

      <Link to={`/event-details/${event.eventId}`} className="view-details-btn">
        View Details
      </Link>
    </div>
  );
};

// My Events Component
const MyEvents = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const facultyId = localStorage.getItem('userId');
        if (!facultyId) {
          throw new Error('Faculty ID not found');
        }

        const facultyEvents = await fetchFacultyEvents(facultyId);
        setEvents(facultyEvents);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching faculty events:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filterEventsByStatus = (status) => {
    const now = new Date();
    return events.filter(event => {
      const start = new Date(`${event.eventStartDate}T${event.eventStartTime}`);
      const end = new Date(`${event.eventEndDate}T${event.eventEndTime}`);

      if (status === 'All') return true;
      if (status === 'Completed') return now > end;
      if (status === 'Ongoing') return now >= start && now <= end;
      if (status === 'Upcoming') return now < start;
      return true;
    });
  };

  const filteredEvents = filterEventsByStatus(activeTab);

  if (loading) {
    return <div className="loading-message">Loading events...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="main-content">
      <main className="content-area">
        <div className="my-events-container">
          <div className="my-events-header">
            <h1>My Events</h1>
            <Link to="/add-event" className="add-event-btn">+ Add Event</Link>
          </div>

          <div className="events-tabs">
            {['All', 'Upcoming', 'Ongoing', 'Completed'].map(tab => (
              <button 
                key={tab}
                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="events-grid">
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <EventCard key={event.eventId} event={event} />
              ))
            ) : (
              <div className="no-events-message">
                No {activeTab.toLowerCase()} events found
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyEvents;
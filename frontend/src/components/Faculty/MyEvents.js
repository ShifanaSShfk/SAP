import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Faculty/MyEvents.css';

// Event Card Component
const EventCard = ({ event }) => {
  const renderStars = (rating) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} className={`star ${i < rating ? 'filled' : ''}`}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="event-card">
      <h3 className="event-title">{event.title}</h3>
      
      <div className="event-info">
        <div className="event-time">
          <i className="icon-clock"></i>
          <span>{event.time}</span>
        </div>
        <div className="event-date">
          <i className="icon-calendar"></i>
          <span>{event.date}</span>
        </div>
      </div>

      <div className="event-status">
        <span className="status-label">Status:</span>
        <span className={`status-value ${event.status.toLowerCase()}`}>
          {event.status}
        </span>
      </div>

      {event.status === 'Completed' && (
        <div className="event-rating">
          <span className="rating-label">Rating:</span>
          <div className="rating-stars">{renderStars(event.rating)}</div>
        </div>
      )}

      <Link to="/event-details" className="view-details-btn">View Details</Link>
    </div>
  );
};

// My Events Component
const MyEvents = () => {
  const [activeTab, setActiveTab] = useState('All');

  // Sample event data
  const events = [
    { id: 1, title: 'Hackathon, 2025', time: '10:00 AM', date: '03 Jan 2025', status: 'Completed', rating: 4 },
    { id: 2, title: 'CodeInit Hackathon, Beginner Edition', time: '6:00 PM', date: '10 Feb 2025', status: 'Upcoming', rating: 0 }
  ];

  const filteredEvents = events.filter(event => activeTab === 'All' || event.status === activeTab);

  return (
    <div className="main-content">
      <main className="content-area">
        <div className="my-events-container">
          <div className="my-events-header">
            <h1>My Events</h1>
            <Link to="/add-event" className="add-event-btn">+ Add Event</Link>
          </div>

          <div className="events-tabs">
            {['All', 'Upcoming', 'Completed'].map(tab => (
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
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MyEvents;

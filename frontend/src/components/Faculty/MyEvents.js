import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import Layout from '../components/layout/Layout';
//import Sidebar from './sidebar'; // Import Sidebar component
import '../../styles/Faculty/MyEvents.css';

// BellIcon and UserIcon components
const BellIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
  </svg>
);

const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

// Header Component
const Header = () => {
  return (
    <header className="header">
      <div className="header-title">My Events</div>
      <div className="header-actions">
        <button className="notification-btn">
          <BellIcon />
        </button>
        <div className="user-profile">
          <UserIcon />
        </div>
      </div>
    </header>
  );
};

// Event Card Component
const EventCard = ({ event }) => {
  const renderStars = (rating) => {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else {
        stars.push(<span key={i} className="star">★</span>);
      }
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
          <div className="rating-stars">
            {renderStars(event.rating)}
          </div>
        </div>
      )}
      
      <button className="view-details-btn"><Link to="/event-details">View Details</Link></button>
    </div>
  );
};

// Main My Events Component
const MyEvents = () => {
  const [activeTab, setActiveTab] = useState('All');
  
  // Sample event data
  const events = [
    {
      id: 1,
      title: 'Hackathon,2025',
      time: '10:00 AM',
      date: '03 Jan 2025',
      status: 'Completed',
      rating: 4,
    },
    {
      id: 2,
      title: 'CodeInit hackathon,Begi...',
      time: '6:00 PM',
      date: '10 Feb 2025',
      status: 'Upcoming',
      rating: 0,
    }
  ];

  // Filter events based on active tab
  const filteredEvents = events.filter(event => {
    if (activeTab === 'All') return true;
    return event.status === activeTab;
  });

  return (
    <div className="layout">
        
      <div className="main-content">
        <Header />
        <main className="content-area">
          <div className="my-events-container">
            <div className="my-events-header">
              <h1>My Events</h1>
              <div className="my-events-actions">
                <button className="add-event-btn"><Link to="/add-event">+Add Event</Link> </button>
               
              </div>
            </div>

            <div className="events-tabs">
              <button 
                className={`tab-btn ${activeTab === 'All' ? 'active' : ''}`}
                onClick={() => setActiveTab('All')}
              >
                All
              </button>
              <button 
                className={`tab-btn ${activeTab === 'Upcoming' ? 'active' : ''}`}
                onClick={() => setActiveTab('Upcoming')}
              >
                Upcoming
              </button>
              <button 
                className={`tab-btn ${activeTab === 'Completed' ? 'active' : ''}`}
                onClick={() => setActiveTab('Completed')}
              >
                Completed
              </button>
            </div>

            <div className="events-grid">
              {filteredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyEvents;
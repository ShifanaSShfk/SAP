import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CalendarApp from './calendarFA';
import { fetchFacultyEvents } from '../../services/api';
import './../../styles/CalendarPage.css';

const CalendarPage = ({ faculty }) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetchFacultyEvents(faculty.facultyId);
        setEvents(response.data);
      } catch (error) {
        console.error('Error loading events:', error);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, [faculty.facultyId]);

  const handleAddEvent = (eventData) => {
    navigate('/faculty/events/add', {
      state: {
        defaultDate: eventData.date.toISOString(),
        facultyInChargeId: faculty.facultyId,
        facultyName: faculty.facultyName
      }
    });
  };

  if (loading) return <div className="loading">Loading calendar...</div>;

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <h1>{faculty.facultyName}'s Calendar</h1>
        <p>Manage and view your scheduled events</p>
      </div>
      
      <div className="calendar-content">
        <CalendarApp 
          faculty={faculty} 
          onAddEvent={handleAddEvent}
          events={events}
        />
      </div>
    </div>
  );
};

export default CalendarPage;
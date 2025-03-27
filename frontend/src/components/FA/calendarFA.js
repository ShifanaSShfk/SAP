import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, Plus, User } from 'lucide-react';
import { fetchEventsByDate } from '../../services/api';
import '../../styles/calendar.css';

const CalendarApp = ({ faculty, onAddEvent, events: initialEvents = [] }) => {
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        const response = await fetchEventsByDate(currentYear, currentMonth + 1);
        setEvents(response || []);
      } catch (error) {
        console.error('Error loading events:', error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, [currentYear, currentMonth]);

  const handlePrevMonth = () => {
    setCurrentMonth(prev => (prev === 0 ? 11 : prev - 1));
    if (currentMonth === 0) {
      setCurrentYear(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => (prev === 11 ? 0 : prev + 1));
    if (currentMonth === 11) {
      setCurrentYear(prev => prev + 1);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleAddEventClick = () => {
    if (selectedDate && faculty) {
      onAddEvent({
        date: selectedDate,
        facultyInChargeId: faculty.facultyId,
        facultyName: faculty.facultyName
      });
    }
  };

  const getEventsForDate = (date) => {
    if (!Array.isArray(events)) return [];
    return events.filter(event => 
      new Date(event.eventDate).toDateString() === date.toDateString()
    );
  };

  const selectedEvents = getEventsForDate(selectedDate);

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="nav-button" onClick={handlePrevMonth} disabled={loading}>
          <ChevronLeft />
        </button>
        <h2>
          {new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long', year: 'numeric' })}
          {loading && <span className="loading-spinner"></span>}
        </h2>
        <button className="nav-button" onClick={handleNextMonth} disabled={loading}>
          <ChevronRight />
        </button>
      </div>

      <div className="calendar-grid">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="calendar-day-header">{day}</div>
        ))}

        {getCalendarDays(currentYear, currentMonth).map((day, index) => {
          const dateEvents = getEventsForDate(day.date);
          const isToday = day.date.toDateString() === new Date().toDateString();
          const isSelected = day.date.toDateString() === selectedDate.toDateString();
          
          return (
            <div 
              key={index} 
              className={`calendar-day ${day.isCurrentMonth ? '' : 'other-month'} ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
              onClick={() => handleDateSelect(day.date)}
            >
              <div className="day-number">{day.date.getDate()}</div>
              {dateEvents.length > 0 && (
                <div className="event-indicator">
                  {dateEvents.length} event{dateEvents.length > 1 ? 's' : ''}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="calendar-events">
        <div className="events-header">
          <h3>
            Events on {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric', 
              year: 'numeric' 
            })}
          </h3>
          <button className="add-event-button" onClick={handleAddEventClick}>
            <Plus size={16} /> Add Event
          </button>
        </div>

        {selectedEvents.length > 0 ? (
          <div className="events-list">
            {selectedEvents.map(event => (
              <div key={event.eventId} className="event-card">
                <h4>{event.eventName}</h4>
                <div className="event-details">
                  <div className="detail-item">
                    <Clock size={16} />
                    <span>{event.eventTime}</span>
                  </div>
                  <div className="detail-item">
                    <MapPin size={16} />
                    <span>{event.location}</span>
                  </div>
                  {event.facultyInCharge && (
                    <div className="detail-item">
                      <User size={16} />
                      <span>{event.facultyInCharge.facultyName}</span>
                    </div>
                  )}
                </div>
                {event.description && (
                  <p className="event-description">{event.description}</p>
                )}
                <div className="event-points">
                  {event.activityPoints} Activity Points
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-events">
            No events scheduled for this day
          </div>
        )}
      </div>
    </div>
  );
};

function getCalendarDays(year, month) {
  const days = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  
  // Previous month days
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  const firstDayOfWeek = firstDay.getDay();
  
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    days.push({
      date: new Date(year, month - 1, prevMonthLastDay - i),
      isCurrentMonth: false
    });
  }
  
  // Current month days
  for (let day = 1; day <= lastDay.getDate(); day++) {
    days.push({
      date: new Date(year, month, day),
      isCurrentMonth: true
    });
  }
  
  // Next month days
  const daysNeeded = 42 - days.length; // 6 weeks
  for (let day = 1; day <= daysNeeded; day++) {
    days.push({
      date: new Date(year, month + 1, day),
      isCurrentMonth: false
    });
  }
  
  return days;
}

export default CalendarApp;
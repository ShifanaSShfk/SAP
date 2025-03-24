import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin} from 'lucide-react';
import "../styles/calendar.css";
// Calendar App Component
const CalendarApp = () => {
  // Current date for default view
  const currentDate = new Date();
  
  // State for tracking month and year being viewed
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  
  // State for selected date
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 1, 4)); // Default to Feb 4, 2025
  
  // State for selected event
  const [selectedEvent, setSelectedEvent] = useState(null);
  
  // Handle navigation between months
  const handlePrevMonth = () => {
    setCurrentMonth(prevMonth => {
      if (prevMonth === 0) {
        setCurrentYear(prevYear => prevYear - 1);
        return 11;
      }
      return prevMonth - 1;
    });
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(prevMonth => {
      if (prevMonth === 11) {
        setCurrentYear(prevYear => prevYear + 1);
        return 0;
      }
      return prevMonth + 1;
    });
  };
  
  // Sample event data
  const events = [
    {
      id: 1,
      date: new Date(2025, 2, 4), // Feb 4, 2025
      title: "Talk on Web Development",
      time: "10:30 AM",
      venue: "Aryabhatta Hall",
      description: "Join us for an insightful session on Web Development by Prof.John Paul from CSE Dept, covering the latest trends, best practices, and essential skills for building dynamic websites. Perfect for beginners and experienced developers alike!",
      points: 4
    },
    {
      id: 2,
      date: new Date(2025, 1, 8), // Feb 8, 2025
      title: "Workshop on UI/UX Design",
      time: "2:00 PM",
      venue: "Design Lab",
      description: "Learn the principles of effective user interface and experience design in this hands-on workshop. Create wireframes, prototypes, and understand user testing methodologies.",
      points: 5
    },
    {
      id: 3,
      date: new Date(2025, 1, 16), // Feb 16, 2025
      title: "Hackathon Kickoff",
      time: "9:00 AM",
      venue: "Main Auditorium",
      description: "Join the 24-hour coding challenge to build innovative solutions for real-world problems. Work in teams and compete for exciting prizes!",
      points: 8
    }
  ];
  
  // Find events for selected date
  const findEventForDate = (date) => {
    return events.find(event => 
      date.getDate() === event.date.getDate() &&
      date.getMonth() === event.date.getMonth() &&
      date.getFullYear() === event.date.getFullYear()
    );
  };
  
  // Handle date selection and load appropriate event
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const event = findEventForDate(date);
    setSelectedEvent(event || null);
  };
  
  return (
    <div className="calendar-container">
      <div className="calendar-main">
        
        
        <div className="calendar-content">
          <div className="calendar-grid-container">
            <CalendarGrid 
              currentMonth={currentMonth}
              currentYear={currentYear}
              selectedDate={selectedDate}
              setSelectedDate={handleDateSelect}
              events={events}
              onPrevMonth={handlePrevMonth}
          onNextMonth={handleNextMonth}
            />
          </div>
          
          <div className="event-details-container">
            <EventDetails event={selectedEvent} />
          </div>
        </div>
      </div>
      
    </div>
  );
};


// Calendar Grid Component
const CalendarGrid = ({ currentMonth, currentYear, selectedDate, setSelectedDate, events ,onPrevMonth, onNextMonth}) => {
  // Days of the week
  const daysOfWeek = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  // Month names
  
  
  // Get first day of the month and total days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  
  // Get day of week for first day (0 is Sunday, so we convert to Monday-based)
  let firstDayOfWeek = firstDayOfMonth.getDay() - 1;
  if (firstDayOfWeek < 0) firstDayOfWeek = 6; // Handle Sunday (convert from 0 to 6)
  
  // Generate calendar dates
  const calendarDays = [];
  
  // Previous month days to show
  for (let i = 0; i < firstDayOfWeek; i++) {
    calendarDays.push({ day: null, disabled: true });
  }
  
  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentYear, currentMonth, day);
    const isToday = isDateToday(date);
    const isSelected = selectedDate && 
      date.getDate() === selectedDate.getDate() && 
      date.getMonth() === selectedDate.getMonth() && 
      date.getFullYear() === selectedDate.getFullYear();
    
    // Check if day has events
    const hasEvent = events.some(event => 
      date.getDate() === event.date.getDate() && 
      date.getMonth() === event.date.getMonth() && 
      date.getFullYear() === event.date.getFullYear()
    );
    
    calendarDays.push({ 
      day, 
      date, 
      isToday,
      isSelected,
      disabled: false,
      hasEvent
    });
  }
  
  // Function to check if a date is today
  function isDateToday(date) {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  }
  
  return (
    <div className="calendar-grid">
      <div className="month-navigation">
        <button className="nav-button" onClick={onPrevMonth}>
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        
        <h3 className="month-title">
          {monthNames[currentMonth]} {currentYear}
        </h3>
        
        <button className="nav-button" onClick={onNextMonth}>
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      
      <div className="calendar-days">
        {daysOfWeek.map((day, index) => (
          <div key={index} className="day-name">
            {day}
          </div>
        ))}
      </div>
      
      <div className="calendar-dates">
        {calendarDays.map((dayObj, index) => {
          if (dayObj.disabled) {
            return (
              <div key={index} className="date-cell">
                <div className="date-button disabled"></div>
              </div>
            );
          }
          
          const buttonClasses = `date-button ${dayObj.isSelected ? 'selected' : ''} ${dayObj.isToday ? 'today' : ''}`;
          
          return (
            <div key={index} className="date-cell">
              <button
                className={buttonClasses}
                onClick={() => setSelectedDate(dayObj.date)}
              >
                {dayObj.day}
              </button>
              
              {dayObj.hasEvent && (
                <div className="event-indicator"></div>
              )}
            </div>
          );
        })}
      </div>
      
      <div className="timezone-info">
        <div className="time-display">
          Indian Standard Time ({new Date().toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'})})
        </div>
      </div>
    </div>
  );
};

// Event Details Component
const EventDetails = ({ event }) => {
  if (!event) {
    return (
      <div className="event-placeholder">
        <p>Select a date with an event to view details.</p>
      </div>
    );
  }
  
  return (
    <div className="animate-scale-in">
      <h2 className="event-title">{event.title}</h2>
      
      <div className="event-info">
        <div className="info-item">
          <Clock className="info-icon w-5 h-5" />
          <span>{event.time}</span>
        </div>
        
        <div className="info-item">
          <MapPin className="info-icon w-5 h-5 text-red-500" />
          <span>Venue: {event.venue}</span>
        </div>
      </div>
      
      <div className="event-description">
        <p>{event.description}</p>
      </div>
      
      <div className="event-points">
        <p>Activity Points: {event.points} Points</p>
      </div>
    </div>
  );
};

export default CalendarApp;
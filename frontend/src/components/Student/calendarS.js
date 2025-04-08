import React, { useState, useEffect } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import "./../../styles/calendar.css";

const Calendar = ({ onDateSelect }) => {
  const currentYear = new Date().getFullYear();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch events from backend
  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:8080/api/events/all", {
      withCredentials: true,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
      }}
    )
      .then((response) => {
        setEvents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        setLoading(false);
      });
  }, []);

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();

  const eventMap = {};
  events.forEach(event => {
    let startDate = new Date(event.eventStartDate);

    if (startDate.getFullYear() === year && startDate.getMonth() === month) {
      const eventDay = startDate.getDate();
      const key = `${month}-${eventDay}`;
      
      eventMap[key] = eventMap[key] || [];
      eventMap[key].push(event); // Push the entire event object
    }
  });

  const handleDateClick = (date) => {
    let key = `${month}-${date}`;
    setSelectedDate(date);
    onDateSelect(eventMap[key] || []);
  };

  const changeMonth = (delta) => {
    setCurrentDate(new Date(year, month + delta, 1));
    setSelectedDate(null);
    onDateSelect([]);
  };

  const handleYearChange = (event) => {
    setCurrentDate(new Date(Number(event.target.value), month, 1));
    setSelectedDate(null);
    onDateSelect([]);
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className="nav-button" onClick={() => changeMonth(-1)} disabled={loading}>
          <ChevronLeft />
        </button>
        <h3>
          {currentDate.toLocaleString("default", { month: "long" })}
          <select value={year} onChange={handleYearChange}>
            {Array.from({ length: 2999 - (currentYear - 1) }, (_, i) => currentYear - 1 + i).map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </h3>
        <button className="nav-button" onClick={() => changeMonth(1)} disabled={loading}>
          <ChevronRight />
        </button>
      </div>
      <div className="calendar-grid">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(day => (
          <div key={day} className="calendar-day-header">{day}</div>
        ))}
        {Array.from({ length: firstDay }, (_, i) => (
          <div key={`empty-${i}`} className="empty"></div>
        ))}
        {Array.from({ length: getDaysInMonth(year, month) }, (_, i) => {
          const date = i + 1;
          const key = `${month}-${date}`;
          const hasEvent = eventMap[key];

          return (
            <div
              key={date}
              className={`calendar-day ${selectedDate === date ? "selected" : ""} ${hasEvent ? "has-event" : ""}`}
              onClick={() => handleDateClick(date)}
            >
              <div className="day-number">{date}</div>
              {/* {hasEvent && (
                // <div className="event-indicator">
                //   {eventMap[key].length} event{eventMap[key].length > 1 ? 's' : ''}
                // </div>
              )} */}
            </div>
          );
        })}
      </div>
      {loading && <div className="loading-spinner"></div>}
    </div>
  );
};

export default Calendar;
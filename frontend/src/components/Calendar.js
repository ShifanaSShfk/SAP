import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../styles/Calendar.css";

const Calendar = ({ onDateSelect }) => {
  const currentYear = new Date().getFullYear();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);

  // Fetch events from backend
  useEffect(() => {
    axios.get("http://localhost:8080/api/events/all")
      .then((response) => setEvents(response.data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  // Function to get number of days in a month
  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

  // Get month & year
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();

  // Create event map for easy lookup
  const eventMap = {};
  events.forEach(event => {
    let startDate = new Date(event.event_start_date);
    let endDate = new Date(event.event_end_date);

    if (startDate.getFullYear() === year) {
      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        let day = d.getDate();
        eventMap[day] = eventMap[day] || [];
        eventMap[day].push({
          ...event,
          dayNumber: day - startDate.getDate() + 1, // "Day 1", "Day 2", etc.
        });
      }
    }
  });

  const handleDateClick = (date) => {
    setSelectedDate(date);
    onDateSelect(eventMap[date] || []);
  };

  const changeMonth = (delta) => {
    setCurrentDate(new Date(year, month + delta, 1));
    setSelectedDate(null);
    onDateSelect([]); // Reset selected event details when changing month
  };

  const handleYearChange = (event) => {
    setCurrentDate(new Date(Number(event.target.value), month, 1));
    setSelectedDate(null);
    onDateSelect([]); // Reset events when changing year
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)}>{"<"}</button>
        <select value={year} onChange={handleYearChange}>
          {Array.from({ length: 10 }, (_, i) => currentYear - 5 + i).map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <button onClick={() => changeMonth(1)}>{">"}</button>
      </div>
      <div className="calendar-grid">
        {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map(day => (
          <div key={day} className="calendar-day">{day}</div>
        ))}
        {Array.from({ length: firstDay }, (_, i) => <div key={`empty-${i}`} className="empty"></div>)}
        {Array.from({ length: getDaysInMonth(year, month) }, (_, i) => {
          const date = i + 1;
          const hasEvent = eventMap[date];

          return (
            <div
              key={date}
              className={`calendar-date ${selectedDate === date ? "selected" : ""} ${hasEvent ? "event-date" : ""}`}
              onClick={() => handleDateClick(date)}
            >
              {date}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
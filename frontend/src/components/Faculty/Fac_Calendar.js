import React, { useState } from "react";
import "../../styles/Faculty/Fac_Calendar.css"; // Import the CSS file

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="calendar-container">
      <main className="calendar-content">
        <h1>{selectedDate.toDateString()}</h1>
        <div className="calendar-grid">
          {[...Array(28)].map((_, i) => (
            <div key={i} className="calendar-day" onClick={() => handleDateClick(new Date(2025, 1, i + 1))}>
              {i + 1}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Calendar;

import React from "react";
import "../styles/UpcomingEvents.css";

const events = [
  {
    title: "Talk on Web Development",
    date: "Friday, 4th February",
    time: "10:30 AM",
  },
  {
    title: "Talk on AI/ML",
    date: "Wednesday, 5th February",
    time: "6:00 PM",
  },
];

const UpcomingEvents = () => {
  return (
    <div className="upcoming-events">
       <h3>Upcoming Events</h3>
          {events.map(event => (
            <div key={event.id} className="event">
              <p><strong>{event.title}</strong></p>
              <p>{event.date}, {event.time}</p>
            </div>
          ))}
      
        </div>
        
   
    
  );
};

export default UpcomingEvents;

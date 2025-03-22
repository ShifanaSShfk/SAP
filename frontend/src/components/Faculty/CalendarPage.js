import React, { useState } from "react";
import Calendar from "../Calendar";
import "./../../styles/Faculty/CalendarPage.css";

const EventPage = () => {
  const [selectedEvents, setSelectedEvents] = useState([]);

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-grow p-6 flex flex-col items-center">
        {/* Smaller Calendar */}
        <div className="w-1/3 p-4 mb-6 border rounded-lg shadow-md bg-white">
          <h2 className="text-lg font-semibold mb-2">Event Calendar</h2>
          <Calendar onDateSelect={setSelectedEvents} />
        </div>
        
        {/* Event Details */}
        {selectedEvents.length > 0 ? (
          <div className="w-2/3 p-4 bg-white shadow-lg rounded-lg">
            {selectedEvents.map((event, index) => (
              <div key={index} className="event-card p-4 border-b last:border-b-0">
                <h3 className="text-xl font-bold">{event.event_name} {event.dayNumber > 1 ? `- Day ${event.dayNumber}` : ""}</h3>
                <p><strong>Venue:</strong> {event.venue}</p>
                <p><strong>Time:</strong> {event.event_time}</p>
                <p><strong>Description:</strong> {event.description}</p>
                {event.poster && (
                  <img src={`data:image/png;base64,${event.poster}`} alt="Event Poster" className="mt-2 w-full rounded-lg" />
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Select an event date to see details.</p>
        )}
      </div>
    </div>
  );
};

export default EventPage;
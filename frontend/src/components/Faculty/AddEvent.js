// AddEvent.js
import React, { useState } from "react";
import { addEvent } from "../../services/api";

const AddEvent = () => {
  const [event, setEvent] = useState({
    event_name: "",
    event_start_date: "",
    event_end_date: "",
    event_time: "",
    venue: "",
    activity_points: "",
    faculty_in_charge: "",
    description: "",
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    if (name === "event_time") {
      value = value.slice(0, 5); // Ensure time is in HH:mm format
    }
    setEvent({ ...event, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedEvent = {
      ...event,
      event_start_date: event.event_start_date.split("T")[0], // Ensure "yyyy-MM-dd" format
      event_end_date: event.event_end_date.split("T")[0],
      event_time: event.event_time.slice(0, 5), // Ensure "HH:mm" format
    };

    try {
      await addEvent(formattedEvent);
      alert("Event added successfully!");
      setEvent({
        event_name: "",
        event_start_date: "",
        event_end_date: "",
        event_time: "",
        venue: "",
        activity_points: "",
        faculty_in_charge: "",
        description: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding event.");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <h2>Add Event</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="event_name"
            placeholder="Event Name"
            value={event.event_name}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="event_start_date"
            value={event.event_start_date}
            onChange={handleChange}
            required
          />
          {/* <input
            type="date"
            name="event_end_date"
            value={event.event_end_date}
            onChange={handleChange}
            required
          /> */}
          <input
            type="time"
            name="event_time"
            value={event.event_time}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="venue"
            placeholder="Venue"
            value={event.venue}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="activity_points"
            placeholder="Activity Points"
            value={event.activity_points}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="faculty_in_charge"
            placeholder="Faculty In-Charge"
            value={event.faculty_in_charge}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={event.description}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/Faculty/AddEvent.css";

const AddEvent = () => {
  const [event, setEvent] = useState({
    eventName: "",
    eventStartDate: "",
    eventEndDate: "",
    eventStartTime: "",
    eventEndTime: "",
    location: "",
    eventType: "",
    activityPoints: 0,
    description: "",
  });

  const [faculties, setFaculties] = useState([]);
  const [selectedFaculties, setSelectedFaculties] = useState([]);
  const [currentFaculty, setCurrentFaculty] = useState(null);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get current faculty details
        const facultyResponse = await axios.get(`http://localhost:8080/api/faculty/${userId}`);
        setCurrentFaculty(facultyResponse.data);
        
        // Get all faculties for selection
        const allFacultiesResponse = await axios.get("http://localhost:8080/api/faculty");
        setFaculties(allFacultiesResponse.data);
        
        // Automatically add current faculty as selected
        setSelectedFaculties([userId]);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error loading faculty data");
        navigate("/faculty-dashboard");
      }
    };
    fetchData();
  }, [userId, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleFacultySelect = (facultyId) => {
    setSelectedFaculties(prev => {
      if (prev.includes(facultyId)) {
        return prev.filter(id => id !== facultyId);
      } else {
        return [...prev, facultyId];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const eventData = {
        ...event,
        eventStartDate: event.eventStartDate.split("T")[0],
        eventEndDate: event.eventEndDate ? event.eventEndDate.split("T")[0] : event.eventStartDate.split("T")[0],
        eventStartTime: event.eventStartTime.slice(0, 5),
        eventEndTime: event.eventEndTime ? event.eventEndTime.slice(0, 5) : event.eventStartTime.slice(0, 5),
      };

      await axios.post("http://localhost:8080/api/events", eventData, {
        params: {
          facultyIds: selectedFaculties
        },
        paramsSerializer: { indexes: null } // To handle array params correctly
      });
      
      alert("Event created successfully!");
      navigate("/faculty-dashboard");
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Error creating event: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="add-event-container">
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit} className="event-form">
        {/* Event Name */}
        <div className="form-group">
          <label>Event Name *</label>
          <input
            type="text"
            name="eventName"
            value={event.eventName}
            onChange={handleChange}
            required
          />
        </div>

        {/* Date Fields */}
        <div className="form-row">
          <div className="form-group">
            <label>Start Date *</label>
            <input
              type="date"
              name="eventStartDate"
              value={event.eventStartDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              name="eventEndDate"
              value={event.eventEndDate}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Time Fields */}
        <div className="form-row">
          <div className="form-group">
            <label>Start Time *</label>
            <input
              type="time"
              name="eventStartTime"
              value={event.eventStartTime}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>End Time</label>
            <input
              type="time"
              name="eventEndTime"
              value={event.eventEndTime}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Location */}
        <div className="form-group">
          <label>Location *</label>
          <input
            type="text"
            name="location"
            value={event.location}
            onChange={handleChange}
            required
          />
        </div>

        {/* Activity Points */}
        <div className="form-group">
          <label>Activity Points *</label>
          <input
            type="number"
            name="activityPoints"
            value={event.activityPoints}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        {/* Event Type */}
        <div className="form-group">
          <label>Event Type *</label>
          <select
            name="eventType"
            value={event.eventType}
            onChange={handleChange}
            required
          >
            <option value="">Select Type</option>
            <option value="Departmental">Departmental</option>
            <option value="Institutional">Institutional</option>
          </select>
        </div>

        {/* Faculty In-Charge */}
        <div className="form-group">
          <label>Faculty In-Charge *</label>
          <div className="faculty-selection">
            {currentFaculty && (
              <div className="faculty-chip primary">
                {currentFaculty.facultyName} (You)
              </div>
            )}
            {faculties
              .filter(f => f.facultyId !== userId)
              .map(faculty => (
                <div
                  key={faculty.facultyId}
                  className={`faculty-chip ${selectedFaculties.includes(faculty.facultyId) ? 'selected' : ''}`}
                  onClick={() => handleFacultySelect(faculty.facultyId)}
                >
                  {faculty.facultyName}
                </div>
              ))}
          </div>
        </div>

        {/* Description */}
        <div className="form-group">
          <label>Description *</label>
          <textarea
            name="description"
            value={event.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate("/faculty-dashboard")}>
            Cancel
          </button>
          <button type="submit">Create Event</button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
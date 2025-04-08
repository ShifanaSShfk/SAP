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
    const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get current faculty details
        const facultyResponse = await axios.get(`http://localhost:8080/api/faculty/${userId}`,{
          withCredentials: true,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
          }
        });
        setCurrentFaculty(facultyResponse.data);
        
        // Get all faculties for selection
        const allFacultiesResponse = await axios.get("http://localhost:8080/api/faculty", {
          withCredentials: true,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("accessToken")}`
          }
        });
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
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem("accessToken")}`,
  },
  params: {
    facultyIds: selectedFaculties
  },
  paramsSerializer: {
    indexes: null  // To serialize array as `facultyIds=1&facultyIds=2`
  }
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

        {/* Faculty In-Charge (Searchable Multi-select) */}

        <div className="form-group">
  <label>Faculty In-Charge *</label>
  <div className="faculty-search-container">

    {/* Search Input */}
    <input
      type="text"
      placeholder="Search faculty..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="faculty-search"
    />

    {/* Searchable List */}
    <div className="faculty-select-container">
      {faculties
        .filter(faculty =>
          faculty.facultyName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map(faculty => {
          const isCurrent = faculty.facultyId === userId;
          const isSelected = selectedFaculties.includes(faculty.facultyId);
          return (
            <div
              key={faculty.facultyId}
              className={`faculty-option ${isSelected ? 'selected' : ''}`}
              onClick={() => handleFacultySelect(faculty.facultyId)}
            >
              {faculty.facultyName} {isCurrent ? "(You)" : ""} ({faculty.department})
            </div>
          );
        })}
    </div>

    {/* Selected Faculties Display */}
    <div className="selected-faculties">
      {selectedFaculties.map(facultyId => {
        const faculty = faculties.find(f => f.facultyId === facultyId);
        if (!faculty) return null;
        const isCurrent = faculty.facultyId === userId;
        return (
          <span key={facultyId} className="selected-faculty">
            {faculty.facultyName} {isCurrent ? "(You)" : ""}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleFacultySelect(facultyId);
              }}
            >
              ×
            </button>
          </span>
        );
      })}
    </div>
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
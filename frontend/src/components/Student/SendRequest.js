import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/Student/SendRequest.css";

const SendRequest = () => {
  const { eventId } = useParams();
  const [formData, setFormData] = useState({
    eventName: "",
    eventType: "",
    eventDate: "",
    eventTime: "",
    location: "",
    proofFile: null,
  });

  const [faculties, setFaculties] = useState([]);
  const [selectedFaculties, setSelectedFaculties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [studentData, setStudentData] = useState({
    name: "",
    rollNumber: "",
    facultyAdvisor: "",
    department: ""
  });
  const [loading, setLoading] = useState(true);
  const [eventDetails, setEventDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentId = localStorage.getItem("userId");
        
        // Fetch student data
        const studentResponse = await fetch(`http://localhost:8080/api/students/${studentId}`);
        const student = await studentResponse.json();
        
        // Fetch faculty advisor
        const advisorResponse = await fetch(`http://localhost:8080/api/faculty/${student.facultyAdvisorId}`);
        const advisor = await advisorResponse.json();
        
        // Fetch all faculties
        const facultiesResponse = await fetch("http://localhost:8080/api/faculty");
        const facultiesData = await facultiesResponse.json();
        
        // Fetch event details if eventId exists
        if (eventId) {
          const eventResponse = await fetch(`http://localhost:8080/api/events/${eventId}`);
          const event = await eventResponse.json();
          setEventDetails(event);
          
          // Prefill form with event details
          setFormData({
            eventName: event.eventName,
            eventType: event.eventType,
            eventDate: event.eventStartDate,
            eventTime: event.eventStartTime,
            location: event.location,
            proofFile: null
          });
          
          // Pre-select faculty in charge from event
          const eventFacultyIds = event.faculties.map(f => f.facultyId);
          setSelectedFaculties(eventFacultyIds);
        }
        
        setStudentData({
          name: student.studentName,
          rollNumber: student.studentId,
          facultyAdvisor: `${advisor.facultyName} (${advisor.department})`,
          department: student.department
        });
        
        setFaculties(facultiesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error loading required data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [eventId]);

  const handleChange = (e) => {
    // Only allow changes to fields that aren't prefilled from event
    if (!eventId || !['proofFile'].includes(e.target.name)) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleFacultySelect = (facultyId) => {
    if (!eventId) { // Only allow changes if not prefilled from event
      setSelectedFaculties(prev => {
        if (prev.includes(facultyId)) {
          return prev.filter(id => id !== facultyId);
        } else {
          return [...prev, facultyId];
        }
      });
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, proofFile: e.target.files[0] });
  };

  const handleCancel = () => {
    const confirmLeave = window.confirm("Are you sure you want to leave? Any unsaved data will be lost.");
    if (confirmLeave) {
      navigate(-1); // Go back to previous page
    }
  };

  const filteredFaculties = faculties.filter(faculty =>
    faculty.facultyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faculty.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (selectedFaculties.length === 0 && !eventId) {
      alert("Please select at least one faculty in charge");
      return;
    }
  
    const formDataObj = new FormData();
    formDataObj.append("name", studentData.name);
    formDataObj.append("rollNumber", studentData.rollNumber);
    
    if (eventId) {
      formDataObj.append("eventId", eventId);
    } else {
      formDataObj.append("eventName", formData.eventName);
      formDataObj.append("eventType", formData.eventType);
      formDataObj.append("eventDate", formData.eventDate);
      formDataObj.append("eventTime", formData.eventTime);
      formDataObj.append("location", formData.location);
      formDataObj.append("activityPoints", "10");
      // Add each faculty ID separately
      selectedFaculties.forEach(facultyId => {
        formDataObj.append("facultyInChargeIds", facultyId);
      });
    }
    
    if (formData.proofFile) {
      formDataObj.append("proofFile", formData.proofFile);
    }
  
    try {
      const endpoint = eventId ? 
        "http://localhost:8080/api/requests/event" : 
        "http://localhost:8080/api/requests/custom";
      
      const response = await fetch(endpoint, {
        method: "POST",
        body: formDataObj
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit request");
      }
  
      const result = await response.json();
      console.log("Request submitted successfully:", result);
      alert("Request submitted successfully!");
      navigate("/student-dashboard");
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Failed to submit request.");
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="send-request-container">
      <h2>{eventId ? "Send Participation Request" : "Submit New Request"}</h2>
      <form onSubmit={handleSubmit} className="request-form" encType="multipart/form-data">
        {/* Student Information (Read-only) */}
        <div className="student-info">
          <div className="info-row">
            <span className="info-label">Name:</span>
            <span className="info-value">{studentData.name}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Roll Number:</span>
            <span className="info-value">{studentData.rollNumber}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Department:</span>
            <span className="info-value">{studentData.department}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Faculty Advisor:</span>
            <span className="info-value">{studentData.facultyAdvisor}</span>
          </div>
        </div>

        {/* Event Name and Type */}
        <div className="form-row">
          <div className="form-group">
            <label>Event Name *</label>
            {eventId ? (
              <div className="prefilled-value">{formData.eventName}</div>
            ) : (
              <input
                type="text"
                name="eventName"
                placeholder="Enter event name"
                required
                value={formData.eventName}
                onChange={handleChange}
              />
            )}
          </div>
          <div className="form-group">
            <label>Event Type *</label>
            {eventId ? (
              <div className="prefilled-value">{formData.eventType}</div>
            ) : (
              <select
                name="eventType"
                required
                value={formData.eventType}
                onChange={handleChange}
              >
                <option value="">Select Event Type</option>
                <option value="Departmental">Departmental</option>
                <option value="Institutional">Institutional</option>
              </select>
            )}
          </div>
        </div>

        {/* Event Date and Time */}
        <div className="form-row">
          <div className="form-group">
            <label>Event Date *</label>
            {eventId ? (
              <div className="prefilled-value">{formData.eventDate}</div>
            ) : (
              <input
                type="date"
                name="eventDate"
                required
                value={formData.eventDate}
                onChange={handleChange}
              />
            )}
          </div>
          <div className="form-group">
            <label>Event Time *</label>
            {eventId ? (
              <div className="prefilled-value">{formData.eventTime}</div>
            ) : (
              <input
                type="time"
                name="eventTime"
                required
                value={formData.eventTime}
                onChange={handleChange}
              />
            )}
          </div>
        </div>

        {/* Location */}
        <div className="form-group">
          <label>Location *</label>
          {eventId ? (
            <div className="prefilled-value">{formData.location}</div>
          ) : (
            <input
              type="text"
              name="location"
              placeholder="Enter event location"
              required
              value={formData.location}
              onChange={handleChange}
            />
          )}
        </div>

        {/* Faculty In-Charge (Searchable Multi-select) */}
        {!eventId && (
          <div className="form-group">
            <label>Faculty In-Charge *</label>
            <div className="faculty-search-container">
              <input
                type="text"
                placeholder="Search faculty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="faculty-search"
              />
              <div className="faculty-select-container">
                {filteredFaculties.map(faculty => (
                  <div
                    key={faculty.facultyId}
                    className={`faculty-option ${selectedFaculties.includes(faculty.facultyId) ? 'selected' : ''}`}
                    onClick={() => handleFacultySelect(faculty.facultyId)}
                  >
                    {faculty.facultyName} ({faculty.department})
                  </div>
                ))}
              </div>
              <div className="selected-faculties">
                {selectedFaculties.map(facultyId => {
                  const faculty = faculties.find(f => f.facultyId === facultyId);
                  return faculty ? (
                    <span key={facultyId} className="selected-faculty">
                      {faculty.facultyName}
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
                  ) : null;
                })}
              </div>
            </div>
          </div>
        )}

        {/* File Upload */}
        <div className="form-group">
          <label>Proof Document *</label>
          <div className="file-upload-box">
            <p>Drag and drop your file here or click to browse</p>
            <p className="file-format">(Only JPG, PNG files allowed)</p>
            <input 
              type="file" 
              accept="image/png, image/jpeg" 
              required 
              onChange={handleFileChange} 
            />
            {formData.proofFile && (
              <p className="file-selected">Selected: {formData.proofFile.name}</p>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit">
            {eventId ? "Send Participation Request" : "Submit Request"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendRequest;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendStudentRequest } from "../../services/api";
import "../../styles/Student/SendRequest.css";

const SendRequest = () => {
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
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const handleFileChange = (e) => {
    setFormData({ ...formData, proofFile: e.target.files[0] });
  };

  const handleCancel = () => {
    const confirmLeave = window.confirm("Are you sure you want to leave? Any unsaved data will be lost.");
    if (confirmLeave) {
      navigate("/student-dashboard");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedFaculties.length === 0) {
      alert("Please select at least one faculty in charge");
      return;
    }

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null && formData[key] !== undefined) {
        formDataObj.append(key, formData[key]);
      }
    });

    // Add selected faculties to form data
    selectedFaculties.forEach(facultyId => {
      formDataObj.append("facultyIds", facultyId);
    });

    try {
      const response = await sendStudentRequest(formDataObj);
      console.log("Request submitted successfully:", response);
      
      alert("Request submitted successfully!");
      navigate("/student-dashboard");
    } catch (error) {
      console.error("Error submitting request:", error);
      alert("Failed to submit request.");
    }
  };

  const filteredFaculties = faculties.filter(faculty =>
    faculty.facultyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faculty.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="send-request-container">
      <h2>Submit New Request</h2>
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
            <input
              type="text"
              name="eventName"
              placeholder="Enter event name"
              required
              value={formData.eventName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Event Type *</label>
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
          </div>
        </div>

        {/* Event Date and Time */}
        <div className="form-row">
          <div className="form-group">
            <label>Event Date *</label>
            <input
              type="date"
              name="eventDate"
              required
              value={formData.eventDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Event Time *</label>
            <input
              type="time"
              name="eventTime"
              required
              value={formData.eventTime}
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
            placeholder="Enter event location"
            required
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        {/* Faculty In-Charge (Searchable Multi-select) */}
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
          <button type="submit">Submit Request</button>
        </div>
      </form>
    </div>
  );
};

export default SendRequest;
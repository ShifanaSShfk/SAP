import React, { useState } from "react";
import "../../styles/Student/SendRequest.css";
import { useNavigate } from "react-router-dom";
import { FaRegUserCircle, FaBell } from "react-icons/fa";
import { sendStudentRequest } from "../../services/api";

const SendRequest = () => {
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    eventName: "",
    eventDate: "",
    eventTime: "",
    location: "",
    facultyName: "",
    facultyAdvisorName: "",
    proofFile: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

    const formDataObj = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        formDataObj.append(key, formData[key]);
      }
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

  return (
    <div className="sap-container">
      
      <main className="content">
        {/* <header className="header">
          <h2>Activity Points</h2>
          <div className="icons">
            <FaBell className="icon" />
            <FaRegUserCircle className="icon" />
          </div>
        </header> */}
        <section className="send-request">
          <h3>New Request</h3>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-group">
              <input type="text" name="name" placeholder="Name *" required value={formData.name} onChange={handleChange} />
              <input type="text" name="rollNumber" placeholder="Roll Number *" required value={formData.rollNumber} onChange={handleChange} />
            </div>
            <div className="form-group">
              <input type="text" name="eventName" placeholder="Event Name *" required value={formData.eventName} onChange={handleChange} />
              <input type="date" name="eventDate" required value={formData.eventDate} onChange={handleChange} />
            </div>
            <div className="form-group">
              <input type="time" name="eventTime" required value={formData.eventTime} onChange={handleChange} />
              <input type="text" name="location" placeholder="Location" value={formData.location} onChange={handleChange} />
            </div>
            <div className="form-group">
              <input type="text" name="facultyName" placeholder="Faculty Name *" required value={formData.facultyName} onChange={handleChange} />
              <input type="text" name="facultyAdvisorName" placeholder="Faculty Advisor Name *" required value={formData.facultyAdvisorName} onChange={handleChange} />
            </div>
            <div className="file-upload">
              <p>Select your file of proof or drag and drop (jpg, png allowed)</p>
              <input type="file" accept="image/png, image/jpeg" required onChange={handleFileChange} />
            </div>
            <div className="form-buttons">
              <button type="button" className="cancel-button" onClick={handleCancel}>Cancel</button>
              <button type="submit" className="submit-button">Submit</button>
            </div>
          </form>
        </section>
      </main>
      <aside className="upcoming-events">
        <h3>Upcoming Events</h3>
        <div className="event">Talk on Web Development - Friday, 4th February, 10:30 AM</div>
        <div className="event">Talk on AI/ML - Wednesday, 5th February, 6:00 PM</div>
      </aside>
    </div>
  );
};

export default SendRequest;

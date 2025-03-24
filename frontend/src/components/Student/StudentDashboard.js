import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/Student/StudentDashboard.css';
//import { fetchStudentDetails } from "../../services/api"; // Ensure correct import


const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [facultyAdvisor, setFacultyAdvisor] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      const studentID = localStorage.getItem("studentID");

      if (!studentID) {
        setError("Student ID not found. Please log in again.");
        return;
      }

      try {
        // Fetch student details
        const studentResponse = await fetch(`http://localhost:8080/api/students/${studentID}`);
        if (!studentResponse.ok) throw new Error(`HTTP error! Status: ${studentResponse.status}`);

        const studentData = await studentResponse.json();
        setStudent(studentData);

        // Fetch faculty advisor details
        const facultyID = studentData.facultyAdvisorId;
        if (facultyID) {
          const facultyResponse = await fetch(`http://localhost:8080/api/faculty/${facultyID}`);
          if (!facultyResponse.ok) throw new Error(`Failed to fetch faculty details`);

          const facultyData = await facultyResponse.json();
          setFacultyAdvisor(facultyData.facultyName); // Extract only the faculty name
        }
      } catch (error) {
        console.error("Error fetching student details:", error);
        setError("Failed to load data. Please try again.");
      }
    };

    fetchStudentDetails();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <main className="main-content">
        <section className="student-info">
          <div className="info-card">
            
          <p><strong>Name:</strong> {student.studentName}</p>
            <p><strong>Student ID:</strong> {student.studentId}</p>
            <p><strong>Department:</strong> {student.department}</p>
            <p><strong>Section:</strong> {student.section}</p>
            <p><strong>Email:</strong> {student.email}</p> {/* Corrected field */}
            <p><strong>Contact:</strong> {student.contactNumber}</p>
            <p><strong>Faculty Advisor:</strong> {facultyAdvisor || "N/A"}</p>
            <p><strong>Institutional Points:</strong> {student.institutionalPoints}</p>
            <p><strong>Department Points:</strong> {student.departmentPoints}</p>
            <p><strong>Total Points:</strong> {student.totalPoints}</p>
            </div>
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;
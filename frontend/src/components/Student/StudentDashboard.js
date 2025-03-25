import React, { useEffect, useState } from 'react';
import { fetchStudentDetails, fetchFacultyDetails } from '../../services/api';
import '../../styles/Student/StudentDashboard.css';

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [facultyAdvisor, setFacultyAdvisor] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('User ID not found');
        }

        // Fetch student details
        const studentData = await fetchStudentDetails(userId);
        console.log('Student Data:', studentData); // Add this for debugging
        setStudent(studentData);

        // If student has faculty advisor, fetch their details
        if (studentData.facultyAdvisorId) {
          const facultyData = await fetchFacultyDetails(studentData.facultyAdvisorId);
          console.log('Faculty Data:', facultyData); // Add this for debugging
          setFacultyAdvisor(facultyData);
        }

      } catch (error) {
        console.error('Error loading student data:', error);
        setError(error.message || 'Failed to load student data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <main className="main-content">
        <section className="student-info">
          <h2>Student Dashboard</h2>
          <div className="info-card">
            <p><strong>Name:</strong> {student?.studentName || 'N/A'}</p>
            <p><strong>Student ID:</strong> {student?.studentId || 'N/A'}</p>
            <p><strong>Department:</strong> {student?.department || 'N/A'}</p>
            <p><strong>Section:</strong> {student?.section || 'N/A'}</p>
            <p><strong>Faculty Advisor:</strong> {facultyAdvisor?.name || 'N/A'}</p>
            <p><strong>Institutional Points:</strong> {student?.institutionalPoints || 0}</p>
            <p><strong>Departmental Points:</strong> {student?.departmentPoints || 0}</p>
            <p><strong>Total Points:</strong> {student?.totalPoints || 0}</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StudentDashboard;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchStudentDetails } from '../../services/api';
import '../../styles/profile.css';

const Profile = () => {
  const [student, setStudent] = useState({
    name: 'N/A',
    id: 'N/A',
    email: 'N/A',
    department: 'N/A',
    section: 'N/A',
    contact: 'N/A'
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) return;

        const studentData = await fetchStudentDetails(userId);
        
        setStudent({
          name: studentData.studentName || 'N/A',
          id: studentData.studentId || 'N/A',
          email: studentData.email || 'N/A',
          department: studentData.department || 'N/A',
          section: studentData.section || 'N/A',
          contact: studentData.contactNumber || 'N/A'
        });

        // Update localStorage as well
        localStorage.setItem('studentName', studentData.studentName || '');
        localStorage.setItem('studentId', studentData.studentId || '');
        localStorage.setItem('email', studentData.email || '');
        localStorage.setItem('department', studentData.department || '');
        localStorage.setItem('section', studentData.section || '');
        localStorage.setItem('contactNumber', studentData.contactNumber || '');

      } catch (error) {
        console.error('Error loading profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  return (
    <div className="profile-container">
      <h2>Student Profile</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> {student.name}</p>
        <p><strong>Student ID:</strong> {student.id}</p>
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Department:</strong> {student.department}</p>
        <p><strong>Section:</strong> {student.section}</p>
        <p><strong>Contact:</strong> {student.contact}</p>
      </div>
      <Link to="/student-dashboard" className="back-btn">
        ← Back to Dashboard
      </Link>
    </div>
  );
};

export default Profile;
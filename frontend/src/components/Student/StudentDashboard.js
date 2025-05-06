import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { fetchStudentDetails, fetchFacultyDetails } from '../../services/api';
import '../../styles/Student/StudentDashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const StudentDashboard = () => {
  const [student, setStudent] = useState(null);
  const [facultyAdvisor, setFacultyAdvisor] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/students/top");

        const data = await response.json();
        console.log(data); // Add this line to log the response
        setLeaderboard(data);
      } catch (err) {
        console.error("Failed to fetch leaderboard", err);
      }
    };
  
    fetchLeaderboard();
  }, []);  

  useEffect(() => {
    const loadData = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) throw new Error('User ID not found');

        const studentData = await fetchStudentDetails(userId);
        setStudent(studentData);

        if (studentData.facultyAdvisorId) {
          const facultyData = await fetchFacultyDetails(studentData.facultyAdvisorId);
          setFacultyAdvisor(facultyData);
        }
      } catch (error) {
        setError(error.message || 'Failed to load student data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error-message">{error}</div>;

  const pieData = {
    labels: ['Institutional Points', 'Departmental Points'],
    datasets: [
      {
        data: [
          student?.institutionalPoints || 0,
          student?.departmentPoints || 0
        ],
        backgroundColor: ['#007bff', '#f7c948'], // blue and yellow
        borderWidth: 1,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#333',
          font: {
            size: 14,
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

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

        <section className="chart-section">
          <h3 className="chart-title">Activity Points Distribution</h3>
          <div className="chart-container">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </section>

        <section className="leaderboard-section">
  <h3 className="leaderboard-title">🏆 Top 5 Students</h3>
  <ol className="leaderboard-list">
    {leaderboard.length > 0 ? (
      leaderboard.map((student, index) => (
        <li key={student.studentId} className="leaderboard-item">
          <span className="rank">#{index + 1}</span>
          <span className="name">{student.studentName}</span>
          <span className="points">{student.totalPoints} pts</span>
        </li>
      ))
    ) : (
      <li>No leaderboard data available.</li>
    )}
  </ol>
</section>


      </main>
    </div>
  );
};

export default StudentDashboard;

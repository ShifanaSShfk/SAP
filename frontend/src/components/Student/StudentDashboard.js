import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import "../../styles/Student/StudentDashboard.css";

const StudentDashboard = () => {
  const student = {
    name: "Ravipati Nikhitha Choudhary",
    studentId: "B220492CS",
    branch: "Computer Science and Engineering",
    section: "CS02",
    email: "ravipati_b220492cs@nitc.ac.in",
    contact: "+91 9119119110",
  };

  const upcomingEvents = [
    { id: 1, title: "Talk on Web Development", date: "Friday, 4th February", time: "10:30 AM" },
    { id: 2, title: "Talk on AI/ML", date: "Wednesday, 5th February", time: "6:00 PM" },
  ];

  const leaderboard = [
    { id: 1, name: "Iman", points: 2019 },
    { id: 2, name: "Vatani", points: 1932 },
    { id: 3, name: "Jonathan", points: 1481 },
    { id: 4, name: "Paul", points: 1241 },
    { id: 5, name: "Robert", points: 1051 },
  ];

  return (
    <div className="dashboard-container">
      
      
      <main className="main-content">
        
        <section className="student-info">
          <div className="info-card">
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Student ID:</strong> {student.studentId}</p>
            <p><strong>Branch:</strong> {student.branch}</p>
            <p><strong>Section:</strong> {student.section}</p>
            <p><strong>Email:</strong> <a href={`mailto:${student.email}`}>{student.email}</a></p>
            <p><strong>Contact:</strong> {student.contact}</p>
          </div>
        </section>

        {/* <section className="activity-points">
          <h3>Activity Points</h3>
          <canvas id="activityChart"></canvas>
        </section> */}
      </main>

      <aside className="right-sidebar">
        <div className="events-section">
          <h3>Upcoming Events</h3>
          {upcomingEvents.map(event => (
            <div key={event.id} className="event">
              <p><strong>{event.title}</strong></p>
              <p>{event.date}, {event.time}</p>
            </div>
          ))}
        </div>
        <div className="leaderboard">
          <h3>Leaderboard</h3>
          {leaderboard.map((user, index) => (
            <p key={user.id} className={`leaderboard-entry ${index === 0 ? "first-place" : ""}`}>
              {index + 1}. {user.name} - {user.points} pts
            </p>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default StudentDashboard;
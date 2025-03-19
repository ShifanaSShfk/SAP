import React, { useState, useEffect } from "react";
import "../../styles/Faculty/FacultyDashboard.css"; // Import CSS file
import { Link } from "react-router-dom";

const FacultyDashboard = () => {
  const [tasks] = useState([
    { id: 1, requester: "Nikitha", requestType: "sent a request", eventName: "Hackathon", date: "Today", status: "pending" },
    { id: 2, requester: "Nikitha", requestType: "sent a request", eventName: "CodeInit", date: "25 Jan", status: "completed" }
  ]);
  const upcomingEvents = [
    { id: 1, title: "Talk on Web Development", date: "Friday, 4th February", time: "10:30 AM" },
    { id: 2, title: "Talk on AI/ML", date: "Wednesday, 5th February", time: "6:00 PM" },
  ];
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    if (window.innerWidth < 768) {
      document.getElementById("sidebar")?.classList.add("sidebar-closed");
    }
  }, []);

  return (
    <div className="min-h-screen flex bg-background">
      

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="header">
          <div className="header-title">Manjusha K</div>
        </header>
        <div className="main-content">
          <h2 className="section-title">My Tasks</h2>
          
          <div className="task-tabs">
            {["all", "pending", "completed"].map(filter => (
              <button key={filter} className={`task-tab ${activeFilter === filter ? "active" : ""}`} onClick={() => setActiveFilter(filter)}>
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
          <div id="tasksContainer">
            
            {tasks.filter(t => activeFilter === "all" || t.status === activeFilter).map(task => (
              <div key={task.id} className="task-card">
                <p><strong>{task.requester}</strong> {task.requestType} on <strong>{task.eventName}<button className="details-btn"><Link to="/fac-overview">View Details</Link> </button></strong></p>
                <span className={`task-status ${task.status === "pending" ? "task-status-pending" : "task-status-completed"}`}>
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
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
        
      </aside>
    </div>
  );
};

export default FacultyDashboard;
import React, { useState, useEffect } from "react";
import "../styles/FacultyDashboard.css"; // Import CSS file

const FacultyDashboard = () => {
  const [tasks] = useState([
    { id: 1, requester: "Nikitha", requestType: "sent a request", eventName: "Hackathon", date: "Today", status: "pending" },
    { id: 2, requester: "Nikitha", requestType: "sent a request", eventName: "CodeInit", date: "25 Jan", status: "completed" }
  ]);

  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    if (window.innerWidth < 768) {
      document.getElementById("sidebar")?.classList.add("sidebar-closed");
    }
  }, []);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <div id="sidebar" className="sidebar">
        <div className="sidebar-logo">
          <h1>SAP</h1>
          <button id="closeSidebar" className="sidebar-toggle">✖</button>
        </div>
        <nav className="sidebar-nav space-y-1">
          <a href="#" className="sidebar-item active">Dashboard</a>
          <a href="#" className="sidebar-item">My Events</a>
          <a href="#" className="sidebar-item">Calendar</a>
          <a href="#" className="sidebar-item">Doubts</a>
        </nav>
      </div>

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
                <p><strong>{task.requester}</strong> {task.requestType} on <strong>{task.eventName}</strong></p>
                <span className={`task-status ${task.status === "pending" ? "task-status-pending" : "task-status-completed"}`}>
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;

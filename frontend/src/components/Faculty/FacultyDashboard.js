import React, { useState, useEffect } from "react";
import "../../styles/Faculty/FacultyDashboard.css";
import { Link, useLocation } from "react-router-dom";

const FacultyDashboard = () => {
  const [tasks] = useState([
    { id: 1, requester: "Nikitha", requestType: "sent a request", eventName: "Hackathon", date: "Today", status: "pending" },
    { id: 2, requester: "Nikitha", requestType: "sent a request", eventName: "CodeInit", date: "25 Jan", status: "completed" }
  ]);
  const [activeFilter, setActiveFilter] = useState("all");
  const location = useLocation();
  const isFacultyAdvisor = localStorage.getItem("isFacultyAdvisor") === "true";
  const isFAView = location.pathname.includes("fa-dashboard");

  useEffect(() => {
    if (window.innerWidth < 768) {
      document.getElementById("sidebar")?.classList.add("sidebar-closed");
    }
  }, []);

  return (
    <div className="min-h-screen flex bg-background">
      <div className="flex-1 flex flex-col">
        <div className="main-content">
          <h2 className="section-title">
            {isFacultyAdvisor && isFAView ? "Faculty Advisor View" : "Faculty View"}
          </h2>
          
          <div className="task-tabs">
            {["all", "pending", "completed"].map(filter => (
              <button 
                key={filter} 
                className={`task-tab ${activeFilter === filter ? "active" : ""}`} 
                onClick={() => setActiveFilter(filter)}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
          
          <div id="tasksContainer">
            {tasks
              .filter(t => activeFilter === "all" || t.status === activeFilter)
              .map(task => (
                <div key={task.id} className="task-card">
                  <p>
                    <strong>{task.requester}</strong> {task.requestType} on <strong>{task.eventName}</strong>
                    <button className="details-btn">
                      <Link to={isFAView ? "/fa-overview" : "/fac-overview"}>
                        View Details
                      </Link>
                    </button>
                  </p>
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
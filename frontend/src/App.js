import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import FacultyDashboard from "./components/FacultyDashboard";
import StudentDashboard from "./components/StudentDashboard";
import SendRequest from "./components/SendRequest";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} /> 
      <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
      <Route path="/student-dashboard" element={<StudentDashboard />} />
      <Route path="/send-request" element={<SendRequest />} />
    </Routes>
  );
}

export default App;

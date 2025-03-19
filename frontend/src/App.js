import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Layout from "./components/Layout"; // Import Layout
import FacultyDashboard from "./components/Faculty/FacultyDashboard";
import StudentDashboard from "./components/Student/StudentDashboard";
import SendRequest from "./components/Student/SendRequest";
import RequestStatus from "./components/Student/RequestStatus";
import Activitydetails from "./components/Faculty/activitydetails";
import Requesthistory from "./components/Student/requesthistory";
import FAQ from "./components/Faq";
import FacOverview from "./components/Faculty/FacRequestOverview";
import FacApproved from "./components/Faculty/FacRequestApproved";
import FacRejected from "./components/Faculty/FacRequestRejected";
import FacEvents from "./components/Faculty/MyEvents";
import EventDetails from "./components/Faculty/eventdetails";
import AddEvent from "./components/Faculty/AddEvent";
import Profile from "./pages/Profile"; // Import Profile Page


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} /> 
      <Route element={<Layout />}>
          <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/send-request" element={<SendRequest />} />
          <Route path="/request-status" element={<RequestStatus />} />
          <Route path="/request-details" element={<Activitydetails />} />
          <Route path="/request-history" element={<Requesthistory />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/fac-overview" element={<FacOverview />} />
          <Route path="/fac-approved" element={<FacApproved />} />
          <Route path="/fac-rejected" element={<FacRejected />} />
          <Route path="/fac-events" element={<FacEvents />} />
          <Route path="/event-details" element={<EventDetails />} />
          <Route path="/add-event" element={<AddEvent />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
    </Routes>
  );
}

export default App;
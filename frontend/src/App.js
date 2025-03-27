import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Layout from "./components/Layout";
import FacultyDashboard from "./components/Faculty/FacultyDashboard";
import StudentDashboard from "./components/Student/StudentDashboard";
import SendRequest from "./components/Student/SendRequest";
import RequestStatus from "./components/Student/RequestStatus";
import Activitydetails from "./components/Student/activitydetails";
import FAQ from "./components/Faq";
import FacOverview from "./components/Faculty/FacRequestOverview";
import FacApproved from "./components/Faculty/FacRequestApproved";
import FacRejected from "./components/Faculty/FacRequestRejected";
import FacEvents from "./components/Faculty/MyEvents";
import EventDetails from "./components/EventDetails";
import AddEvent from "./components/Faculty/AddEvent";
import Profile from "./components/Student/Profile";
import FacultyProfile from "./components/Faculty/FacultyProfile";
import FADashboard from "./components/FA/FADashboard";
import StudentDetails from "./components/FA/StudentDetails";
import FAOverview from "./components/FA/FARequestOverview";
import FAApproved from "./components/FA/FARequestApproved";
import FARejected from "./components/FA/FARequestRejected";
import PrivateRoute from "./components/PrivateRoute";
import GenerateReport from "./components/FA/GenerateReport";
import FacRequestDetails from "./components/Faculty/FacRequestDetails";
import FARequestDetails from "./components/FA/FARequestDetails";
import CalendarPageS from "./components/Student/CalendarPageS";
import CalendarPageF from "./components/Faculty/CalendarPageF";
import CalendarPageFA from "./components/FA/CalendarPageFA";

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Login />} />

      <Route element={<Layout />}>
      <Route path="/event-details/:eventId" element={<EventDetails />} />
      <Route path="/send-request/:eventId" element={<SendRequest />} />
      </Route>

      {/* Protected Routes */}
      {/* Student Routes */}
      <Route element={<Layout />}>
        <Route path="/student-dashboard" element={<PrivateRoute role="student"><StudentDashboard /></PrivateRoute>} />
        <Route path="/send-request" element={<PrivateRoute role="student"><SendRequest /></PrivateRoute>} />
        <Route path="/request-status" element={<PrivateRoute role="student"><RequestStatus /></PrivateRoute>} />
        <Route path="/request-details" element={<PrivateRoute role="student"><Activitydetails /></PrivateRoute>} />
        <Route path="/student-profile" element={<PrivateRoute role="student"><Profile /></PrivateRoute>} />
        <Route path="/faq" element={<PrivateRoute role="student"><FAQ /></PrivateRoute>} />
        <Route path="/student-calendar" element={<PrivateRoute role="student"><CalendarPageS /></PrivateRoute>} />
      </Route>

      {/* Faculty Routes */}
      <Route element={<Layout />}>
        <Route path="/faculty-dashboard" element={<PrivateRoute role="faculty"><FacultyDashboard /></PrivateRoute>} />
        <Route path="/fac-overview" element={<PrivateRoute role="faculty"><FacOverview /></PrivateRoute>} />
        <Route path="/fac-approved" element={<PrivateRoute role="faculty"><FacApproved /></PrivateRoute>} />
        <Route path="/fac-rejected" element={<PrivateRoute role="faculty"><FacRejected /></PrivateRoute>} />
        <Route path="/fac-events" element={<PrivateRoute role="faculty"><FacEvents /></PrivateRoute>} />
        <Route path="/event-details" element={<PrivateRoute role="faculty"><EventDetails /></PrivateRoute>} />
        <Route path="/add-event" element={<PrivateRoute role="faculty"><AddEvent /></PrivateRoute>} />
        <Route path="/faculty-profile" element={<PrivateRoute role="faculty"><FacultyProfile /></PrivateRoute>} />
        <Route path="/faculty-faq" element={<PrivateRoute role="faculty"><FAQ facultyView /></PrivateRoute>} />
        <Route path="/fac-request/:requestId" element={<PrivateRoute role="faculty"><FacRequestDetails /></PrivateRoute>} />
        <Route path="/faculty-calendar" element={<PrivateRoute role="faculty"><CalendarPageF /></PrivateRoute>} />
      </Route>

      {/* FA Routes */}
      <Route element={<Layout sidebarType="fa" />}>
        <Route path="/fa-dashboard" element={<PrivateRoute role="fa" faRequired><FADashboard /></PrivateRoute>} />
        <Route path="/student-details" element={<PrivateRoute role="fa" faRequired><StudentDetails /></PrivateRoute>} />
        <Route path="/generate-report" element={<PrivateRoute role="fa" faRequired><GenerateReport /></PrivateRoute>} />
        <Route path="/fa-faq" element={<PrivateRoute role="fa" faRequired><FAQ faView /></PrivateRoute>} />
        <Route path="/fa-overview" element={<PrivateRoute role="fa" faRequired><FAOverview /></PrivateRoute>} />
        <Route path="/fa-approved" element={<PrivateRoute role="fa" faRequired><FAApproved /></PrivateRoute>} />
        <Route path="/fa-rejected" element={<PrivateRoute role="fa" faRequired><FARejected /></PrivateRoute>} />
        <Route path="/fa-request/:requestId" element={<PrivateRoute role="fa" faRequired><FARequestDetails /></PrivateRoute>} />
        <Route path="/fa-calendar" element={<PrivateRoute role="faculty"><CalendarPageFA /></PrivateRoute>} />
      </Route>
    </Routes>
  );
}

export default App;
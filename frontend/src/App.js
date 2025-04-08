import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Layout from "./components/Layout";
import FacultyDashboard from "./components/Faculty/FacultyDashboard";
import StudentDashboard from "./components/Student/StudentDashboard";
import SendRequest from "./components/Student/SendRequest";
import RequestStatus from "./components/Student/RequestStatus";
import StudentRequestDetails from "./components/Student/StudentRequestDetails";
import FAQ from "./components/Faq";
import FacEvents from "./components/Faculty/MyEvents";
import EventDetails from "./components/EventDetails";
import AddEvent from "./components/Faculty/AddEvent";
import Profile from "./components/Student/Profile";
import FacultyProfile from "./components/Faculty/FacultyProfile";
import FADashboard from "./components/FA/FADashboard";
import StudentDetails from "./components/FA/StudentDetails";
import PrivateRoute from "./components/PrivateRoute";
import GenerateReport from "./components/FA/GenerateReport";
import FacRequestDetails from "./components/Faculty/FacRequestDetails";
import FARequestDetails from "./components/FA/FARequestDetails";
import CalendarPageS from "./components/Student/CalendarPageS";
import CalendarPageF from "./components/Faculty/CalendarPageF";
import OAuthHandler from './components/OAuthHandler';
import ForgotPassword from "./components/ForgotPassword";
import AdminDashboard from "./components/Admin/AdminDashboard";

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route element={<Layout />}>
      <Route path="/event-details/:eventId" element={<EventDetails />} />
      <Route path="/send-request/:eventId" element={<SendRequest />} />
      <Route path="/oauth-success" element={<OAuthHandler />} />
      </Route>

      {/* Protected Routes */}
      {/* Student Routes */}
      <Route element={<Layout />}>
        <Route path="/student-dashboard" element={<PrivateRoute role="student"><StudentDashboard /></PrivateRoute>} />
        <Route path="/send-request" element={<PrivateRoute role="student"><SendRequest /></PrivateRoute>} />
        <Route path="/request-status" element={<PrivateRoute role="student"><RequestStatus /></PrivateRoute>} />
        <Route path="/student-request-details" element={<PrivateRoute role="student"><StudentRequestDetails /></PrivateRoute>} />
        <Route path="/student-profile" element={<PrivateRoute role="student"><Profile /></PrivateRoute>} />
        <Route path="/faq" element={<PrivateRoute role="student"><FAQ /></PrivateRoute>} />
        <Route path="/student-calendar" element={<PrivateRoute role="student"><CalendarPageS /></PrivateRoute>} />
      </Route>

      {/* Faculty Routes */}
      <Route element={<Layout />}>
        <Route path="/faculty-dashboard" element={<PrivateRoute role="faculty"><FacultyDashboard /></PrivateRoute>} />
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
        <Route path="/fa-request/:requestId" element={<PrivateRoute role="fa" faRequired><FARequestDetails /></PrivateRoute>} />
      </Route>

      {/* Admin Routes */}
      {/* <Route element={<Layout sidebarType="fa" />}>
        <Route path="/admin-dashboard" element={<PrivateRoute role="admin"><FADashboard /></PrivateRoute>} />
      </Route> */}
    </Routes>
  );
}

export default App;
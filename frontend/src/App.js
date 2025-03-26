// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Layout from "./components/Layout";
import FacultyDashboard from "./components/Faculty/FacultyDashboard";
import StudentDashboard from "./components/Student/StudentDashboard";
import SendRequest from "./components/Student/SendRequest";
import RequestStatus from "./components/Student/RequestStatus";
import Activitydetails from "./components/Student/activitydetails";
// import Requesthistory from "./components/Student/requesthistory";
import FAQ from "./components/Faq";
import FacOverview from "./components/Faculty/FacRequestOverview";
import FacApproved from "./components/Faculty/FacRequestApproved";
import FacRejected from "./components/Faculty/FacRequestRejected";
import FacEvents from "./components/Faculty/MyEvents";
import EventDetails from "./components/Faculty/eventdetails";
import AddEvent from "./components/Faculty/AddEvent";
import Profile from "./components/Student/Profile";
import FacultyProfile from "./components/Faculty/FacultyProfile"; 
import Calendar from "./components/calendar";
import FADashboard from "./components/FA/FADashboard";
import StudentDetails from "./components/FA/StudentDetails";
import FAOverview from "./components/FA/FARequestOverview";
import FAApproved from "./components/FA/FARequestApproved";
import FARejected from "./components/FA/FARequestRejected";
import PrivateRoute from "./components/PrivateRoute";
import GenerateReport from "./components/FA/GenerateReport";

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Login />} />

      {/* Protected Routes */}
      {/* Student Routes */}
      <Route element={<Layout />}>
        <Route path="/student-dashboard" element={<PrivateRoute role="student"><StudentDashboard /></PrivateRoute>} />
        <Route path="/send-request" element={<PrivateRoute role="student"><SendRequest /></PrivateRoute>} />
        <Route path="/request-status" element={<PrivateRoute role="student"><RequestStatus /></PrivateRoute>} />
        <Route path="/request-details" element={<PrivateRoute role="student"><Activitydetails /></PrivateRoute>} />
        {/* <Route path="/request-history" element={<PrivateRoute role="student"><Requesthistory /></PrivateRoute>} /> */}
        <Route path="/student-profile" element={<PrivateRoute role="student"><Profile /></PrivateRoute>} />
        <Route path="/faq" element={<PrivateRoute role="student"><FAQ /></PrivateRoute>} />
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
        <Route path="/faculty-calendar" element={<PrivateRoute role="faculty"><Calendar facultyView /></PrivateRoute>} />
        <Route path="/faculty-faq" element={<PrivateRoute role="faculty"><FAQ facultyView /></PrivateRoute>} />
      </Route>

{/* FA Routes */}
<Route element={<Layout sidebarType="fa" />}>
        <Route path="/fa-dashboard" element={<PrivateRoute role="fa" faRequired><FADashboard /></PrivateRoute>} />
        <Route path="/fa-calendar" element={<PrivateRoute role="fa" faRequired><Calendar faView /></PrivateRoute>} />
        <Route path="/student-details" element={<PrivateRoute role="fa" faRequired><StudentDetails /></PrivateRoute>} />
        <Route path="/generate-report" element={<PrivateRoute role="fa" faRequired><GenerateReport /></PrivateRoute>} />
        <Route path="/fa-faq" element={<PrivateRoute role="fa" faRequired><FAQ faView /></PrivateRoute>} />
      </Route>
    </Routes>
  );
}

export default App;
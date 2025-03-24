import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
  const location = useLocation();
  const userId = localStorage.getItem("userId");
  const userRole = localStorage.getItem("role");
  const isFacultyAdvisor = localStorage.getItem("isFacultyAdvisor") === "true";

  if (!userId) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Handle faculty advisor special case
  if (role === "fa") {
    return userRole === "faculty" && isFacultyAdvisor 
      ? children 
      : <Navigate to="/faculty-dashboard" replace />;
  }

  if (userRole !== role) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;
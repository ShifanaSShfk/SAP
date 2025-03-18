import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, role }) => {
  const userRole = localStorage.getItem("role");
  return userRole === role ? children : <Navigate to="/" />;
};

export default PrivateRoute;

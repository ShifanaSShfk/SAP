import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const OAuthHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");
    const role = query.get("role");
    const userId = query.get("userId");

    if (token && role && userId) {
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);

      // ✅ Redirect to dashboard or homepage
      if (role === "student") {
        navigate("/student-dashboard");
      }
      else if (role === "faculty") {
        navigate("/faculty-dashboard");
      } else if (role === "fa") {
        navigate("/fa-dashboard");
      }else {
        navigate("/login");
      }
    } else {
      // ❌ Missing data — go back to login
      navigate("/login");
    }
  }, [navigate]);

  return <div>Logging you in...</div>;
};

export default OAuthHandler;

import { useState } from "react";
import "./../styles/ForgotPassword.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
    const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleReset = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const response = await fetch("http://localhost:8080/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPassword }),
    });

    if (response.ok) {
      alert("Password reset successful!");
      setEmail("");
      setNewPassword("");
      setConfirmPassword("");
      navigate("/")
    } else {
      alert("Failed to reset password.");
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Reset Your Password</h2>
      <form
  onSubmit={(e) => {
    e.preventDefault(); // Prevent page reload
    handleReset();
  }}
>
  <input
    type="email"
    placeholder="Enter your email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
  />
  <input
    type="password"
    placeholder="Enter new password"
    value={newPassword}
    onChange={(e) => setNewPassword(e.target.value)}
    required
  />
  <input
    type="password"
    placeholder="Re-enter new password"
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
    required
  />
  <button type="submit">Reset Password</button>
</form>

    </div>
  );
};

export default ForgotPassword;

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [token, setToken] = useState(
    searchParams.get("token") || ""
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (!token.trim()) {
      setError("Reset token is required.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/reset-password`,
        {
          token: token.trim(),
          new_password: password,
        }
      );

      setMessage(response.data.message);

      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error("Password reset failed:", error);

      setError(
        error.response?.data?.message ||
        "Unable to reset password."
      );
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-container">

        <div className="auth-header">
          <p className="section-tag">
            RESET PASSWORD
          </p>

          <h1>
            Create New Password
          </h1>

          <p>
            Enter your new password below.
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          {message && (
            <div className="auth-success">
              {message}
            </div>
          )}

          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="token">
              Reset Token
            </label>

            <input
              id="token"
              type="text"
              placeholder="Enter reset token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              New Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">
              Confirm New Password
            </label>

            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-button"
          >
            Reset Password
          </button>

        </form>

        <div className="auth-footer">
          <p>
            Remember your password?
          </p>

          <Link to="/login">
            Back to Login
          </Link>
        </div>

      </div>
    </main>
  );
}

export default ResetPassword;
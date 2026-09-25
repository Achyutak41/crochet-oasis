import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/forgot-password`,
        {
          email: email.trim(),
        }
      );

      setMessage(response.data.message);

      // Development only: backend currently returns the reset token.
      if (response.data.reset_token) {
        console.log("Development reset token:", response.data.reset_token);
      }
    } catch (error) {
      console.error("Forgot password failed:", error);

      setError(
        error.response?.data?.message ||
        "Unable to process your request."
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
            Forgot Your Password?
          </h1>

          <p>
            Enter your email address to reset your password.
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
            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="auth-button"
          >
            Send Reset Link
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

export default ForgotPassword;
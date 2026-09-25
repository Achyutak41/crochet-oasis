import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      {
        email: formData.email.trim(),
        password: formData.password,
      }
    );

    console.log("Login successful:", response.data);

    login(response.data.user);

    navigate("/");
  } catch (error) {
    console.error("Login failed:", error);

    const message =
      error.response?.data?.message ||
      "Unable to login. Please check your credentials.";

    alert(message);
  }
};

  return (
    <main className="auth-page">

      <div className="auth-container">

        <div className="auth-header">

          <p className="section-tag">
            WELCOME BACK
          </p>

          <h1>
            Login to Crochet Oasis
          </h1>

          <p>
            Sign in to continue shopping.
          </p>

        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

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
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

          </div>

          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />

            <Link to="/forgot-password">
  Forgot Password?
</Link>

          </div>

          <button
            type="submit"
            className="auth-button"
          >
            Login
          </button>

        </form>

        <div className="auth-footer">

          <p>
            Don't have an account?
          </p>

          <Link to="/register">
            Create an Account
          </Link>

        </div>

      </div>

    </main>
  );
}

export default Login;
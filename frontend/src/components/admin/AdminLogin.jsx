import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

function AdminLogin() {

  const navigate = useNavigate();

  const { login } = useAdminAuth();


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const [error, setError] = useState("");


  const handleChange = (event) => {

    const {
      name,
      value,
    } = event.target;


    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    setError("");

  };


  const handleSubmit = (event) => {

    event.preventDefault();


    const result = login(
      formData.email,
      formData.password
    );


    if (!result.success) {

      setError(result.message);

      return;

    }


    navigate("/admin");

  };


  return (
    <main className="admin-login-page">

      <div className="admin-login-card">

        <div className="admin-login-logo">
          🧶
        </div>


        <p className="admin-section-tag">
          CROCHET OASIS
        </p>

        <h1>
          Admin Login
        </h1>

        <p className="admin-login-description">
          Sign in to manage your store,
          orders and products.
        </p>


        <form
          className="admin-login-form"
          onSubmit={handleSubmit}
        >

          <div className="admin-form-group">

            <label>
              Admin Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@crochetoasis.com"
              required
            />

          </div>


          <div className="admin-form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
            />

          </div>


          {error && (

            <p className="admin-login-error">
              {error}
            </p>

          )}


          <button
            type="submit"
            className="admin-login-button"
          >
            Sign In
          </button>

        </form>


        <div className="admin-login-back">

          <a href="/">
            ← Back to Store
          </a>

        </div>


        <div className="admin-demo-credentials">

          <strong>
            Development Login
          </strong>

          <span>
            admin@crochetoasis.com
          </span>

          <span>
            admin123
          </span>

        </div>

      </div>

    </main>
  );
}

export default AdminLogin;
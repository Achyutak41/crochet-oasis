import { Link, useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../context/AdminAuthContext";

function AdminNavbar() {

  const navigate = useNavigate();

  const {
    admin,
    logout,
  } = useAdminAuth();


  const handleLogout = () => {

    logout();

    navigate("/admin/login");

  };


  return (
    <header className="admin-navbar">

      <div className="admin-navbar-brand">

        <span className="admin-brand-icon">
          🧶
        </span>

        <div>

          <h2>
            Crochet Oasis
          </h2>

          <span>
            Admin Panel
          </span>

        </div>

      </div>


      <div className="admin-navbar-actions">

        <span className="admin-navbar-user">
          Hi, {admin?.name || "Admin"}
        </span>


        <Link
          to="/"
          className="admin-store-link"
        >
          View Store ↗
        </Link>


        <button
          type="button"
          className="admin-logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </header>
  );
}

export default AdminNavbar;
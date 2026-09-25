import { Link, useLocation } from "react-router-dom";

function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="admin-sidebar">

      <div className="admin-sidebar-menu">

        <p className="admin-sidebar-title">
          MANAGEMENT
        </p>

        <Link
          to="/admin"
          className={`admin-sidebar-link ${
            location.pathname === "/admin"
              ? "active"
              : ""
          }`}
        >
          <span>📊</span>
          Dashboard
        </Link>


        <Link
          to="/admin/orders"
          className={`admin-sidebar-link ${
            location.pathname.startsWith("/admin/orders")
              ? "active"
              : ""
          }`}
        >
          <span>📦</span>
          Orders
        </Link>


        <Link
          to="/admin/products"
          className={`admin-sidebar-link ${
            location.pathname.startsWith("/admin/products")
              ? "active"
              : ""
          }`}
        >
          <span>🧶</span>
          Products
        </Link>

      </div>


      <div className="admin-sidebar-bottom">

        <Link
          to="/"
          className="admin-sidebar-link"
        >
          <span>🏠</span>
          Back to Store
        </Link>

      </div>

    </aside>
  );
}

export default AdminSidebar;
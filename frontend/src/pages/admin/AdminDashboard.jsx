import { Link } from "react-router-dom";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useOrders } from "../../context/OrderContext";
import products from "../../data/products";

function AdminDashboard() {

  const { orders } = useOrders();

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const confirmedOrders = orders.filter(
    (order) => order.status === "Confirmed"
  ).length;

  const totalOrderValue = orders.reduce(
    (total, order) => total + order.total,
    0
  );

  const recentOrders = orders.slice(0, 5);


  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };


  return (
    <div className="admin-page">

      {/* Sidebar */}

      <AdminSidebar />


      <div className="admin-main">

        {/* Top Navbar */}

        <AdminNavbar />


        {/* Dashboard Content */}

        <main className="admin-content">

          <div className="admin-page-heading">

            <div>

              <p className="admin-section-tag">
                ADMINISTRATION
              </p>

              <h1>
                Dashboard
              </h1>

              <p>
                Welcome back! Here's what's happening
                with Crochet Oasis.
              </p>

            </div>

          </div>


          {/* Statistics */}

          <section className="admin-stats-grid">

            <div className="admin-stat-card">

              <div className="admin-stat-icon">
                📦
              </div>

              <div>
                <span>
                  Total Orders
                </span>

                <strong>
                  {totalOrders}
                </strong>
              </div>

            </div>


            <div className="admin-stat-card">

              <div className="admin-stat-icon">
                ⏳
              </div>

              <div>
                <span>
                  Pending Orders
                </span>

                <strong>
                  {pendingOrders}
                </strong>
              </div>

            </div>


            <div className="admin-stat-card">

              <div className="admin-stat-icon">
                ✅
              </div>

              <div>
                <span>
                  Confirmed Orders
                </span>

                <strong>
                  {confirmedOrders}
                </strong>
              </div>

            </div>


            <div className="admin-stat-card">

              <div className="admin-stat-icon">
                🧶
              </div>

              <div>
                <span>
                  Products
                </span>

                <strong>
                  {products.length}
                </strong>
              </div>

            </div>

          </section>


          {/* Order Value */}

          <section className="admin-value-card">

            <div>

              <span>
                Total Order Value
              </span>

              <h2>
                ₹{totalOrderValue.toLocaleString("en-IN")}
              </h2>

              <p>
                Based on submitted order requests
              </p>

            </div>

            <div className="admin-value-icon">
              ₹
            </div>

          </section>


          {/* Recent Orders */}

          <section className="admin-section">

            <div className="admin-section-header">

              <div>

                <p className="admin-section-tag">
                  CUSTOMER ACTIVITY
                </p>

                <h2>
                  Recent Order Requests
                </h2>

              </div>

              <Link
                to="/admin/orders"
                className="admin-view-link"
              >
                View All →
              </Link>

            </div>


            {recentOrders.length === 0 ? (

              <div className="admin-empty-state">

                <div>
                  📦
                </div>

                <h3>
                  No orders yet
                </h3>

                <p>
                  Customer order requests will
                  appear here.
                </p>

              </div>

            ) : (

              <div className="admin-orders-table">

                <div className="admin-table-header">

                  <span>
                    Order
                  </span>

                  <span>
                    Customer
                  </span>

                  <span>
                    Date
                  </span>

                  <span>
                    Total
                  </span>

                  <span>
                    Status
                  </span>

                </div>


                {recentOrders.map((order) => (

                  <div
                    className="admin-table-row"
                    key={order.id}
                  >

                    <strong>
                      {order.id}
                    </strong>


                    <div className="admin-customer">

                      <span className="admin-avatar">
                        {order.customer.name
                          .charAt(0)
                          .toUpperCase()}
                      </span>

                      <span>
                        {order.customer.name}
                      </span>

                    </div>


                    <span>
                      {formatDate(order.date)}
                    </span>


                    <strong>
                      ₹{order.total.toLocaleString("en-IN")}
                    </strong>


                    <span
                      className={`admin-status ${order.status
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {order.status}
                    </span>

                  </div>

                ))}

              </div>

            )}

          </section>


          {/* Quick Actions */}

          <section className="admin-section">

            <div className="admin-section-header">

              <div>

                <p className="admin-section-tag">
                  QUICK ACCESS
                </p>

                <h2>
                  Manage Store
                </h2>

              </div>

            </div>


            <div className="admin-quick-grid">

              <Link
                to="/admin/orders"
                className="admin-quick-card"
              >

                <span>
                  📦
                </span>

                <div>

                  <h3>
                    Manage Orders
                  </h3>

                  <p>
                    Review customer order requests
                  </p>

                </div>

                <strong>
                  →
                </strong>

              </Link>


              <Link
                to="/admin/products"
                className="admin-quick-card"
              >

                <span>
                  🧶
                </span>

                <div>

                  <h3>
                    Manage Products
                  </h3>

                  <p>
                    Add and manage crochet products
                  </p>

                </div>

                <strong>
                  →
                </strong>

              </Link>

            </div>

          </section>

        </main>

      </div>

    </div>
  );
}

export default AdminDashboard;
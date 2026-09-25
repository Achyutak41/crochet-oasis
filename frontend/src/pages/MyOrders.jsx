import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrderContext";

function MyOrders() {
  const { user, isAuthenticated } = useAuth();
  const { getOrdersByEmail } = useOrders();

  if (!isAuthenticated) {
    return (
      <main className="orders-page">
        <div className="orders-empty">

          <div className="orders-empty-icon">
            🔐
          </div>

          <h1>
            Login to View Your Orders
          </h1>

          <p>
            Please login to see your order requests
            and their current status.
          </p>

          <Link
            to="/login"
            className="product-button"
          >
            Login
          </Link>

        </div>
      </main>
    );
  }

  const customerEmail = user?.email || "";

  const customerOrders =
    getOrdersByEmail(customerEmail);

  return (
    <main className="orders-page">

      <div className="orders-container">

        <div className="orders-header">

          <p className="section-tag">
            YOUR ORDERS
          </p>

          <h1>
            My Orders
          </h1>

          <p>
            View your order requests and their
            current status.
          </p>

        </div>

        {customerOrders.length === 0 ? (

          <div className="orders-empty">

            <div className="orders-empty-icon">
              📦
            </div>

            <h2>
              No Orders Yet
            </h2>

            <p>
              You haven't submitted any order
              requests yet.
            </p>

            <Link
              to="/products"
              className="product-button"
            >
              Start Shopping
            </Link>

          </div>

        ) : (

          <div className="orders-list">

            {customerOrders.map((order) => (

              <div
                className="order-card"
                key={order.id}
              >

                {/* Header */}

                <div className="order-card-header">

                  <div>
                    <span>
                      ORDER ID
                    </span>

                    <h2>
                      {order.id}
                    </h2>
                  </div>

                  <div
                    className={`order-status ${order.status.toLowerCase()}`}
                  >
                    {order.status}
                  </div>

                </div>

                {/* Date */}

                <p className="order-date">
                  {new Date(order.date).toLocaleDateString(
                    "en-IN",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </p>

                {/* Products */}

                <div className="order-items">

                  {order.items.map((item) => (

                    <div
                      className="order-history-item"
                      key={item.id}
                    >

                      <img
                        src={item.image}
                        alt={item.name}
                      />

                      <div>
                        <h3>
                          {item.name}
                        </h3>

                        <p>
                          ₹{item.price} × {item.quantity}
                        </p>
                      </div>

                      <strong>
                        ₹{item.price * item.quantity}
                      </strong>

                    </div>

                  ))}

                </div>

                {/* Footer */}

                <div className="order-card-footer">

                  <span>
                    Total
                  </span>

                  <strong>
                    ₹{order.total}
                  </strong>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}

export default MyOrders;
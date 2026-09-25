import { useMemo, useState } from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useOrders } from "../../context/OrderContext";

function AdminOrders() {
  const {
    orders,
    updateOrderStatus,
  } = useOrders();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);


  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {

      const searchText = search.toLowerCase();

      const matchesSearch =
        String(order.id).toLowerCase().includes(searchText) ||
        order.customer.name
          .toLowerCase()
          .includes(searchText) ||
        order.customer.email
          .toLowerCase()
          .includes(searchText);

      const matchesStatus =
        statusFilter === "All" ||
        order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);


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


  const handleStatusChange = (
    orderId,
    newStatus
  ) => {

    updateOrderStatus(
      orderId,
      newStatus
    );

    setSelectedOrder((currentOrder) =>
      currentOrder
        ? {
            ...currentOrder,
            status: newStatus,
          }
        : null
    );
  };


  return (
    <div className="admin-page">

      <AdminSidebar />

      <div className="admin-main">

        <AdminNavbar />

        <main className="admin-content">

          {/* Heading */}

          <div className="admin-page-heading">

            <p className="admin-section-tag">
              ORDER MANAGEMENT
            </p>

            <h1>
              Orders
            </h1>

            <p>
              Review and manage customer order requests.
            </p>

          </div>


          {/* Filters */}

          <section className="admin-order-controls">

            <input
              type="text"
              placeholder="Search order ID, customer or email..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              className="admin-search-input"
            />


            <div className="admin-filter-buttons">

              {[
                "All",
                "Pending",
                "Confirmed",
                "Completed",
                "Cancelled",
              ].map((status) => (

                <button
                  key={status}
                  type="button"
                  className={
                    statusFilter === status
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setStatusFilter(status)
                  }
                >
                  {status}
                </button>

              ))}

            </div>

          </section>


          {/* Orders */}

          {filteredOrders.length === 0 ? (

            <div className="admin-empty-state">

              <div>
                📦
              </div>

              <h3>
                No orders found
              </h3>

              <p>
                Try changing your search or filter.
              </p>

            </div>

          ) : (

            <section className="admin-orders-table">

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

                <span>
                  Action
                </span>

              </div>


              {filteredOrders.map((order) => (

                <div
                  className="admin-orders-row"
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

                    <div>

                      <strong>
                        {order.customer.name}
                      </strong>

                      <small>
                        {order.customer.email || "No email"}
                      </small>

                    </div>

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


                  <button
                    type="button"
                    className="admin-details-button"
                    onClick={() =>
                      setSelectedOrder(order)
                    }
                  >
                    View
                  </button>

                </div>

              ))}

            </section>

          )}


        </main>

      </div>


      {/* Order Details Modal */}

      {selectedOrder && (

        <div
          className="admin-modal-overlay"
          onClick={() =>
            setSelectedOrder(null)
          }
        >

          <div
            className="admin-order-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            <div className="admin-modal-header">

              <div>

                <p className="admin-section-tag">
                  ORDER DETAILS
                </p>

                <h2>
                  {selectedOrder.id}
                </h2>

              </div>

              <button
                type="button"
                className="admin-modal-close"
                onClick={() =>
                  setSelectedOrder(null)
                }
              >
                ×
              </button>

            </div>


            {/* Customer */}

            <div className="admin-detail-section">

              <h3>
                Customer Information
              </h3>

              <div className="admin-customer-details">

                <p>
                  <strong>Name</strong>
                  {selectedOrder.customer.name}
                </p>

                <p>
                  <strong>Phone</strong>
                  {selectedOrder.customer.phone || "Not provided"}
                </p>

                <p>
                  <strong>Email</strong>
                  {selectedOrder.customer.email || "Not provided"}
                </p>

              </div>

            </div>


            {/* Items */}

            <div className="admin-detail-section">

              <h3>
                Order Items
              </h3>

              <div className="admin-order-items">

                {selectedOrder.items.map((item) => (

                  <div
                    className="admin-order-item"
                    key={item.id}
                  >

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div>

                      <strong>
                        {item.name}
                      </strong>

                      <span>
                        ₹{item.price} × {item.quantity}
                      </span>

                    </div>

                    <strong>
                      ₹{(
                        item.price *
                        item.quantity
                      ).toLocaleString("en-IN")}
                    </strong>

                  </div>

                ))}

              </div>

            </div>


            {/* Total */}

            <div className="admin-order-total">

              <span>
                Total
              </span>

              <strong>
                ₹{selectedOrder.total.toLocaleString("en-IN")}
              </strong>

            </div>


            {/* Status */}

            <div className="admin-detail-section">

              <h3>
                Order Status
              </h3>

              <select
                value={selectedOrder.status}
                onChange={(event) =>
                  handleStatusChange(
                    selectedOrder.id,
                    event.target.value
                  )
                }
                className="admin-status-select"
              >

                <option value="Pending">
                  Pending
                </option>

                <option value="Confirmed">
                  Confirmed
                </option>

                <option value="Completed">
                  Completed
                </option>

                <option value="Cancelled">
                  Cancelled
                </option>

              </select>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default AdminOrders;
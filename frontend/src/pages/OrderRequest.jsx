import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useOrders } from "../context/OrderContext";
function OrderRequest() {
  const navigate = useNavigate();
const { user } = useAuth();
const { createOrder } = useOrders();
  const {
    cartItems,
    cartTotal,
    clearCart,
  } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
};

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !formData.name.trim() ||
    !formData.phone.trim()
  ) {
    alert("Please enter your name and phone number.");
    return;
  }

  try {
    const order = await createOrder({
      customer: {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email:
          formData.email.trim() ||
          user?.email ||
          "",
      },

      items: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),

      total: cartTotal,

      notes: formData.notes.trim(),
    });

    console.log("Order Created:", order);

    setSubmitted(true);
  } catch (error) {
    console.error("Order creation failed:", error);

    alert(
      "Unable to submit your order. Please make sure the backend is running."
    );
  }
};

  const handleFinish = () => {
    clearCart();
    navigate("/orders");
  };

  if (cartItems.length === 0 && !submitted) {
    return (
      <div className="order-empty">
        <div className="order-empty-icon">🛍️</div>

        <h2>Your cart is empty</h2>

        <p>
          Add some handmade products before submitting
          an order request.
        </p>

        <button
          className="order-primary-button"
          onClick={() => navigate("/products")}
        >
          Browse Products
        </button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="order-success-page">
        <div className="order-success-card">

          <div className="success-icon">
            ✓
          </div>

          <h1>Order Request Received!</h1>

          <p className="success-main-text">
            Thank you, <strong>{formData.name}</strong>.
          </p>

          <p>
            Your order request has been received successfully.
            Our Crochet Oasis team will contact you at{" "}
            <strong>{formData.phone}</strong> to confirm
            availability and payment details.
          </p>

          <div className="success-note">
            <strong>What happens next?</strong>
            <span>
              We will contact you to confirm your order,
              customization details, and payment method.
            </span>
          </div>

          <button
            className="continue-shopping-btn"
            onClick={handleFinish}
          >
            Continue Shopping
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="order-request-page">

      {/* Header */}

      <div className="order-request-header">
        <span>ORDER REQUEST</span>

        <h1>Let's Create Your Order</h1>

        <p>
          Share your details and we'll contact you to
          confirm your handmade order.
        </p>
      </div>

      {/* Main Content */}

      <div className="order-request-layout">

        {/* LEFT - CUSTOMER FORM */}

        <div className="order-form-card">

          <div className="card-heading">
            <div className="heading-icon">
              👤
            </div>

            <div>
              <h2>Customer Information</h2>

              <p>
                Tell us how we can contact you.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit}>

            <div className="order-form-group">
              <label>
                Full Name <span>*</span>
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>

            <div className="order-form-group">
              <label>
                Phone Number <span>*</span>
              </label>

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="order-form-group">
              <label>
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
              />
            </div>

            <div className="order-form-group">
              <label>
                Special Requirements
              </label>

              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Need a custom color, size, design, or quantity?"
                rows="5"
              />
            </div>

            <div className="order-info-box">
              <span>💡</span>

              <p>
                Crochet Oasis will contact you after
                receiving your request to confirm the
                order and payment details.
              </p>
            </div>

            <button
              type="submit"
              className="checkout-button"
            >
              Send Order Request
            </button>

          </form>
        </div>

        {/* RIGHT - ORDER SUMMARY */}

        <div className="order-summary-card">

          <div className="card-heading">
            <div className="heading-icon">
              🛒
            </div>

            <div>
              <h2>Your Order</h2>

              <p>
                {cartItems.length} item
                {cartItems.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>

          <div className="order-products">

            {cartItems.map((item) => (
              <div
                className="order-product"
                key={item.id}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="order-product-info">

                  <h3>{item.name}</h3>

                  <span>
                    {item.category}
                  </span>

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

          <div className="order-total-section">

            <div className="order-total-row">
              <span>Subtotal</span>

              <span>
                ₹{cartTotal}
              </span>
            </div>

            <div className="order-total-row">
              <span>Delivery</span>

              <span className="manual-payment">
                To be discussed
              </span>
            </div>

            <div className="order-grand-total">
              <span>Total</span>

              <strong>
                ₹{cartTotal}
              </strong>
            </div>

          </div>

          <div className="manual-order-note">
            <strong>💳 Manual Payment</strong>

            <p>
              Payment details will be discussed and
              confirmed directly with Crochet Oasis.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}

export default OrderRequest;
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
  } = useCart();
  const navigate = useNavigate();
  if (cartItems.length === 0) {
    return (
      <main className="cart-page">

        <div className="empty-cart">

          <div className="empty-cart-icon">
            🛒
          </div>

          <h1>
            Your Cart is Empty
          </h1>

          <p>
            Looks like you haven't added anything
            to your cart yet.
          </p>

          <Link
            to="/products"
            className="product-button"
          >
            Start Shopping
          </Link>

        </div>

      </main>
    );
  }

  return (
    <main className="cart-page">

      <div className="cart-container">

        <div className="cart-header">

          <div>
            <p className="section-tag">
              YOUR SHOPPING CART
            </p>

            <h1>
              Cart
            </h1>
          </div>

          <button
            className="clear-cart-button"
            onClick={clearCart}
          >
            Clear Cart
          </button>

        </div>


        <div className="cart-content">

          {/* Cart Items */}

          <div className="cart-items">

            {cartItems.map((item) => (

              <div
                className="cart-item"
                key={item.id}
              >

                <img
                  src={item.image}
                  alt={item.name}
                />

                <div className="cart-item-info">

                  <h3>
                    {item.name}
                  </h3>

                  <p>
                    {item.category}
                  </p>

                  <strong>
                    ₹{item.price}
                  </strong>

                </div>


                <div className="cart-item-actions">

                  <div className="cart-quantity">

                    <button
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                    >
                      +
                    </button>

                  </div>

                  <button
                    className="remove-button"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  >
                    Remove
                  </button>

                </div>

                <div className="cart-item-total">

                  ₹{item.price * item.quantity}

                </div>

              </div>

            ))}

          </div>


          {/* Summary */}

          <aside className="cart-summary">

            <h2>
              Order Summary
            </h2>

            <div className="summary-row">

              <span>
                Subtotal
              </span>

              <strong>
                ₹{cartTotal}
              </strong>

            </div>

            <div className="summary-row">

              <span>
                Delivery
              </span>

              <span>
                To be discussed
              </span>

            </div>

            <div className="summary-divider" />

            <div className="summary-total">

              <span>
                Total
              </span>

              <strong>
                ₹{cartTotal}
              </strong>

            </div>

            <button
  className="checkout-button"
  onClick={() => navigate("/order-request")}
>
  Send Order Request
</button>

            <Link
              to="/products"
              className="continue-shopping-link"
            >
              Continue Shopping
            </Link>

          </aside>

        </div>

      </div>

    </main>
  );
}

export default Cart;
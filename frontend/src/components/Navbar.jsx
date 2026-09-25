import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { cartCount } = useCart();

  const {
    user,
    isAuthenticated,
    logout,
  } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <div className="logo">
          <Link to="/">
            Crochet Oasis
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="nav-links">
          <Link to="/">
            Home
          </Link>

          <Link to="/products">
            Shop
          </Link>

          <Link to="/about">
            About
          </Link>

          <Link to="/contact">
            Contact
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="nav-actions">

          {/* Cart */}
          <Link
            to="/cart"
            className="cart-button"
          >
            🛒 Cart

            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Authentication */}
          {isAuthenticated ? (
            <>
            <Link
      to="/orders"
      className="orders-nav-link"
    >
      My Orders
    </Link>
              <span className="user-name">
                Hi, {user.name}
              </span>

              <button
                type="button"
                className="logout-button"
                onClick={logout}
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="login-button"
            >
              Login
            </Link>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;
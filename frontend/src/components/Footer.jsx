import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* =========================
            BRAND
        ========================= */}
        <div className="footer-brand">

          <Link to="/" className="footer-logo">
            <span className="footer-logo-icon">
              🧶
            </span>

            <span className="footer-logo-text">
              Crochet Oasis
            </span>
          </Link>

          <p>
            Handmade crochet products crafted
            with love and creativity.
          </p>

        </div>


        {/* =========================
            FOOTER LINKS
        ========================= */}
        <div className="footer-links">


          {/* SHOP */}

          <div>

            <h3>
              Shop
            </h3>

            <Link to="/products">
              All Products
            </Link>

            <Link to="/products">
              Home Decor
            </Link>

            <Link to="/products">
              Accessories
            </Link>

            <Link to="/products">
              Gifts
            </Link>

          </div>


          {/* HELP */}

          <div>

            <h3>
              Help
            </h3>

            <Link to="/contact">
              Contact Us
            </Link>

            <Link to="/about">
              About Us
            </Link>

          </div>


        </div>

      </div>


      {/* =========================
          FOOTER BOTTOM
      ========================= */}

      <div className="footer-bottom">

        <p>
          © {new Date().getFullYear()} Crochet Oasis.
          All rights reserved.
        </p>

        <p className="footer-made-with">
          Handmade with 🧶 &amp; ♡
        </p>

      </div>

    </footer>
  );
}

export default Footer;
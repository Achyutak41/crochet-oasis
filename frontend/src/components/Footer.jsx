function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">
          <h2>Crochet Oasis</h2>

          <p>
            Handmade crochet products crafted
            with love and creativity.
          </p>
        </div>

        <div className="footer-links">

          <div>
            <h3>Shop</h3>
            <a href="/products">All Products</a>
            <a href="/products">Home Decor</a>
            <a href="/products">Accessories</a>
            <a href="/products">Gifts</a>
          </div>

          <div>
            <h3>Help</h3>
            <a href="/contact">Contact Us</a>
            <a href="/about">About Us</a>
          </div>

        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 Crochet Oasis. All rights reserved.
        </p>
      </div>

    </footer>
  );
}

export default Footer;
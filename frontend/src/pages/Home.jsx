import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="home-page">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}
      <section className="hero">

        <div className="hero-content">

          <div className="hero-tag">
            <span className="hero-tag-line"></span>
            <span>HANDMADE WITH LOVE</span>
          </div>

          <h1>
            Beautiful Crochet,
            <br />
            <span>Made Just For You.</span>
          </h1>

          <p className="hero-description">
            Discover beautiful handmade crochet products crafted
            with care, creativity, and love.
          </p>

          <div className="hero-actions">

            <Link to="/products" className="hero-btn">
              Explore Collection
              <span className="hero-btn-arrow">→</span>
            </Link>

            <Link to="/about" className="hero-secondary-btn">
              Our Story
            </Link>

          </div>

          <div className="hero-trust">

            <div className="hero-trust-item">
              <span className="trust-icon">🧶</span>
              <span>Handmade</span>
            </div>

            <div className="hero-trust-divider"></div>

            <div className="hero-trust-item">
              <span className="trust-icon">♡</span>
              <span>Made With Love</span>
            </div>

            <div className="hero-trust-divider"></div>

            <div className="hero-trust-item">
              <span className="trust-icon">✦</span>
              <span>Unique Designs</span>
            </div>

          </div>

        </div>


        {/* HERO VISUAL */}

        <div className="hero-visual">

          <div className="hero-circle hero-circle-large"></div>
          <div className="hero-circle hero-circle-small"></div>

          <div className="yarn-art">

            <div className="yarn-ball">
              <span className="yarn-thread yarn-thread-1"></span>
              <span className="yarn-thread yarn-thread-2"></span>
              <span className="yarn-thread yarn-thread-3"></span>
              <span className="yarn-thread yarn-thread-4"></span>
            </div>

            <div className="crochet-symbol">
              🧶
            </div>

          </div>

          <div className="hero-floating-card">
            <span className="floating-card-icon">✦</span>

            <div>
              <strong>Made by Hand</strong>
              <span>One piece at a time</span>
            </div>
          </div>

        </div>

      </section>


      {/* =====================================================
          INTRODUCTION
      ===================================================== */}
      <section className="intro-section">

        <div className="intro-content">

          <p className="section-tag">
            WELCOME TO CROCHET OASIS
          </p>

          <h2>
            Handmade. Unique. Made With Love.
          </h2>

          <p>
            At Crochet Oasis, every product is carefully handmade
            with attention to detail. From beautiful home decor
            to unique accessories and thoughtful gifts, we create
            crochet products that bring warmth and personality
            to your everyday life.
          </p>

        </div>

      </section>


      {/* =====================================================
          CATEGORIES
      ===================================================== */}
      <section className="categories">

        <div className="section-heading">

          <p className="section-tag">
            EXPLORE
          </p>

          <h2>
            Shop by Category
          </h2>

          <p>
            Find something special for yourself or someone you love.
          </p>

        </div>


        <div className="category-grid">

          {/* HOME DECOR */}

          <div className="category-card">

            <div className="category-icon">
              🏠
            </div>

            <h3>
              Home Decor
            </h3>

            <p>
              Beautiful handmade crochet pieces to make your
              home feel warmer and more personal.
            </p>

            <Link to="/products" className="category-link">
              Explore
              <span>→</span>
            </Link>

          </div>


          {/* ACCESSORIES */}

          <div className="category-card">

            <div className="category-icon">
              👜
            </div>

            <h3>
              Accessories
            </h3>

            <p>
              Unique crochet bags and accessories designed
              to add a handmade touch to your everyday style.
            </p>

            <Link to="/products" className="category-link">
              Explore
              <span>→</span>
            </Link>

          </div>


          {/* GIFTS */}

          <div className="category-card">

            <div className="category-icon">
              🎁
            </div>

            <h3>
              Gifts
            </h3>

            <p>
              Thoughtful handmade crochet gifts for birthdays,
              celebrations and special moments.
            </p>

            <Link to="/products" className="category-link">
              Explore
              <span>→</span>
            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          WHY CROCHET OASIS
      ===================================================== */}
      <section className="why-section">

        <div className="section-heading">

          <p className="section-tag">
            WHY CROCHET OASIS
          </p>

          <h2>
            Made Differently
          </h2>

          <p>
            Every creation is made with care, creativity and
            attention to the little details.
          </p>

        </div>


        <div className="features-grid">

          <div className="feature-card">

            <div className="feature-icon">
              🧶
            </div>

            <h3>
              Handmade
            </h3>

            <p>
              Every piece is carefully crafted by hand
              with attention to detail.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              ♡
            </div>

            <h3>
              Made With Love
            </h3>

            <p>
              Each creation carries the care and passion
              behind handmade work.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              ✦
            </div>

            <h3>
              Unique Designs
            </h3>

            <p>
              Discover products that are different from
              ordinary mass-produced items.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🎨
            </div>

            <h3>
              Custom Orders
            </h3>

            <p>
              Create something special with our made-to-order
              crochet products.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          FEATURED PRODUCTS
      ===================================================== */}
      <section className="featured-section">

        <div className="section-heading">

          <p className="section-tag">
            OUR COLLECTION
          </p>

          <h2>
            Featured Products
          </h2>

          <p>
            A few of our handmade favorites.
          </p>

        </div>


        <div className="featured-grid">

          <div className="featured-card">

            <div className="featured-placeholder">
              🧶
            </div>

            <div className="featured-info">

              <div>
                <span className="featured-category">
                  Handmade
                </span>

                <h3>
                  Crochet Flower Bouquet
                </h3>
              </div>

              <p>
                ₹799
              </p>

            </div>

          </div>


          <div className="featured-card">

            <div className="featured-placeholder">
              👜
            </div>

            <div className="featured-info">

              <div>
                <span className="featured-category">
                  Accessories
                </span>

                <h3>
                  Handmade Crochet Bag
                </h3>
              </div>

              <p>
                ₹999
              </p>

            </div>

          </div>


          <div className="featured-card">

            <div className="featured-placeholder">
              🧸
            </div>

            <div className="featured-info">

              <div>
                <span className="featured-category">
                  Gifts
                </span>

                <h3>
                  Crochet Teddy Bear
                </h3>
              </div>

              <p>
                ₹599
              </p>

            </div>

          </div>

        </div>


        <div className="view-all-container">

          <Link
            to="/products"
            className="view-all-button"
          >
            View All Products
            <span>→</span>
          </Link>

        </div>

      </section>


      {/* =====================================================
          CUSTOM ORDER CTA
      ===================================================== */}
      <section className="custom-order-section">

        <div className="custom-order-content">

          <p className="section-tag">
            MADE JUST FOR YOU
          </p>

          <h2>
            Looking For Something Special?
          </h2>

          <p>
            Have an idea in mind? We also create made-to-order
            crochet products based on your preferences.
          </p>

          <Link
            to="/contact"
            className="hero-button"
          >
            Contact Us
            <span>→</span>
          </Link>

        </div>

      </section>

    </main>
  );
}

export default Home;
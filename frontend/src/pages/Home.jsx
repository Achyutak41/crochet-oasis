import { useProducts } from "../context/ProductContext";

function Home() {
  const { products } = useProducts();
  return (
    <main className="home-page">

      {/* =========================
          HERO SECTION
      ========================= */}
      <section className="hero">

        <div className="hero-content">

          <p className="hero-tag">
            HANDMADE WITH LOVE
          </p>

          <h1>
            Beautiful Crochet,
            <br />
            Made Just For You.
          </h1>

          <p className="hero-description">
            Discover beautiful handmade crochet products
            crafted with care, creativity, and love.
          </p>

          <a
            href="/products"
            className="hero-button"
          >
            Explore Collection
          </a>

        </div>

      </section>


      {/* =========================
          INTRODUCTION SECTION
      ========================= */}
      <section className="intro-section">

        <div className="intro-content">

          <p className="section-tag">
            WELCOME TO CROCHET OASIS
          </p>

          <h2>
            Handmade. Unique. Made With Love.
          </h2>

          <p>
            At Crochet Oasis, every product is carefully
            handmade with attention to detail. From beautiful
            home decor to unique accessories and thoughtful
            gifts, we create crochet products that bring
            warmth and personality to your everyday life.
          </p>

        </div>

      </section>


      {/* =========================
          CATEGORIES SECTION
      ========================= */}
      <section className="categories">

        <div className="section-heading">

          <p className="section-tag">
            EXPLORE
          </p>

          <h2>
            Shop by Category
          </h2>

          <p>
            Find something special for yourself or
            someone you love.
          </p>

        </div>


        <div className="category-grid">

          {/* Home Decor */}
          <div className="category-card">

            <div className="category-icon">
              🏠
            </div>

            <h3>
              Home Decor
            </h3>

            <p>
              Beautiful handmade crochet pieces
              to make your home feel warmer and
              more personal.
            </p>

            <a href="/products">
              Explore →
            </a>

          </div>


          {/* Accessories */}
          <div className="category-card">

            <div className="category-icon">
              👜
            </div>

            <h3>
              Accessories
            </h3>

            <p>
              Unique crochet bags and accessories
              designed to add a handmade touch
              to your everyday style.
            </p>

            <a href="/products">
              Explore →
            </a>

          </div>


          {/* Gifts */}
          <div className="category-card">

            <div className="category-icon">
              🎁
            </div>

            <h3>
              Gifts
            </h3>

            <p>
              Thoughtful handmade crochet gifts
              for birthdays, celebrations and
              special moments.
            </p>

            <a href="/products">
              Explore →
            </a>

          </div>

        </div>

      </section>


      {/* =========================
          WHY CROCHET OASIS
      ========================= */}
      <section className="why-section">

        <div className="section-heading">

          <p className="section-tag">
            WHY CROCHET OASIS
          </p>

          <h2>
            Made Differently
          </h2>

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
              Every piece is carefully crafted
              by hand with attention to detail.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              ❤️
            </div>

            <h3>
              Made With Love
            </h3>

            <p>
              Each creation carries the care
              and passion behind handmade work.
            </p>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              ✨
            </div>

            <h3>
              Unique Designs
            </h3>

            <p>
              Discover products that are different
              from ordinary mass-produced items.
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
              Create something special with our
              made-to-order crochet products.
            </p>

          </div>

        </div>

      </section>


      {/* =========================
          FEATURED PRODUCTS
      ========================= */}
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

              <h3>
                Crochet Flower Bouquet
              </h3>

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

              <h3>
                Handmade Crochet Bag
              </h3>

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

              <h3>
                Crochet Teddy Bear
              </h3>

              <p>
                ₹599
              </p>

            </div>

          </div>

        </div>


        <div className="view-all-container">

          <a
            href="/products"
            className="view-all-button"
          >
            View All Products
          </a>

        </div>

      </section>


      {/* =========================
          CUSTOM ORDER CTA
      ========================= */}
      <section className="custom-order-section">

        <div className="custom-order-content">

          <p className="section-tag">
            MADE JUST FOR YOU
          </p>

          <h2>
            Looking For Something Special?
          </h2>

          <p>
            Have an idea in mind? We also create
            made-to-order crochet products based
            on your preferences.
          </p>

          <a
            href="/contact"
            className="hero-button"
          >
            Contact Us
          </a>

        </div>

      </section>

    </main>
  );
}

export default Home;
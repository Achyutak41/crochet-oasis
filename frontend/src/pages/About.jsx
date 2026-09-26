import { Link } from "react-router-dom";

function About() {
  return (
    <main className="about-page">

      {/* =====================================================
          ABOUT HERO
      ===================================================== */}

      <section className="about-hero">

        <div className="about-hero-content">

          <p className="section-tag">
            OUR STORY
          </p>

          <h1>
            Handmade With
            <br />
            <span>Heart &amp; Creativity.</span>
          </h1>

          <p>
            Welcome to Crochet Oasis — a little space where
            yarn, creativity and love come together to create
            something beautiful.
          </p>

        </div>


        <div className="about-hero-art">

          <div className="about-art-circle"></div>

          <div className="about-yarn">
            🧶
          </div>

          <div className="about-art-card">
            <span>♡</span>
            <div>
              <strong>Made With Love</strong>
              <small>One creation at a time</small>
            </div>
          </div>

        </div>

      </section>


      {/* =====================================================
          ANDAL STORY
      ===================================================== */}

      <section className="about-story">

        <div className="about-story-image">

  <div className="about-photo-frame">
    <img
      src="/Andal.jpeg"
      alt="Andal - Creator of Crochet Oasis"
      className="about-creator-photo"
    />
  </div>

  <div className="about-story-decoration">
    🧶
  </div>

</div>


        <div className="about-story-content">

          <p className="section-tag">
            MEET THE CREATOR
          </p>

          <h2>
            Meet Andal
          </h2>

          <p>
            Crochet Oasis is created with the belief that
            handmade things have a special warmth that
            cannot be found in ordinary mass-produced
            products.
          </p>

          <p>
            At the heart of Crochet Oasis is <strong>Andal</strong>,
            whose love for crochet and handmade creativity
            inspired the idea of creating beautiful pieces
            that people can enjoy, gift and treasure.
          </p>

          <p>
            Every loop of yarn becomes part of a story.
            Some pieces are made to brighten a home, some
            to become thoughtful gifts, and some are created
            especially for someone who wants something unique.
          </p>

          <p>
            Crochet Oasis is not just about selling crochet
            products. It is about celebrating the patience,
            creativity and personal touch behind handmade work.
          </p>

        </div>

      </section>


      {/* =====================================================
          CROCHET STORY
      ===================================================== */}

      <section className="crochet-story">

        <div className="section-heading">

          <p className="section-tag">
            THE ART OF CROCHET
          </p>

          <h2>
            More Than Yarn &amp; Thread
          </h2>

          <p>
            Crochet is a craft of patience, creativity and
            countless little loops that come together to
            create something meaningful.
          </p>

        </div>


        <div className="crochet-story-grid">

          <div className="crochet-story-card">

            <div className="story-icon">
              🧶
            </div>

            <h3>
              Start With Yarn
            </h3>

            <p>
              Every creation begins with simple materials,
              an idea and the imagination to turn them into
              something beautiful.
            </p>

          </div>


          <div className="crochet-story-card">

            <div className="story-icon">
              ✋
            </div>

            <h3>
              Crafted By Hand
            </h3>

            <p>
              Each stitch takes time and care. The handmade
              process gives every piece its own character.
            </p>

          </div>


          <div className="crochet-story-card">

            <div className="story-icon">
              ♡
            </div>

            <h3>
              Made With Love
            </h3>

            <p>
              The final piece carries something special —
              the time, patience and creativity that went
              into making it.
            </p>

          </div>

        </div>

      </section>


      {/* =====================================================
          VALUES
      ===================================================== */}

      <section className="about-values">

        <div className="section-heading">

          <p className="section-tag">
            WHAT WE BELIEVE
          </p>

          <h2>
            The Crochet Oasis Promise
          </h2>

        </div>


        <div className="values-grid">

          <div className="value-item">
            <span>01</span>

            <div>
              <h3>Quality</h3>
              <p>
                We care about the little details that make
                handmade products special.
              </p>
            </div>
          </div>


          <div className="value-item">
            <span>02</span>

            <div>
              <h3>Creativity</h3>
              <p>
                We love turning simple yarn into creative
                and meaningful designs.
              </p>
            </div>
          </div>


          <div className="value-item">
            <span>03</span>

            <div>
              <h3>Personal Touch</h3>
              <p>
                Every handmade creation should feel personal,
                thoughtful and unique.
              </p>
            </div>
          </div>


          <div className="value-item">
            <span>04</span>

            <div>
              <h3>Customer Happiness</h3>
              <p>
                We want every Crochet Oasis experience to
                feel warm and welcoming.
              </p>
            </div>
          </div>

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="about-cta">

        <div>

          <p className="section-tag">
            FIND SOMETHING SPECIAL
          </p>

          <h2>
            Explore Our Handmade Collection
          </h2>

          <p>
            Discover crochet pieces created with patience,
            creativity and love.
          </p>

          <Link
            to="/products"
            className="hero-button"
          >
            Explore Collection
            <span>→</span>
          </Link>

        </div>

      </section>

    </main>
  );
}

export default About;
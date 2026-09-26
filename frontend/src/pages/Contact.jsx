import { Link } from "react-router-dom";

function Contact() {

  /*
    Replace these with the actual Crochet Oasis
    phone number and email address.
  */

  const phoneNumber = "+91 8807474092";
  const phoneLink = "+918807474092";

  const emailAddress = "achyutak41@gmail.com";

  return (
    <main className="contact-page">

      {/* =====================================================
          CONTACT HERO
      ===================================================== */}

      <section className="contact-hero">

        <div className="contact-hero-content">

          <p className="section-tag">
            GET IN TOUCH
          </p>

          <h1>
            We'd Love To
            <br />
            <span>Hear From You.</span>
          </h1>

          <p>
            Have a question about a product, want to discuss
            a custom order, or simply want to say hello?
            We'd be happy to hear from you.
          </p>

        </div>

        <div className="contact-hero-art">
          💌
        </div>

      </section>


      {/* =====================================================
          CONTACT OPTIONS
      ===================================================== */}

      <section className="contact-options">

        <div className="section-heading">

          <p className="section-tag">
            CONTACT US
          </p>

          <h2>
            Let's Talk
          </h2>

          <p>
            Choose the easiest way to reach Crochet Oasis.
          </p>

        </div>


        <div className="contact-grid">

          {/* PHONE */}

          <a
            href={`tel:${phoneLink}`}
            className="contact-card"
          >

            <div className="contact-icon">
              ☎
            </div>

            <div className="contact-card-content">

              <span className="contact-card-label">
                CALL US
              </span>

              <h3>
                {phoneNumber}
              </h3>

              <p>
                Tap to open your phone dialer.
              </p>

            </div>

            <span className="contact-arrow">
              →
            </span>

          </a>


          {/* EMAIL */}

          <a
  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}&su=Contact`}
  target="_blank"
  rel="noopener noreferrer"
  className="contact-card"
>

            <div className="contact-icon">
              ✉
            </div>

            <div className="contact-card-content">

              <span className="contact-card-label">
                EMAIL US
              </span>

              <h3>
                {emailAddress}
              </h3>

              <p>
                Tap to open your email application.
              </p>

            </div>

            <span className="contact-arrow">
              →
            </span>

          </a>


          {/* CUSTOM ORDER */}

          <Link
            to="/products"
            className="contact-card"
          >

            <div className="contact-icon">
              🧶
            </div>

            <div className="contact-card-content">

              <span className="contact-card-label">
                CUSTOM ORDERS
              </span>

              <h3>
                Create Something Special
              </h3>

              <p>
                Browse our collection and find inspiration
                for your next handmade creation.
              </p>

            </div>

            <span className="contact-arrow">
              →
            </span>

          </Link>

        </div>

      </section>


      {/* =====================================================
          EMAIL SECTION
      ===================================================== */}

      <section className="contact-message-section">

        <div className="contact-message">

          <div className="contact-message-icon">
            ✉
          </div>

          <div>

            <p className="section-tag">
              HAVE A QUESTION?
            </p>

            <h2>
              Send Us A Message
            </h2>

            <p>
              Whether you're interested in a product,
              need help with an order, or have a custom
              crochet idea, feel free to get in touch.
            </p>

            <a
              href={`mailto:${emailAddress}?subject=Contact`}
              className="hero-button"
            >
              Email Crochet Oasis
              <span>→</span>
            </a>

          </div>

        </div>

      </section>


      {/* =====================================================
          CLOSING CTA
      ===================================================== */}

      <section className="contact-cta">

        <p className="section-tag">
          CROCHET OASIS
        </p>

        <h2>
          Every Creation Has A Story.
        </h2>

        <p>
          Let us help make yours something special.
        </p>

        <Link
          to="/products"
          className="hero-button"
        >
          Explore Collection
          <span>→</span>
        </Link>

      </section>

    </main>
  );
}

export default Contact;
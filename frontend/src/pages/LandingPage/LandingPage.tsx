import styles from "./LandingPage.module.css";
import heroReceptionist from "../../assets/hero-receptionist.png";

function LandingPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.brand}>AI Reception</div>

        <nav className={styles.nav}>
          <a href="#platform">Platform</a>
          <a href="#solutions">Solutions</a>
          <a href="#pricing">Pricing</a>
          <a href="#resources">Resources</a>
        </nav>

        <div className={styles.actions}>
          <a href="/login">Sign in</a>
          <button type="button">Get a demo</button>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>
            ALWAYS ON. ALWAYS HELPFUL.
          </p>

          <h1>
            Voice AI that answers,
            <span>books, and follows up</span>
          </h1>

          <p className={styles.heroText}>
            Give your business a professional AI receptionist that handles
            calls, schedules appointments, and keeps customers coming back.
          </p>

          <div className={styles.heroActions}>
            <button type="button" className={styles.primaryButton}>
              Get a demo
            </button>

            <button type="button" className={styles.secondaryButton}>
              See how it works
            </button>
          </div>
        </div>

        <div className={styles.heroVisual}>
          <img
            src={heroReceptionist}
            alt="AI receptionist"
            className={styles.heroImage}
          />

          <div className={styles.voiceCard}>
            <strong>👋 Hello!</strong>
            <span>How can I help you today?</span>
          </div>
        </div>
      </section>
<section className={styles.benefits}>
  <div>
    <strong>Instant responses</strong>
    <span>No missed calls</span>
  </div>

  <div>
    <strong>24/7 availability</strong>
    <span>Holidays and weekends too</span>
  </div>

  <div>
    <strong>Works with your tools</strong>
    <span>Seamless CRM integration</span>
  </div>
</section>

<section className={styles.platform} id="platform">
  <div className={styles.platformHeader}>
    <p className={styles.eyebrow}>ONE AI RECEPTIONIST. MORE DONE.</p>
    <h2>Everything your front desk needs</h2>
  </div>

  <div className={styles.platformGrid}>
    <div>
      <h3>Answer calls</h3>
      <p>Respond to customers instantly, 24/7</p>
    </div>

    <div>
      <h3>Book appointments</h3>
      <p>Schedule appointments while speaking with customers</p>
    </div>

    <div>
      <h3>Handle objections</h3>
      <p>Follow your business scripts and answer common questions</p>
    </div>

    <div>
      <h3>Follow up</h3>
      <p>Keep leads moving and reduce missed opportunities</p>
    </div>
  </div>
</section>

<section className={styles.industries} id="solutions">
  <div className={styles.industriesHeader}>
    <div>
      <p className={styles.eyebrow}>BUILT FOR REAL BUSINESSES</p>
      <h2>Works beautifully across industries</h2>
    </div>
  </div>

  <div className={styles.industryGrid}>
    <div>
      <h3>Dental Clinics</h3>
      <p>Book appointments and answer patient questions</p>
    </div>

    <div>
      <h3>Hotels</h3>
      <p>Handle bookings, guest requests, and more — 24/7</p>
    </div>

    <div>
      <h3>Repair Shops</h3>
      <p>Schedule service, answer questions, and keep customers updated</p>
    </div>
  </div>
</section>

<section className={styles.pricing} id="pricing">
  <div className={styles.pricingContent}>
    <p className={styles.eyebrow}>SIMPLE PRICING</p>

    <h2>AI reception without the cost of a full-time team</h2>

    <p>
      Start with the tools your business needs and scale as your call volume grows
    </p>

    <button type="button" className={styles.primaryButton}>
      Get a demo
    </button>
  </div>
</section>

<section className={styles.resources} id="resources">
  <div className={styles.resourcesHeader}>
    <p className={styles.eyebrow}>RESOURCES</p>
    <h2>Learn how AI Reception works</h2>
  </div>

  <div className={styles.resourcesGrid}>
    <div>
      <h3>Getting started</h3>
      <p>See how to set up your AI receptionist for your business</p>
    </div>

    <div>
      <h3>Best practices</h3>
      <p>Learn how to improve scripts, calls, and customer conversations</p>
    </div>

    <div>
      <h3>Integrations</h3>
      <p>Connect AI Reception with the tools your business already uses</p>
    </div>
  </div>
</section>
<footer className={styles.footer}>
  <div>
    <strong>AI Reception</strong>
    <p>Voice AI for modern businesses</p>
  </div>

  <div>
    <a href="#platform">Platform</a>
    <a href="#solutions">Solutions</a>
    <a href="#pricing">Pricing</a>
    <a href="#resources">Resources</a>
  </div>

  <span>© 2026 AI Reception</span>
</footer>

    </div>
  );
}

export default LandingPage;
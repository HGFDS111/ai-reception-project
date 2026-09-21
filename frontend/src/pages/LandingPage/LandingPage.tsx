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

    </div>
  );
}

export default LandingPage;
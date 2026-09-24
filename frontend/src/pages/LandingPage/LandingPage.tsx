import styles from "./LandingPage.module.css";
import heroReceptionist from "../../assets/hero-receptionist.png";

import dentalClinic from "../../assets/industries/dental-clinic.png";
import hotelRoom from "../../assets/industries/hotel-room.png";
import repairShop from "../../assets/industries/repair-shop.png";
import novaDentalLogo from "../../assets/logos/nova-dental-logo.png";
import harborHotelsLogo from "../../assets/logos/harbor-hotels-logo.png";
import primeAutoLogo from "../../assets/logos/prime-auto-logo.png";
import carePointLogo from "../../assets/logos/carepoint-logo.png";
import urbanFixLogo from "../../assets/logos/urbanfix-logo.png";

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
  <div className={styles.voiceText}>
    <strong>👋 Hello!</strong>
    <span>How can I help you today?</span>
  </div>

  <div className={styles.voiceIcon}>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <span></span>
</div>
</div>
        </div>
      </section>
<section className={styles.benefits}>
  <div className={styles.benefitItem}>
    <div className={`${styles.benefitIcon} ${styles.benefitIconMint}`}>
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M13 2 5 14h6l-1 8 8-12h-6l1-8Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</div>

    <div className={styles.benefitText}>
      <strong>Instant responses</strong>
      <span>No missed calls</span>
    </div>
  </div>

  <div className={styles.benefitItem}>
    <div className={`${styles.benefitIcon} ${styles.benefitIconPurple}`}>
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <circle
      cx="12"
      cy="12"
      r="8.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <path
      d="M12 7v5l3 2"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
</div>

    <div className={styles.benefitText}>
      <strong>24/7 availability</strong>
      <span>Holidays and weekends too</span>
    </div>
  </div>

  <div className={styles.benefitItem}>
    <div className={`${styles.benefitIcon} ${styles.benefitIconMint}`}>
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M9.5 14.5 14.5 9.5M7.5 16.5l-1 1a3.5 3.5 0 0 1-5-5l3-3a3.5 3.5 0 0 1 5 0M16.5 7.5l1-1a3.5 3.5 0 0 1 5 5l-3 3a3.5 3.5 0 0 1-5 0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
</div>

    <div className={styles.benefitText}>
      <strong>Works with your tools</strong>
      <span>Seamless CRM integration</span>
    </div>
  </div>
</section>

<section className={styles.logoMarquee}>
  <div className={styles.logoTrack}>
    <div className={styles.logoItem}>
      <img src={novaDentalLogo} alt="Nova Dental" />
    </div>

    <div className={styles.logoItem}>
      <img src={harborHotelsLogo} alt="Harbor Hotels" />
    </div>

    <div className={styles.logoItem}>
      <img src={primeAutoLogo} alt="Prime Auto" />
    </div>

    <div className={styles.logoItem}>
      <img src={carePointLogo} alt="CarePoint" />
    </div>

    <div className={styles.logoItem}>
      <img src={urbanFixLogo} alt="UrbanFix" />
    </div>

    <div className={styles.logoItem}>
      <img src={novaDentalLogo} alt="Nova Dental" />
    </div>

    <div className={styles.logoItem}>
      <img src={harborHotelsLogo} alt="Harbor Hotels" />
    </div>

    <div className={styles.logoItem}>
      <img src={primeAutoLogo} alt="Prime Auto" />
    </div>

    <div className={styles.logoItem}>
      <img src={carePointLogo} alt="CarePoint" />
    </div>

    <div className={styles.logoItem}>
      <img src={urbanFixLogo} alt="UrbanFix" />
    </div>
  </div>
</section>

<section className={styles.platform} id="platform">
  <div className={styles.platformHeader}>
    <p className={styles.eyebrow}>ONE AI RECEPTIONIST. MORE DONE.</p>
    <h2>Everything your front desk needs</h2>
  </div>

  <div className={styles.platformGrid}>
    <div className={styles.platformCard}>
      <div className={styles.platformIcon}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M7 4h3l1.5 4-2 1.5a14 14 0 0 0 5 5l1.5-2L20 14v3c0 1.7-1.3 3-3 3C9.8 20 4 14.2 4 7c0-1.7 1.3-3 3-3Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div>
        <h3>Answer calls</h3>
        <p>Respond to customers instantly, 24/7</p>
      </div>
    </div>

    <div className={styles.platformCard}>
      <div className={styles.platformIcon}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect
            x="4"
            y="5"
            width="16"
            height="15"
            rx="2"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M8 3v4M16 3v4M4 9h16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div>
        <h3>Book appointments</h3>
        <p>Schedule appointments while speaking with customers</p>
      </div>
    </div>

    <div className={styles.platformCard}>
      <div className={styles.platformIcon}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M5 5h14a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H10l-5 4v-4H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path
            d="M8 10h8M8 13h5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div>
        <h3>Handle objections</h3>
        <p>Follow your business scripts and answer common questions</p>
      </div>
    </div>

    <div className={styles.platformCard}>
      <div className={styles.platformIcon}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
  <path
    d="M20 7v5h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  />

  <path
    d="M4 17v-5h5"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  />

  <path
    d="M6.2 9a7 7 0 0 1 11.5-2.5L20 9M4 15l2.3 2.5A7 7 0 0 0 17.8 15"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  />
</svg>
      </div>

      <div>
        <h3>Follow up</h3>
        <p>Keep leads moving and reduce missed opportunities</p>
      </div>
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
   <div className={styles.industryCard}>
 <img
  src={dentalClinic}
  alt="Modern dental clinic"
  className={styles.industryImage}
/>

  <div className={styles.industryContent}>
    <h3>Dental Clinics</h3>
    <p>Book appointments and answer patient questions</p>
  </div>
  <div className={styles.industryArrow}>→</div>
</div>

    <div className={styles.industryCard}>
  <img
  src={hotelRoom}
  alt="Modern hotel room"
  className={styles.industryImage}
/>

  <div className={styles.industryContent}>
    <h3>Hotels</h3>
    <p>Handle bookings, guest requests, and more — 24/7</p>
  </div>
  <div className={styles.industryArrow}>→</div>
</div>

    <div className={styles.industryCard}>
 <img
  src={repairShop}
  alt="Modern repair shop"
  className={styles.industryImage}
/>

  <div className={styles.industryContent}>
    <h3>Repair Shops</h3>
    <p>Schedule service, answer questions, and keep customers updated</p>
  </div>
   <div className={styles.industryArrow}>→</div>
</div>

  </div>
  
</section>

<section className={styles.pricing} id="pricing">
  <div className={styles.pricingPanel}>
    <div className={styles.pricingIntro}>
      <p className={styles.eyebrow}>SIMPLE, TRANSPARENT PRICING</p>

      <h2>Choose the plan that fits your business</h2>

      <p>
        Everything you need to start, with no hidden fees.
        Upgrade anytime as you grow.
      </p>

      <button type="button" className={styles.primaryButton}>
        Get a demo
      </button>
    </div>

    <div className={styles.pricingPlans}>
  <article className={styles.priceCard}>
    <h3>Starter</h3>
    <p>Perfect for small businesses</p>
 <strong>
      €49 <span>/ month</span>
    </strong>

    <ul className={styles.priceFeatures}>
  <li>Up to 500 calls / month</li>
  <li>Appointment booking</li>
  <li>Basic integrations</li>
</ul>

   
    <button type="button" className={styles.priceButton}>
  Get started
</button>
  </article>

  <article className={`${styles.priceCard} ${styles.featuredPriceCard}`}>
    <div className={styles.popularBadge}>Most popular</div>
    <h3>Professional</h3>
    <p>For growing teams</p>
 <strong>
      €99 <span>/ month</span>
    </strong>
    <ul className={styles.priceFeatures}>
  <li>Up to 2,000 calls / month</li>
  <li>Advanced integrations</li>
  <li>Custom call scripts</li>
  <li>Email & SMS follow-ups</li>
</ul>
   

    <button
  type="button"
  className={`${styles.priceButton} ${styles.featuredPriceButton}`}
>
  Get started
</button>
  </article>

  <article className={styles.priceCard}>
    <h3>Business</h3>
    <p>For multi-location companies</p>

    <strong>
      €199 <span>/ month</span>
    </strong>
    <ul className={styles.priceFeatures}>
  <li>Unlimited calls</li>
  <li>Advanced analytics</li>
  <li>Priority support</li>
  <li>Custom integrations</li>
</ul>
<button type="button" className={styles.priceButton}>
  Get started
</button>
    
  </article>
</div>
  </div>
</section>

<section className={styles.resources} id="resources">
  <div className={styles.resourcesHeader}>
    <p className={styles.eyebrow}>RESOURCES</p>
    <h2>Learn how AI Reception works</h2>
  </div>

  <div className={styles.resourcesGrid}>
   <article className={styles.resourceCard}>
  <div className={`${styles.resourceIcon} ${styles.resourceIconMint}`}>
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M8 3h6l5 5v13H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M14 3v5h5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M10 13h6M10 17h6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  </div>

  <h3>Getting started</h3>

  <p>
    See how to set up your AI receptionist for your business.
  </p>

  <a href="#" className={styles.resourceLink}>
    Learn more <span>→</span>
  </a>
</article>

   <article className={styles.resourceCard}>
  <div className={`${styles.resourceIcon} ${styles.resourceIconLavender}`}>
   <svg viewBox="0 0 24 24" aria-hidden="true">
  <rect
    x="5"
    y="13"
    width="3"
    height="6"
    rx="1.5"
    fill="currentColor"
  />

  <rect
    x="10.5"
    y="9"
    width="3"
    height="10"
    rx="1.5"
    fill="currentColor"
  />

  <rect
    x="16"
    y="5"
    width="3"
    height="14"
    rx="1.5"
    fill="currentColor"
  />
</svg>
  </div>

  <h3>Best practices</h3>

  <p>
    Learn how to improve scripts, calls, and customer conversations.
  </p>

  <a href="#" className={styles.resourceLink}>
    Learn more <span>→</span>
  </a>
</article>

  <article className={styles.resourceCard}>
  <div className={`${styles.resourceIcon} ${styles.resourceIconBlue}`}>
    <svg viewBox="0 0 24 24" aria-hidden="true">
  <path
    d="M12 2.5h-.6a2 2 0 0 0-2 2v.5a2 2 0 0 1-1 1.7l-.5.3a2 2 0 0 1-2 0l-.4-.2a2 2 0 0 0-2.7.7l-.3.5a2 2 0 0 0 .7 2.7l.4.2a2 2 0 0 1 1 1.7v.6a2 2 0 0 1-1 1.7l-.4.2a2 2 0 0 0-.7 2.7l.3.5a2 2 0 0 0 2.7.7l.4-.2a2 2 0 0 1 2 0l.5.3a2 2 0 0 1 1 1.7v.5a2 2 0 0 0 2 2h.6a2 2 0 0 0 2-2v-.5a2 2 0 0 1 1-1.7l.5-.3a2 2 0 0 1 2 0l.4.2a2 2 0 0 0 2.7-.7l.3-.5a2 2 0 0 0-.7-2.7l-.4-.2a2 2 0 0 1-1-1.7v-.6a2 2 0 0 1 1-1.7l.4-.2a2 2 0 0 0 .7-2.7l-.3-.5a2 2 0 0 0-2.7-.7l-.4.2a2 2 0 0 1-2 0l-.5-.3a2 2 0 0 1-1-1.7v-.5a2 2 0 0 0-2-2Z"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
  />

  <circle
    cx="12"
    cy="12"
    r="3"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  />
</svg>
  </div>

  <h3>Integrations</h3>

  <p>
    Connect AI Reception with the tools your business already uses.
  </p>

  <a href="#" className={styles.resourceLink}>
    Learn more <span>→</span>
  </a>
</article>
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
import { useEffect } from "react";
import { studio, cases, faqs } from "../data/content";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileTextBar } from "./MobileTextBar";
import { Boost } from "./Boost";
import { Button, Reveal } from "./primitives";

export function BoostPage({ onNavigateHome }: { onNavigateHome: () => void }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    document.title = "Conversion Boost™ — Clovis Web Design";
  }, []);

  return (
    <div className="page-wrapper is-boost-page">
      <a href="#boost" className="skip-link">
        Skip to Boost calculator
      </a>

      {/* Boost Custom Top Navigation Bar */}
      <div className="boost-page_banner">
        <div className="padding-global">
          <div className="container-large boost-page_banner-inner">
            <button
              type="button"
              onClick={onNavigateHome}
              className="boost-back-btn text-style-eyebrow"
            >
              ← Explore Full Studio Portfolio
            </button>
            <div className="boost-banner_badge text-style-eyebrow">
              <span className="status_dot" aria-hidden="true" /> Live Conversion Engine · Clovis, CA
            </div>
            <a href={studio.phoneHref} className="boost-banner_phone text-style-eyebrow font-mono">
              Direct: {studio.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      <Header isBoostPage={true} />

      <main id="main" className="main-wrapper">
        {/* Boost Page Specific Hero */}
        <section className="section_boost-hero" aria-labelledby="boost-hero-heading">
          <div className="padding-global padding-section-small">
            <div className="container-large">
              <div className="boost-hero_inner">
                <div className="boost-hero_meta text-style-eyebrow">
                  <span>Special Project · Central Valley Businesses</span>
                  <span className="status_dot" aria-hidden="true" />
                  <span>October 2026 Intake</span>
                </div>

                <h1 id="boost-hero-heading" className="heading-style-display boost-hero_heading">
                  Stop losing local calls to a{" "}
                  <span className="text-italic-serif text-color-accent">four-second lag.</span>
                </h1>

                <p className="text-size-large boost-hero_lede">
                  Most local websites in Fresno and Clovis are built on bloated 5MB templates that freeze on two bars of
                  cell reception. We hand-build ultra-fast sites that score <strong>100/100 on Google PageSpeed</strong>,
                  put your phone number right under the customer’s thumb, and pay for themselves in days.
                </p>

                <div className="boost-hero_actions">
                  <a href="#boost" className="button is-accent">
                    <span>Launch the Loss Calculator ↓</span>
                  </a>
                  <Button
                    label="Text Adam Directly"
                    href={studio.smsHref}
                    variant="ghost"
                    showIcon={false}
                  />
                  <button
                    type="button"
                    onClick={onNavigateHome}
                    className="text-link boost-explore-link text-size-small"
                  >
                    View complete studio portfolio &amp; case studies →
                  </button>
                </div>

                {/* Instant Authority Badges */}
                <div className="boost-hero_badges">
                  <div className="boost-badge-card">
                    <span className="boost-badge-num font-mono">100/100</span>
                    <span className="boost-badge-label text-size-small">PageSpeed Mobile on All Client Sites</span>
                  </div>
                  <div className="boost-badge-card">
                    <span className="boost-badge-num font-mono">&lt; 0.8s</span>
                    <span className="boost-badge-label text-size-small">Full Interactive Paint on 2 Bars LTE</span>
                  </div>
                  <div className="boost-badge-card">
                    <span className="boost-badge-num font-mono">7 Days</span>
                    <span className="boost-badge-label text-size-small">From Recorded Conversation to Live Site</span>
                  </div>
                  <div className="boost-badge-card">
                    <span className="boost-badge-num font-mono">$500</span>
                    <span className="boost-badge-label text-size-small">Launch Price · You Own Everything</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Standalone Boost Engine (Calculator + Teardown + 5 Pillars) */}
        <Boost isStandalone={true} />

        {/* Quick Social Proof Strip from Real Central Valley Clients */}
        <section className="section_boost-proof">
          <div className="padding-global padding-section-small">
            <div className="container-large">
              <div className="boost-proof_header text-center">
                <span className="text-style-eyebrow text-color-accent">Verified Central Valley Results</span>
                <h2 className="heading-style-h2">What happens when your site loads instantly.</h2>
              </div>

              <div className="boost-proof_grid">
                {cases.map((c) => (
                  <Reveal key={c.id} className="boost-proof_card">
                    <div className="boost-proof_metrics">
                      <div className="boost-proof_metric-item">
                        <span className="boost-proof_val font-mono">{c.afterMetrics.score}/100</span>
                        <span className="boost-proof_tag text-size-small">PageSpeed</span>
                      </div>
                      <div className="boost-proof_metric-item">
                        <span className="boost-proof_val font-mono">{c.afterMetrics.loadTime}</span>
                        <span className="boost-proof_tag text-size-small">Mobile Load</span>
                      </div>
                      <div className="boost-proof_metric-item">
                        <span className="boost-proof_val font-mono text-color-highlight">
                          {c.stats[0].value}
                        </span>
                        <span className="boost-proof_tag text-size-small">{c.stats[0].label}</span>
                      </div>
                    </div>

                    <blockquote className="boost-proof_quote text-size-large">
                      “{c.quote}”
                    </blockquote>

                    <div className="boost-proof_author">
                      <div className="boost-proof_author-name font-medium">{c.quoteBy}</div>
                      <div className="boost-proof_author-role text-size-small text-color-muted">
                        {c.quoteRole} · {c.client}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* High-Intent FAQ */}
        <section className="section_boost-faq">
          <div className="padding-global padding-section-small">
            <div className="container-large">
              <div className="boost-faq_header">
                <span className="text-style-eyebrow text-color-accent">Common Questions</span>
                <h2 className="heading-style-h3">Everything you need to know about the Boost build.</h2>
              </div>

              <div className="boost-faq_grid">
                {faqs.slice(0, 4).map((f) => (
                  <div key={f.q} className="boost-faq_item">
                    <h3 className="heading-style-h4">{f.q}</h3>
                    <p className="text-color-muted text-size-small">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileTextBar />
    </div>
  );
}

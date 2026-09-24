import { useState, useId, useMemo, type CSSProperties } from "react";
import { studio } from "../data/content";
import { buildSmsHref } from "../utils/sms";
import { ArrowIcon, Reveal, SectionHeader } from "./primitives";

interface TradePreset {
  name: string;
  ticket: number;
  visitors: number;
  speed: number;
  icon: string;
}

const PRESETS: TradePreset[] = [
  { name: "Contractor / Roofing", ticket: 1400, visitors: 900, speed: 4.8, icon: "🔨" },
  { name: "Medical / Specialty Clinic", ticket: 950, visitors: 1600, speed: 3.9, icon: "🩺" },
  { name: "Dumpster & Equipment", ticket: 480, visitors: 1800, speed: 4.4, icon: "🚛" },
  { name: "Plumbing & HVAC", ticket: 650, visitors: 1100, speed: 4.2, icon: "⚡" },
];

const DIAGNOSTIC_PILLARS = [
  {
    num: "01",
    tag: "Core Web Vitals",
    title: "Sub-Second First Paint (<0.8s vs 4.5s)",
    loss: "53% of mobile visits are abandoned if a page takes over 3 seconds to load (Google). On two bars of LTE between Clovis and Fresno, 5MB bloated WordPress templates freeze up.",
    fix: "Zero plugins, zero trackers, zero bloated libraries. Pure semantic code that paints instantly on the oldest smartphone in the Central Valley.",
    metric: "100/100 PageSpeed",
  },
  {
    num: "02",
    tag: "Mobile Ergonomics",
    title: "The Natural Thumb-Zone Call Trigger",
    loss: "Burying your phone number inside a hamburger menu or behind a 12-field form causes 68% of local mobile prospects to tap back and call the next competitor.",
    fix: "Persistent, one-tap 'Text Adam' and 'Call Now' triggers positioned precisely where a contractor or homeowner's thumb rests.",
    metric: "1-Tap SMS / Call",
  },
  {
    num: "03",
    tag: "Behavioral Trust",
    title: "Eliminating the Stock Photo Deficit",
    loss: "Stock photos of models in fake hardhats and generic template jargon trigger subconscious skepticism in local customers who value genuine handshake credibility.",
    fix: "Authentic local photography, transparent pricing published on the wall, and verified local proof from Fresno, Clovis, and Madera.",
    metric: "100% Real Valley Proof",
  },
  {
    num: "04",
    tag: "Asset Independence",
    title: "Zero Hostage Fees or Platform Lock-in",
    loss: "Agencies charge $150 to $300 every month just to keep your site hosted. Stop paying, and they delete your site and hold your domain hostage.",
    fix: "You own the domain, code, and hosting account on day one. Move it anytime, edit it anytime. No monthly hostage fees ever.",
    metric: "You Own Day 1",
  },
  {
    num: "05",
    tag: "Local Geo-Search",
    title: "Outranking National Middlemen",
    loss: "National lead brokers (Angi, Yelp, Thumbtack) siphon high-intent local calls and resell your own neighborhood leads back to you at 30–50% margin.",
    fix: "Dedicated geo-targeted service area structures with rich Schema.org local business markup to secure high-intent #1 spots.",
    metric: "#1 Local Intent",
  },
];

export function Boost({ isStandalone = false }: { isStandalone?: boolean }) {
  const [ticketValue, setTicketValue] = useState(850);
  const [visitors, setVisitors] = useState(1200);
  const [speed, setSpeed] = useState(4.2);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  // Teardown generator state
  const [siteUrl, setSiteUrl] = useState("");
  const [userTrade, setUserTrade] = useState("");
  const [teardownRequested, setTeardownRequested] = useState(false);

  const ticketId = useId();
  const visitorsId = useId();
  const speedId = useId();
  const urlId = useId();
  const tradeId = useId();

  // Behavioral calculation based on Google & Akamai research
  const calc = useMemo(() => {
    // Baseline conversion rate at <0.8s mobile load time for high-intent local queries
    const baselineConversion = 0.038;

    // Bounce retention decay curve relative to speed
    // 0.8s = 100% retention; 3.0s = ~65%; 5.0s = ~42%; 8.0s = ~25%
    const retentionRate = Math.max(0.2, 1 - (speed - 0.8) * 0.14);

    const optimalCallers = Math.round(visitors * baselineConversion);
    const actualCallers = Math.max(1, Math.round(optimalCallers * retentionRate));
    const lostCallers = Math.max(1, optimalCallers - actualCallers);

    // Conservative 40% close rate on phone/SMS inquiries
    const estimatedCloseRate = 0.4;
    const monthlyLostRevenue = Math.round(lostCallers * estimatedCloseRate * ticketValue);
    const annualLostRevenue = monthlyLostRevenue * 12;

    // ROI on Clovis $500 launch build
    const roiMultiple = Math.max(1, Math.round(annualLostRevenue / 500));

    // Severity category
    let severity = "good";
    let severityLabel = "⚡ Fast · Minimal traffic leakage";
    let severityDesc = "Your site is responsive, but micro-optimizations can still boost conversions.";
    if (speed > 2.0 && speed <= 3.8) {
      severity = "moderate";
      severityLabel = "⚠️ Moderate Drag · Losing ~25%–40% of mobile callers";
      severityDesc = "Central Valley customers on patchy cell reception are noticing lag.";
    } else if (speed > 3.8) {
      severity = "critical";
      severityLabel = "🚨 Severe Revenue Bleed · Majority of mobile traffic abandons";
      severityDesc = "Visitors are leaving before your phone number even paints on their screen.";
    }

    return {
      optimalCallers,
      actualCallers,
      lostCallers,
      monthlyLostRevenue,
      annualLostRevenue,
      roiMultiple,
      severity,
      severityLabel,
      severityDesc,
    };
  }, [ticketValue, visitors, speed]);

  const teardownMessage = useMemo(() => {
    const cleanUrl = siteUrl.trim() || "my website";
    const cleanTrade = userTrade.trim() ? ` for my ${userTrade.trim()} business` : "";
    return `Hi Adam — I ran the Boost calculator. My site loads in ~${speed}s and I estimate we're losing around $${calc.monthlyLostRevenue.toLocaleString()}/mo. Could you do a free 3-minute video teardown for ${cleanUrl}${cleanTrade}?`;
  }, [siteUrl, userTrade, speed, calc.monthlyLostRevenue]);

  const teardownSmsHref = buildSmsHref(studio.smsHref, teardownMessage);

  const applyPreset = (preset: TradePreset) => {
    setActivePreset(preset.name);
    setTicketValue(preset.ticket);
    setVisitors(preset.visitors);
    setSpeed(preset.speed);
  };

  return (
    <section id="boost" className={`section_boost ${isStandalone ? "is-standalone" : ""}`} aria-labelledby="boost-heading">
      <div className="padding-global padding-section-large">
        <div className="container-large">
          <SectionHeader
            index="03"
            label="The Conversion Boost™"
            headingId="boost-heading"
            heading={[
              "Your website isn’t an art piece.",
              <>
                It’s your <span className="text-italic-serif text-color-accent">cash register.</span>
              </>,
            ]}
            lede={
              <p>
                When a Central Valley homeowner or business searches for your trade, they aren’t browsing for fun. Every
                second of load lag and every bloated mobile form pushes them directly into your competitor’s hands.
              </p>
            }
          />

          {/* Scarcity & Capacity Alert Pill */}
          <Reveal className="boost_scarcity-bar">
            <div className="boost_scarcity-inner">
              <span className="boost_scarcity-indicator" aria-hidden="true" />
              <div className="boost_scarcity-text">
                <strong>Current Studio Intake:</strong> Only 2 client build spots open for this month. First come, first served.
              </div>
              <a href="#fees" className="boost_scarcity-link">
                $500 Launch Offer details →
              </a>
            </div>
          </Reveal>

          {/* Interactive Cost-of-Inactivity & Revenue Leak Calculator */}
          <Reveal className="boost_calculator-card">
            <div className="boost_calc-header">
              <div className="boost_calc-badge text-style-eyebrow">Interactive Psychological Engine</div>
              <h3 className="heading-style-h3">Cost-of-Inactivity &amp; Revenue Leak Calculator</h3>
              <p className="text-color-muted text-size-small">
                Grounded in Google &amp; Akamai behavioral conversion data. Select a trade preset or adjust the sliders to
                calculate your actual revenue bleed.
              </p>

              {/* Trade Presets */}
              <div className="boost_presets-row">
                <span className="text-style-eyebrow text-color-muted">Quick trade presets:</span>
                <div className="boost_presets-list">
                  {PRESETS.map((p) => (
                    <button
                      key={p.name}
                      type="button"
                      className={`boost_preset-btn ${activePreset === p.name ? "is-active" : ""}`}
                      onClick={() => applyPreset(p)}
                    >
                      <span aria-hidden="true">{p.icon}</span>
                      <span>{p.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="boost_calc-grid">
              {/* Sliders Column */}
              <div className="boost_calc-controls">
                {/* Control 1: Customer Value */}
                <div className="boost_control-group">
                  <div className="boost_control-header">
                    <label htmlFor={ticketId} className="boost_control-label">
                      Average Customer / Job Value
                    </label>
                    <span className="boost_control-value font-mono">
                      ${ticketValue.toLocaleString()}
                    </span>
                  </div>
                  <input
                    id={ticketId}
                    type="range"
                    min="150"
                    max="5000"
                    step="50"
                    value={ticketValue}
                    onChange={(e) => {
                      setTicketValue(Number(e.target.value));
                      setActivePreset(null);
                    }}
                    className="boost_slider"
                    style={{ "--p": `${((ticketValue - 150) / (5000 - 150)) * 100}%` } as CSSProperties}
                  />
                  <div className="boost_control-hints text-style-eyebrow">
                    <span>$150 (Maintenance)</span>
                    <span>$2,500</span>
                    <span>$5,000+ (Big project)</span>
                  </div>
                </div>

                {/* Control 2: Monthly Visitors */}
                <div className="boost_control-group">
                  <div className="boost_control-header">
                    <label htmlFor={visitorsId} className="boost_control-label">
                      Estimated Monthly Site Visitors
                    </label>
                    <span className="boost_control-value font-mono">
                      {visitors.toLocaleString()} <small className="text-color-muted">visitors/mo</small>
                    </span>
                  </div>
                  <input
                    id={visitorsId}
                    type="range"
                    min="100"
                    max="8000"
                    step="50"
                    value={visitors}
                    onChange={(e) => {
                      setVisitors(Number(e.target.value));
                      setActivePreset(null);
                    }}
                    className="boost_slider"
                    style={{ "--p": `${((visitors - 100) / (8000 - 100)) * 100}%` } as CSSProperties}
                  />
                  <div className="boost_control-hints text-style-eyebrow">
                    <span>100 local</span>
                    <span>4,000</span>
                    <span>8,000+ high traffic</span>
                  </div>
                </div>

                {/* Control 3: Current Mobile Speed */}
                <div className="boost_control-group">
                  <div className="boost_control-header">
                    <label htmlFor={speedId} className="boost_control-label">
                      Current Mobile Load Speed
                    </label>
                    <span className={`boost_control-value font-mono is-${calc.severity}`}>
                      {speed.toFixed(1)}s <small className="text-color-muted">(Central Valley LTE)</small>
                    </span>
                  </div>
                  <input
                    id={speedId}
                    type="range"
                    min="0.8"
                    max="7.5"
                    step="0.1"
                    value={speed}
                    onChange={(e) => {
                      setSpeed(Number(e.target.value));
                      setActivePreset(null);
                    }}
                    className="boost_slider"
                    style={{ "--p": `${((speed - 0.8) / (7.5 - 0.8)) * 100}%` } as CSSProperties}
                  />
                  <div className="boost_control-hints text-style-eyebrow">
                    <span className="text-color-highlight">0.8s (Clovis Hand-Built)</span>
                    <span>4.0s (Average WP)</span>
                    <span className="text-color-accent">7.5s (Bloated Template)</span>
                  </div>
                </div>

                {/* Severity Status Box */}
                <div className={`boost_status-box is-${calc.severity}`}>
                  <div className="boost_status-title">{calc.severityLabel}</div>
                  <p className="boost_status-body text-size-small">{calc.severityDesc}</p>
                </div>
              </div>

              {/* Output & Psychological Loss Ledger */}
              <div className="boost_calc-results">
                <div className="boost_results-inner">
                  <div className="boost_results-badge text-style-eyebrow">Your Psychological Loss Ledger</div>

                  {/* Primary Loss Metric */}
                  <div className="boost_loss-block">
                    <div className="text-style-eyebrow text-color-muted">Estimated Revenue Leaking to Competitors</div>
                    <div className="boost_loss-amount">
                      ${calc.monthlyLostRevenue.toLocaleString()}
                      <span className="boost_loss-period"> / month</span>
                    </div>
                    <div className="boost_loss-annual font-mono text-size-small">
                      ${calc.annualLostRevenue.toLocaleString()} projected over 12 months
                    </div>
                  </div>

                  {/* Callers Breakdown */}
                  <div className="boost_breakdown-grid">
                    <div className="boost_breakdown-item">
                      <div className="boost_breakdown-num font-mono text-color-accent">
                        ~{calc.lostCallers}
                      </div>
                      <div className="boost_breakdown-label text-size-small">
                        Qualified callers lost every month
                      </div>
                    </div>
                    <div className="boost_breakdown-item">
                      <div className="boost_breakdown-num font-mono text-color-highlight">
                        {calc.roiMultiple}×
                      </div>
                      <div className="boost_breakdown-label text-size-small">
                        12-Mo ROI multiple on a $500 build
                      </div>
                    </div>
                  </div>

                  {/* The Clovis Solution Comparison */}
                  <div className="boost_comparison-box">
                    <div className="boost_comp-row">
                      <span className="boost_comp-label">Current template speed:</span>
                      <span className="boost_comp-val font-mono">{speed.toFixed(1)}s mobile lag</span>
                    </div>
                    <div className="boost_comp-row is-winner">
                      <span className="boost_comp-label">Clovis Hand-Built speed:</span>
                      <span className="boost_comp-val font-mono">0.7s · PageSpeed 100 ✓</span>
                    </div>
                    <p className="boost_comp-foot text-size-small text-color-muted">
                      At our <strong>$500 launch price</strong>, your new site pays for itself with the{" "}
                      <span className="text-color-primary font-medium">very first saved customer</span>.
                    </p>
                  </div>

                  <a
                    href="#teardown"
                    className="button is-accent boost_calc-cta"
                    data-cursor="label"
                    data-cursor-label="Audit"
                  >
                    <span>Request Free 3-Min Video Teardown</span>
                    <ArrowIcon size={13} />
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* 5-Point Psychological Diagnostic Breakdown */}
          <div className="boost_diagnostic-section">
            <div className="boost_diag-intro">
              <span className="text-style-eyebrow text-color-accent">The 5 Psychological Friction Points</span>
              <h3 className="heading-style-h3">
                Why 9 out of 10 Central Valley website templates <span className="text-italic-serif">fail to convert.</span>
              </h3>
              <p className="text-color-muted">
                Visitors decide whether they trust a local business in under four seconds. Here is the exact psychological
                anatomy of why cheap templates leak customers — and how we engineer every build to win.
              </p>
            </div>

            <div className="boost_diag-grid">
              {DIAGNOSTIC_PILLARS.map((p, i) => (
                <Reveal key={p.num} index={i} className="boost_diag-card">
                  <div className="boost_diag-head">
                    <span className="boost_diag-num font-mono">{p.num}</span>
                    <span className="boost_diag-tag text-style-eyebrow">{p.tag}</span>
                    <span className="boost_diag-badge font-mono">{p.metric}</span>
                  </div>
                  <h4 className="heading-style-h4">{p.title}</h4>
                  <div className="boost_diag-body">
                    <div className="boost_diag-loss">
                      <strong className="text-color-accent">The Psychological Leak:</strong> {p.loss}
                    </div>
                    <div className="boost_diag-fix">
                      <strong className="text-color-brand-soft">The Clovis Engineering:</strong> {p.fix}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* 1-Click Free 3-Minute Video Teardown Generator (Reciprocity Engine) */}
          <Reveal id="teardown" className="boost_teardown-card">
            <div className="boost_teardown-content">
              <div className="boost_teardown-copy">
                <span className="text-style-eyebrow text-color-accent">№ Reciprocity — Free Upfront Proof</span>
                <h3 className="heading-style-h3">
                  Want to see your exact mobile speed and where customers are bouncing?
                </h3>
                <p className="text-size-large text-color-muted">
                  I will run real Chrome DevTools on a simulated Central Valley cell connection, record a 3-minute video
                  showing where your customers get frustrated, and text it straight to your phone. Zero cost, no pushy sales
                  call.
                </p>

                <div className="boost_guarantee-strip">
                  <div className="boost_guar-item">
                    <span className="boost_guar-icon">✓</span>
                    <span>100% Free · No sales reps or follow-up phone calls</span>
                  </div>
                  <div className="boost_guar-item">
                    <span className="boost_guar-icon">✓</span>
                    <span>Chrome DevTools real data · Not an automated scanner bot</span>
                  </div>
                  <div className="boost_guar-item">
                    <span className="boost_guar-icon">✓</span>
                    <span>Texted to your phone within 24 hours</span>
                  </div>
                </div>
              </div>

              <div className="boost_teardown-form">
                <div className="boost_input-row">
                  <div className="boost_field">
                    <label htmlFor={urlId} className="text-style-eyebrow">
                      Your current website URL
                    </label>
                    <input
                      id={urlId}
                      type="text"
                      placeholder="e.g. valleyroofing.com (or 'none yet')"
                      value={siteUrl}
                      onChange={(e) => setSiteUrl(e.target.value)}
                      className="boost_input"
                    />
                  </div>

                  <div className="boost_field">
                    <label htmlFor={tradeId} className="text-style-eyebrow">
                      Your trade or business
                    </label>
                    <input
                      id={tradeId}
                      type="text"
                      placeholder="e.g. Electrician, Clinic, Auto Repair"
                      value={userTrade}
                      onChange={(e) => setUserTrade(e.target.value)}
                      className="boost_input"
                    />
                  </div>
                </div>

                {/* Pre-composed SMS Preview */}
                <div className="boost_sms-preview">
                  <div className="boost_sms-preview-head text-style-eyebrow">
                    <span>Preview of text to Adam</span>
                    <span className="font-mono">{studio.phoneDisplay}</span>
                  </div>
                  <div className="boost_sms-bubble">
                    <p>{teardownMessage}</p>
                  </div>
                </div>

                <div className="boost_teardown-actions">
                  <a
                    href={teardownSmsHref}
                    className="button is-accent boost_submit-btn"
                    onClick={() => setTeardownRequested(true)}
                    data-cursor="label"
                    data-cursor-label="Text"
                  >
                    <span>{teardownRequested ? "Opening Messages app…" : "Text Adam for Free Video Teardown →"}</span>
                  </a>
                  <p className="text-size-small text-color-muted text-center">
                    Tapping opens your phone's Messages app with this exact draft ready. You can edit before sending.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

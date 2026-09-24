import { useRef, useState, type CSSProperties } from "react";
import { cases, studio, type CaseStudy } from "../data/content";
import { prefersReducedMotion } from "../hooks/motion";
import { Button, SectionHeader } from "./primitives";
import { buildSmsHref } from "../utils/sms";

function AfterSite({ c }: { c: CaseStudy }) {
  const isKidney = c.id === "kidney";
  return (
    <div
      className="site-after"
      style={
        {
          "--s-bg": c.palette.bg,
          "--s-ink": c.palette.ink,
          "--s-accent": c.palette.accent,
          "--s-soft": c.palette.soft,
        } as CSSProperties
      }
    >
      <div className="site-after_score">
        <span>●</span> {c.afterMetrics.badge}
      </div>

      <div className="site-after_nav">
        <span className="site-after_logo">{isKidney ? "Kidney Specialist Inc." : "BIG BROS"}</span>
        <span className="site-after_nav-links">
          {isKidney ? (
            <>
              <span>Doctors</span>
              <span>Services</span>
              <span>Referrals</span>
            </>
          ) : (
            <>
              <span>Sizes & Pricing</span>
              <span>Quick Quote</span>
              <span>FAQ</span>
            </>
          )}
        </span>
        <span className="site-after_lang">EN · ES</span>
        <span className="site-after_btn">{isKidney ? "Call (559)" : "Text (559)"}</span>
      </div>

      <div className="site-after_hero">
        <div className="site-after_copy">
          <span className="site-after_eyebrow">
            {isKidney ? "Nephrology & Internal Medicine · Madera & Fresno" : "Fresno Roll-Off Dumpster Rental"}
          </span>
          <div className="site-after_h">
            {isKidney ? "Expert Kidney Care for the Valley." : "Clear space. Clear mind."}
          </div>
          <p className="site-after_p-text">
            {isKidney
              ? "Comprehensive, compassionate renal care from fellowship-trained nephrologists."
              : "Flat-rate 14 & 20 yard dumpsters dropped on your driveway. Text a photo of your pile."}
          </p>
          <div className="site-after_ctas">
            <span className="is-primary">{isKidney ? "Patient Guide" : "See Flat Prices"}</span>
            <span>{isKidney ? "Referral Fax: (559) 661-1952" : "Driveway Protected"}</span>
          </div>
        </div>

        <div className="site-after_art">
          {isKidney ? (
            <div className="site-after_doctor-card">
              <img
                src={c.avatarImg || "./images/dr-masood.jpg"}
                alt="Dr. Sheikh Mohammad Masood, MD"
                className="site-after_doctor-img"
              />
              <div>
                <b style={{ fontSize: "1.4cqw", display: "block" }}>Dr. Masood, MD</b>
                <span style={{ fontSize: "1.15cqw", opacity: 0.75 }}>Nephrologist · Madera & Fresno</span>
              </div>
            </div>
          ) : (
            <div className="site-after_pricing-boxes">
              <div className="site-after_price-box">
                <div>
                  <b style={{ fontSize: "1.35cqw" }}>14-Yard Roll-off</b>
                  <div style={{ fontSize: "1.05cqw", opacity: 0.7 }}>Cleanouts & small remodels</div>
                </div>
                <b style={{ fontSize: "1.6cqw", color: "var(--s-accent)" }}>$399 flat</b>
              </div>
              <div className="site-after_price-box">
                <div>
                  <b style={{ fontSize: "1.35cqw" }}>20-Yard Roll-off</b>
                  <div style={{ fontSize: "1.05cqw", opacity: 0.7 }}>Renovations & big volume</div>
                </div>
                <b style={{ fontSize: "1.6cqw", color: "var(--s-accent)" }}>$499 flat</b>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="site-after_cards">
        {(isKidney
          ? [
              { title: "Dialysis Care", desc: "Peritoneal & Hemodialysis" },
              { title: "CKD Management", desc: "Stages 1–5 Care Plans" },
              { title: "Zero Web PHI", desc: "HIPAA Compliant Fax" },
            ]
          : [
              { title: "Driveway Protection", desc: "Boards under all wheels" },
              { title: "Flat Rates", desc: "7-day rental included" },
              { title: "Text-to-Book", desc: "Instant quote direct to owner" },
            ]
        ).map((t) => (
          <div key={t.title} className="site-after_card">
            <b>{t.title}</b>
            <span>{t.desc}</span>
          </div>
        ))}
      </div>

      <div className="site-after_sticky">
        {isKidney
          ? "No patient data collected online · Call (559) 661-1965"
          : "Delivering today across Fresno & Clovis · Text (559) 495-8034"}
      </div>
    </div>
  );
}

function BeforeSite({ c }: { c: CaseStudy }) {
  const isKidney = c.id === "kidney";
  return (
    <div className="site-before" aria-hidden="true">
      <div className="site-before_score">
        <span>●</span> {c.beforeMetrics.badge}
      </div>

      <div className="site-before_nav">
        <span>{isKidney ? "MADERA NEPHROLOGY (OLD PORTAL)" : "FRESNO COMMERCIAL DUMPSTERS"}</span>
        <span>Home | About | Services | Blog | Staff | Contact | Portal</span>
      </div>

      <div className="site-before_banner">
        <div className="site-before_spinner" />
        <span>
          {isKidney
            ? "Loading patient portal plugins, tracking scripts, and heavy widgets (4.2 MB)..."
            : "Loading 8 uncompressed stock photos in slider carousel (12.4 MB)..."}
        </span>
      </div>

      <div className="site-before_h">
        {isKidney ? "Welcome To Our Practice Website!!" : "Fresno Dumpsters Starting At $199*!!"}
      </div>

      {isKidney ? (
        <div className="site-before_form-box">
          <div className="site-before_form-title">
            ⚠️ Online Patient Intake (Insecure HTTP Form)
          </div>
          <div className="site-before_form-inputs">
            <div className="site-before_form-input">Patient Full Name & SSN...</div>
            <div className="site-before_form-input">Symptoms & Medical History...</div>
            <div className="site-before_form-input">Insurance Policy Number...</div>
            <div className="site-before_form-input">[Upload Insurance Card JPEG]</div>
          </div>
        </div>
      ) : (
        <div className="site-before_form-box">
          <div className="site-before_form-title">
            ⚠️ National Broker Booking Form
          </div>
          <div style={{ fontSize: "1.1cqw", color: "#666" }}>
            *Teaser rate of $199 excludes $150 delivery surcharge, $85/ton overage, fuel fee, and processing fees.
          </div>
          <div className="site-before_form-inputs">
            <div className="site-before_form-input">Your Zip Code...</div>
            <div className="site-before_form-input">[Submit to National Call Center]</div>
          </div>
        </div>
      )}

      {!isKidney && (
        <div className="site-before_popup">
          <b>WAIT! Don't leave yet!</b>
          <span>Sign up for our newsletter to get 5% off</span>
          <span style={{ fontSize: "1cqw", color: "#999", textDecoration: "underline" }}>No thanks ✕</span>
        </div>
      )}

      <div className="site-before_cookie">
        <span>This site uses 18 third-party advertising cookies.</span>
        <span style={{ background: "#444", padding: "0.4cqw 1cqw", borderRadius: "4px" }}>ACCEPT ALL</span>
      </div>
    </div>
  );
}

function Visualizer({ c }: { c: CaseStudy }) {
  const [pos, setPos] = useState(54);
  const [viewMode, setViewMode] = useState<"split" | "preview" | "field">("split");
  const frame = useRef<HTMLDivElement>(null);

  const tilt = (e: React.PointerEvent) => {
    if (prefersReducedMotion() || e.pointerType !== "mouse") return;
    const el = frame.current!;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(1400px) rotateY(${x * 5}deg) rotateX(${-y * 4}deg)`;
  };
  const reset = () => {
    if (frame.current) frame.current.style.transform = "";
  };

  return (
    <div className="work_visualizer" onPointerMove={tilt} onPointerLeave={reset}>
      <div className="work_visualizer-toggles">
        <button
          type="button"
          className={`work_view-btn ${viewMode === "split" ? "is-active" : ""}`}
          onClick={() => setViewMode("split")}
        >
          Interactive Code Split
        </button>
        <button
          type="button"
          className={`work_view-btn ${viewMode === "preview" ? "is-active" : ""}`}
          onClick={() => setViewMode("preview")}
        >
          Live Website Design
        </button>
        <button
          type="button"
          className={`work_view-btn ${viewMode === "field" ? "is-active" : ""}`}
          onClick={() => setViewMode("field")}
        >
          Field Photography Proof
        </button>
      </div>

      <div ref={frame} className="work_browser">
        <div className="work_browser-bar">
          <span className="work_browser-dots">
            <i /> <i /> <i />
          </span>
          <a
            href={c.url}
            target="_blank"
            rel="noopener noreferrer"
            className="work_browser-url"
            title={`Visit live production site: ${c.urlDisplay}`}
          >
            {c.urlDisplay} ↗
          </a>
          <div className="work_browser-scores">
            {viewMode === "split" ? (
              <>
                <span className="work_browser-score is-legacy">
                  Legacy: {c.beforeMetrics.score}/100
                </span>
                <span className="score-sep">vs</span>
                <span className="work_browser-score is-shipped">
                  Shipped: 100/100
                </span>
              </>
            ) : (
              <span className="work_browser-score is-shipped">
                ● 100/100 PageSpeed
              </span>
            )}
          </div>
        </div>

        {viewMode === "preview" ? (
          <div className="work_preview-stage">
            <img
              src={c.previewImg}
              alt={`Live website design for ${c.client} by Clovis Web Design`}
              className="work_preview-img"
              loading="lazy"
            />
            <div className="work_preview-overlay" />
            <a
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="work_preview-cta"
            >
              <span>Visit live website: {c.urlDisplay}</span>
              <span aria-hidden="true">↗</span>
            </a>
            <div className="work_photo-badge">
              <span className="text-style-eyebrow">{c.place}</span>
              <span className="work_photo-pill">100 PageSpeed</span>
            </div>
            <div className="work_crate-sticker" aria-hidden="true">
              <div className="work_crate-top">
                <span>CRATE</span>
                <span>Nº {c.index}</span>
              </div>
              <div className="work_crate-title">{c.client}</div>
              <div className="work_crate-sub">Production Site · Clovis CA</div>
            </div>
          </div>
        ) : viewMode === "field" ? (
          <div className="work_photo-stage">
            <img
              src={c.img}
              alt={`${c.client} facility and operations`}
              className="work_photo-img"
              loading="lazy"
            />
            <div className="work_photo-overlay" />
            <div className="work_photo-badge">
              <span className="text-style-eyebrow">{c.place}</span>
              <span className="work_photo-pill">Verified Client</span>
            </div>
            <div className="work_crate-sticker" aria-hidden="true">
              <div className="work_crate-top">
                <span>CRATE</span>
                <span>Nº {c.index}</span>
              </div>
              <div className="work_crate-title">{c.client}</div>
              <div className="work_crate-sub">Grown {c.year} · Central Valley</div>
            </div>
          </div>
        ) : (
          <div className="work_browser-stage" style={{ "--pos": `${pos}%` } as CSSProperties}>
            <AfterSite c={c} />
            <div className="work_before-layer">
              <BeforeSite c={c} />
            </div>
            <div className="work_handle" aria-hidden="true">
              <span>⟷</span>
            </div>
            <span className="work_tag is-before text-style-eyebrow">
              Legacy: {c.beforeMetrics.score}/100 ({c.beforeMetrics.loadTime})
            </span>
            <span className="work_tag is-after text-style-eyebrow">
              Shipped: 100/100 ({c.afterMetrics.loadTime})
            </span>
            <input
              className="work_range"
              type="range"
              min={0}
              max={100}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label="Drag to compare bloated legacy template against hand-coded site"
              data-cursor="label"
              data-cursor-label="Drag"
            />
          </div>
        )}
      </div>

      <p className="work_note text-size-small text-color-muted">
        {viewMode === "preview"
          ? `Real production website designed and hand-coded for ${c.client}.`
          : viewMode === "field"
            ? `Real operational field photograph from ${c.client} in ${c.place}.`
            : `Drag slider to compare the legacy bloated site (${c.beforeMetrics.score}/100, ${c.beforeMetrics.loadTime}) against the hand-coded site (100/100, ${c.afterMetrics.loadTime}).`}
      </p>
    </div>
  );
}

export function Work() {
  const [active, setActive] = useState(0);
  const isYours = active === cases.length;
  const c = cases[Math.min(active, cases.length - 1)];

  const tabList = [
    ...cases.map((x) => ({ id: x.id, index: x.index, label: x.client })),
    { id: "yours", index: "03", label: "Reserved for you" },
  ];
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const onTabKeyDown = (e: React.KeyboardEvent) => {
    const n = tabList.length;
    let next = active;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (active + 1) % n;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (active - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="work" className="section_work" aria-labelledby="work-heading">
      <div className="padding-global padding-section-large">
        <div className="container-large">
          <SectionHeader
            index="03"
            label="Selected work"
            headingId="work-heading"
            heading={["Two practices.", <>Both live. Both <span className="text-italic-serif text-color-accent">100.</span></>]}
            lede={<p>Not a gallery of Figma mockups — real Central Valley businesses with real commercial outcomes. Open either on your phone out in the parking lot and time it yourself.</p>}
          />

          <div
            className="work_tabs"
            role="tablist"
            aria-label="Case studies"
            onKeyDown={onTabKeyDown}
          >
            {tabList.map((t, i) => (
              <button
                key={t.id}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={`work-tab-${t.id}`}
                role="tab"
                aria-selected={active === i}
                aria-controls="work-panel"
                tabIndex={active === i ? 0 : -1}
                className={`work_tab ${active === i ? "is-active" : ""}`}
                onClick={() => setActive(i)}
              >
                <span className="text-style-eyebrow">{t.index}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          <div
            id="work-panel"
            role="tabpanel"
            aria-labelledby={`work-tab-${tabList[active].id}`}
            key={isYours ? "yours" : c.id}
            className="work_component"
          >
            {isYours ? (
              <div className="work_yours-spread">
                <div className="work_yours-visual">
                  <div className="work_yours-image-wrap">
                    <img
                      src="./images/seedling.jpg"
                      alt="A seedling sprouting in a terracotta pot on a sunny windowsill"
                      className="work_yours-image"
                      loading="lazy"
                    />
                    <div className="work_crate-sticker is-yours" aria-hidden="true">
                      <div className="work_crate-top">
                        <span>CRATE</span>
                        <span>Nº 03</span>
                      </div>
                      <div className="work_crate-title">Reserved Spot</div>
                      <div className="work_crate-sub">Central Valley · Launch Rate</div>
                    </div>
                  </div>
                </div>

                <div className="work_yours-content">
                  <span className="text-style-eyebrow text-color-accent">Crate № 03 — reserved</span>
                  <h3 className="heading-style-h2">
                    This spot is for <span className="text-italic-serif text-color-accent">your</span> trade.
                  </h3>
                  <p className="text-size-large text-color-muted">
                    The $500 launch price is held for the first five Central Valley businesses. After that, it’s $750 — still honest, just less of a steal.
                  </p>
                  <p className="text-color-muted">
                    Tell me what you do, who calls you, and where your trucks drive. You get my cell number, and I build the site myself.
                  </p>
                  <div className="button-group">
                    <Button
                      label="Claim a slot by text"
                      href={buildSmsHref(studio.smsHref, "Hi Adam — I want to claim one of the $500 launch spots for my business.")}
                      variant="accent"
                      magnetic
                    />
                    <Button label="See pricing breakdown" href="#fees" variant="ghost" showIcon={false} />
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Visualizer c={c} />
                <div className="work_details">
                  <div className="work_meta text-style-eyebrow">
                    <span>{c.sector}</span>
                    <span>{c.place}</span>
                    <span>{c.year}</span>
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work_live-link"
                      title={`Visit ${c.client} live site`}
                    >
                      <span>Live site:</span>
                      <span className="work_live-link-url">{c.urlDisplay}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                  <h3 className="heading-style-h3">{c.headline}</h3>

                  <div className="work_brief-boxes">
                    <div className="work_brief-box is-weeds">
                      <h4 className="text-style-eyebrow text-color-accent">
                        The weeds · {c.beforeMetrics.label} ({c.beforeMetrics.score}/100)
                      </h4>
                      <p className="text-size-small">{c.complaint}</p>
                      <p className="text-size-small text-color-muted" style={{ marginTop: "0.4rem" }}>
                        {c.beforeMetrics.description}
                      </p>
                    </div>
                    <div className="work_brief-box is-planted">
                      <h4 className="text-style-eyebrow text-color-brand-soft">
                        What we planted · {c.afterMetrics.label} ({c.afterMetrics.score}/100)
                      </h4>
                      <ol className="work_rx" role="list">
                        {c.prescription.map((p, i) => (
                          <li key={p}>
                            <span className="text-style-eyebrow">0{i + 1}</span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-style-eyebrow text-color-muted">What grew</h4>
                    <dl className="work_stats">
                      {c.stats.map((s) => (
                        <div key={s.label}>
                          <dd>{s.value}</dd>
                          <dt>{s.label}</dt>
                        </div>
                      ))}
                    </dl>
                  </div>

                  <ul className="work_stack" role="list">
                    {c.stack.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>

                  <blockquote className="work_quote">
                    <div className="work_quote-author">
                      {c.avatarImg && (
                        <img
                          src={c.avatarImg}
                          alt={c.quoteBy}
                          className="work_quote-avatar"
                          loading="lazy"
                        />
                      )}
                      <div>
                        <cite className="work_quote-name">{c.quoteBy}</cite>
                        {c.quoteRole && (
                          <span className="work_quote-role">{c.quoteRole}</span>
                        )}
                      </div>
                    </div>
                    <p>“{c.quote}”</p>
                  </blockquote>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

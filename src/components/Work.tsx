import { useRef, useState, type CSSProperties } from "react";
import { cases, studio, type CaseStudy } from "../data/content";
import { prefersReducedMotion } from "../hooks/motion";
import { Button, SectionHeader } from "./primitives";

function AfterSite({ c }: { c: CaseStudy }) {
  const isKidney = c.id === "kidney";
  return (
    <div className="site-after" style={{ "--s-bg": c.palette.bg, "--s-ink": c.palette.ink, "--s-accent": c.palette.accent, "--s-soft": c.palette.soft } as CSSProperties}>
      <div className="site-after_nav">
        <span className="site-after_logo">{isKidney ? "Kidney Specialist" : "BIG BROS"}</span>
        <span className="site-after_links">
          <i /> <i /> <i />
        </span>
        <span className="site-after_lang">EN · ES</span>
        <span className="site-after_btn">{isKidney ? "Call office" : "Text to book"}</span>
      </div>
      <div className="site-after_hero">
        <div className="site-after_copy">
          <span className="site-after_eyebrow">{isKidney ? "Nephrology · Madera & Fresno" : "Roll-off rental · Fresno & Clovis"}</span>
          <div className="site-after_h">{isKidney ? "Kidney care, close to home." : "Dumpsters dropped today. Flat price."}</div>
          <div className="site-after_p" />
          <div className="site-after_p is-short" />
          <div className="site-after_ctas">
            <span className="is-primary">{isKidney ? "New patient guide" : "See flat prices"}</span>
            <span>{isKidney ? "Referral fax" : "Driveway protection"}</span>
          </div>
        </div>
        <div className="site-after_art">
          {isKidney ? (
            <svg viewBox="0 0 120 120" aria-hidden="true">
              <circle cx="60" cy="60" r="54" fill="var(--s-soft)" />
              <path d="M44 34c-14 0-22 14-22 28s8 26 20 26c8 0 12-6 12-14V48c0-8-4-14-10-14zM76 34c14 0 22 14 22 28s-8 26-20 26c-8 0-12-6-12-14V48c0-8 4-14 10-14z" fill="var(--s-accent)" opacity=".9" />
            </svg>
          ) : (
            <svg viewBox="0 0 140 100" aria-hidden="true">
              <rect x="0" y="0" width="140" height="100" rx="10" fill="var(--s-soft)" />
              <path d="M18 40h82l-8 34H26z" fill="var(--s-accent)" />
              <rect x="100" y="48" width="22" height="26" rx="3" fill="var(--s-ink)" />
              <circle cx="40" cy="80" r="7" fill="var(--s-ink)" />
              <circle cx="108" cy="80" r="7" fill="var(--s-ink)" />
            </svg>
          )}
        </div>
      </div>
      <div className="site-after_cards">
        {(isKidney ? ["Dialysis", "Transplant", "CKD care"] : ["10 yard", "20 yard", "30 yard"]).map((t) => (
          <div key={t} className="site-after_card">
            <b>{t}</b>
            <i />
          </div>
        ))}
      </div>
      <div className="site-after_sticky">{isKidney ? "Call (559) · Fax referrals" : "Text (559) · One tap to book"}</div>
    </div>
  );
}

function BeforeSite() {
  return (
    <div className="site-before" aria-hidden="true">
      <div className="site-before_nav">
        <span>LOGO HERE</span>
        <span>Home | About | Services | Blog | Gallery | Contact</span>
      </div>
      <div className="site-before_slider">
        <div className="site-before_spinner" />
        <span className="site-before_dots">● ○ ○ ○ ○</span>
      </div>
      <div className="site-before_h">Welcome To Our Website!!</div>
      <div className="site-before_lines">
        <i /> <i /> <i /> <i />
      </div>
      <div className="site-before_popup">
        <b>Subscribe to our newsletter!</b>
        <span>No thanks ✕</span>
      </div>
      <div className="site-before_cookie">This site uses cookies. ACCEPT · SETTINGS</div>
      <div className="site-before_score">PageSpeed 31</div>
    </div>
  );
}

function Visualizer({ c }: { c: CaseStudy }) {
  const [pos, setPos] = useState(58);
  const [showPhoto, setShowPhoto] = useState(false);
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
          className={`work_view-btn ${!showPhoto ? "is-active" : ""}`}
          onClick={() => setShowPhoto(false)}
        >
          Interactive Code Split
        </button>
        <button
          type="button"
          className={`work_view-btn ${showPhoto ? "is-active" : ""}`}
          onClick={() => setShowPhoto(true)}
        >
          Field Photography Proof
        </button>
      </div>

      <div ref={frame} className="work_browser">
        <div className="work_browser-bar">
          <span className="work_browser-dots">
            <i /> <i /> <i />
          </span>
          <span className="work_browser-url">
            {c.client.toLowerCase().replace(/[^a-z]+/g, "")}.com
          </span>
          <span className="work_browser-score">● 100/100</span>
        </div>

        {showPhoto ? (
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
              <span className="work_photo-pill">100 PageSpeed</span>
            </div>
            {/* Crate tag sticker */}
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
              <BeforeSite />
            </div>
            <div className="work_handle" aria-hidden="true">
              <span>⟷</span>
            </div>
            <span className="work_tag is-before text-style-eyebrow">Typical template</span>
            <span className="work_tag is-after text-style-eyebrow">What we shipped</span>
            <input
              className="work_range"
              type="range"
              min={0}
              max={100}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label="Drag to compare a typical template with the finished site"
              data-cursor="label"
              data-cursor-label="Drag"
            />
          </div>
        )}
      </div>

      <p className="work_note text-size-small text-color-muted">
        {showPhoto
          ? `Real field photograph from ${c.client} in ${c.place}.`
          : "Drag slider to compare a typical bloated agency template against the hand-coded site."}
      </p>
    </div>
  );
}

export function Work() {
  const [active, setActive] = useState(0);
  const isYours = active === cases.length;
  const c = cases[Math.min(active, cases.length - 1)];

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

          <div className="work_tabs" role="tablist" aria-label="Case studies">
            {[...cases.map((x) => ({ id: x.id, index: x.index, label: x.client })), { id: "yours", index: "03", label: "Reserved for you" }].map((t, i) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={active === i}
                aria-controls="work-panel"
                className={`work_tab ${active === i ? "is-active" : ""}`}
                onClick={() => setActive(i)}
              >
                <span className="text-style-eyebrow">{t.index}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          <div id="work-panel" role="tabpanel" key={isYours ? "yours" : c.id} className="work_component">
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
                      href={`${studio.smsHref}?&body=${encodeURIComponent("Hi Adam — I want to claim one of the $500 launch spots for my business.")}`}
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
                  </div>
                  <h3 className="heading-style-h3">{c.headline}</h3>

                  <div className="work_brief-boxes">
                    <div className="work_brief-box is-weeds">
                      <h4 className="text-style-eyebrow text-color-accent">The weeds</h4>
                      <p className="text-size-small">{c.complaint}</p>
                    </div>
                    <div className="work_brief-box is-planted">
                      <h4 className="text-style-eyebrow text-color-brand-soft">What we planted</h4>
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
                    <p>“{c.quote}”</p>
                    <cite>— {c.quoteBy}</cite>
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

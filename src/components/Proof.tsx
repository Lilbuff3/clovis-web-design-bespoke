import { useCallback, useEffect, useRef, useState } from "react";
import { metrics } from "../data/content";
import { prefersReducedMotion, useCountUp, useInView } from "../hooks/motion";
import { SectionHeader } from "./primitives";

type Network = "wifi" | "field";
const NET = {
  wifi: { label: "Office Wi-Fi", factor: 1 },
  field: { label: "Two bars of signal", factor: 1.7 },
};

// Template milestones (seconds on wifi)
const T = { nav: 1.4, banner: 2.2, hero: 3.0, text: 3.9, cta: 4.8, chat: 5.4 };
const H = { paint: 0.35, lcp: 0.62 };

function Metric({ m, run, i }: { m: (typeof metrics)[number]; run: boolean; i: number }) {
  const v = useCountUp(m.value, run, 1600 + i * 200, m.decimals);
  return (
    <div className={`proof_metric reveal ${run ? "is-in" : ""}`} style={{ "--i": i } as React.CSSProperties}>
      <div className="proof_metric-value">
        <span className="proof_metric-prefix">{m.prefix}</span>
        {m.decimals ? v.toFixed(m.decimals) : v}
        <span className="proof_metric-suffix">{m.suffix}</span>
      </div>
      <div className="proof_metric-label">{m.label}</div>
      <div className="proof_metric-note text-size-small">{m.note}</div>
    </div>
  );
}

function MockSite({ variant, t, factor }: { variant: "template" | "handbuilt"; t: number; factor: number }) {
  const at = (s: number) => t >= s * (variant === "template" ? factor : Math.min(factor, 1.25));
  if (variant === "handbuilt") {
    const painted = at(H.paint);
    return (
      <div className={`mock_site is-handbuilt ${painted ? "is-painted" : ""}`}>
        <div className="mock_nav">
          <span className="mock_logo">Sierra Roofing</span>
          <span className="mock_call">Call</span>
        </div>
        <div className="mock_hero-img is-good" />
        <div className="mock_h">Roof leaking? We’re out today.</div>
        <div className="mock_p" />
        <div className="mock_p is-short" />
        <div className="mock_cta">Text us — (559) 555-0144</div>
        <div className="mock_row">
          <span>Fresno</span>
          <span>Clovis</span>
          <span>Madera</span>
        </div>
      </div>
    );
  }
  return (
    <div className="mock_site is-template">
      {!at(T.nav) && <div className="mock_spinner" aria-hidden="true" />}
      {at(T.nav) && (
        <div className="mock_nav is-bloated">
          <span className="mock_logo">SIERRA ROOFING™</span>
          <span className="mock_burger">≡</span>
        </div>
      )}
      {at(T.banner) && <div className="mock_banner">We use cookies to improve… <b>Accept all</b></div>}
      {at(T.hero) && <div className="mock_hero-img is-slow" />}
      {at(T.text) && (
        <>
          <div className="mock_h is-template">Welcome to Our Website!</div>
          <div className="mock_p" />
          <div className="mock_p is-short" />
        </>
      )}
      {at(T.cta) && <div className="mock_cta is-template">Request a Quote</div>}
      {at(T.chat) && <div className="mock_chat">Hi! 👋 Need help?</div>}
    </div>
  );
}

export function Proof() {
  const [stageRef, stageInView] = useInView<HTMLDivElement>({ threshold: 0.35 });
  const [metricsRef, metricsInView] = useInView<HTMLDivElement>({ threshold: 0.3 });
  const [t, setT] = useState(0);
  const [running, setRunning] = useState(false);
  const [network, setNetwork] = useState<Network>("field");
  const raf = useRef(0);
  const factor = NET[network].factor;
  const end = T.chat * factor + 0.6;

  const run = useCallback(() => {
    cancelAnimationFrame(raf.current);
    if (prefersReducedMotion()) {
      setT(99);
      return;
    }
    setRunning(true);
    setT(0);
    const start = performance.now();
    const tick = (now: number) => {
      const s = (now - start) / 1000;
      setT(s);
      if (s < end) raf.current = requestAnimationFrame(tick);
      else setRunning(false);
    };
    raf.current = requestAnimationFrame(tick);
  }, [end]);

  useEffect(() => {
    if (stageInView) run();
    return () => cancelAnimationFrame(raf.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stageInView, network]);

  const tplLcp = T.cta * factor;
  const hbLcp = H.lcp * Math.min(factor, 1.25);
  const tplDone = t >= tplLcp;
  const hbDone = t >= hbLcp;
  const cls = t >= T.hero * factor ? (t >= T.cta * factor ? 0.34 : 0.21) : t >= T.banner * factor ? 0.08 : 0;

  return (
    <section className="section_proof" aria-labelledby="proof-heading">
      <div className="padding-global padding-section-large">
        <div className="container-large">
          <SectionHeader
            dark
            index="01"
            label="The load race"
            headingId="proof-heading"
            heading={["Speed isn’t a", <><span className="text-italic-serif text-color-highlight">feature.</span> It’s the</>, "front door."]}
            lede={<p>Same business, same content, same phone. One built on a typical template, one built by hand. Pick a signal and watch who gets the phone call.</p>}
          />

          <div ref={stageRef} className="proof_stage">
            <div className="proof_controls">
              <div className="proof_toggle" role="radiogroup" aria-label="Network conditions">
                {(Object.keys(NET) as Network[]).map((n) => (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={network === n}
                    className={`proof_toggle-btn ${network === n ? "is-active" : ""}`}
                    onClick={() => setNetwork(n)}
                  >
                    {NET[n].label}
                  </button>
                ))}
              </div>
              <button type="button" className="proof_replay" onClick={run} disabled={running} data-cursor="hover">
                <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
                  <path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 2.5v3h-3" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" />
                </svg>
                {running ? "Racing…" : "Run it again"}
              </button>
            </div>

            <div className="proof_lanes">
              {(["template", "handbuilt"] as const).map((v) => {
                const done = v === "template" ? tplDone : hbDone;
                const lcp = v === "template" ? tplLcp : hbLcp;
                const shown = done ? lcp : Math.min(t, lcp);
                return (
                  <div key={v} className={`proof_lane is-${v}`}>
                    <div className="proof_lane-head">
                      <span className="text-style-eyebrow">{v === "template" ? "Typical template" : "Hand-built · Clovis"}</span>
                      <span className={`proof_timer ${done ? "is-done" : ""}`} aria-live="off">
                        {shown.toFixed(2)}s
                      </span>
                    </div>
                    <div className="proof_phone">
                      <div className="proof_phone-notch" />
                      <div className="proof_phone-screen">
                        <MockSite variant={v} t={t} factor={factor} />
                      </div>
                      <div className="proof_phone-bar">
                        <div
                          className="proof_phone-bar-fill"
                          style={{ transform: `scaleX(${Math.min(1, t / lcp)})` }}
                        />
                      </div>
                    </div>
                    <dl className="proof_readout">
                      <div>
                        <dt>LCP</dt>
                        <dd>{done ? `${lcp.toFixed(1)}s` : "—"}</dd>
                      </div>
                      <div>
                        <dt>Layout shift</dt>
                        <dd>{v === "template" ? cls.toFixed(2) : "0.00"}</dd>
                      </div>
                      <div>
                        <dt>Visitor</dt>
                        <dd className={v === "handbuilt" && hbDone ? "is-good" : v === "template" && t > 3 * factor && !tplDone ? "is-bad" : ""}>
                          {v === "handbuilt"
                            ? hbDone
                              ? "Calling you"
                              : "Waiting…"
                            : tplDone
                              ? "Already left"
                              : t > 3 * factor
                                ? "Giving up…"
                                : "Waiting…"}
                        </dd>
                      </div>
                    </dl>
                  </div>
                );
              })}
            </div>
            <p className="proof_footnote text-size-small">
              Illustrative simulation of a typical plugin-heavy template versus our build standards. Not a recording of any specific site.
            </p>
          </div>

          <div ref={metricsRef} className="proof_metrics">
            {metrics.map((m, i) => (
              <Metric key={m.label} m={m} run={metricsInView} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

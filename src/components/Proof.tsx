import { useCallback, useEffect, useRef, useState } from "react";
import { metrics } from "../data/content";
import { prefersReducedMotion, useCountUp, useInView } from "../hooks/motion";
import { SectionHeader } from "./primitives";

type Network = "wifi" | "field";
const NET = {
  wifi: { label: "Office Wi-Fi", factor: 1 },
  field: { label: "Two bars of signal (LTE)", factor: 1.7 },
};

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

function MockPhoneStatus() {
  return (
    <div className="mock_statusbar">
      <span>9:41</span>
      <span className="mock_statusbar-signal">
        <span className="mock_bar is-active" />
        <span className="mock_bar is-active" />
        <span className="mock_bar" />
        <span className="mock_bar" />
        <span className="mock_lte">LTE</span>
      </span>
    </div>
  );
}

function MockSite({ variant, t, factor }: { variant: "template" | "handbuilt"; t: number; factor: number }) {
  const at = (s: number) => t >= s * (variant === "template" ? factor : Math.min(factor, 1.25));

  if (variant === "handbuilt") {
    const loaded = at(0.25);
    const headline = at(0.45);
    const buttons = at(0.7);
    const tapped = at(1.3);

    return (
      <div className={`mock_site is-handbuilt ${loaded ? "is-painted" : ""}`}>
        <MockPhoneStatus />
        <div className="mock_urlbar">olsenroofing.com</div>

        {loaded && (
          <div className="mock_hb_body">
            <div className="mock_hb_nav">
              <span className="mock_hb_logo">Olsen Roofing</span>
              <span className="mock_hb_badge">Clovis, CA</span>
            </div>

            {headline && (
              <div className="mock_hb_hero">
                <h4 className="mock_hb_h">
                  Roof leaking? <span className="mock_hb_accent">We’re 10 min away.</span>
                </h4>
                <p className="mock_hb_sub">
                  Family-owned. Same-day free estimates across Clovis &amp; Fresno. Se habla español.
                </p>
              </div>
            )}

            {buttons && (
              <div className="mock_hb_actions">
                <div className={`mock_hb_btn is-call ${tapped ? "is-tapped" : ""}`}>
                  📞 Call now — free estimate
                </div>
                <div className="mock_hb_btn is-text">
                  💬 Or send a text
                </div>
                <div className="mock_hb_chips">
                  <span>★ 4.9</span>
                  <span>24/7</span>
                  <span>Licensed</span>
                </div>
              </div>
            )}

            {tapped && (
              <div className="mock_hb_success" role="status">
                <span className="mock_hb_success-time">1.3s · customer</span>
                <span className="mock_hb_success-text">Tapped “Call now.” ✓</span>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Template / Slow site
  const skeleton = at(1.6);
  const cookieBanner = at(2.2);
  const header = at(2.7);
  const banner = at(3.3);
  const left = at(4.0);
  const done = at(6.8);

  return (
    <div className="mock_site is-template">
      <MockPhoneStatus />
      <div className="mock_urlbar">olsenroofing-template.biz</div>

      {!skeleton && (
        <div className="mock_spinner_wrap">
          <div className="mock_spinner" aria-hidden="true" />
        </div>
      )}

      {skeleton && (
        <div className="mock_tpl_body">
          {banner && (
            <div className="mock_tpl_sale">
              🎉 SPRING SALE! Subscribe to newsletter!!
            </div>
          )}

          {header ? (
            <div className="mock_nav is-bloated">
              <span className="mock_logo">SIERRA ROOFING™</span>
              <span className="mock_burger">≡</span>
            </div>
          ) : (
            <div className="mock_skeleton mock_skeleton-nav" />
          )}

          <div className={`mock_tpl_hero ${done ? "is-done" : "mock_skeleton"}`}>
            {done ? <div className="mock_tpl_hero-title">Welcome to Our Website!</div> : null}
          </div>

          <div className="mock_skeleton mock_skeleton-p" />
          <div className="mock_skeleton mock_skeleton-p is-short" />
          <div className="mock_skeleton mock_skeleton-box" />
        </div>
      )}

      {banner && !left && (
        <div className="mock_tpl_jump">
          layout jumped ↕
        </div>
      )}

      {cookieBanner && !left && (
        <div className="mock_tpl_cookie">
          <span>We use cookies 🍪 to improve your experience.</span>
          <div className="mock_tpl_cookie-actions">
            <span>Accept all</span>
            <span>Settings</span>
          </div>
        </div>
      )}

      {left && (
        <div className="mock_tpl_left" role="alert">
          <div className="mock_tpl_left-emoji">🚶</div>
          <div className="mock_tpl_left-title">They left.</div>
          <div className="mock_tpl_left-timing">Gave up at {(4.0 * factor).toFixed(1)}s</div>
          <div className="mock_tpl_left-desc">…and called the next roofer on the list.</div>
          {done && <div className="mock_tpl_left-done">page finally loaded · {(6.8 * factor).toFixed(1)}s</div>}
        </div>
      )}
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
  const end = 7.2 * factor;

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

  const tplLcp = 4.8 * factor;
  const hbLcp = 0.62 * Math.min(factor, 1.25);
  const tplDone = t >= tplLcp;
  const hbDone = t >= hbLcp;
  const cls = t >= 3.0 * factor ? (t >= 4.8 * factor ? 0.34 : 0.21) : t >= 2.2 * factor ? 0.08 : 0;
  const bailThreshold = 4.0 * factor;
  const pctOfTimeline = Math.min(1, t / end);

  return (
    <section id="proof" className="section_proof" aria-labelledby="proof-heading">
      <div id="test" className="section-anchor" aria-hidden="true" />
      <div className="padding-global padding-section-large">
        <div className="container-large">
          <SectionHeader
            dark
            index="01"
            label="The load race"
            headingId="proof-heading"
            heading={["Speed isn’t a", <><span className="text-italic-serif text-color-highlight">feature.</span> It’s the</>, "front door."]}
            lede={<p>Same roofer, same trade, same phone with two bars of signal. One built on a typical bloated agency template, one hand-grown in Clovis. Pick a signal and watch who gets the customer.</p>}
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
                {running ? "Racing…" : "Run the race again"}
              </button>
            </div>

            {/* Live race timeline bar with 4s bailout threshold */}
            <div className="proof_timeline" aria-hidden="true">
              <div className="proof_timeline-track">
                <div
                  className="proof_timeline-fill"
                  style={{ width: `${pctOfTimeline * 100}%` }}
                />
                <div
                  className="proof_timeline-threshold"
                  style={{ left: `${(bailThreshold / end) * 100}%` }}
                />
              </div>
              <div className="proof_timeline-labels text-style-eyebrow">
                <span>0s</span>
                <span
                  className="proof_timeline-marker"
                  style={{ left: `${(bailThreshold / end) * 100}%` }}
                >
                  <span className="proof_marker-full">↑ {bailThreshold.toFixed(1)}s: patience expires (visitor leaves)</span>
                  <span className="proof_marker-short">↑ {bailThreshold.toFixed(1)}s: visitor leaves</span>
                </span>
                <span>{end.toFixed(1)}s</span>
              </div>
            </div>

            <div className="proof_lanes">
              {(["template", "handbuilt"] as const).map((v) => {
                const isHandbuilt = v === "handbuilt";
                const done = isHandbuilt ? hbDone : tplDone;
                const lcp = isHandbuilt ? hbLcp : tplLcp;
                const shown = done ? lcp : Math.min(t, lcp);

                return (
                  <div key={v} className={`proof_lane is-${v}`}>
                    <div className="proof_lane-head">
                      <span className="text-style-eyebrow">
                        {isHandbuilt ? "Hand-built · Clovis Web Design" : "Typical template · Heavy plugins"}
                      </span>
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
                        <dd>{!isHandbuilt ? cls.toFixed(2) : "0.00"}</dd>
                      </div>
                      <div>
                        <dt>Customer outcome</dt>
                        <dd className={isHandbuilt && hbDone ? "is-good" : !isHandbuilt && t > bailThreshold ? "is-bad" : ""}>
                          {isHandbuilt
                            ? hbDone
                              ? "Tapped 'Call now'"
                              : "Loading…"
                            : tplDone
                              ? "Already left"
                              : t > bailThreshold
                                ? "Gave up & left"
                                : "Waiting…"}
                        </dd>
                      </div>
                    </dl>
                  </div>
                );
              })}
            </div>
            <p className="proof_footnote text-size-small">
              Simulation calibrated to mid-range mobile hardware on real cellular signal. Google’s data shows over 53% of mobile visits are abandoned if a page takes longer than 3 seconds to load.
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

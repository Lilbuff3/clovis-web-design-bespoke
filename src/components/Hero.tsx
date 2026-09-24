import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { marqueeItems, studio } from "../data/content";
import { prefersReducedMotion, useParallax } from "../hooks/motion";
import { Button, Marquee } from "./primitives";

/** Splits text into per-character spans for kinetic weight modulation */
function Kinetic({ text, className = "", start = 0 }: { text: string; className?: string; start?: number }) {
  return (
    <span className={`hero_word ${className}`} aria-hidden="true">
      {Array.from(text).map((ch, i) => (
        <span key={i} className="hero_char" style={{ "--c": start + i } as CSSProperties}>
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </span>
  );
}

function Line({ children, i }: { children: ReactNode; i: number }) {
  return (
    <span className="hero_line" style={{ "--l": i } as CSSProperties}>
      {children}
    </span>
  );
}

export function Hero() {
  const heading = useRef<HTMLHeadingElement>(null);
  const [ready, setReady] = useState(false);
  const imgRef = useParallax<HTMLImageElement>(50);

  useEffect(() => {
    const t = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(t);
  }, []);

  // Cursor-proximity variable-font modulation (wght 340 → 820, SOFT 100 → 0)
  useEffect(() => {
    const h = heading.current;
    if (!h || prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) return;
    const chars = Array.from(h.querySelectorAll<HTMLSpanElement>(".hero_char"));
    let mx = -9999, my = -9999, raf = 0;
    const radius = 260;
    const render = () => {
      raf = 0;
      for (const c of chars) {
        const r = c.getBoundingClientRect();
        const dx = mx - (r.left + r.width / 2);
        const dy = my - (r.top + r.height / 2);
        const d = Math.sqrt(dx * dx + dy * dy);
        const f = Math.max(0, 1 - d / radius);
        const e = f * f * (3 - 2 * f); // smoothstep
        const base = c.parentElement?.classList.contains("is-italic") ? 380 : 340;
        c.style.fontVariationSettings = `"wght" ${Math.round(base + e * 480)}, "SOFT" ${Math.round(100 - e * 100)}, "opsz" 144, "WONK" ${c.parentElement?.classList.contains("is-italic") ? 1 : 0}`;
      }
    };
    const move = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!raf) raf = requestAnimationFrame(render);
    };
    const leave = () => {
      mx = my = -9999;
      if (!raf) raf = requestAnimationFrame(render);
    };
    const host = h.closest("section")!;
    host.addEventListener("pointermove", move);
    host.addEventListener("pointerleave", leave);
    return () => {
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section id="top" className={`section_hero ${ready ? "is-ready" : ""}`} aria-labelledby="hero-heading">
      <div className="padding-global">
        <div className="container-large">
          <div className="hero_component">
            <div className="hero_meta text-style-eyebrow">
              <span className="hero_meta-item">
                <span className="status_dot" aria-hidden="true" /> Taking new work
              </span>
              <span className="hero_meta-item is-center">Hand-built websites · Est. Clovis, CA</span>
              <span className="hero_meta-item is-right">{studio.coords}</span>
            </div>

            <h1 id="hero-heading" ref={heading} className="hero_heading">
              <span className="sr-only">Websites that load before your customer gives up. Hand-built in Clovis for Central Valley businesses.</span>
              <Line i={0}>
                <Kinetic text="Websites that" />
              </Line>
              <Line i={1}>
                <Kinetic text="load" start={13} />
                <span className="hero_pill" aria-hidden="true">
                  <img src="./images/valley-orchard.jpg" alt="" />
                </span>
                <Kinetic text="before" start={17} />
              </Line>
              <Line i={2}>
                <Kinetic text="your customer" start={23} />
              </Line>
              <Line i={3}>
                <Kinetic text="gives up." className="is-italic" start={36} />
              </Line>
            </h1>

            <div className="hero_aside">
              <p className="text-size-large hero_lede">
                I design, write and hand-code fast websites for Fresno &amp; Central Valley businesses. You get my cell
                number — not a ticket queue — and the keys when we’re done.
              </p>
              <div className="button-group">
                <Button label="Text Adam" href={studio.smsHref} variant="accent" magnetic cursorLabel="Say hi" />
                <a href="#work" className="text-link">
                  See the work ↓
                </a>
              </div>
            </div>

            <div className="hero_visual">
              <div className="hero_card" aria-label="Studio at a glance">
                <div className="hero_card-head text-style-eyebrow">
                  <span>Ticket № 001</span>
                  <span>Clovis, CA</span>
                </div>
                <dl className="hero_card-list">
                  <div>
                    <dt>Landing page</dt>
                    <dd>$500</dd>
                  </div>
                  <div>
                    <dt>Live in</dt>
                    <dd>1 week</dd>
                  </div>
                  <div>
                    <dt>Who owns the code</dt>
                    <dd>You</dd>
                  </div>
                  <div>
                    <dt>Monthly hostage fees</dt>
                    <dd>None</dd>
                  </div>
                </dl>
                <a href={studio.smsHref} className="hero_card-foot" data-cursor="hover">
                  <span className="text-style-eyebrow">Text</span>
                  <span className="hero_card-phone">{studio.phoneDisplay}</span>
                </a>
              </div>

              <figure className="hero_image-wrap">
                <img
                  ref={imgRef}
                  className="hero_image"
                  src="./images/studio-still-life.jpg"
                  alt="Hand-drawn website wireframes on a sunlit desk beside persimmons, a halved mandarin and a coffee cup"
                  fetchPriority="high"
                />
                <figcaption className="hero_caption text-style-eyebrow">Fig. 1 — Every site starts on paper.</figcaption>
              </figure>

              <div className="hero_seal" aria-hidden="true">
                <svg viewBox="0 0 200 200" className="hero_seal-ring">
                  <defs>
                    <path id="seal-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                  </defs>
                  <text>
                    <textPath href="#seal-circle">HAND-BUILT · NO TEMPLATES · YOU OWN IT · CLOVIS CA ·</textPath>
                  </text>
                </svg>
                <div className="hero_seal-core">
                  <span className="hero_seal-num">100</span>
                  <span className="hero_seal-label">PageSpeed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero_marquee text-style-eyebrow">
        <Marquee items={marqueeItems} />
      </div>
    </section>
  );
}

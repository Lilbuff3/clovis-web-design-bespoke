import { useMemo, useRef } from "react";
import { useScrollProgress } from "../hooks/motion";

const TEXT =
  "A local business doesn’t need a brand platform. It needs to be found by someone forty feet away with a phone in one hand — and understood in the four seconds before they give up. Everything I build is for those four seconds.";

const EMPHASIS = new Set(["found", "understood", "four", "seconds", "seconds."]);

export function Manifesto() {
  const section = useRef<HTMLElement>(null);
  const words = useMemo(() => TEXT.split(" "), []);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const numeral = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useScrollProgress(section, (p) => {
    // map 0.15→0.7 of travel onto full fill
    const local = Math.min(1, Math.max(0, (p - 0.18) / 0.5));
    const lit = local * words.length;
    wordRefs.current.forEach((w, i) => {
      if (!w) return;
      const o = Math.min(1, Math.max(0, lit - i));
      w.style.setProperty("--fill", o.toFixed(3));
    });
    if (numeral.current) {
      numeral.current.style.transform = `translate3d(0, ${(0.5 - p) * 120}px, 0) rotate(${(p - 0.5) * -8}deg)`;
    }
    if (bar.current) bar.current.style.transform = `scaleY(${local})`;
  });

  return (
    <section ref={section} className="section_manifesto" aria-labelledby="manifesto-heading">
      <div className="padding-global padding-section-large">
        <div className="container-large">
          <div className="manifesto_component">
            <div className="manifesto_rail" aria-hidden="true">
              <span className="text-style-eyebrow">The four-second rule</span>
              <div className="manifesto_rail-track">
                <div ref={bar} className="manifesto_rail-fill" />
              </div>
            </div>
            <div ref={numeral} className="manifesto_numeral" aria-hidden="true">
              4<span className="text-italic-serif">s</span>
            </div>
            <h2 id="manifesto-heading" className="sr-only">
              Our philosophy
            </h2>
            <p className="manifesto_text" aria-label={TEXT}>
              {words.map((w, i) => (
                <span
                  key={i}
                  ref={(el) => {
                    wordRefs.current[i] = el;
                  }}
                  className={`manifesto_word ${EMPHASIS.has(w.replace(/[.,]/g, "")) || EMPHASIS.has(w) ? "is-emphasis" : ""}`}
                  aria-hidden="true"
                >
                  {w}{" "}
                </span>
              ))}
            </p>
            <p className="manifesto_sign text-style-eyebrow">— Adam Youssef, founder &amp; the only person who touches your code</p>
          </div>
        </div>
      </div>
    </section>
  );
}

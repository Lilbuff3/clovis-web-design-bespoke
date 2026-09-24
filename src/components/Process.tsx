import { useEffect, useRef, useState } from "react";
import { processSteps } from "../data/content";
import { prefersReducedMotion, useScrollProgress } from "../hooks/motion";
import { SectionHeader } from "./primitives";

export function Process() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const line = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [height, setHeight] = useState<number | undefined>();
  const [step, setStep] = useState(0);
  const distance = useRef(0);

  // 1) Decide layout mode (pinned horizontal vs stacked)
  useEffect(() => {
    const decide = () => setPinned(window.innerWidth >= 992 && !prefersReducedMotion());
    decide();
    window.addEventListener("resize", decide);
    return () => window.removeEventListener("resize", decide);
  }, []);

  // 2) Measure only after the pinned layout has been applied to the DOM
  useEffect(() => {
    const measure = () => {
      if (pinned && track.current) {
        const el = track.current;
        el.style.transform = "";
        const pad = parseFloat(getComputedStyle(el.parentElement!).paddingLeft) || 0;
        distance.current = Math.max(0, el.offsetLeft + el.scrollWidth - window.innerWidth + pad);
        setHeight(window.innerHeight + distance.current);
      } else {
        distance.current = 0;
        setHeight(undefined);
        if (track.current) track.current.style.transform = "";
      }
    };
    measure();
    window.addEventListener("resize", measure);
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [pinned]);

  useScrollProgress(
    section,
    (p) => {
      if (line.current) line.current.style.transform = `scaleX(${p})`;
      setStep(Math.min(processSteps.length - 1, Math.floor(p * processSteps.length * 0.999)));
      if (pinned && track.current) track.current.style.transform = `translate3d(${-p * distance.current}px,0,0)`;
    },
    pinned ? "sticky" : "through"
  );

  return (
    <section
      id="process"
      ref={section}
      className={`section_process ${pinned ? "is-pinned" : ""}`}
      style={{ height }}
      aria-labelledby="process-heading"
    >
      <div className="process_sticky">
        <div className="padding-global">
          <div className="container-large">
            <SectionHeader
              index="04"
              label="Process"
              headingId="process-heading"
              heading={[<>Four steps, <span className="text-italic-serif text-color-accent">in order.</span></>]}
              lede={<p>Nothing gets made up on the day it should have been decided. Timings shown are for the one-page build; multi-page sites run three to four weeks.</p>}
            />
            <div className="process_progress" aria-hidden="true">
              <div className="process_progress-track">
                <div ref={line} className="process_progress-fill" />
              </div>
              <div className="process_progress-labels text-style-eyebrow">
                {processSteps.map((s, i) => (
                  <span key={s.index} className={i <= step ? "is-active" : ""}>
                    {s.index} {s.title}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="process_viewport">
          <ol ref={track} className="process_track" role="list">
            {processSteps.map((s, i) => (
              <li key={s.index} className={`process_card ${i <= step ? "is-active" : ""}`}>
                <div className="process_card-top">
                  <span className="process_card-index">{s.index}</span>
                  <span className="process_card-when text-style-eyebrow">{s.when}</span>
                </div>
                <h3 className="heading-style-h3">{s.title}</h3>
                <p className="text-color-muted">{s.body}</p>
                <div className="process_card-outputs">
                  <span className="text-style-eyebrow">You walk away with</span>
                  <ul role="list">
                    {s.outputs.map((o) => (
                      <li key={o}>{o}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
            <li className="process_card is-end" aria-hidden="true">
              <span className="heading-style-h2">
                Then it’s <span className="text-italic-serif">yours.</span>
              </span>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

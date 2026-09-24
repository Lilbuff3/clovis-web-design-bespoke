import { useState, type CSSProperties } from "react";
import { comparison } from "../data/content";
import { Reveal, SectionHeader } from "./primitives";

export function Compare() {
  const [studioView, setStudioView] = useState(true);
  return (
    <section className="section_compare" aria-labelledby="compare-heading">
      <div className="padding-global padding-section-large">
        <div className="container-large">
          <SectionHeader
            index="05"
            label="The difference"
            headingId="compare-heading"
            heading={["Same five questions.", <>Very different <span className="text-italic-serif text-color-accent">answers.</span></>]}
          />

          <div className="compare_component">
            <div className="compare_switch-row">
              <span className="text-style-eyebrow text-color-muted">Flip the answers</span>
              <button
                type="button"
                role="switch"
                aria-checked={studioView}
                className={`compare_switch ${studioView ? "is-on" : ""}`}
                onClick={() => setStudioView((v) => !v)}
                data-cursor="label"
                data-cursor-label="Flip"
              >
                <span className={`compare_switch-opt ${!studioView ? "is-active" : ""}`}>Typical agency</span>
                <span className={`compare_switch-opt ${studioView ? "is-active" : ""}`}>With Clovis</span>
                <span className="compare_switch-thumb" aria-hidden="true" />
              </button>
            </div>

            <ul className="compare_list" role="list" aria-live="polite">
              {comparison.map((row, i) => (
                <Reveal as="li" key={row.q} index={i} className="compare_row">
                  <span className="compare_q">
                    <span className="text-style-eyebrow text-color-muted">0{i + 1}</span>
                    {row.q}
                  </span>
                  <span className={`compare_a ${studioView ? "is-studio" : "is-agency"}`} style={{ "--i": i } as CSSProperties}>
                    <span className="compare_a-face is-agency" aria-hidden={studioView}>
                      <span className="compare_mark is-x" aria-hidden="true">✕</span>
                      {row.agency}
                    </span>
                    <span className="compare_a-face is-studio" aria-hidden={!studioView}>
                      <span className="compare_mark is-check" aria-hidden="true">✓</span>
                      {row.studio}
                    </span>
                  </span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

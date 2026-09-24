import { useState } from "react";
import { faqs, studio } from "../data/content";
import { PlusIcon, Reveal, SectionHeader } from "./primitives";

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="questions" className="section_faq" aria-labelledby="faq-heading">
      <div id="faq" className="section-anchor" aria-hidden="true" />
      <div className="padding-global padding-section-large">
        <div className="container-large">
          <div className="faq_component">
            <div className="faq_intro">
              <SectionHeader
                index="09"
                label="Questions"
                headingId="faq-heading"
                heading={["Asked before", <>the first <span className="text-italic-serif text-color-accent">text.</span></>]}
              />
              <Reveal>
                <p className="text-color-muted faq_intro-text">
                  Something not covered? Text {studio.phoneDisplay} — you’ll get a straight answer, even if it’s “you don’t need me yet.”
                </p>
              </Reveal>
            </div>
            <ul className="faq_list" role="list">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <Reveal as="li" key={f.q} index={i} className={`faq_item ${isOpen ? "is-open" : ""}`}>
                    <h3>
                      <button
                        type="button"
                        className="faq_question"
                        aria-expanded={isOpen}
                        aria-controls={`faq-a-${i}`}
                        id={`faq-q-${i}`}
                        onClick={() => setOpen(isOpen ? null : i)}
                      >
                        <span className="faq_num text-style-eyebrow">{String(i + 1).padStart(2, "0")}</span>
                        <span className="faq_q-text">{f.q}</span>
                        <span className="faq_icon">
                          <PlusIcon />
                        </span>
                      </button>
                    </h3>
                    <div className="faq_answer" id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`}>
                      <div className="faq_answer-inner">
                        <p>{f.a}</p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

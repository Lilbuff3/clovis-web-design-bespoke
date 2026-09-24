import { orchardQuote, studio } from "../data/content";
import { useParallax } from "../hooks/motion";
import { Button, MaskedLines, Reveal } from "./primitives";
import { buildSmsHref } from "../utils/sms";

const DETAILED_RULES = [
  {
    rule: "No templates sold as custom. Ever.",
    note: "Every line is written for your business. If something’s reused, you’ll hear it from me first.",
  },
  {
    rule: "Prices published — never behind a phone call.",
    note: "What’s on the tag is what you pay. No “let’s hop on a call to discuss budget.”",
  },
  {
    rule: "You keep the code, the domain and the logins.",
    note: "Handed over on launch day, in your name. Leave whenever you like — no permission needed.",
  },
  {
    rule: "I don’t disappear. When you text, I answer.",
    note: "The person who wrote the code is the person who picks up. No ticket queue, ever.",
  },
  {
    rule: "If one page is enough, that’s what I’ll tell you.",
    note: "Sometimes the honest answer is “you don’t need me yet.” You’ll get that answer straight.",
  },
];

export function Practice() {
  const img = useParallax<HTMLImageElement>(40);
  return (
    <section id="practice" className="section_practice" aria-label="The practice">
      <div className="padding-global padding-section-large">
        <div className="container-large">
          <div className="practice_component">
            <figure className="practice_figure">
              <div className="practice_image-wrap">
                <img
                  ref={img}
                  src="./images/studio.jpg"
                  alt="Adam's sunlit workbench in Clovis with a laptop, sketchbook, and tools"
                  loading="lazy"
                />
              </div>
              <figcaption className="text-style-eyebrow text-color-muted">
                The Workbench · Clovis, California · {studio.coords}
              </figcaption>
            </figure>

            <div className="practice_content">
              <span className="text-style-eyebrow text-color-muted">№ 06 — The practice</span>
              <MaskedLines
                as="h2"
                className="heading-style-h2"
                lines={["One person,", <><span className="text-italic-serif text-color-accent">one town</span> at a</>, "time."]}
              />
              <Reveal>
                <p className="text-size-large">
                  I’m {studio.founder}. I build websites by hand from Clovis for businesses across Fresno and the Central Valley. The person who
                  answers your text is the person who wrote the code.
                </p>
              </Reveal>
              <Reveal index={1}>
                <p className="text-color-muted">
                  So I listen before I design, I write before I build, and I hand you the keys at the end. No brand platform, no retainer
                  treadmill — just a site that earns its keep in the four seconds that matter.
                </p>
              </Reveal>

              <Reveal index={2}>
                <blockquote className="practice_quote text-italic-serif text-color-accent">
                  “{orchardQuote.quote}”
                </blockquote>
              </Reveal>

              <div className="practice_rules">
                <h3 className="text-style-eyebrow">
                  Five rules of the orchard
                </h3>
                <ol role="list" className="practice_rules-list">
                  {DETAILED_RULES.map((r, i) => (
                    <Reveal as="li" key={r.rule} index={i} className="practice_rule-item">
                      <span className="practice_rule-num text-style-eyebrow">0{i + 1}</span>
                      <div className="practice_rule-body">
                        <strong className="practice_rule-title">{r.rule}</strong>
                        <p className="practice_rule-note text-size-small text-color-muted">{r.note}</p>
                      </div>
                    </Reveal>
                  ))}
                </ol>
              </div>

              <Button
                label="Text Adam directly"
                href={buildSmsHref(studio.smsHref, "Hi Adam — wanted to connect about a website project.")}
                variant="primary"
                magnetic
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

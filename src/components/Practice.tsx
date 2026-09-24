import { rules, studio } from "../data/content";
import { useParallax } from "../hooks/motion";
import { Button, MaskedLines, Reveal } from "./primitives";

export function Practice() {
  const img = useParallax<HTMLImageElement>(40);
  return (
    <section className="section_practice" aria-label="The practice">
      <div className="padding-global padding-section-large">
        <div className="container-large">
          <div className="practice_component">
            <figure className="practice_figure">
              <div className="practice_image-wrap">
                <img ref={img} src="./images/hands-craft.jpg" alt="Hands arranging wooden letterpress type on an oak workbench" loading="lazy" />
              </div>
              <figcaption className="text-style-eyebrow text-color-muted">Fig. 2 — Set by hand, one piece at a time.</figcaption>
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

              <div className="practice_rules">
                <h3 className="text-style-eyebrow">
                  House rules
                </h3>
                <ol role="list">
                  {rules.map((r, i) => (
                    <Reveal as="li" key={r} index={i}>
                      <span className="practice_rule-num">{String(i + 1).padStart(2, "0")}</span>
                      <span>{r}</span>
                    </Reveal>
                  ))}
                </ol>
              </div>
              <Button label="Text Adam" href={studio.smsHref} variant="primary" magnetic />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

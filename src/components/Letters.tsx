import { testimonials } from "../data/content";
import { Reveal, SectionHeader } from "./primitives";

export function Letters() {
  return (
    <section className="section_letters" aria-labelledby="letters-heading">
      <div className="padding-global padding-section-large">
        <div className="container-large">
          <SectionHeader
            dark
            index="08"
            label="Letters"
            headingId="letters-heading"
            heading={["In their own words.", <><span className="text-italic-serif text-color-highlight">Unedited.</span></>]}
          />
          <div className="letters_grid">
            {testimonials.map((t, i) => (
              <Reveal as="figure" key={t.name} index={i} className={`letters_card is-${i % 2 ? "right" : "left"}`}>
                <div className="letters_card-head text-style-eyebrow">
                  <span>Letter № 0{i + 1}</span>
                  <span>2025</span>
                </div>
                <blockquote>
                  <p>{t.quote}</p>
                </blockquote>
                <figcaption>
                  <span className="letters_avatar" aria-hidden="true">
                    {t.name
                      .replace("Dr. ", "")
                      .split(" ")
                      .filter((w) => /^[A-Z]/.test(w))
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("")}
                  </span>
                  <span>
                    <b>{t.name}</b>
                    <span className="text-size-small">
                      {t.role}, {t.org}
                    </span>
                  </span>
                </figcaption>
                <span className="letters_stamp" aria-hidden="true">
                  Verified client
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

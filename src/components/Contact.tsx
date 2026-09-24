import { useState, type FormEvent } from "react";
import { studio } from "../data/content";
import { useParallax } from "../hooks/motion";
import { MaskedLines, Reveal } from "./primitives";

const NEEDS = ["A landing page", "A multi-page site", "A rebuild", "Not sure yet"];

export function Contact() {
  const bg = useParallax<HTMLImageElement>(70);
  const [name, setName] = useState("");
  const [trade, setTrade] = useState("");
  const [need, setNeed] = useState(NEEDS[0]);
  const [sent, setSent] = useState(false);

  const body = `Hi Adam — ${name ? `this is ${name}` : "found your site"}${trade ? `, I run a ${trade} business` : ""}. Looking for: ${need.toLowerCase()}.`;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    window.location.href = `${studio.smsHref}?&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="section_contact" aria-labelledby="contact-heading">
      <div className="contact_bg" aria-hidden="true">
        <img ref={bg} src="./images/valley-orchard.jpg" alt="" loading="lazy" />
      </div>
      <div className="padding-global padding-section-large">
        <div className="container-large">
          <div className="contact_component">
            <div className="contact_copy">
              <span className="text-style-eyebrow">№ 10 — Reception</span>
              <MaskedLines as="h2" className="heading-style-display contact_heading" lines={["Start with", <span className="text-italic-serif">a text.</span>]} />
              <Reveal>
                <p className="text-size-large contact_lede">
                  No forms to wade through, no call you didn’t ask for. Tell me what you need and I’ll get back to you — even if you don’t have a
                  website yet.
                </p>
              </Reveal>
              <Reveal index={1} className="contact_direct">
                <a href={studio.smsHref} className="contact_phone" data-cursor="label" data-cursor-label="Text">
                  {studio.phoneDisplay}
                </a>
                <span className="text-style-eyebrow">
                  or <a href={`mailto:${studio.email}`} className="text-link">{studio.email}</a>
                </span>
              </Reveal>
            </div>

            <Reveal as="div" index={2} className="contact_card">
              <div className="contact_card-head text-style-eyebrow">
                <span>Appointment card</span>
                <span>№ 001</span>
              </div>
              <form onSubmit={onSubmit} className="contact_form">
                <div className="contact_field">
                  <label htmlFor="c-name">Your name</label>
                  <input id="c-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Maria" autoComplete="given-name" />
                </div>
                <div className="contact_field">
                  <label htmlFor="c-trade">What’s your trade?</label>
                  <input id="c-trade" value={trade} onChange={(e) => setTrade(e.target.value)} placeholder="Roofing, dental, taquería…" />
                </div>
                <fieldset className="contact_field">
                  <legend>What do you need?</legend>
                  <div className="contact_chips">
                    {NEEDS.map((n) => (
                      <label key={n} className={`contact_chip ${need === n ? "is-active" : ""}`}>
                        <input type="radio" name="need" value={n} checked={need === n} onChange={() => setNeed(n)} />
                        {n}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className="contact_preview" aria-live="polite">
                  <span className="text-style-eyebrow">Your message preview</span>
                  <p>{body}</p>
                </div>
                <button type="submit" className="button is-accent contact_submit">
                  <span>{sent ? "Opening Messages…" : "Open in Messages"}</span>
                  <span className="button_icon">→</span>
                </button>
                <dl className="contact_facts text-size-small">
                  <div>
                    <dt>Cost to ask</dt>
                    <dd>Nothing</dd>
                  </div>
                  <div>
                    <dt>Who answers</dt>
                    <dd>Adam, who builds it</dd>
                  </div>
                </dl>
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

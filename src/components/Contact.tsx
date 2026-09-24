import { useMemo, useState, type FormEvent } from "react";
import { studio } from "../data/content";
import { useParallax } from "../hooks/motion";
import { MaskedLines, Reveal } from "./primitives";
import { buildSmsHref } from "../utils/sms";

const NEEDS = [
  "A one-page site ($500)",
  "A few pages + Spanish",
  "Something bigger",
  "Not sure yet",
];

const WHENS = ["ASAP", "This month", "Just looking"];

export function Contact() {
  const bg = useParallax<HTMLImageElement>(70);
  const [name, setName] = useState("");
  const [trade, setTrade] = useState("");
  const [need, setNeed] = useState(NEEDS[0]);
  const [when, setWhen] = useState(WHENS[0]);
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const message = useMemo(() => {
    const who = name.trim() ? `Hi, Adam! It's ${name.trim()}` : "Hi, Adam!";
    const cleanTrade = trade.trim();
    let what = "";
    if (cleanTrade) {
      if (/^(i |we )/i.test(cleanTrade)) {
        what = ` — ${cleanTrade}`;
      } else {
        what = ` — I run ${cleanTrade}`;
      }
    }
    const cleanNeed = need.replace(/ \(.*\)/, "").trim();
    const n =
      need === "Not sure yet"
        ? "I'm not sure what I need yet"
        : `I'm interested in ${cleanNeed.charAt(0).toLowerCase() + cleanNeed.slice(1)}`;
    const w =
      when === "ASAP"
        ? "hoping to get going ASAP"
        : when === "This month"
          ? "looking to start this month"
          : "just looking for now";
    return `${who}${what ? what + "." : ""} ${n}, ${w}. Can we talk?`;
  }, [name, trade, need, when]);

  const smsUrl = buildSmsHref(studio.smsHref, message);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    window.location.href = smsUrl;
  };

  const copyMessage = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(message).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      });
    }
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
              <MaskedLines
                as="h2"
                className="heading-style-display contact_heading"
                lines={["Start with", <span className="text-italic-serif">a text.</span>]}
              />
              <Reveal>
                <p className="text-size-large contact_lede">
                  No forms to wade through, no call you didn’t ask for. Tap a few options below and I’ll write the first message for you — even if you don’t have a website yet.
                </p>
              </Reveal>

              <Reveal index={1} className="contact_interactive-form">
                <div
                  className="contact_form-inputs"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      onSubmit(e);
                    }
                  }}
                >
                  <div className="contact_field">
                    <label htmlFor="c-name" className="text-style-eyebrow">Your name</label>
                    <input
                      id="c-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Maria"
                      autoComplete="given-name"
                      className="contact_input-text"
                    />
                  </div>

                  <div className="contact_field">
                    <label htmlFor="c-trade" className="text-style-eyebrow">What’s your trade?</label>
                    <input
                      id="c-trade"
                      value={trade}
                      onChange={(e) => setTrade(e.target.value)}
                      placeholder="a taquería in Old Town, plumbing, roofing…"
                      className="contact_input-text"
                    />
                  </div>
                </div>

                <div className="contact_field">
                  <span className="text-style-eyebrow">What do you need?</span>
                  <div className="contact_chips">
                    {NEEDS.map((n) => (
                      <button
                        type="button"
                        key={n}
                        className={`contact_chip-btn ${need === n ? "is-active" : ""}`}
                        onClick={() => setNeed(n)}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="contact_field">
                  <span className="text-style-eyebrow">Timeline</span>
                  <div className="contact_chips">
                    {WHENS.map((w) => (
                      <button
                        type="button"
                        key={w}
                        className={`contact_chip-btn ${when === w ? "is-active" : ""}`}
                        onClick={() => setWhen(w)}
                      >
                        {w}
                      </button>
                    ))}
                  </div>
                </div>
              </Reveal>

              <Reveal index={2} className="contact_direct">
                <a href={smsUrl} className="contact_phone" data-cursor="label" data-cursor-label="Text">
                  {studio.phoneDisplay}
                </a>
                <span className="text-style-eyebrow">
                  or <a href={`mailto:${studio.email}`} className="text-link">{studio.email}</a>
                </span>
              </Reveal>
            </div>

            <Reveal as="div" index={2} className="contact_card">
              <div className="contact_phone-mockup">
                <div className="contact_phone-header">
                  <div className="contact_avatar-sun">
                    <svg viewBox="0 0 40 40" className="w-8 h-8" aria-hidden="true">
                      <circle cx="20" cy="20" r="16" fill="var(--_color---highlight)" />
                      <circle cx="20" cy="20" r="12" fill="var(--_color---surface)" />
                      <circle cx="20" cy="20" r="5" fill="var(--_color---accent)" />
                    </svg>
                  </div>
                  <div>
                    <div className="contact_phone-title">Adam · Clovis Web Design</div>
                    <div className="contact_phone-number font-mono">{studio.phoneDisplay}</div>
                  </div>
                </div>

                <div className="contact_messages-thread">
                  <div className="contact_bubble is-outgoing" key={message}>
                    <p>{message}</p>
                    <span className="contact_bubble-status">Preview · ready to send</span>
                  </div>
                </div>

                <div className="contact_phone-footer">
                  <a
                    href={smsUrl}
                    className="button is-accent contact_sms-btn"
                    onClick={() => setSent(true)}
                  >
                    <span>{sent ? "Opening Messages…" : "Send this to Adam →"}</span>
                  </a>
                  <div className="contact_footer-actions">
                    <button
                      type="button"
                      className="contact_copy-btn"
                      onClick={copyMessage}
                      title="Copy draft message to clipboard"
                    >
                      {copied ? "Copied message ✓" : "Copy text message"}
                    </button>
                    <span className="contact_sep" aria-hidden="true">·</span>
                    <a href={studio.phoneHref} className="contact_call-link">
                      or call {studio.phoneDisplay}
                    </a>
                  </div>
                </div>
              </div>

              <dl className="contact_facts text-size-small">
                <div>
                  <dt>Cost to ask</dt>
                  <dd>Nothing</dd>
                </div>
                <div>
                  <dt>Who answers</dt>
                  <dd>Adam, who builds it</dd>
                </div>
                <div>
                  <dt>Launch price</dt>
                  <dd>$500 one-page</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

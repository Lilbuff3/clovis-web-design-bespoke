import { carePlans, studio, tiers } from "../data/content";
import { Button, Reveal, SectionHeader } from "./primitives";
import { buildSmsHref } from "../utils/sms";

/* PriceCard component with tactile tag aesthetics */
function PriceCard({ tier, index }: { tier: (typeof tiers)[number]; index: number }) {
  const isSeedling = tier.id === "landing";

  return (
    <Reveal as="article" index={index} className={`pricing_card ${tier.featured ? "is-featured" : ""} ${isSeedling ? "is-seedling" : ""}`}>
      <div className="pricing_tag-hole" aria-hidden="true" />

      <div className="pricing_card-head">
        <span className="pricing_code text-style-eyebrow">Nº {tier.code}</span>
        <div>
          <h3 className="heading-style-h3">{tier.name}</h3>
          <span className="text-style-eyebrow pricing_tagline">{tier.tagline}</span>
        </div>
        {tier.featured && <span className="pricing_badge text-style-eyebrow">Most chosen</span>}
        {isSeedling && <span className="pricing_badge is-launch text-style-eyebrow">Save $250</span>}
      </div>

      <div className="pricing_price">
        <span className="pricing_amount">{tier.price}</span>
        {tier.was && (
          <s className="pricing_was" aria-label={`Regular price ${tier.was}`}>
            {tier.was}
          </s>
        )}
        <span className="pricing_unit text-size-small">one-off</span>
      </div>

      <p className="pricing_note text-size-small">{tier.note}</p>

      <div className="pricing_divider" aria-hidden="true" />

      <ul className="pricing_list" role="list">
        {tier.includes.map((i) => (
          <li key={i}>
            <span className="pricing_list-icon is-check" aria-hidden="true">✓</span>
            <span>{i}</span>
          </li>
        ))}
        {tier.excludes.map((i) => (
          <li key={i} className="is-excluded">
            <span className="pricing_list-icon is-minus" aria-hidden="true">–</span>
            <span>{i}</span>
          </li>
        ))}
      </ul>

      <p className="pricing_fit text-size-small">
        <strong className="text-color-primary">Best for:</strong> {tier.fit}
      </p>

      <Button
        label={`Pick ${tier.name}`}
        href={buildSmsHref(studio.smsHref, `Hi Adam — I'm interested in ${tier.name} (${tier.price}). Can we talk about a website?`)}
        variant={tier.featured || isSeedling ? "accent" : "ghost"}
        className="pricing_cta"
      />
    </Reveal>
  );
}

export function Pricing() {
  return (
    <section id="fees" className="section_pricing" aria-labelledby="fees-heading">
      <div id="pricing" className="section-anchor" aria-hidden="true" />
      <div className="padding-global padding-section-large">
        <div className="container-large">
          <SectionHeader
            index="07"
            label="Fees, plainly"
            headingId="fees-heading"
            heading={["Prices on the wall,", <>not in a <span className="text-italic-serif text-color-accent">drawer.</span></>]}
            lede={<p>No discovery call to find out what it costs. Every price is published right here, and every site is yours to keep on day one.</p>}
          />

          <div className="pricing_grid">
            {tiers.map((t, i) => (
              <PriceCard key={t.id} tier={t} index={i} />
            ))}
          </div>

          <Reveal className="pricing_care">
            <div className="pricing_care-intro">
              <span className="text-style-eyebrow text-color-accent">After the harvest</span>
              <h3 className="heading-style-h3">
                Follow-up care. <span className="text-italic-serif">Optional</span> — and I mean it.
              </h3>
              <p className="text-color-muted">
                Your site runs fine without me. Plain files, zero CMS lock-in, no plugins to update, and nothing that breaks at 2 a.m. These care tiers are for clients who’d rather send one quick text than think about their website.
              </p>
            </div>

            <ul className="pricing_care-list" role="list">
              {carePlans.map((c, i) => (
                <li key={c.name} className={`pricing_care-card ${i === 1 ? "is-popular" : ""}`}>
                  <span className="pricing_care-name text-style-eyebrow">{c.name}</span>
                  <div className="pricing_care-price">
                    {c.price}
                    <small className="text-color-muted">{c.price === "$0" ? " · always free" : "/mo"}</small>
                  </div>
                  <p className="pricing_care-body text-size-small text-color-muted">{c.body}</p>
                </li>
              ))}
            </ul>

            <p className="pricing_care-footer text-size-small text-color-muted">
              Cancel with one text. No contract, no exit fee, no “migration charge” — you already hold the keys, the code, the domain, and the logins.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

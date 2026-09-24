import { carePlans, studio, tiers } from "../data/content";
import { Button, Reveal, SectionHeader } from "./primitives";

/* PriceCard component — props: tier (CMS item), featured (variant) */
function PriceCard({ tier, index }: { tier: (typeof tiers)[number]; index: number }) {
  return (
    <Reveal as="article" index={index} className={`pricing_card ${tier.featured ? "is-featured" : ""}`}>
      <div className="pricing_card-head">
        <span className="pricing_code">{tier.code}</span>
        <div>
          <h3 className="heading-style-h3">{tier.name}</h3>
          <span className="text-style-eyebrow pricing_tagline">{tier.tagline}</span>
        </div>
        {tier.featured && <span className="pricing_badge text-style-eyebrow">Most chosen</span>}
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
      <ul className="pricing_list" role="list">
        {tier.includes.map((i) => (
          <li key={i}>
            <span aria-hidden="true">+</span>
            {i}
          </li>
        ))}
        {tier.excludes.map((i) => (
          <li key={i} className="is-excluded">
            <span aria-hidden="true">–</span>
            {i}
          </li>
        ))}
      </ul>
      <p className="pricing_fit text-size-small">
        <b>Best for:</b> {tier.fit}
      </p>
      <Button
        label={`Start ${tier.name}`}
        href={`${studio.smsHref}?&body=${encodeURIComponent(`Hi Adam — I'm interested in ${tier.name} (${tier.price}).`)}`}
        variant={tier.featured ? "accent" : "ghost"}
        className="pricing_cta"
      />
    </Reveal>
  );
}

export function Pricing() {
  return (
    <section id="fees" className="section_pricing" aria-labelledby="fees-heading">
      <div className="padding-global padding-section-large">
        <div className="container-large">
          <SectionHeader
            index="07"
            label="Fees, plainly"
            headingId="fees-heading"
            heading={["Prices on the wall,", <>not in a <span className="text-italic-serif text-color-accent">drawer.</span></>]}
            lede={<p>No discovery call to find out what it costs. Every price is right here, and every site is yours to keep.</p>}
          />

          <div className="pricing_grid">
            {tiers.map((t, i) => (
              <PriceCard key={t.id} tier={t} index={i} />
            ))}
          </div>

          <Reveal className="pricing_care">
            <div className="pricing_care-intro">
              <h3 className="heading-style-h3">
                Follow-up care. <span className="text-italic-serif">Optional</span> — and I mean it.
              </h3>
              <p className="text-color-muted">
                It’s plain files: no plugins to update, nothing that breaks at 2 a.m. Cancel with one text. No contract, no exit fee.
              </p>
            </div>
            <ul className="pricing_care-list" role="list">
              {carePlans.map((c) => (
                <li key={c.name}>
                  <span className="pricing_care-name">{c.name}</span>
                  <span className="pricing_care-price">
                    {c.price}
                    <small>/mo</small>
                  </span>
                  <span className="pricing_care-body text-size-small text-color-muted">{c.body}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

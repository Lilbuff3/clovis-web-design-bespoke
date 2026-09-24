import { useState } from "react";
import { Reveal, SectionHeader } from "./primitives";

const colors = [
  { token: "background", name: "Almond Paper", hex: "#F4EDE1", ink: "#1E1A16", ratio: "14.9:1" },
  { token: "surface", name: "Linen", hex: "#FBF7F0", ink: "#1E1A16", ratio: "16.2:1" },
  { token: "brand", name: "Grove", hex: "#1F3A2C", ink: "#F4EDE1", ratio: "10.6:1" },
  { token: "accent", name: "Persimmon", hex: "#E4572E", ink: "#1E1A16", ratio: "4.7:1" },
  { token: "highlight", name: "Citrus", hex: "#F4B23E", ink: "#1E1A16", ratio: "9.3:1" },
  { token: "text-primary", name: "Valley Ink", hex: "#1E1A16", ink: "#F4EDE1", ratio: "14.9:1" },
  { token: "text-muted", name: "Walnut", hex: "#62574C", ink: "#F4EDE1", ratio: "6.0:1" },
];

const scale = [
  { token: "display", css: "clamp(3.4rem, 1.2rem + 9.6vw, 11.5rem)" },
  { token: "h1", css: "clamp(3rem, 1.4rem + 6.4vw, 8.5rem)" },
  { token: "h2", css: "clamp(2.4rem, 1.35rem + 4.2vw, 5.75rem)" },
  { token: "h3", css: "clamp(1.5rem, 1.15rem + 1.4vw, 2.4rem)" },
  { token: "body", css: "clamp(1rem, 0.97rem + 0.12vw, 1.0625rem)" },
];

const assets = [
  { t: "Photography", d: "Natural window light, 35mm film grain (Portra 400), long raking shadows. Subjects: paper, hands, produce, tools. Never screens, never stock handshakes." },
  { t: "Illustration", d: "Built from CSS & SVG at runtime — browser mockups, gauges, maps. Zero raster weight, always crisp, always on-brand." },
  { t: "Texture", d: "One 220px SVG fractal-noise layer, multiplied at 32% — gives the paper tooth without a single image request." },
  { t: "Motion", d: "Out-expo easing (0.16, 1, 0.3, 1). Reveals ≤ 1.2s, staggers of 80–90ms. Everything collapses to static under prefers-reduced-motion." },
];

export function Colophon() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (token: string) => {
    navigator.clipboard?.writeText(`var(--_color---${token})`).then(() => {
      setCopied(token);
      setTimeout(() => setCopied(null), 1400);
    });
  };

  return (
    <section id="colophon" className="section_colophon" aria-labelledby="colophon-heading">
      <div className="padding-global padding-section-medium">
        <div className="container-large">
          <SectionHeader
            index="11"
            label="Colophon"
            headingId="colophon-heading"
            heading={[<>The system behind <span className="text-italic-serif text-color-accent">this page.</span></>]}
            lede={<p>Every value is a variable. Every section follows Client-First structure. This is what “bespoke” looks like underneath.</p>}
          />

          <div className="colophon_grid">
            <Reveal className="colophon_block is-colors">
              <h3 className="text-style-eyebrow">Color variables · click to copy</h3>
              <ul role="list" className="colophon_swatches">
                {colors.map((c) => (
                  <li key={c.token}>
                    <button type="button" className="colophon_swatch" style={{ background: c.hex, color: c.ink }} onClick={() => copy(c.token)}>
                      <span className="colophon_swatch-name">{c.name}</span>
                      <span className="colophon_swatch-meta">
                        <span>{copied === c.token ? "Copied ✓" : `--${c.token}`}</span>
                        <span>{c.hex}</span>
                      </span>
                      <span className="colophon_swatch-ratio">{c.ratio}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal index={1} className="colophon_block is-type">
              <h3 className="text-style-eyebrow">Type pairing</h3>
              <div className="colophon_specimen">
                <span className="colophon_specimen-big">Fraunces</span>
                <span className="text-size-small text-color-muted">Display serif · variable opsz / wght / SOFT / WONK — sculpted, warm, a little wonky on purpose.</span>
              </div>
              <div className="colophon_specimen is-sans">
                <span className="colophon_specimen-big">Instrument Sans</span>
                <span className="text-size-small text-color-muted">Body grotesque · crisp at 16px, generous apertures, reads in sunlight.</span>
              </div>
              <ul className="colophon_scale" role="list">
                {scale.map((s) => (
                  <li key={s.token}>
                    <span className="text-style-eyebrow">--_type---{s.token}</span>
                    <code>{s.css}</code>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal index={2} className="colophon_block is-structure">
              <h3 className="text-style-eyebrow">Client-First structure</h3>
              <pre className="colophon_tree">
{`page-wrapper
└─ main-wrapper
   └─ section_[name]
      └─ padding-global
         └─ container-large
            └─ padding-section-large
               └─ [name]_component
                  ├─ [name]_element
                  └─ [name]_element.is-variant`}
              </pre>
              <p className="text-size-small text-color-muted">
                Grid for composition, flex for flow. Spacing lives exclusively in <code>gap</code> and section padding variables — no margin stacking.
              </p>
            </Reveal>

            <Reveal index={3} className="colophon_block is-assets">
              <h3 className="text-style-eyebrow">Art direction</h3>
              <dl className="colophon_assets">
                {assets.map((a) => (
                  <div key={a.t}>
                    <dt>{a.t}</dt>
                    <dd className="text-size-small text-color-muted">{a.d}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

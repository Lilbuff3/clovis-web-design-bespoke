import { useRef, useState, type KeyboardEvent } from "react";
import { capabilities } from "../data/content";
import { Reveal, SectionHeader } from "./primitives";

function Visual({ id }: { id: string }) {
  if (id === "words")
    return (
      <div className="cap-visual is-words" aria-hidden="true">
        <div className="cap-wave">
          {Array.from({ length: 28 }).map((_, i) => (
            <span key={i} style={{ "--i": i, "--h": 0.25 + Math.abs(Math.sin(i * 1.7)) * 0.75 } as React.CSSProperties} />
          ))}
        </div>
        <div className="cap-transcript">
          <span className="text-style-eyebrow">REC 00:45:12</span>
          <p>“Most folks call because their AC quit at 4pm in July. They want to know if we come out <mark>tonight</mark>.”</p>
          <p className="cap-transcript-out">→ Headline: <b>AC out? We’re there tonight.</b></p>
        </div>
      </div>
    );
  if (id === "direction")
    return (
      <div className="cap-visual is-direction" aria-hidden="true">
        <div className="cap-specimen">
          <span className="cap-specimen-aa">Aa</span>
          <span className="cap-specimen-meta text-style-eyebrow">Display · Opsz 144 · Soft 50</span>
        </div>
        <div className="cap-swatches">
          {["#1E1A16", "#E4572E", "#F4B23E", "#1F3A2C", "#FBF7F0"].map((c, i) => (
            <span key={c} style={{ background: c, "--i": i } as React.CSSProperties} />
          ))}
        </div>
        <div className="cap-grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <span key={i} style={{ "--i": i } as React.CSSProperties} />
          ))}
        </div>
      </div>
    );
  if (id === "engineering")
    return (
      <div className="cap-visual is-engineering" aria-hidden="true">
        <pre className="cap-code">
          <code>
            <span className="t-tag">&lt;main&gt;</span>
            {"\n  "}
            <span className="t-tag">&lt;h1&gt;</span>AC out? We’re there tonight.<span className="t-tag">&lt;/h1&gt;</span>
            {"\n  "}
            <span className="t-tag">&lt;a</span> <span className="t-attr">href</span>=<span className="t-str">"sms:+1559…"</span>
            <span className="t-tag">&gt;</span>Text us<span className="t-tag">&lt;/a&gt;</span>
            {"\n"}
            <span className="t-tag">&lt;/main&gt;</span>
            {"\n\n"}
            <span className="t-com">{"// 0 plugins · 0 trackers · 14kb"}</span>
          </code>
        </pre>
        <div className="cap-gauge">
          <svg viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="50" className="cap-gauge-bg" />
            <circle cx="60" cy="60" r="50" className="cap-gauge-fg" pathLength={100} />
          </svg>
          <span>100</span>
        </div>
      </div>
    );
  return (
    <div className="cap-visual is-search" aria-hidden="true">
      <div className="cap-serp">
        <div className="cap-serp-query">dumpster rental fresno</div>
        {[
          { t: "Big Bros Dumpster Rentals — Fresno & Clovis", me: true },
          { t: "National Broker Co. — Rent a Dumpster Near…", me: false },
          { t: "Dumpsters4U — Get a Quote Nationwide", me: false },
        ].map((r, i) => (
          <div key={i} className={`cap-serp-row ${r.me ? "is-me" : ""}`} style={{ "--i": i } as React.CSSProperties}>
            <span className="cap-serp-rank">#{i + 1}</span>
            <span>{r.t}</span>
          </div>
        ))}
      </div>
      <div className="cap-pins">
        {["Fresno", "Clovis", "Madera", "Sanger"].map((p, i) => (
          <span key={p} style={{ "--i": i } as React.CSSProperties}>
            ● {p}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Capabilities() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const cap = capabilities[active];

  const onKey = (e: KeyboardEvent) => {
    const n = capabilities.length;
    let next = active;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (active + 1) % n;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (active - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section id="capabilities" className="section_capabilities" aria-labelledby="cap-heading">
      <div className="padding-global padding-section-large">
        <div className="container-large">
          <SectionHeader
            index="02"
            label="Capabilities"
            headingId="cap-heading"
            heading={["One pair of hands.", <>Four <span className="text-italic-serif text-color-accent">disciplines.</span></>]}
            lede={<p>Agencies split this work across six people and a project manager. Here it lives in one head — which is exactly why nothing gets lost between the words, the design and the code.</p>}
          />

          <div className="capabilities_component">
            <div className="capabilities_list" role="tablist" aria-orientation="vertical" aria-label="Capabilities" onKeyDown={onKey}>
              {capabilities.map((c, i) => (
                <Reveal key={c.id} index={i}>
                  <button
                    ref={(el) => {
                      tabs.current[i] = el;
                    }}
                    role="tab"
                    id={`cap-tab-${c.id}`}
                    aria-selected={active === i}
                    aria-controls={`cap-panel-${c.id}`}
                    tabIndex={active === i ? 0 : -1}
                    className={`capabilities_tab ${active === i ? "is-active" : ""}`}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                  >
                    <span className="capabilities_tab-index text-style-eyebrow">{c.index}</span>
                    <span className="capabilities_tab-title">{c.title}</span>
                    <span className="capabilities_tab-arrow" aria-hidden="true">
                      →
                    </span>
                  </button>
                </Reveal>
              ))}
            </div>

            <div
              key={cap.id}
              className="capabilities_panel"
              role="tabpanel"
              id={`cap-panel-${cap.id}`}
              aria-labelledby={`cap-tab-${cap.id}`}
            >
              <div className="capabilities_panel-visual">
                <Visual id={cap.id} />
              </div>
              <div className="capabilities_panel-body">
                <h3 className="heading-style-h3">{cap.kicker}</h3>
                <p className="text-color-muted">{cap.body}</p>
                <div className="capabilities_leverage">
                  <span className="text-style-eyebrow">Commercial leverage</span>
                  <p>{cap.leverage}</p>
                </div>
                <ul className="capabilities_deliverables" role="list">
                  {cap.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

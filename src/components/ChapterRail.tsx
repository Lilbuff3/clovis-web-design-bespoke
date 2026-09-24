import { useEffect, useState } from "react";

interface Chapter {
  id: string;
  num: string;
  name: string;
}

const CHAPTERS: Chapter[] = [
  { id: "top", num: "00", name: "Studio" },
  { id: "proof", num: "01", name: "The Race" },
  { id: "work", num: "02", name: "Real Proof" },
  { id: "boost", num: "03", name: "Boost Engine" },
  { id: "capabilities", num: "04", name: "Craft" },
  { id: "process", num: "05", name: "7-Day Path" },
  { id: "compare", num: "06", name: "Contrast" },
  { id: "fees", num: "07", name: "Plain Fees" },
  { id: "contact", num: "08", name: "Direct Cell" },
];

export function ChapterRail() {
  const [activeId, setActiveId] = useState<string>("top");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show rail after scrolling past initial hero fold
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver to observe sections
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      {
        rootMargin: "-25% 0px -45% 0px",
        threshold: 0.1,
      }
    );

    CHAPTERS.forEach((ch) => {
      const el = document.getElementById(ch.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollTo = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      history.pushState(null, "", `#${id}`);
      setActiveId(id);
    }
  };

  return (
    <nav
      className={`chapter-rail ${visible ? "is-visible" : ""}`}
      aria-label="Page chapter navigation"
      role="navigation"
    >
      <div className="chapter-rail_inner">
        {CHAPTERS.map((ch) => {
          const isActive = activeId === ch.id;
          return (
            <a
              key={ch.id}
              href={`#${ch.id}`}
              onClick={(e) => scrollTo(ch.id, e)}
              className={`chapter-rail_item ${isActive ? "is-active" : ""}`}
              aria-current={isActive ? "true" : undefined}
              data-cursor="label"
              data-cursor-label={ch.name}
            >
              <span className="chapter-rail_dot" aria-hidden="true" />
              <span className="chapter-rail_label">
                <span className="chapter-rail_num font-mono">{ch.num}</span>
                <span className="chapter-rail_name">{ch.name}</span>
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}

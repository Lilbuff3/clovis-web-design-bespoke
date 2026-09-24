import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Manifesto } from "./components/Manifesto";
import { Proof } from "./components/Proof";
import { Work } from "./components/Work";
import { Boost } from "./components/Boost";
import { Capabilities } from "./components/Capabilities";
import { Process } from "./components/Process";
import { Compare } from "./components/Compare";
import { Practice } from "./components/Practice";
import { Pricing } from "./components/Pricing";
import { Letters } from "./components/Letters";
import { Faq } from "./components/Faq";
import { Contact } from "./components/Contact";
import { Colophon } from "./components/Colophon";
import { Footer } from "./components/Footer";
import { ChapterRail } from "./components/ChapterRail";
import { BoostPage } from "./components/BoostPage";
import { Cursor, ScrollProgress } from "./components/primitives";
import { MobileTextBar } from "./components/MobileTextBar";

function getPath() {
  if (typeof window === "undefined") return "/";
  return window.location.pathname.toLowerCase();
}

/**
 * Client-First page architecture:
 * page-wrapper > main-wrapper > section_[name] > padding-global > container-[size] > [name]_component
 */
export default function App() {
  const [currentPath, setCurrentPath] = useState(getPath);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getPath());
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (typeof window !== "undefined") {
      const [pathname, hash] = path.split("#");
      const targetPath = (pathname || "/").toLowerCase();
      window.history.pushState({}, "", path);
      setCurrentPath(targetPath);
      if (hash) {
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }, 60);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  // Dedicated /boost high-conversion route
  if (currentPath === "/boost" || currentPath === "/boost/") {
    return <BoostPage onNavigate={navigateTo} />;
  }

  return (
    <div className="page-wrapper">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <Cursor />
      <ChapterRail />
      <Header onNavigate={navigateTo} />
      <main id="main" className="main-wrapper">
        <Hero />
        <Manifesto />
        <Proof />
        <Work />
        <Boost onNavigate={navigateTo} />
        <Capabilities />
        <Process />
        <Compare />
        <Practice />
        <Pricing />
        <Letters />
        <Faq />
        <Contact />
        <Colophon />
      </main>
      <Footer />
      <MobileTextBar />
    </div>
  );
}

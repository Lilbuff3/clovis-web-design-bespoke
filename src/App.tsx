import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Manifesto } from "./components/Manifesto";
import { Proof } from "./components/Proof";
import { Capabilities } from "./components/Capabilities";
import { Work } from "./components/Work";
import { Process } from "./components/Process";
import { Compare } from "./components/Compare";
import { Practice } from "./components/Practice";
import { Pricing } from "./components/Pricing";
import { Letters } from "./components/Letters";
import { Faq } from "./components/Faq";
import { Contact } from "./components/Contact";
import { Colophon } from "./components/Colophon";
import { Footer } from "./components/Footer";
import { Cursor, ScrollProgress } from "./components/primitives";

/**
 * Client-First page architecture:
 * page-wrapper > main-wrapper > section_[name] > padding-global > container-[size] > [name]_component
 */
export default function App() {
  return (
    <div className="page-wrapper">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollProgress />
      <Cursor />
      <Header />
      <main id="main" className="main-wrapper">
        <Hero />
        <Manifesto />
        <Proof />
        <Capabilities />
        <Work />
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
    </div>
  );
}

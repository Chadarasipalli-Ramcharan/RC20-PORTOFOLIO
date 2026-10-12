import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useTheme } from "./hooks/useTheme";
import { initSmoothScroll, destroySmoothScroll } from "./lib/smooth-scroll";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Journey from "./components/Journey";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Gallery from "./components/Gallery";
import Exploring from "./components/Exploring";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { openResume } from "./lib/resume";

export default function App() {
  const { theme, toggle } = useTheme();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    initSmoothScroll();
    return () => destroySmoothScroll();
  }, []);

  return (
    <div className="grain min-h-screen bg-bg text-ink selection:bg-accent selection:text-accent-ink">
      <AnimatePresence>
        {!loaded && <Preloader key="preloader" onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      <Cursor />
      <ScrollProgress />
      <Nav
        theme={theme}
        onToggleTheme={toggle}
        onOpenResume={openResume}
      />

      <main>
        <Hero
          theme={theme}
          started={loaded}
          onOpenResume={openResume}
        />
        <Marquee />
        <About />
        <Journey />
        <Skills />
        <Projects />
        <Certifications />
        <Gallery />
        <Exploring />
        <Resume />
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
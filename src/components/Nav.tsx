import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X, ArrowUpRight } from "lucide-react";
import { personal } from "../data/personal";
import { socials } from "../data/socials";
import { scrollToTarget, startPageScroll, stopPageScroll } from "../lib/smooth-scroll";
import SocialIcon from "./SocialIcon";
import LogoMark from "./LogoMark";

const links = [
  { id: "about", label: "About" },
  { id: "journey", label: "Journey" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Work" },
  { id: "certifications", label: "Credentials" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

interface NavProps {
  theme: "dark" | "light";
  onToggleTheme: () => void;
  onOpenResume?: () => void;
}

export default function Nav({ theme, onToggleTheme, onOpenResume }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (open) stopPageScroll();
    else startPageScroll();
  }, [open]);

  const go = (id: string) => {
    if (open) {
      setOpen(false);
      window.setTimeout(() => scrollToTarget(`#${id}`), 320);
    } else {
      scrollToTarget(`#${id}`);
    }
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[75] transition-all duration-300 ${
          scrolled ? "border-b border-line bg-bg/85 backdrop-blur-md shadow-sm" : "border-b border-transparent"
        }`}
      >
        <div className="container-x flex h-16 items-center justify-between md:h-20">
          {/* Brand Mark: RC (logo box only) */}
          <button
            onClick={() => go("home")}
            className="group flex items-center text-left"
            aria-label="Back to top"
          >
            <LogoMark className="shadow-surface-sm transition-all duration-500 group-hover:bg-accent group-hover:text-accent-ink group-hover:shadow-[var(--shadow-glow)]" />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => go(link.id)}
                className={`group relative font-mono text-[11px] tracking-[0.18em] uppercase transition-colors duration-400 ${
                  active === link.id ? "text-accent" : "text-muted hover:text-ink"
                }`}
              >
                <span
                  aria-hidden="true"
                  className="absolute -inset-x-2.5 -inset-y-1.5 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "radial-gradient(60% 100% at 50% 50%, var(--accent-soft), transparent 70%)" }}
                />
                <span className="relative">{link.label}</span>
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-accent shadow-[0_0_8px_var(--accent-glow)] transition-all duration-500 ease-out ${
                    active === link.id ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </button>
            ))}
          </nav>

          {/* Right Controls: Theme Toggle, Resume, Mobile Menu */}
          <div className="flex items-center gap-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-elev/60 text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -60, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 60, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex"
                >
                  {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                </motion.span>
              </AnimatePresence>
            </button>

            {/* Resume Action */}
            <button
              onClick={() => {
                if (onOpenResume) onOpenResume();
                else go("resume");
              }}
              className="hidden items-center gap-1.5 rounded-full border border-line-strong bg-elev/60 px-4 py-2 font-mono text-[10px] tracking-[0.2em] text-muted uppercase transition-colors hover:border-accent hover:text-accent md:flex"
            >
              Resume
              <ArrowUpRight size={12} />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-elev/60 text-ink lg:hidden"
            >
              <Menu size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] flex flex-col bg-bg/95 backdrop-blur-xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div className="container-x flex h-16 items-center justify-between border-b border-line">
              <LogoMark />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink"
              >
                <X size={16} />
              </button>
            </div>

            <nav className="container-x flex flex-1 flex-col justify-center gap-2" aria-label="Mobile">
              {links.map((link, i) => (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.35 }}
                  onClick={() => go(link.id)}
                  className="group flex items-baseline gap-4 border-b border-line/60 py-3.5 text-left"
                >
                  <span className="font-mono text-[10px] text-accent">0{i + 1}</span>
                  <span className="font-display text-2xl font-semibold text-ink transition-colors group-hover:text-accent">
                    {link.label}
                  </span>
                </motion.button>
              ))}
            </nav>

            <div className="container-x flex items-center justify-between border-t border-line pb-8 pt-4">
              <div className="flex gap-2.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-muted hover:text-accent"
                  >
                    <SocialIcon icon={s.icon} className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
              <span className="font-mono text-[9px] tracking-[0.25em] text-faint">
                {personal.role.toUpperCase()}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

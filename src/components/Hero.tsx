import { useState, type PointerEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { personal } from "../data/personal";
import { socials } from "../data/socials";
import { scrollToTarget } from "../lib/smooth-scroll";
import AmbientDepthSpace from "./AmbientDepthSpace";
import SocialIcon from "./SocialIcon";
import Magnetic from "./Magnetic";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface HeroProps {
  theme: "dark" | "light";
  started: boolean;
  onOpenResume?: () => void;
}

export default function Hero({ theme, started, onOpenResume }: HeroProps) {
  const reduced = useReducedMotion();
  const show = started || reduced;
  const [imgSrc, setImgSrc] = useState(personal.profileImages.hero);

  // Pointer-driven illumination for the portrait surface
  const onPortraitMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const rise = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 26 },
    animate: show ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.9, delay, ease: EASE },
  });

  const visibleSocials = socials.filter((s) => s.url);

  return (
    <section id="home" className="relative flex min-h-svh flex-col justify-center overflow-hidden">
      {/* Cinematic ambient depth atmosphere */}
      <AmbientDepthSpace theme={theme} className="absolute inset-0 h-full w-full" />

      {/* Layered atmospheric lighting */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(95% 70% at 74% 18%, var(--glow), transparent 58%), radial-gradient(70% 50% at 12% 88%, var(--accent-soft), transparent 62%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-bg to-transparent"
        aria-hidden="true"
      />

      <div className="container-x relative z-10 flex flex-1 flex-col justify-center pt-28 pb-16 md:pt-36 md:pb-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.18fr_0.82fr] lg:gap-16">
          {/* ── Identity column ── */}
          <div className="order-2 lg:order-1">
            <motion.div {...rise(0.12)} className="mb-7 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-elev/70 px-3.5 py-1.5 backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                <span className="font-mono text-[10px] font-semibold tracking-[0.26em] text-accent uppercase">
                  {personal.brand}
                </span>
                <span className="text-faint" aria-hidden="true">/</span>
                <span className="font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                  {personal.role}
                </span>
              </span>
            </motion.div>

            {/* The personal brand mark */}
            <h1 className="select-none">
              <span className="block overflow-hidden pb-1">
                <motion.span
                  initial={reduced ? false : { y: "112%" }}
                  animate={show ? { y: 0 } : {}}
                  transition={{ duration: 1.05, delay: 0.22, ease: EASE }}
                  className="block font-display text-[clamp(2.05rem,6.5vw,4.6rem)] font-bold uppercase leading-[0.94] tracking-[-0.024em] text-ink"
                >
                  CHADARASIPALLI
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-1.5">
                <motion.span
                  initial={reduced ? false : { y: "112%" }}
                  animate={show ? { y: 0 } : {}}
                  transition={{ duration: 1.05, delay: 0.34, ease: EASE }}
                  className="outline-text block font-display text-[clamp(2rem,5.4vw,4.4rem)] font-bold uppercase leading-[1.02] tracking-[0.002em]"
                >
                  RAMCHARAN
                </motion.span>
              </span>
            </h1>

            <motion.p
              {...rise(0.5)}
              className="mt-7 font-display text-lg font-medium leading-snug tracking-[-0.01em] text-ink md:text-xl"
            >
              Building intelligent systems &amp; scalable digital products.
            </motion.p>

            <motion.p
              {...rise(0.6)}
              className="mt-4 max-w-xl text-[15px] leading-[1.7] text-muted md:text-base"
            >
              {personal.heroStatement}
            </motion.p>

            <motion.div {...rise(0.72)} className="mt-9 flex flex-wrap items-center gap-4">
              <Magnetic>
                <button
                  onClick={() => scrollToTarget("#projects")}
                  className="group flex items-center gap-2.5 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold tracking-[-0.005em] text-accent-ink shadow-surface-md transition-all duration-500 hover:bg-accent2 hover:shadow-[var(--shadow-glow)]"
                >
                  Explore my work
                  <ArrowDown
                    size={15}
                    aria-hidden="true"
                    className="transition-transform duration-500 group-hover:translate-y-0.5"
                  />
                </button>
              </Magnetic>

              <Magnetic>
                <button
                  onClick={() => (onOpenResume ? onOpenResume() : scrollToTarget("#resume"))}
                  className="glow-hover group flex items-center gap-2.5 rounded-full border border-line-strong bg-elev/60 px-6 py-3.5 text-sm font-medium tracking-[-0.005em] text-ink backdrop-blur-sm hover:text-accent"
                >
                  View resume
                  <ArrowUpRight
                    size={15}
                    aria-hidden="true"
                    className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>
              </Magnetic>
            </motion.div>

            <motion.div
              {...rise(0.84)}
              className="mt-11 flex flex-wrap items-center gap-4 border-t border-line pt-6"
            >
              <div className="flex items-center gap-2.5">
                {visibleSocials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="glow-hover flex h-10 w-10 items-center justify-center rounded-full border border-line bg-elev/60 text-muted hover:text-accent"
                  >
                    <SocialIcon icon={s.icon} className="h-4 w-4" />
                  </a>
                ))}
                <a
                  href={`mailto:${personal.email}`}
                  aria-label="Direct Email"
                  className="glow-hover flex h-10 w-10 items-center justify-center rounded-full border border-line bg-elev/60 text-muted hover:text-accent"
                >
                  <SocialIcon icon="mail" className="h-4 w-4" />
                </a>
              </div>
              <span className="font-mono text-[10px] tracking-[0.2em] text-muted">
                {personal.education.institution.split(",")[0]}
              </span>
            </motion.div>
          </div>

          {/* ── Signature circular portrait ── */}
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.93 }}
            animate={show ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.15, delay: 0.36, ease: EASE }}
className="order-1 flex justify-center lg:order-2 lg:justify-end lg:-mt-8 lg:pr-24 xl:pr-40"          >
            <div
              className="light-surface group relative rounded-full"
              onPointerMove={onPortraitMove}
            >
              {/* Ambient aura */}
              <div
                className="absolute -inset-5 rounded-full opacity-70 blur-2xl transition-opacity duration-700 group-hover:opacity-100"
                style={{ background: "radial-gradient(circle, var(--accent-soft), transparent 70%)" }}
                aria-hidden="true"
              />

              {/* Portrait — image and frame only, no surrounding labels */}
              <div className="relative h-72 w-72 overflow-hidden rounded-full border border-line-strong bg-elev shadow-surface-lg ring-1 ring-accent-line/60 transition-all duration-700 group-hover:shadow-[var(--shadow-glow)] sm:h-100 sm:w-100 md:h-[21rem] md:w-[21rem] lg:h-[25rem] lg:w-[25rem]">
                <img
                  src={imgSrc}
                  alt={personal.name}
                  onError={() => {
                    if (imgSrc !== personal.profileImages.backup) {
                      setImgSrc(personal.profileImages.backup);
                    }
                  }}
                  className="h-full w-full scale-[1.01] object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                  loading="eager"
                  decoding="async"
                />
                {/* Fixed cinematic scrim — theme-independent so the photo never washes out */}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/5"
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]"
                  aria-hidden="true"
                />
              </div>

            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom status bar */}
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={show ? { opacity: 1 } : {}}
        transition={{ delay: 1.1, duration: 0.8 }}
        className="container-x relative z-10 flex items-center justify-between pb-6"
      >
        <span className="flex items-center gap-2.5 font-mono text-[10px] tracking-[0.24em] text-muted uppercase">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
          {personal.availability}
        </span>
        <button
          onClick={() => scrollToTarget("#about")}
          className="hidden items-center gap-2.5 font-mono text-[9px] tracking-[0.3em] uppercase text-muted transition-colors duration-500 hover:text-accent sm:flex"
        >
          SCROLL TO EXPLORE
          <span className="block h-6 w-px animate-scroll-hint bg-accent/70" aria-hidden="true" />
        </button>
      </motion.div>
    </section>
  );
}

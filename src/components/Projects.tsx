import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  X,
  Check,
  FolderGit2,
  CheckCircle2,
} from "lucide-react";
import { projects } from "../data/projects";
import type { Project } from "../data/types";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { startPageScroll, stopPageScroll } from "../lib/smooth-scroll";
import { GitHubIcon } from "./BrandIcons";

const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];
const N = projects.length;

/* Same slide language as the Credentials carousel */
const cardVariants: Variants = {
  enter: (dir: number) => ({ x: dir >= 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir >= 0 ? -40 : 40, opacity: 0 }),
};

/* ─────────────────────────── Detail Modal ─────────────────────────── */
function ProjectModal({
  project,
  onClose,
  onNext,
}: {
  project: Project;
  onClose: () => void;
  onNext: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const next = projects[(projects.indexOf(project) + 1) % N];

  useEffect(() => {
    stopPageScroll();
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      startPageScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const sections = [
    { label: "The Problem", body: project.problem },
    { label: "The Core Idea", body: project.idea },
    { label: "The Solution", body: project.solution },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[95] flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
    >
      <div className="absolute inset-0 bg-bg/80 backdrop-blur-md" onClick={onClose} aria-hidden="true" />

      <motion.div
        initial={{ y: 50, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 40, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-t-2xl border border-line bg-card shadow-surface-lg sm:rounded-2xl"
      >
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close project details"
          className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-bg/80 text-ink backdrop-blur transition-colors hover:border-accent hover:text-accent"
        >
          <X size={16} />
        </button>

        <div className="relative aspect-[16/8] w-full overflow-hidden bg-elev">
          <img
            src={project.image}
            alt={`${project.title} — visual`}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
            aria-hidden="true"
          />
        </div>

        <div className="p-6 sm:p-10">
          <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] tracking-[0.25em] uppercase">
            <span className="font-semibold text-accent">{project.index}</span>
            <span className="h-px w-6 bg-accent/40" aria-hidden="true" />
            <span className="text-muted">{project.category}</span>
            <span className="rounded-full border border-line bg-elev px-2.5 py-0.5 text-[9px] text-accent">
              {project.status}
            </span>
          </div>

          <h3 className="mt-4 font-display text-[1.9rem] font-medium leading-tight tracking-[0.002em] text-ink sm:text-[2.6rem]">
            {project.title}
          </h3>
          <p className="mt-2 font-display text-[1.1rem] italic text-accent">{project.tagline}</p>
          <p className="mt-4 max-w-2xl text-[15px] leading-[1.78] text-muted">{project.description}</p>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {sections.map((s) => (
              <div key={s.label} className="rounded-xl border border-line bg-elev/50 p-4">
                <h4 className="mb-2 flex items-center gap-2 font-mono text-[10px] font-semibold tracking-[0.24em] text-accent uppercase">
                  <span className="h-px w-4 bg-accent/60" aria-hidden="true" />
                  {s.label}
                </h4>
                <p className="text-[13px] leading-[1.7] text-muted sm:text-sm">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h4 className="mb-3 font-mono text-[10px] font-semibold tracking-[0.24em] text-faint uppercase">
              Technologies &amp; Frameworks
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line bg-elev px-3 py-1 font-mono text-[10px] text-muted"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <h4 className="mb-3 font-mono text-[10px] font-semibold tracking-[0.24em] text-faint uppercase">
              Engineered Capabilities
            </h4>
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {project.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-[13px] leading-[1.7] text-muted sm:text-sm"
                >
                  <Check size={14} className="mt-0.5 shrink-0 text-accent" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-line pt-6">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="glow-hover flex items-center gap-2 rounded-full border border-line-strong bg-elev px-5 py-2.5 text-xs font-medium text-ink hover:text-accent"
              >
                <GitHubIcon className="h-4 w-4" />
                View on GitHub
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="glow-hover flex items-center gap-2 rounded-full border border-line-strong bg-elev px-5 py-2.5 text-xs font-medium text-ink hover:text-accent"
              >
                <ExternalLink size={14} />
                Live Demo
              </a>
            )}
            <button
              onClick={onNext}
              className="group ml-auto flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-semibold text-accent-ink shadow-surface-md transition-all duration-500 hover:bg-accent2 hover:shadow-[var(--shadow-glow)]"
            >
              Next Project — {next.title}
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ───────────────── Projects — mirrors the Credentials layout ───────────────── */
export default function Projects() {
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const [open, setOpen] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  const paginate = useCallback((dir: number) => {
    setState(([i]) => [(i + dir + N) % N, dir]);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.2,
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inView, open, paginate]);

  const project = projects[index];

  return (
    <section id="projects" ref={sectionRef} className="section-pad border-t border-line">
      <div className="container-x">
        <SectionHeading
          index="04"
          label="Selected Projects // RC25"
          title="Engineered to ship."
          description="A selection of machine learning pipelines, full-stack web platforms, and computer vision systems built with precision."
        />

        <Reveal>
          <div className="relative min-h-[440px] sm:min-h-[400px]">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={index}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: EASE }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) paginate(1);
                  else if (info.offset.x > 80) paginate(-1);
                }}
                className="glow-hover grid items-center gap-8 rounded-2xl border border-line bg-elev p-6 shadow-surface-sm md:grid-cols-[1.1fr_0.9fr] md:gap-10 md:p-9"
              >
                {/* Meta details */}
                <div>
                  <div className="flex items-center gap-2">
                    <FolderGit2 size={16} className="text-accent" />
                    <span className="font-mono text-[10px] font-semibold tracking-[0.25em] text-accent uppercase">
                      Project {String(index + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-2xl font-bold leading-snug text-ink sm:text-3xl md:text-[2.1rem]">
                    {project.title}
                  </h3>

                  <p className="mt-3 max-w-lg text-sm leading-[1.75] text-muted">{project.description}</p>

                  <dl className="mt-6 space-y-3 font-mono text-[11px]">
                    <div className="flex items-baseline justify-between gap-6 border-b border-line/50 pb-2">
                      <dt className="tracking-[0.2em] text-faint uppercase">Category</dt>
                      <dd className="text-right font-semibold text-ink">{project.category}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-6 border-b border-line/50 pb-2">
                      <dt className="tracking-[0.2em] text-faint uppercase">Status</dt>
                      <dd className="text-right text-muted">{project.status}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-6 border-b border-line/50 pb-2">
                      <dt className="tracking-[0.2em] text-faint uppercase">Source</dt>
                      <dd className="text-right text-muted">
                        {project.github ? "GitHub" : "—"}
                        {project.live ? " · Live Demo" : ""}
                      </dd>
                    </div>
                  </dl>

                  {project.tech.length > 0 && (
                    <div className="mt-6">
                      <span className="mb-2 block font-mono text-[9px] tracking-[0.25em] text-faint uppercase">
                        Technology Stack
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1 font-mono text-[10px] text-muted"
                          >
                            <CheckCircle2 size={11} className="text-accent" />
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setOpen(project)}
                      className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-card px-5 py-2.5 text-xs font-medium text-ink transition-colors hover:border-accent hover:text-accent"
                    >
                      Explore Project
                      <ArrowUpRight size={13} />
                    </button>
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-card px-5 py-2.5 text-xs font-medium text-ink transition-colors hover:border-accent hover:text-accent"
                      >
                        <GitHubIcon className="h-3.5 w-3.5" />
                        GitHub
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-card px-5 py-2.5 text-xs font-medium text-ink transition-colors hover:border-accent hover:text-accent"
                      >
                        Live Demo
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>
                </div>

                {/* Editorial Project Plate — same frame as the certificate plate */}
                <button
                  onClick={() => setOpen(project)}
                  data-cursor="view"
                  aria-label={`Open ${project.title} details`}
                  className="group relative mx-auto block aspect-[5/4] w-full max-w-[360px] overflow-hidden rounded-xl border border-line-strong bg-card text-left shadow-surface-sm sm:max-w-[420px] lg:mx-0 lg:justify-self-end"
                >
                  <img
                    src={project.image}
                    alt={`${project.title} — visual`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                  />
                  {/* Fixed cinematic scrim — legible in both themes */}
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20"
                    aria-hidden="true"
                  />

                  {/* Fine corner brackets */}
                  <span className="pointer-events-none absolute top-3 left-3 h-4 w-4 border-t-2 border-l-2 border-white/70" />
                  <span className="pointer-events-none absolute top-3 right-3 h-4 w-4 border-t-2 border-r-2 border-white/70" />
                  <span className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-white/70" />
                  <span className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-white/70" />

                  <span className="absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] font-semibold tracking-[0.35em] text-white/90 uppercase">
                    Project Preview
                  </span>

                  <div className="absolute inset-x-0 bottom-6 flex flex-col items-center px-6 text-center">
                    <p className="line-clamp-1 font-display text-base font-semibold leading-snug text-white sm:text-lg">
                      {project.title}
                    </p>
                    <p className="mt-1.5 font-mono text-[10px] tracking-[0.2em] text-white/75 uppercase">
                      {project.category}
                    </p>
                    <span className="mt-3 h-px w-16 bg-white/50 transition-all duration-500 group-hover:w-24" />
                  </div>
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        {/* Carousel Controls — identical to Credentials */}
        <div className="mt-8 flex items-center justify-between gap-6">
          <div className="flex gap-2.5">
            <button
              onClick={() => paginate(-1)}
              aria-label="Previous project"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-elev text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <ArrowLeft size={15} />
            </button>
            <button
              onClick={() => paginate(1)}
              aria-label="Next project"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-elev text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="relative h-px max-w-[260px] flex-1 bg-line" aria-hidden="true">
            <motion.div
              className="absolute top-0 left-0 h-px bg-accent"
              animate={{ width: `${((index + 1) / N) * 100}%` }}
              transition={{ duration: 0.45, ease: EASE }}
            />
          </div>

          <span className="font-mono text-xs text-muted tabular-nums">
            {String(index + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
          </span>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <ProjectModal
            key="modal"
            project={open}
            onClose={() => setOpen(null)}
            onNext={() => {
              setOpen(null);
              paginate(1);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

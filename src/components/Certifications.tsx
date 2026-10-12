import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink, Award, CheckCircle2, ZoomIn, X } from "lucide-react";
import { certifications } from "../data/certifications";
import { personal } from "../data/personal";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { startPageScroll, stopPageScroll } from "../lib/smooth-scroll";

const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];
const N = certifications.length;

const cardVariants: Variants = {
  enter: (dir: number) => ({ x: dir >= 0 ? 40 : -40, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir >= 0 ? -40 : 40, opacity: 0 }),
};

export default function Certifications() {
  const [[index, direction], setState] = useState<[number, number]>([0, 0]);
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [zoom, setZoom] = useState<string | null>(null);

  const paginate = (dir: number) => setState(([i]) => [(i + dir + N) % N, dir]);

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
    if (!inView || zoom) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") paginate(1);
      if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [inView, zoom]);

  useEffect(() => {
    if (!zoom) return;
    stopPageScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      startPageScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [zoom]);

  const cert = certifications[index];

  return (
    <section id="certifications" ref={sectionRef} className="section-pad border-t border-line">
      <div className="container-x">
        <SectionHeading
          index="05"
          label="Credentials // Verified"
          title="Authentic certifications."
          description="Verified technical achievements from NIELIT, IIT Bombay Avenues, and Skill India covering IoT, Machine Learning, and Data Science."
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
                className="glow-hover grid items-center gap-8 rounded-2xl border border-line bg-elev p-6 shadow-surface-sm md:grid-cols-[1.1fr_0.9fr] md:gap-10 md:p-9"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-accent" />
                    <span className="font-mono text-[10px] tracking-[0.25em] text-accent uppercase font-semibold">
                      Credential {String(index + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-4 font-display text-[1.5rem] font-medium leading-[1.25] tracking-[0.002em] text-ink sm:text-[1.7rem] md:text-[1.95rem]">
                    {cert.title}
                  </h3>

                  <dl className="mt-6 space-y-3 font-mono text-[11px]">
                    <div className="flex items-baseline justify-between gap-6 border-b border-line/50 pb-2">
                      <dt className="tracking-[0.2em] text-faint uppercase">Issuing Body</dt>
                      <dd className="text-right text-ink font-semibold">{cert.issuer}</dd>
                    </div>
                    <div className="flex items-baseline justify-between gap-6 border-b border-line/50 pb-2">
                      <dt className="tracking-[0.2em] text-faint uppercase">Completed</dt>
                      <dd className="text-right text-muted">{cert.date}</dd>
                    </div>
                    {cert.credentialId && (
                      <div className="flex items-baseline justify-between gap-6 border-b border-line/50 pb-2">
                        <dt className="tracking-[0.2em] text-faint uppercase">Credential ID</dt>
                        <dd className="text-right text-muted">{cert.credentialId}</dd>
                      </div>
                    )}
                  </dl>

                  {cert.skills.length > 0 && (
                    <div className="mt-6">
                      <span className="mb-2 block font-mono text-[9px] tracking-[0.25em] text-faint uppercase">
                        Verified Competencies
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((s) => (
                          <span
                            key={s}
                            className="inline-flex items-center gap-1.5 rounded-full border border-line bg-card px-3 py-1 font-mono text-[10px] text-muted"
                          >
                            <CheckCircle2 size={11} className="text-accent" />
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {cert.verifyUrl && (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-8 inline-flex items-center gap-2 rounded-full border border-line-strong bg-card px-5 py-2.5 text-xs font-medium text-ink transition-colors hover:border-accent hover:text-accent"
                    >
                      Verify Credential
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>

                {cert.image ? (
                  <button
                    type="button"
                    onClick={() => setZoom(cert.image!)}
                    data-cursor="view"
                    aria-label={`Zoom ${cert.title} certificate`}
                    className="group relative mx-auto block aspect-[4/3] w-full max-w-[360px] overflow-hidden rounded-xl border border-line-strong bg-card shadow-surface-sm sm:max-w-[440px] lg:mx-0 lg:justify-self-end"
                  >
                    <img
                      src={cert.image}
                      alt={`${cert.title} — issued by ${cert.issuer}`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      aria-hidden="true"
                    />
                    <span className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 font-mono text-[9px] font-semibold tracking-[0.2em] text-white/95 uppercase opacity-0 backdrop-blur transition-opacity duration-500 group-hover:opacity-100">
                      <ZoomIn size={11} /> Click to zoom
                    </span>
                    <span className="pointer-events-none absolute top-3 left-3 h-4 w-4 border-t-2 border-l-2 border-white/70" />
                    <span className="pointer-events-none absolute top-3 right-3 h-4 w-4 border-t-2 border-r-2 border-white/70" />
                    <span className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-white/70" />
                  </button>
                ) : (
                  <div
                    className="relative mx-auto flex aspect-[4/3] w-full max-w-[360px] flex-col items-center justify-center overflow-hidden rounded-xl border border-line-strong bg-card p-6 text-center shadow-surface-sm sm:max-w-[440px] lg:mx-0 lg:justify-self-end"
                    aria-hidden="true"
                  >
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{ background: "radial-gradient(120% 90% at 50% 0%, var(--accent-soft), transparent 60%)" }}
                    />
                    <span className="absolute top-3 left-3 h-4 w-4 border-t-2 border-l-2 border-accent/60" />
                    <span className="absolute top-3 right-3 h-4 w-4 border-t-2 border-r-2 border-accent/60" />
                    <span className="absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-accent/60" />
                    <span className="absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-accent/60" />
                    <span className="font-mono text-[9px] tracking-[0.35em] text-accent uppercase font-semibold">
                      OFFICIAL VERIFICATION
                    </span>
                    <span className="mt-4 flex h-14 w-14 items-center justify-center rounded-full border border-accent/60 bg-elev/70 font-sans text-sm font-semibold tracking-[0.02em] text-accent shadow-sm">
                      {personal.monogram}
                    </span>
                    <p className="mt-4 line-clamp-2 max-w-xs font-display text-base font-semibold leading-snug text-ink sm:text-lg">
                      {cert.title}
                    </p>
                    <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
                      {cert.issuer}
                    </p>
                    <span className="mt-4 h-px w-16 bg-accent/50" />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>

        <div className="mt-8 flex items-center justify-between gap-6">
          <div className="flex gap-2.5">
            <button
              onClick={() => paginate(-1)}
              aria-label="Previous certification"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-elev text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <ArrowLeft size={15} />
            </button>
            <button
              onClick={() => paginate(1)}
              aria-label="Next certification"
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
        {zoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[95] flex flex-col items-center justify-center p-4 sm:p-10"
            role="dialog"
            aria-modal="true"
            aria-label="Certificate viewer"
          >
            <div className="absolute inset-0 bg-bg/90 backdrop-blur-md" onClick={() => setZoom(null)} aria-hidden="true" />
            <button
              onClick={() => setZoom(null)}
              aria-label="Close certificate viewer"
              className="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-elev/70 text-ink transition-colors hover:border-accent hover:text-accent sm:top-8 sm:right-8"
            >
              <X size={16} />
            </button>
            <motion.img
              key={zoom}
              src={zoom}
              alt="Certificate — full view"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="relative z-[1] max-h-[85vh] w-auto max-w-5xl rounded-lg border border-line object-contain shadow-surface-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
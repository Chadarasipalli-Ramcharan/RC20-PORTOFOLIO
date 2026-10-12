import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { journey } from "../data/journey";
import Reveal from "./Reveal";

export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.72", "end 0.6"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 22 });

  return (
    <section id="journey" className="section-pad border-t border-line">
      <div className="container-x grid gap-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
        {/* Sticky heading */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <div className="mb-6 flex items-center gap-4">
              <span className="font-mono text-[11px] tracking-[0.3em] text-accent">02</span>
              <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
              <span className="font-mono text-[11px] tracking-[0.3em] text-muted uppercase">Journey</span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-[2.1rem] font-medium leading-[1.14] tracking-[0.002em] text-ink sm:text-[2.6rem]">
              From first lines of code to intelligent systems.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              Five phases, honestly told. The unglamorous middle — the debugging, the rewrites, the
              dead ends — is where most of the learning happened.
            </p>
          </Reveal>
        </div>

        {/* Timeline */}
        <div ref={ref} className="relative">
          {/* rail */}
          <div className="absolute top-2 bottom-2 left-[7px] w-px bg-line" aria-hidden="true" />
          <motion.div
            style={{ scaleY }}
            className="absolute top-2 bottom-2 left-[7px] w-px origin-top bg-accent"
            aria-hidden="true"
          />

          <ol className="space-y-10">
            {journey.map((item, i) => (
              <li key={item.phase} className="relative pl-10 md:pl-14">
                <span
                  className="absolute top-2 left-0 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-accent/70 bg-bg"
                  aria-hidden="true"
                >
                  <span className="h-[5px] w-[5px] rounded-full bg-accent" />
                </span>
                <Reveal delay={i * 0.04}>
                  <article className="group rounded-xl border border-line bg-elev p-6 transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 md:p-8">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="font-mono text-[10px] tracking-[0.3em] text-accent">
                        PHASE {item.phase}
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.2em] text-muted">{item.period}</span>
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-semibold tracking-[-0.015em] text-ink md:text-[1.7rem]">
                      {item.title}
                    </h3>
                    <p className="mt-1 font-mono text-[10px] font-medium tracking-[0.2em] text-accent uppercase">{item.org}</p>
                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted">{item.description}</p>
                    {item.tags.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-line px-3 py-1 font-mono text-[10px] text-faint transition-colors group-hover:border-accent/30 group-hover:text-muted"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

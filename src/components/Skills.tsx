import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { skillCategories } from "../data/skills";
import Reveal from "./Reveal";

export default function Skills() {
  // Initial state: nothing selected, nothing expanded.
  // Skill details are revealed only when the user explicitly clicks a category.
  const [active, setActive] = useState<string>("");

  return (
    <section id="skills" className="section-pad border-t border-line">
      <div className="container-x grid gap-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-20">
        {/* Sticky heading */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <div className="mb-6 flex items-center gap-4">
              <span className="font-mono text-[11px] tracking-[0.3em] text-accent">03</span>
              <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
              <span className="font-mono text-[11px] tracking-[0.3em] text-muted uppercase">Capabilities</span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display text-[2.1rem] font-medium leading-[1.14] tracking-[0.002em] text-ink sm:text-[2.6rem]">
              A toolkit built for the full arc.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
              From raw data to a deployed product — one stack, no hand-offs lost in between. Open a
              category to see what lives inside.
            </p>
          </Reveal>
        </div>

        {/* Accordion */}
        <Reveal delay={0.1}>
          <div className="border-t border-line">
            {skillCategories.map((cat, i) => {
              const open = cat.id === active;
              return (
                <div key={cat.id} className="border-b border-line">
                  <button
                    onClick={() => setActive(open ? "" : cat.id)}
                    aria-expanded={open}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="flex items-baseline gap-5">
                      <span className="font-mono text-[10px] tracking-[0.2em] text-faint">
                        0{i + 1}
                      </span>
                      <span
                        className={`font-display text-xl font-medium transition-colors md:text-2xl ${
                          open ? "text-accent" : "text-ink group-hover:text-accent"
                        }`}
                      >
                        {cat.label}
                      </span>
                      <span className="hidden font-mono text-[10px] tracking-[0.2em] text-faint sm:inline">
                        {String(cat.skills.length).padStart(2, "0")} SKILLS
                      </span>
                    </span>
                    <Plus
                      size={16}
                      className={`shrink-0 text-muted transition-transform duration-300 ${
                        open ? "rotate-45 text-accent" : "group-hover:text-accent"
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 pl-0 sm:pl-12">
                          <p className="mb-5 max-w-md text-sm leading-relaxed text-muted">{cat.blurb}</p>
                          <div className="flex flex-wrap gap-2.5">
                            {cat.skills.map((skill) => (
                              <span
                                key={skill}
                                className="rounded-full border border-line bg-card px-4 py-2 font-mono text-xs text-muted transition-all duration-500 hover:border-accent-line hover:text-accent hover:shadow-[var(--shadow-glow)]"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

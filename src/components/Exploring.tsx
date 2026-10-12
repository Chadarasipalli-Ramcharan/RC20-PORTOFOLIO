import { exploring } from "../data/exploring";
import Reveal from "./Reveal";

export default function Exploring() {
  return (
    <section id="exploring" className="border-t border-line">
      <div className="container-x py-16 md:py-20">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="font-mono text-[11px] tracking-[0.3em] text-accent font-semibold">07</span>
              <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
              <span className="font-mono text-[11px] tracking-[0.3em] text-muted uppercase">
                Currently Exploring // Horizon
              </span>
            </div>
            <span className="font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
              Continuously updated as I learn & build
            </span>
          </div>
        </Reveal>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {exploring.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05} className="h-full">
                <div className="glow-hover group flex h-full flex-col rounded-xl border border-line bg-elev/50 p-5 hover:bg-elev">
                <span className="font-mono text-[10px] text-accent font-semibold">0{i + 1} //</span>
                <h3 className="mt-3 font-display text-base font-semibold text-ink transition-colors group-hover:text-accent">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{item.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import { ArrowUp } from "lucide-react";
import { personal } from "../data/personal";
import { socials } from "../data/socials";
import { scrollToTarget } from "../lib/smooth-scroll";
import SocialIcon from "./SocialIcon";

export default function Footer() {
  const year = new Date().getFullYear();
  const visibleSocials = socials.filter((s) => s.url);

  return (
    <footer className="border-t border-line bg-elev/30">
      <div className="container-x py-12">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-md border border-accent/60 bg-elev font-sans text-[11px] font-semibold tracking-[0.02em] text-accent">
              {personal.monogram}
            </span>
            <div>
              <p className="font-sans text-[13px] font-semibold tracking-[0.12em] text-ink uppercase">
                {personal.name}
              </p>
              <p className="mt-0.5 font-mono text-[9px] tracking-[0.25em] text-accent uppercase">
                {personal.role} // B.TECH CSE @ SPSU
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {visibleSocials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-elev/60 text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <SocialIcon icon={s.icon} className="h-3.5 w-3.5" />
              </a>
            ))}
            <a
              href={`mailto:${personal.email}`}
              aria-label="Direct Email"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line bg-elev/60 text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <SocialIcon icon="mail" className="h-3.5 w-3.5" />
            </a>
          </div>

          <button
            onClick={() => scrollToTarget(0)}
            aria-label="Back to top"
            className="glow-hover group flex h-10 w-10 items-center justify-center rounded-full border border-line bg-elev text-muted hover:text-accent"
          >
            <ArrowUp size={15} className="transition-transform duration-500 group-hover:-translate-y-0.5" />
          </button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-line/60 pt-6">
          <span className="font-mono text-[10px] tracking-[0.15em] text-faint">
            © {year} {personal.name} // {personal.brand}
          </span>
          <span className="font-mono text-[10px] tracking-[0.2em] text-faint uppercase">
            Designed, engineered & continuously evolving
          </span>
        </div>
      </div>
    </footer>
  );
}

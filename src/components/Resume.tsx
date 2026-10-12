import { Download, Eye } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import Magnetic from "./Magnetic";
import { openResume, downloadResume } from "../lib/resume";

export default function Resume() {
  return (
    <section id="resume" className="section-pad border-t border-line">
      <div className="container-x">
        <SectionHeading
          index="08"
          label="Resume // Professional Record"
          title="One page. Everything that matters."
          description="SPSU B.Tech engineering, authentic credentials from NIELIT & IIT Bombay Avenues, and production projects."
        />

        <Reveal>
          <div className="flex flex-col items-start justify-between gap-8 rounded-2xl border border-line bg-elev p-7 shadow-sm md:flex-row md:items-center md:p-10">
            <div>
              <div className="mb-2 flex items-center gap-2 font-mono text-[10px] font-semibold tracking-[0.25em] text-accent uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                RC25 VERIFIED CV
              </div>
              <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                Roles, SPSU education, skills &amp; projects — at a glance.
              </h3>
              <p className="mt-2.5 max-w-xl text-xs leading-relaxed text-muted sm:text-sm">
                View my complete resume in a new tab, or download a copy to keep.
              </p>
            </div>

            <div className="flex flex-wrap gap-3.5 shrink-0">
              <Magnetic>
                <button
                  onClick={openResume}
                  className="flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-xs font-semibold tracking-wide text-accent-ink transition-colors hover:bg-accent2"
                >
                  <Eye size={14} />
                  View Resume
                </button>
              </Magnetic>
              <Magnetic>
                <button
                  onClick={downloadResume}
                  className="flex items-center gap-2 rounded-full border border-line-strong bg-card px-6 py-3.5 text-xs font-medium tracking-wide text-ink transition-colors hover:border-accent hover:text-accent"
                >
                  <Download size={14} />
                  Download
                </button>
              </Magnetic>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
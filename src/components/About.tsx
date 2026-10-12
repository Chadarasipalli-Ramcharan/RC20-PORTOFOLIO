import { useState } from "react";
import { GraduationCap, MapPin, Cpu, Code2, Quote } from "lucide-react";
import { personal } from "../data/personal";
import Reveal from "./Reveal";

const quickBadges = [
  { icon: GraduationCap, label: "Education", value: "B.Tech CSE @ SPSU" },
  { icon: MapPin, label: "Location", value: "Udaipur, India" },
  { icon: Cpu, label: "Focus", value: "AI & ML Specialist" },
  { icon: Code2, label: "Full-Stack", value: "React · Node · Python" },
];

const pillars = [
  {
    num: "01",
    title: "Who I Am",
    text: "A Final Year Computer Science engineer at SPSU Udaipur. Equal parts data enthusiast and software developer — comfortable training neural models and architecting full-stack web applications.",
  },
  {
    num: "02",
    title: "What I Build",
    text: "Real-world software: AcadNexus Pro and SmartExam Pro for education, DataForge for automated data quality, and Nexora Ascension for student-focused discovery.",
  },
  {
    num: "03",
    title: "What I Explore",
    text: "Deep learning architectures, computer vision CNNs, LLM applications, embedded IoT through MicroPython, and resilient relational database design.",
  },
  {
    num: "04",
    title: "Where I'm Headed",
    text: "Aiming to join forward-thinking engineering teams and labs where machine learning directly empowers human workflows through clean, dependable software.",
  },
];

export default function About() {
  const [imgSrc, setImgSrc] = useState(personal.profileImages.about);

  return (
    <section id="about" className="section-pad border-t border-line">
      <div className="container-x">
        {/* Section Heading Tag */}
        <Reveal>
          <div className="mb-10 flex items-center gap-4">
            <span className="font-mono text-[11px] tracking-[0.3em] text-accent">01</span>
            <span className="h-px w-10 bg-accent/60" aria-hidden="true" />
            <span className="font-mono text-[11px] tracking-[0.3em] text-muted uppercase">
              About Me // RC25
            </span>
          </div>
        </Reveal>

        {/* Two-Column Layout: Left Portrait Image / Right Narrative */}
        <div className="grid gap-12 lg:grid-cols-[4.2fr_7.8fr] lg:gap-16 items-start">
          {/* LEFT: Professional Editorial Portrait */}
          <div className="lg:sticky lg:top-28">
            <Reveal delay={0.08}>
              <div className="glow-hover group relative rounded-2xl border border-line bg-elev p-3 shadow-surface-sm">
                {/* Outer frame styling */}
                <div className="relative aspect-[3.8/4.5] w-full overflow-hidden rounded-xl bg-card">
                  <img
                    src={imgSrc}
                    alt={`${personal.name} — Portrait`}
                    onError={() => {
                      if (imgSrc !== personal.profileImages.backup) {
                        setImgSrc(personal.profileImages.backup);
                      }
                    }}
                    className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    loading="lazy"
                    decoding="async"
                  />

                  {/* Fixed cinematic scrim — theme-independent legibility */}
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent"
                    aria-hidden="true"
                  />
                  <div className="pointer-events-none absolute top-3 left-3 h-4 w-4 border-t-2 border-l-2 border-accent/70" />
                  <div className="pointer-events-none absolute top-3 right-3 h-4 w-4 border-t-2 border-r-2 border-accent/70" />
                  <div className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b-2 border-l-2 border-accent/70" />
                  <div className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b-2 border-r-2 border-accent/70" />

                  {/* Corner tag */}
                  <span className="absolute top-4 left-5 font-mono text-[9px] tracking-[0.3em] text-ink/80 uppercase">
                    RC25 // PORTRAIT
                  </span>
                </div>

                {/* Portrait Caption & Institution */}
                <div className="mt-4 px-2 pb-1">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-display text-sm font-semibold tracking-[-0.005em] text-ink">
                      {personal.name}
                    </span>
                    <span className="font-mono text-[9px] tracking-[0.2em] text-accent uppercase">
                      HE / HIM
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-[10px] leading-relaxed text-muted">
                    {personal.education.institution}
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT: About Narrative, Quote & Details */}
          <div>
            {/* Main Statement */}
            <Reveal delay={0.12}>
              <h2 className="font-display text-[1.4rem] font-normal leading-[1.52] tracking-[0.002em] text-ink sm:text-[1.55rem] md:text-[1.72rem]">
                {personal.about}
              </h2>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-5 text-[15px] leading-[1.78] text-muted">
                {personal.aboutExtended}
              </p>
            </Reveal>

            {/* Signature Quotation from Old Portfolio */}
            <Reveal delay={0.24}>
              <div className="my-8 rounded-xl border border-line-strong bg-elev/70 p-6 backdrop-blur">
                <Quote size={20} className="mb-2 text-accent/70" />
                <blockquote className="font-display text-[1.15rem] italic leading-relaxed text-ink md:text-[1.3rem]">
                  “{personal.quote}”
                </blockquote>
                <p className="mt-2.5 font-mono text-[10px] tracking-[0.24em] text-accent uppercase">
                  — Chadarasipalli Ramcharan
                </p>
              </div>
            </Reveal>

            {/* Quick Fact Badges (from Old Portfolio) */}
            <Reveal delay={0.3}>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {quickBadges.map((b) => {
                  const Icon = b.icon;
                  return (
                    <div
                      key={b.label}
                      className="rounded-xl border border-line bg-elev/50 p-3.5 transition-colors duration-300 hover:border-accent/40"
                    >
                      <Icon size={16} className="text-accent mb-2" />
                      <div className="font-mono text-[9px] tracking-[0.2em] text-faint uppercase">
                        {b.label}
                      </div>
                      <div className="mt-1 font-sans text-[13px] font-medium leading-snug text-ink">
                        {b.value}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            {/* 4 Deep Narrative Pillars */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {pillars.map((item, i) => (
                <Reveal key={item.num} delay={0.35 + i * 0.06}>
                  <div className="group h-full rounded-xl border border-line bg-elev/40 p-5 transition-all duration-300 hover:border-accent/40 hover:bg-elev">
                    <span className="font-mono text-[10px] font-semibold tracking-[0.25em] text-accent">
                      {item.num} //
                    </span>
                    <h3 className="mt-2 font-display text-base font-semibold text-ink group-hover:text-accent transition-colors">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted sm:text-sm">
                      {item.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Reveal from "./Reveal";

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
  description?: string;
}

/** Editorial section opener: mono index — label, then a display heading. */
export default function SectionHeading({ index, label, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-14 md:mb-20">
      <Reveal>
        <div className="mb-7 flex items-center gap-4">
          <span className="font-mono text-[11px] font-medium tracking-[0.3em] text-accent">{index}</span>
          <span className="h-px w-10 bg-accent/50" aria-hidden="true" />
          <span className="font-mono text-[11px] font-medium tracking-[0.28em] text-muted uppercase">
            {label}
          </span>
        </div>
      </Reveal>
      <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
        <Reveal delay={0.08}>
          <h2 className="max-w-2xl font-display text-[2.1rem] font-medium leading-[1.14] tracking-[0.002em] text-ink sm:text-[2.6rem] md:text-[3rem]">
            {title}
          </h2>
        </Reveal>
        {description && (
          <Reveal delay={0.16}>
            <p className="max-w-sm text-sm leading-[1.7] text-muted lg:pb-2.5 lg:text-right">
              {description}
            </p>
          </Reveal>
        )}
      </div>
    </div>
  );
}

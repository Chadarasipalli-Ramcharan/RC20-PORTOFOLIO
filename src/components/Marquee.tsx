import { personal } from "../data/personal";

/** Quiet capability ticker directly under the hero. */
export default function Marquee() {
  const items = personal.roles;
  const row = (hidden: boolean) => (
    <div aria-hidden={hidden} className="flex w-max shrink-0 items-center">
      {items.map((item) => (
        <span key={hidden + item} className="flex items-center">
          <span className="px-7 font-mono text-[11px] tracking-[0.3em] text-muted uppercase">
            {item}
          </span>
          <span className="h-1.5 w-1.5 rotate-45 bg-accent/70" aria-hidden="true" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="relative overflow-hidden border-y border-line bg-elev/40 py-5" aria-label="Specializations">
      <div className="flex w-max animate-marquee">
        {row(false)}
        {row(true)}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" />
    </div>
  );
}

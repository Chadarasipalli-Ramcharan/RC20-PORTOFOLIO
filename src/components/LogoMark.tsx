import { personal } from "../data/personal";

/**
 * Navbar logo box. Shows `personal.logo.image` if set, otherwise "RC".
 * Same box size and styling either way, so swapping in an image
 * never shifts the navbar.
 */
export default function LogoMark({ className = "" }: { className?: string }) {
  const { text, image } = personal.logo;

  return (
    <span
      className={`flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-md border border-accent/60 bg-elev/70 font-sans text-[11px] font-semibold tracking-[0.02em] text-accent ${className}`}
    >
      {image ? (
        <img src={image} alt={`${personal.name} logo`} className="h-full w-full object-cover" />
      ) : (
        text
      )}
    </span>
  );
}

import { useEffect, useRef } from "react";

/**
 * Custom cursor: precise dot + trailing ring. Expands over links,
 * buttons and any [data-cursor] element; shows a "VIEW" label over
 * project imagery. Disabled on touch devices & reduced motion.
 */
export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let scale = 1;
    let targetScale = 1;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      dot.style.opacity = "1";
      ring.style.opacity = "1";

      const target = e.target as HTMLElement | null;
      const view = target?.closest('[data-cursor="view"]');
      const interactive = target?.closest("a, button, [role='button'], input, textarea, label");
      targetScale = view ? 2.9 : interactive ? 2 : 1;
      label.style.opacity = view ? "1" : "0";
    };

    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      scale += (targetScale - scale) * 0.16;
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${scale})`;
      label.style.transform = `translate(-50%, -50%) scale(${1 / scale})`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      root.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[99] h-1.5 w-1.5 rounded-full bg-accent opacity-0"
      />
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[98] flex h-9 w-9 items-center justify-center rounded-full border border-accent/70 opacity-0"
      >
        <span
          ref={labelRef}
          className="absolute font-mono text-[8px] font-medium tracking-[0.2em] text-accent opacity-0 transition-opacity duration-200"
        >
          VIEW
        </span>
      </div>
    </>
  );
}

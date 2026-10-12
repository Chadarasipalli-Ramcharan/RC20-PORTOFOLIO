import Lenis from "lenis";

/**
 * Lightweight smooth-scroll layer (lenis). Falls back to native
 * scrolling when reduced motion is preferred. Modal helpers stop /
 * start the whole page so overlays scroll independently.
 */
let lenis: Lenis | null = null;
let rafId = 0;

export function initSmoothScroll(): Lenis | null {
  if (lenis) return lenis;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced) return null;

  lenis = new Lenis({
    lerp: 0.11,
    smoothWheel: true,
  });

  const raf = (time: number) => {
    lenis?.raf(time);
    rafId = requestAnimationFrame(raf);
  };
  rafId = requestAnimationFrame(raf);
  return lenis;
}

export function destroySmoothScroll() {
  cancelAnimationFrame(rafId);
  lenis?.destroy();
  lenis = null;
}

export function scrollToTarget(target: string | number) {
  if (lenis) {
    lenis.scrollTo(target as never, {
      offset: typeof target === "string" ? -72 : 0,
      duration: 1.4,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
  } else if (typeof target === "string") {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    window.scrollTo({ top: target, behavior: "smooth" });
  }
}

export function stopPageScroll() {
  document.documentElement.style.overflow = "hidden";
  lenis?.stop();
}

export function startPageScroll() {
  document.documentElement.style.overflow = "";
  lenis?.start();
}

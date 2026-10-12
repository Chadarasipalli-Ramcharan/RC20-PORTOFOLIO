import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { personal } from "../data/personal";

/**
 * Preloader — Short, elegant 1.2s identity introduction.
 * Shows RC25 monogram, letter reveal, progress indicator, then lifts.
 * Skipped instantly if reduced motion is preferred.
 */
export default function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      onDone();
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1200;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else window.setTimeout(onDone, 200);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  const letters = personal.name.toUpperCase().split("");

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
      exit={{ y: "-100%" }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      aria-label="Loading portfolio"
    >
      <motion.span
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg border border-accent/60 bg-elev/70 font-sans text-sm font-semibold tracking-[0.02em] text-accent shadow-sm"
      >
        {personal.monogram}
      </motion.span>

      <p className="flex flex-wrap justify-center overflow-hidden px-6 font-display text-base font-semibold tracking-[0.14em] text-ink sm:text-xl sm:tracking-[0.18em]">
        {letters.map((ch, i) => (
          <motion.span
            key={i}
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.015, ease: [0.22, 1, 0.36, 1] }}
            className="inline-block"
          >
            {ch === " " ? "\u00A0" : ch}
          </motion.span>
        ))}
      </p>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="mt-3 font-mono text-[10px] tracking-[0.3em] text-accent uppercase"
      >
        {personal.role} // {personal.brand}
      </motion.p>

      <div className="absolute bottom-8 left-0 right-0 flex items-end justify-between px-6 sm:px-10">
        <div className="h-px w-full max-w-xs self-center overflow-hidden bg-line">
          <div
            className="h-full bg-accent transition-[width] duration-75 ease-linear"
            style={{ width: `${count}%` }}
          />
        </div>
        <span className="font-mono text-xs text-muted tabular-nums">
          {String(count).padStart(3, "0")}%
        </span>
      </div>
    </motion.div>
  );
}

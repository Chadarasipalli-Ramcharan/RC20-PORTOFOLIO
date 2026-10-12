import { useCallback, type PointerEvent, type RefObject, useRef } from "react";

/**
 * usePointerGlow — drives the shared `.light-surface` illumination.
 * Writes the cursor position into `--mx` / `--my` on the element so the
 * CSS radial-gradient light can follow the pointer. No re-renders, no
 * state, no listeners beyond the element's own pointermove — and the
 * visual itself is gated by `:hover` in CSS, so touch devices are inert.
 */
export function usePointerGlow<T extends HTMLElement>(): {
  ref: RefObject<T | null>;
  onPointerMove: (e: PointerEvent<T>) => void;
} {
  const ref = useRef<T>(null);

  const onPointerMove = useCallback((e: PointerEvent<T>) => {
    const el = e.currentTarget as T;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }, []);

  return { ref, onPointerMove };
}

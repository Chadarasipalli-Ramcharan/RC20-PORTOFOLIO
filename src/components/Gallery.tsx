import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { galleryItems } from "../data/gallery";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { startPageScroll, stopPageScroll } from "../lib/smooth-scroll";

const EASE: [number, number, number, number] = [0.32, 0.72, 0, 1];
const N = galleryItems.length;

export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (dir: number) => setOpen((cur) => (cur === null ? cur : (cur + dir + N) % N)),
    []
  );

  useEffect(() => {
    if (open === null) return;
    stopPageScroll();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      startPageScroll();
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  return (
    <section id="gallery" className="section-pad border-t border-line">
      <div className="container-x">
        <SectionHeading
          index="06"
          label="Visual Journal // RC25"
          title="Fragments of the process."
          description="A visual journal of workspace architecture, model structures, and design studies behind the engineering."
        />

        <Reveal>
          <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4 md:auto-rows-[220px]">
            {galleryItems.map((item, i) => (
              <button
                key={item.src + i}
                onClick={() => setOpen(i)}
                data-cursor="view"
                aria-label={`Open image — ${item.caption}`}
                className={`group relative overflow-hidden rounded-xl border border-line bg-elev ${
                  item.tall ? "row-span-2" : ""
                } shadow-sm`}
              >
                <img
                  src={item.src}
                  alt={item.caption}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />
                <span className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-left font-mono text-[10px] leading-relaxed text-white/95 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {item.caption}
                </span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Fullscreen Lightbox Modal */}
      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[95] flex flex-col items-center justify-center p-4 sm:p-10"
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            <div className="absolute inset-0 bg-bg/90 backdrop-blur-md" onClick={close} aria-hidden="true" />

            <div className="absolute top-5 left-5 font-mono text-xs text-muted tabular-nums sm:top-8 sm:left-8">
              {String(open + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
            </div>

            <button
              onClick={close}
              aria-label="Close viewer"
              className="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-elev/70 text-ink transition-colors hover:border-accent hover:text-accent sm:top-8 sm:right-8"
            >
              <X size={16} />
            </button>

            <motion.figure
              key={open}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="relative z-[1] flex max-h-full flex-col items-center max-w-4xl"
            >
              <img
                src={galleryItems[open].src}
                alt={galleryItems[open].caption}
                className="max-h-[72vh] w-auto max-w-full rounded-xl border border-line object-contain shadow-surface-lg"
              />
              <figcaption className="mt-4 max-w-xl text-center font-mono text-[11px] leading-relaxed text-muted">
                {galleryItems[open].caption}
              </figcaption>
            </motion.figure>

            <div className="relative z-[1] mt-6 flex gap-3">
              <button
                onClick={() => step(-1)}
                aria-label="Previous image"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-elev text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <ArrowLeft size={15} />
              </button>
              <button
                onClick={() => step(1)}
                aria-label="Next image"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-elev text-muted transition-colors hover:border-accent hover:text-accent"
              >
                <ArrowRight size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

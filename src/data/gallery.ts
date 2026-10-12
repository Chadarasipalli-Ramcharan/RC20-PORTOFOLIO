// ────────────────────────────────────────────────────────────────
// GALLERY — illustrative visuals of software development, build
// sprints, teamwork, and tech learning.
// NOTE: these are representative stock photographs used to convey the
// working atmosphere — they are not presented as photos of specific
// real events. Swap any `src` with your own genuine event photos
// (place them in public/images/gallery/ and reference the local path).
// ────────────────────────────────────────────────────────────────
import type { GalleryItem } from "./types";

export const galleryItems: GalleryItem[] = [
  {
    src: "https://images.pexels.com/photos/4385446/pexels-photo-4385446.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    caption: "Build sprints — long, focused sessions turning ideas into working software.",
    tall: true,
  },
  {
    src: "https://images.pexels.com/photos/256502/pexels-photo-256502.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    caption: "In the code — building full-stack features line by line.",
  },
  {
    src: "https://images.pexels.com/photos/1181309/pexels-photo-1181309.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    caption: "Planning together — mapping architecture before the first commit.",
  },
  {
    src: "https://images.pexels.com/photos/9275222/pexels-photo-9275222.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=1200",
    caption: "Always learning — workshops, talks, and tech community sessions.",
    tall: true,
  },
  {
    src: "https://images.pexels.com/photos/4955393/pexels-photo-4955393.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    caption: "Debugging & shipping — the real craft of development.",
  },
  {
    src: "https://images.pexels.com/photos/1181531/pexels-photo-1181531.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    caption: "Teamwork — pairing on problems and sharing ideas.",
  },
];

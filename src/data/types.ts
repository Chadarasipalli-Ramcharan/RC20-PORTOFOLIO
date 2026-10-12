// ────────────────────────────────────────────────────────────────
// Shared data types — every section consumes these shapes.
// ────────────────────────────────────────────────────────────────

export type SocialIcon = "github" | "linkedin" | "instagram" | "mail" | "globe";

export interface Social {
  label: string;
  handle: string;
  url: string; // empty string → link is hidden in the UI
  icon: SocialIcon;
}

export interface Project {
  id: string;
  index: string; // display order, e.g. "01"
  title: string;
  tagline: string;
  category: string;
  status: string;
  description: string;
  problem: string;
  idea: string;
  solution: string;
  tech: string[];
  features: string[];
  image: string;
  github: string; // empty string → button hidden
  live: string; // empty string → button hidden
}

export interface SkillCategory {
  id: string;
  label: string;
  blurb: string;
  skills: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  skills: string[];
  credentialId?: string;
  verifyUrl?: string; // empty / undefined → link hidden
  image?: string;

}

export interface JourneyItem {
  phase: string;
  title: string;
  org: string;
  period: string;
  description: string;
  tags: string[];
}

export interface GalleryItem {
  src: string;
  caption: string;
  tall?: boolean; // spans two rows in the asymmetric grid
}

export interface ExploreItem {
  title: string;
  note: string;
}

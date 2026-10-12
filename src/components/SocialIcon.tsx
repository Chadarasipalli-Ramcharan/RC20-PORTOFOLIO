import { Mail, Globe } from "lucide-react";
import { GitHubIcon, LinkedInIcon, InstagramIcon } from "./BrandIcons";
import type { SocialIcon as IconName } from "../data/types";

const map = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  mail: Mail,
  globe: Globe,
} as const;

export default function SocialIcon({ icon, className }: { icon: IconName; className?: string }) {
  const Cmp = map[icon];
  return <Cmp className={className} />;
}

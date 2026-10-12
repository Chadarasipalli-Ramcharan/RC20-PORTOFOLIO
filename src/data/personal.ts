// ────────────────────────────────────────────────────────────────
// PERSONAL — single source of truth for Chadarasipalli Ramcharan (RC25).
// ────────────────────────────────────────────────────────────────

export const personal = {
  name: "Chadarasipalli Ramcharan",
  shortName: "Ramcharan",
  brand: "RC25",
  monogram: "RC25",
  // Navbar logo box. Set `image` to a path (e.g. "/images/logo.png") to
  // replace the "RC" text with your own logo — the box stays the same size.
  logo: {
    text: "RC",
    image: "",
  },
  pronouns: "He / Him",
  role: "AI & ML Engineer",
  roles: [
    "AI & ML Engineer",
    "Full-Stack Developer",
    "Data & AI Enthusiast",
    "Software Developer",
    "Problem Solver",
    "B.Tech CSE @ SPSU",
  ],
  tagline: "Building intelligent systems, digital products, and cinematic experiences.",
  heroStatement:
    "Passionate about creating intelligent, scalable, and elegant digital solutions. Skilled in blending machine learning with thoughtful design, reliable data pipelines, and high-performance engineering.",
  about:
    "I'm Chadarasipalli Ramcharan — a Final Year B.Tech Computer Science student at SPSU Udaipur (Sir Padampat Singhania University), specializing in Artificial Intelligence and Machine Learning. My work sits at the intersection of intelligent models, modern full-stack engineering, and considered UI design.",
  aboutExtended:
    "Beyond training algorithms, I care deeply about shipping products people actually rely on. Every project starts with a real-world problem and ends with clean, performant software. Guided by curiosity, focus, and continuous growth — believing purpose fuels innovation.",
  quote: "Crafting with code, guided by spirit — I believe purpose fuels innovation.",
  education: {
    degree: "B.Tech in Computer Science & Engineering",
    institution: "Sir Padampat Singhania University (SPSU), Udaipur",
    status: "3rd Year Student · AI & ML Specialization",
    period: "2022 – Present",
  },
  location: "Khammam, Telangana, India",
  email: "ch.charan2006@gmail.com",
  availability: "B.Tech CSE @ SPSU · Open to Internships & Opportunities",
  // Personal photos. Drop your files at these exact paths:
  //   public/images/profile/1.jpg  → hero (landing) portrait
  //   public/images/profile/2.jpg  → about section portrait
  // `backup` is a safe fallback so the site never shows a broken image.
  profileImages: {
    hero: "/images/profile/1.jpg",
    about: "/images/profile/2.jpg",
    backup: "https://rc25.netlify.app/6.jpg",
  },
  // Resume: drop your real PDF at public/resume.pdf. The View / Download
  // buttons use it automatically; if it is missing they fall back to a
  // generated document so nothing ever breaks.
resumeFile: "/resume.jpg",
    badges: [
    { label: "Degree", value: "B.Tech CSE @ SPSU" },
    { label: "Specialization", value: "Artificial Intelligence & ML" },
    { label: "Location", value: "Udaipur, India" },
    { label: "Brand", value: "RC25" },
  ],
};

export type Personal = typeof personal;

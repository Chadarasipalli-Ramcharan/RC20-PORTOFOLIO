// ────────────────────────────────────────────────────────────────
// SKILLS — Chadarasipalli Ramcharan's capability clusters.
// ────────────────────────────────────────────────────────────────
import type { SkillCategory } from "./types";

export const skillCategories: SkillCategory[] = [
  {
    id: "ai",
    label: "AI & Machine Learning",
    blurb: "Framing problems as data challenges, training predictive models, and deploying intelligent pipelines.",
    skills: ["Machine Learning", "Computer Vision (CNN)", "TensorFlow", "Scikit-Learn", "Model Evaluation & Tuning", "Data Science"],
  },
  {
    id: "programming",
    label: "Programming Languages",
    blurb: "Languages used for analytical computation, typed architectures, and low-level IoT tasks.",
    skills: ["Python (Advanced)", "TypeScript", "JavaScript", "C++"],
  },
  {
    id: "fullstack",
    label: "Full-Stack & Frameworks",
    blurb: "Shipping real products around machine learning models with responsive, accessible UIs.",
    skills: ["React.js", "Node.js", "Express.js", "FastAPI", "Tailwind CSS", "Vite", "RESTful APIs"],
  },
  {
    id: "data",
    label: "Data & Databases",
    blurb: "Pipelines, relational models, and reproducible data workflows.",
    skills: ["NumPy", "Pandas", "SQL", "PostgreSQL", "Drizzle ORM", "Matplotlib", "Data Pipelines"],
  },
  {
    id: "tools",
    label: "Tools & Hardware",
    blurb: "Development environment, version control, and embedded IoT experimentation.",
    skills: ["Git", "GitHub", "VS Code", "Jupyter Notebook", "MicroPython", "IoT Microcontrollers", "Linux"],
  },
  {
    id: "soft",
    label: "Professional Attributes",
    blurb: "Core disciplines that drive successful team engineering and purposeful innovation.",
    skills: ["Problem Solving", "Communication", "Teamwork", "Creativity", "Adaptability", "Time Management"],
  },
];

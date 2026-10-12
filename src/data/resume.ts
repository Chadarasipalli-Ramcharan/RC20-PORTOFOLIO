// ────────────────────────────────────────────────────────────────
// RESUME — Chadarasipalli Ramcharan's professional record.
// This is the FALLBACK preview only. Your real resume (PDF or JPG)
// is set in personal.ts (resumeFile) and used by the View / Download
// buttons. This text version shows only if that file is missing.
// ────────────────────────────────────────────────────────────────
import { personal } from "./personal";

export const resume = {
  name: personal.name,
  role: personal.role,
  brand: personal.brand,
  email: personal.email,
  phone: "+91 8639202608",
  location: "Khammam, Telangana, India",
  github: "github.com/Chadarasipalli-Ramcharan",
  githubUrl: "https://github.com/Chadarasipalli-Ramcharan",
  linkedin: "linkedin.com/in/chadarasipalli-ramcharan",
  linkedinUrl: "https://www.linkedin.com/in/chadarasipalli-ramcharan",
  summary:
    "Motivated Computer Science & Engineering undergraduate specializing in Artificial Intelligence and Machine Learning, with hands-on experience in full-stack development, Python, machine learning, and database technologies. Experienced in developing practical, end-to-end applications through internship and project work, with a strong interest in solving real-world problems through technology.",
  skillGroups: [
    { label: "Languages", items: "Python · Java · C · C++ · HTML · CSS · JavaScript · TypeScript · SQL" },
    { label: "Technologies", items: "React.js · Node.js · Machine Learning · NumPy · Pandas · PostgreSQL · FastAPI · Supabase · GitHub" },
    { label: "Soft Skills", items: "Problem-Solving · Critical Thinking · Communication · Teamwork · Adaptability · Leadership · Time Management" },
  ],
  projects: [
    { name: "AcadNexus Pro — University Academic Management System", note: "React, TypeScript, Supabase, PostgreSQL. Role-based academic platform for students, faculty & administrators." },
    { name: "SmartExam Pro — Online Examination System", note: "React, TypeScript, Supabase. Secure timed exams with automatic evaluation and result management." },
    { name: "DataForge — Automated Data Quality Engine", note: "Python, Streamlit, Pandas, NumPy. Dataset profiling, quality analysis & interactive visualization." },
    { name: "Nexora Ascension — Digital Discovery Ecosystem", note: "React, TypeScript, Vite, Tailwind CSS. Student-focused platform for AI tools & learning resources." },
  ],
  experience: [
    { role: "Artificial Intelligence Intern", org: "Codec Technologies Private Limited", period: "May 2026 – July 2026", note: "Developing a full University Academic Management System using AI covering students, faculty, academic activities, and administrative workflows." },
    { role: "Machine Learning Trainee", org: "Growth Ninja, IIT Bombay Avenues", period: "June 2024 – August 2024", note: "Practical experience in Python, machine learning, data preprocessing, model training, and model evaluation." },
    { role: "Intern — MicroPython for Beginners", org: "NIELIT", period: "May 2024 – July 2024", note: "Practical experience in Python programming and MicroPython for embedded and electronics-oriented applications." },
  ],
  education: [
    { degree: "B.Tech — Computer Science & Engineering (AI & ML) · CGPA 8.52/10", school: "Sir Padampat Singhania University (SPSU), Udaipur", period: "2023 – Present" },
    { degree: "Class XII (MPC) · 98.5%", school: "Sri Chaitanya Junior College", period: "2023" },
    { degree: "Class X · CGPA 10/10", school: "T.S.R.S & J.C (Boys), Enkoor", period: "2021" },
  ],
  certifications: [
    "Machine Learning — Growth Ninja / Avenues, IIT Bombay (2024)",
    "Data Science for Everyone — Skill India / Reliance Foundation (2025)",
    "MicroPython for Beginners — NIELIT Calicut (2024)",
    "Cyber Security Workshop — Tech-Unique Academy",
  ],
};

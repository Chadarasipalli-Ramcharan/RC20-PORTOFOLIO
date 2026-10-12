// ────────────────────────────────────────────────────────────────
// PROJECTS — Chadarasipalli Ramcharan's engineering showcase.
// Descriptions are based on direct analysis of each GitHub repository
// (README, tech stack, live deployments) — no invented functionality.
// ────────────────────────────────────────────────────────────────
import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "acadnexus",
    index: "01",
    title: "AcadNexus Pro",
    tagline: "A unified, role-based university academic management ecosystem.",
    category: "Full-Stack · EdTech",
    status: "Live · Deployed",
    description:
      "A full-stack University Academic Management System that centralizes academic operations for administrators, departments, faculty, and students in one secure, role-based platform.",
    problem:
      "University academic workflows are fragmented across disconnected tools — making departments, subjects, assignments, submissions, resources, and performance data hard to manage and track transparently.",
    idea:
      "One centralized digital ecosystem where every role — Super Admin, Department Admin, Faculty, and Student — sees exactly the academic data and actions relevant to them, protected by strict access control.",
    solution:
      "Built with React, TypeScript, Vite, and Tailwind on a Supabase + PostgreSQL backend. Authentication, role-based access, and PostgreSQL Row Level Security enforce least-privilege access, while interactive dashboards surface academic analytics.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "PostgreSQL", "REST API", "Recharts"],
    features: [
      "Four role-based workspaces: Super Admin, Dept Admin, Faculty, Student",
      "Assignments, lab tasks, quizzes, submissions & academic records",
      "Announcements, polls & learning resource delivery",
      "Role-based academic analytics with Recharts",
      "Secure auth + PostgreSQL Row Level Security",
    ],
    image: "/images/projects/acadnexus.jpg",
    github: "https://github.com/Chadarasipalli-Ramcharan/ACADNEXUS-PRO",
    live: "https://acadnexus-rc.vercel.app/",
  },
  {
    id: "smartexam",
    index: "02",
    title: "SmartExam Pro",
    tagline: "Secure online examinations, graded the moment they end.",
    category: "Full-Stack · EdTech",
    status: "Live · Deployed",
    description:
      "A modern, secure Online Examination Management System that streamlines the full assessment lifecycle — from exam creation to automatic evaluation — with dedicated Admin and Student dashboards.",
    problem:
      "Traditional examination processes are manual and slow: authoring exams, delivering them securely, grading answers, and returning results all consume time and are error-prone.",
    idea:
      "A single platform where institutions create, publish, and manage exams while students attempt timed assessments that are evaluated and graded automatically the instant they finish.",
    solution:
      "A React + TypeScript frontend on a Supabase backend handles secure authentication, timed exam delivery, automatic scoring, grade and pass/fail assignment, and persistent result storage, with CSV export for admins.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS", "Supabase", "PostgreSQL", "React Router", "Recharts"],
    features: [
      "Separate Admin & Student dashboards",
      "Create, publish & manage exams with question banks",
      "Timed exam attempts with auto-evaluation & grading",
      "Instant results, scores & pass/fail status",
      "CSV result export + Row Level Security",
    ],
    image: "/images/projects/smartexam.jpg",
    github: "https://github.com/Chadarasipalli-Ramcharan/SMARTEXAM-PRO",
    live: "https://online-examination-module.vercel.app/",
  },
  {
    id: "dataforge",
    index: "03",
    title: "DataForge",
    tagline: "Raw, messy data in — analysis-ready insight out.",
    category: "Data Engineering · ML",
    status: "Active",
    description:
      "An automated data quality platform for dataset profiling, quality analysis, statistical insight, and interactive visualization — built in Python with Streamlit.",
    problem:
      "Before any analysis or model training, data must be profiled and cleaned. Doing this manually for every dataset is repetitive, slow, and inconsistent.",
    idea:
      "Treat data preparation like a forge: feed in raw data and get back profiling reports, quality scores, statistical summaries, and visual insight automatically.",
    solution:
      "A Streamlit application powered by Pandas and NumPy that automatically profiles datasets, surfaces quality issues and statistics, and renders interactive visualizations for fast exploration.",
    tech: ["Python", "Streamlit", "Pandas", "NumPy", "Data Visualization"],
    features: [
      "Automated dataset profiling & quality scoring",
      "Statistical insight generation",
      "Interactive visual data exploration",
      "Fast detection of nulls, types & anomalies",
      "Clean, shareable analysis workflow",
    ],
    image: "/images/projects/dataforge.jpg",
    github: "https://github.com/Chadarasipalli-Ramcharan",
    live: "",
  },
  {
    id: "nexora",
    index: "04",
    title: "Nexora Ascension",
    tagline: "A student-focused digital discovery ecosystem.",
    category: "Full-Stack · Web Platform",
    status: "Active",
    description:
      "A digital discovery platform that helps students explore AI tools, learning resources, developer platforms, productivity tools, and career opportunities — all in one curated space.",
    problem:
      "The best AI tools, learning resources, and opportunities are scattered across the web, making them hard for students to discover and keep track of.",
    idea:
      "A single, well-designed hub that curates and organizes high-value tools and resources so students can discover what matters without endless searching.",
    solution:
      "Built with React, TypeScript, Vite, and Tailwind CSS — a fast, responsive interface that categorizes AI tools, learning materials, developer platforms, productivity apps, and career resources.",
    tech: ["React", "TypeScript", "Vite", "Tailwind CSS"],
    features: [
      "Curated AI tools & learning resource directory",
      "Developer platform & productivity tool discovery",
      "Career opportunity exploration",
      "Fast, responsive category-based browsing",
      "Clean, student-first interface",
    ],
    image: "/images/projects/nexora.jpg",
    github: "https://github.com/Chadarasipalli-Ramcharan",
    live: "",
  },
  {
    id: "portfolio1",
    index: "05",
    title: "My Portfolio 1",
    tagline: "The first generation of my digital identity.",
    category: "Full-Stack · Web",
    status: "Live · Deployed",
    description:
      "My first-generation personal portfolio — an interactive journey through my work, skills, and achievements, built with a full React + Node.js stack and a glassmorphism-driven design language.",
    problem:
      "I needed a personal digital identity that reflected both engineering ability and design sensibility — not a generic template.",
    idea:
      "A custom, interactive portfolio with an immersive welcome experience, animated sections, and a genuinely functional contact form backed by a real database.",
    solution:
      "A React, TypeScript, and Tailwind frontend with Framer Motion animations, backed by a Node.js/Express server and PostgreSQL (Drizzle ORM). Forms use react-hook-form with Zod validation.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Node.js", "Express", "PostgreSQL", "Drizzle ORM"],
    features: [
      "Animated hero & glassmorphism welcome page",
      "About, Skills, Projects, Certifications & Gallery",
      "Validated contact form (react-hook-form + Zod)",
      "Node.js / Express backend with PostgreSQL",
      "Fully responsive, custom-built design",
    ],
    image: "/images/projects/portfolio1.jpg",
    github: "https://github.com/Chadarasipalli-Ramcharan/MY-PORTOFOLIO",
    live: "https://rc25.netlify.app/",
  },
  {
    id: "timetrix",
    index: "06",
    title: "TimeTrix Pro",
    tagline: "Precision time-blocking with honest analytics.",
    category: "Productivity",
    status: "Active",
    description:
      "A time-management application built around time-blocking — plan the day in focused blocks, run them with a built-in timer, and review where the time actually went.",
    problem:
      "Standard to-do lists track tasks but not time, so days slip away into unplanned gaps with no honest record of where the hours went.",
    idea:
      "Treat time like a budget: assign every block a task, protect it with a focus timer, and let weekly analytics reveal the real patterns.",
    solution:
      "A React and TypeScript application with a block planner, focus timer, and analytics view — with state persisted locally so the tool stays fast, private, and offline-friendly.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Local Storage"],
    features: [
      "Drag-and-drop daily time blocking",
      "Built-in focus / pomodoro timer",
      "Weekly productivity analytics",
      "Streaks & session history",
      "Offline-first — data stays on device",
    ],
    image: "/images/projects/timetrix.jpg",
    github: "https://github.com/Chadarasipalli-Ramcharan",
    live: "",
  },
  {
    id: "netshield",
    index: "07",
    title: "Net Shield ML",
    tagline: "Machine learning for network threat detection.",
    category: "AI / ML · Cybersecurity",
    status: "In Development",
    description:
      "A machine-learning project focused on network security — applying supervised learning to network traffic data to help distinguish normal activity from potential threats.",
    problem:
      "Rule-based network defenses struggle to recognize new or evolving attack patterns, leaving gaps that static signatures cannot cover.",
    idea:
      "Use machine learning to learn the patterns of network traffic directly from data, so the system can flag anomalous or malicious behavior rather than relying only on fixed rules.",
    solution:
      "An ML pipeline combining Python data preprocessing, feature engineering, and classification models — bringing together Ramcharan's machine-learning training and cybersecurity coursework.",
    tech: ["Python", "Machine Learning", "Scikit-Learn", "Pandas", "NumPy"],
    features: [
      "Network traffic preprocessing & feature engineering",
      "Supervised classification of traffic patterns",
      "Model training & evaluation workflow",
      "Applied cybersecurity + ML focus",
    ],
    // NOTE: a public repository for this project was not found at analysis
    // time, so this links to the GitHub profile. Replace with the exact
    // repo URL (and a Live Demo if any) once it is published.
    image: "/images/projects/netshield.jpg",
    github: "https://github.com/Chadarasipalli-Ramcharan",
    live: "",
  },
  {
    id: "loopbreak",
    index: "08",
    title: "Loop Break",
    tagline: "A new build, currently taking shape.",
    category: "Software Development",
    status: "In Development",
    description:
      "An in-progress project in Ramcharan's active repository. The codebase is being set up — full details, stack, and a write-up will follow as development continues.",
    problem:
      "This project is in its early stages; its problem statement will be documented as the build matures.",
    idea:
      "An exploration currently under active development — part of an ongoing commitment to building and shipping real software.",
    solution:
      "Implementation is in progress. Check the GitHub repository for the latest commits and updates.",
    tech: ["In Development"],
    features: [
      "Repository actively being developed",
      "Details and documentation coming soon",
    ],
    image: "https://images.pexels.com/photos/256502/pexels-photo-256502.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    github: "https://github.com/Chadarasipalli-Ramcharan/LOOP-BREAK",
    live: "",
  },
  
];

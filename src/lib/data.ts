export const siteConfig = {
  name: "Mugisha Prosper",
  title: "Mugisha Prosper - AI Engineer",
  description:
    "AI Engineer and Full-Stack Developer specializing in machine learning, backend systems, and modern web applications.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://prospermugisha.vercel.app",
};

export const contactInfo = {
  email: "mugisha.prosper10@gmail.com",
  github: "https://github.com/m-prosper-10",
  gitlab: "https://gitlab.com/MugishaProsper",
};

export const socialLinks = [
  {
    label: "GitHub",
    href: contactInfo.github,
  },
  {
    label: "GitLab",
    href: contactInfo.gitlab,
  },
  {
    label: "Email",
    href: `mailto:${contactInfo.email}`,
  },
] as const;

export interface Project {
  name: string;
  href?: string;
  repo?: string;
  year: string;
  status: "Live" | "In Dev";
  summary: string;
  stack: readonly string[];
}

export const projects: readonly Project[] = [
  {
    name: "NeuroLab",
    href: "https://www.neurolab.cc",
    year: "2026",
    status: "Live",
    summary:
      "Interactive AI engineering lab and workspace for building, testing, and evaluating multi-step model workflows.",
    stack: ["AI Engineering", "TypeScript", "Next.js", "Python"],
  },
  {
    name: "Uwera AI Assistant & Tutor",
    href: "https://uwera.rw",
    year: "2025",
    status: "Live",
    summary:
      "Curriculum-grounded AI tutor and study assistant built for guided problem-solving, hybrid RAG retrieval, and long-horizon learning sessions.",
    stack: ["RAG", "LLMs", "PostgreSQL", "TypeScript"],
  },
  {
    name: "Xether AI",
    href: "https://xetherai.vercel.app",
    year: "2026",
    status: "In Dev",
    summary:
      "Agentic systems infrastructure focused on deterministic state-graph orchestration, isolated execution sandboxes, and automated evaluations.",
    stack: ["Systems Engineering", "Agents", "Sandboxing", "DevSecOps"],
  },
];

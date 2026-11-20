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

export interface ResearchItem {
  slug: string;
  title: string;
  subtitle?: string;
  year: string;
  status: "Active" | "Note" | "Published" | "Preprint";
  area: string;
  summary: string;
  repo?: string;
  metrics?: string;
  tags: readonly string[];
}

export const researchItems: readonly ResearchItem[] = [
  {
    slug: "nlpt-2-preview",
    title: "nlPT 2-Preview",
    subtitle:
      "Lightweight Multi-Scale CNN-LSTM with Attention and Temperature Calibration for Wearable EEG-Based Mental State Classification",
    year: "2026",
    status: "Active",
    area: "Wearable EEG / BCI",
    metrics: "92.8% Acc · 1.27M Params · 22 ms Edge TPU",
    summary:
      "A 1.27M-parameter hybrid CNN-BiLSTM-Attention architecture with ICA preprocessing and post-hoc temperature scaling, achieving 92.8% accuracy across Relaxed, Focused, and Stressed EEG states (32 participants) and sub-100 ms edge inference.",
    repo: "https://github.com/neurolab-0x/nlpt.2-Preview",
    tags: ["EEG Decoding", "CNN-LSTM", "Multi-Head Attention", "Edge AI"],
  },
];

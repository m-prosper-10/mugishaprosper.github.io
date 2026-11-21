import fs from "node:fs";
import path from "node:path";

export interface ResearchItemMeta {
  slug: string;
  title: string;
  subtitle?: string;
  date: string;
  formattedDate: string;
  year: string;
  status: string;
  area: string;
  metrics?: string;
  authors?: string;
  repo?: string;
  summary: string;
  tags: string[];
  readingTime: string;
  published: boolean;
}

export interface ResearchItem extends ResearchItemMeta {
  content: string;
}

const RESEARCH_DIR = path.join(process.cwd(), "content", "research");

function parseFrontmatter(raw: string): {
  data: Record<string, string | boolean | string[]>;
  content: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: raw.trim() };
  }

  const [, yamlBlock, content] = match;
  const data: Record<string, string | boolean | string[]> = {};
  let currentArrayKey: string | null = null;

  for (const line of yamlBlock.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    if (trimmed.startsWith("- ") && currentArrayKey) {
      const val = trimmed.slice(2).trim().replace(/^["']|["']$/g, "");
      const arr = data[currentArrayKey];
      if (Array.isArray(arr)) {
        arr.push(val);
      }
      continue;
    }

    const colonIndex = line.indexOf(":");
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    const rawValue = line.slice(colonIndex + 1).trim();

    if (!rawValue) {
      currentArrayKey = key;
      data[key] = [];
      continue;
    }

    currentArrayKey = null;

    if (rawValue === "true") {
      data[key] = true;
    } else if (rawValue === "false") {
      data[key] = false;
    } else if (rawValue.startsWith("[") && rawValue.endsWith("]")) {
      data[key] = rawValue
        .slice(1, -1)
        .split(",")
        .map((item) => item.trim().replace(/^["']|["']$/g, ""))
        .filter(Boolean);
    } else {
      data[key] = rawValue.replace(/^["']|["']$/g, "");
    }
  }

  return { data, content: content.trim() };
}

function calculateReadingTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function formatDate(dateString: string): string {
  const parsed = new Date(`${dateString}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime())) {
    return dateString;
  }
  return parsed.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  });
}

function readResearchFile(filename: string): ResearchItem | null {
  const slug = filename.replace(/\.mdx?$/, "");
  const fullPath = path.join(RESEARCH_DIR, filename);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = parseFrontmatter(raw);

  const title = typeof data.title === "string" ? data.title : slug;
  const subtitle =
    typeof data.subtitle === "string" ? data.subtitle : undefined;
  const date = typeof data.date === "string" ? data.date : "1970-01-01";
  const year = typeof data.year === "string" ? data.year : date.slice(0, 4);
  const status = typeof data.status === "string" ? data.status : "Active";
  const area = typeof data.area === "string" ? data.area : "Research";
  const metrics = typeof data.metrics === "string" ? data.metrics : undefined;
  const authors = typeof data.authors === "string" ? data.authors : undefined;
  const repo = typeof data.repo === "string" ? data.repo : undefined;
  const summary = typeof data.summary === "string" ? data.summary : "";
  const tags = Array.isArray(data.tags) ? data.tags : [];
  const published = data.published !== false;

  return {
    slug,
    title,
    subtitle,
    date,
    formattedDate: formatDate(date),
    year,
    status,
    area,
    metrics,
    authors,
    repo,
    summary,
    tags,
    readingTime: calculateReadingTime(content),
    published,
    content,
  };
}

export function getAllResearch(): ResearchItemMeta[] {
  if (!fs.existsSync(RESEARCH_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(RESEARCH_DIR)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));

  return files
    .map((file) => readResearchFile(file))
    .filter((item): item is ResearchItem => item !== null && item.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((item): ResearchItemMeta => ({
      slug: item.slug,
      title: item.title,
      subtitle: item.subtitle,
      date: item.date,
      formattedDate: item.formattedDate,
      year: item.year,
      status: item.status,
      area: item.area,
      metrics: item.metrics,
      authors: item.authors,
      repo: item.repo,
      summary: item.summary,
      tags: item.tags,
      readingTime: item.readingTime,
      published: item.published,
    }));
}

export function getResearchBySlug(slug: string): ResearchItem | null {
  const mdxFile = `${slug}.mdx`;
  const mdFile = `${slug}.md`;

  const item = readResearchFile(mdxFile) ?? readResearchFile(mdFile);
  if (!item || !item.published) {
    return null;
  }

  return item;
}

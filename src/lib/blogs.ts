import fs from "node:fs";
import path from "node:path";

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  formattedDate: string;
  summary: string;
  tags: string[];
  readingTime: string;
  published: boolean;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

const BLOGS_DIR = path.join(process.cwd(), "content", "blogs");

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

function readBlogFile(filename: string): BlogPost | null {
  const slug = filename.replace(/\.mdx?$/, "");
  const fullPath = path.join(BLOGS_DIR, filename);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const raw = fs.readFileSync(fullPath, "utf-8");
  const { data, content } = parseFrontmatter(raw);

  const title = typeof data.title === "string" ? data.title : slug;
  const date = typeof data.date === "string" ? data.date : "1970-01-01";
  const summary = typeof data.summary === "string" ? data.summary : "";
  const tags = Array.isArray(data.tags) ? data.tags : [];
  const published = data.published !== false;

  return {
    slug,
    title,
    date,
    formattedDate: formatDate(date),
    summary,
    tags,
    readingTime: calculateReadingTime(content),
    published,
    content,
  };
}

export function getAllBlogs(): BlogPostMeta[] {
  if (!fs.existsSync(BLOGS_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(BLOGS_DIR)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));

  return files
    .map((file) => readBlogFile(file))
    .filter((post): post is BlogPost => post !== null && post.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((post): BlogPostMeta => ({
      slug: post.slug,
      title: post.title,
      date: post.date,
      formattedDate: post.formattedDate,
      summary: post.summary,
      tags: post.tags,
      readingTime: post.readingTime,
      published: post.published,
    }));
}

export function getFeaturedBlogs(limit = 3): BlogPostMeta[] {
  return getAllBlogs().slice(0, limit);
}

export function getBlogBySlug(slug: string): BlogPost | null {
  const mdxFile = `${slug}.mdx`;
  const mdFile = `${slug}.md`;

  const post = readBlogFile(mdxFile) ?? readBlogFile(mdFile);
  if (!post || !post.published) {
    return null;
  }

  return post;
}

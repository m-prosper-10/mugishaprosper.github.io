import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ThemeToggle from "@/components/ThemeToggle";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Footer from "@/components/sections/Footer";
import { getAllBlogs, getBlogBySlug } from "@/lib/blogs";
import { siteConfig } from "@/lib/data";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const posts = getAllBlogs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    return {
      title: `Not Found — ${siteConfig.name}`,
    };
  }

  return {
    title: `${post.title} — ${siteConfig.name}`,
    description: post.summary || siteConfig.description,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary || siteConfig.description,
      publishedTime: post.date,
      authors: [siteConfig.name],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary || siteConfig.description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main className="container-minimal relative">
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-[0.2em]">
            <Link
              href="/blogs"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ← All Writing
            </Link>
            <Link
              href="/"
              className="text-muted-foreground/60 hover:text-foreground transition-colors"
            >
              Index
            </Link>
          </div>
          <ThemeToggle />
        </div>

        <header className="space-y-6 pb-10 mb-10 border-b border-border">
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
            <time dateTime={post.date}>{post.formattedDate}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold text-cold">
            {post.title}
          </h1>

          {post.summary && (
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              {post.summary}
            </p>
          )}

          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 bg-muted text-muted-foreground border border-border"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <MarkdownRenderer content={post.content} />

        <div className="mt-16 pt-8 border-t border-border flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.2em]">
          <Link
            href="/blogs"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to all articles
          </Link>
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

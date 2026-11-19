import type { Metadata } from "next";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/sections/Footer";
import { getAllBlogs } from "@/lib/blogs";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: `Blogs — ${siteConfig.name}`,
  description: `Articles and technical notes on AI engineering, machine learning, and software architecture by ${siteConfig.name}.`,
};

export default function BlogsPage() {
  const posts = getAllBlogs();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <main className="container-minimal relative">
        <div className="flex items-center justify-between mb-16">
          <Link
            href="/"
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Index
          </Link>
          <ThemeToggle />
        </div>

        <header className="space-y-4 mb-16">
          <h1 className="text-4xl sm:text-6xl font-bold text-cold">Writing</h1>
          <p className="text-lg sm:text-xl text-muted-foreground tracking-tight">
            Notes on AI engineering, systems architecture, and building software.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">No articles published yet.</p>
        ) : (
          <div className="divide-y divide-border/70">
            {posts.map((post, index) => (
              <article
                key={post.slug}
                className="py-8 first:pt-0 last:pb-0 group"
              >
                <Link href={`/blogs/${post.slug}`} className="block space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                    <div className="flex items-center gap-3">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <span>·</span>
                      <time dateTime={post.date}>{post.formattedDate}</time>
                    </div>
                    <span>{post.readingTime}</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-bold text-foreground group-hover:underline decoration-1 underline-offset-8 transition-colors">
                    {post.title}
                  </h2>

                  {post.summary && (
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
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
                </Link>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

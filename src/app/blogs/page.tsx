import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";
import { getAllBlogs, type BlogPostMeta } from "@/lib/blogs";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: `Writing — ${siteConfig.name}`,
  description: `Articles and technical notes on AI engineering, machine learning, and software architecture by ${siteConfig.name}.`,
};

export default function BlogsPage() {
  const posts = getAllBlogs();

  // Group posts by year while preserving chronological order
  const postsByYear = posts.reduce<Record<string, BlogPostMeta[]>>(
    (acc, post) => {
      const year = post.date.slice(0, 4);
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(post);
      return acc;
    },
    {}
  );

  const years = Object.keys(postsByYear).sort((a, b) => (a < b ? 1 : -1));

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        <main className="container-minimal pt-12 sm:pt-16 pb-8">
          <header className="space-y-4 pb-12 sm:pb-16 border-b border-border/70">
            <div className="flex items-baseline justify-between gap-4">
              <h1 className="text-4xl sm:text-6xl font-bold text-cold">
                Writing
              </h1>
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                {posts.length} {posts.length === 1 ? "Essay" : "Essays"}
              </span>
            </div>
            <p className="text-lg sm:text-xl text-muted-foreground tracking-tight max-w-xl leading-relaxed">
              Personal notes and first-principles lessons across AI engineering, systems architecture, DevSecOps, and backend development.
            </p>
          </header>

          {posts.length === 0 ? (
            <p className="py-12 text-muted-foreground">
              No articles published yet.
            </p>
          ) : (
            <div className="divide-y divide-border/70">
              {years.map((year) => (
                <section
                  key={year}
                  aria-label={`Posts from ${year}`}
                  className="py-10 sm:py-12 first:pt-10 last:pb-4"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-[5.5rem_1fr] gap-6 sm:gap-8 items-start">
                    <div className="sm:sticky sm:top-8">
                      <h2 className="text-xs font-mono font-bold uppercase tracking-[0.25em] text-foreground/80">
                        {year}
                      </h2>
                      <p className="text-[10px] font-mono uppercase tracking-[0.18em] text-muted-foreground/45 mt-1">
                        {postsByYear[year].length}{" "}
                        {postsByYear[year].length === 1 ? "post" : "posts"}
                      </p>
                    </div>

                    <div className="divide-y divide-border/50">
                      {postsByYear[year].map((post) => (
                        <article
                          key={post.slug}
                          className="py-7 first:pt-0 last:pb-0 group"
                        >
                          <Link
                            href={`/blogs/${post.slug}`}
                            className="block space-y-2.5"
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-muted-foreground/55">
                              <time dateTime={post.date}>
                                {post.formattedDate}
                              </time>
                              <span>{post.readingTime}</span>
                            </div>

                            <h3 className="text-xl sm:text-2xl font-bold text-foreground group-hover:underline decoration-1 underline-offset-6 transition-colors leading-snug">
                              {post.title}
                            </h3>

                            {post.summary && (
                              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                {post.summary}
                              </p>
                            )}

                            {post.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 pt-1.5">
                                {post.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-[10px] font-bold uppercase tracking-[0.16em] px-2 py-0.5 bg-muted/60 text-muted-foreground border border-border/80"
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
                  </div>
                </section>
              ))}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

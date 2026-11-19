"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { BlogPostMeta } from "@/lib/blogs";

type SortMode = "newest" | "oldest";

const SORT_OPTIONS: { value: SortMode; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
];

export default function BlogsArchiveClient({
  posts,
}: {
  posts: BlogPostMeta[];
}) {
  const [sortBy, setSortBy] = useState<SortMode>("newest");
  const [selectedTag, setSelectedTag] = useState<string>("All");

  // Only keep "All" + the top 3 main topics
  const mainTopics = useMemo(() => {
    const counts = new Map<string, number>();
    for (const post of posts) {
      for (const tag of post.tags) {
        counts.set(tag, (counts.get(tag) ?? 0) + 1);
      }
    }
    const topThree = Array.from(counts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 3)
      .map(([tag]) => tag);

    return ["All", ...topThree];
  }, [posts]);

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    const filtered = posts.filter(
      (post) => selectedTag === "All" || post.tags.includes(selectedTag)
    );

    return [...filtered].sort((a, b) =>
      sortBy === "newest"
        ? a.date < b.date
          ? 1
          : -1
        : a.date > b.date
          ? 1
          : -1
    );
  }, [posts, selectedTag, sortBy]);

  // Group by year
  const groupedByYear = useMemo(() => {
    const groups = new Map<string, BlogPostMeta[]>();
    for (const post of filteredAndSortedPosts) {
      const year = post.date.slice(0, 4);
      const list = groups.get(year) ?? [];
      list.push(post);
      groups.set(year, list);
    }

    return Array.from(groups.entries());
  }, [filteredAndSortedPosts]);

  return (
    <div>
      {/* Minimalist Filter & Sort Bar */}
      <div className="py-5 border-b border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-1.5">
          {mainTopics.map((tag) => {
            const active = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`text-[10px] font-bold uppercase tracking-[0.16em] px-2.5 py-1 border transition-colors cursor-pointer ${
                  active
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-muted-foreground border-border/70 hover:text-foreground hover:border-foreground/40"
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {SORT_OPTIONS.map((option) => {
            const active = sortBy === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setSortBy(option.value)}
                className={`text-[10px] font-mono font-bold uppercase tracking-[0.16em] px-2.5 py-1 border transition-colors cursor-pointer ${
                  active
                    ? "bg-foreground text-background border-foreground"
                    : "bg-transparent text-muted-foreground border-border/70 hover:text-foreground hover:border-foreground/40"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results List */}
      <div className="divide-y divide-border/70">
        {groupedByYear.map(([year, yearPosts]) => (
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
                  {yearPosts.length}{" "}
                  {yearPosts.length === 1 ? "post" : "posts"}
                </p>
              </div>

              <div className="divide-y divide-border/50">
                {yearPosts.map((post) => (
                  <article
                    key={post.slug}
                    className="py-7 first:pt-0 last:pb-0 group"
                  >
                    <Link
                      href={`/blogs/${post.slug}`}
                      className="block space-y-2.5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-muted-foreground/55">
                        <time dateTime={post.date}>{post.formattedDate}</time>
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
    </div>
  );
}

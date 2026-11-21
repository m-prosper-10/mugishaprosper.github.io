"use client";

import Link from "next/link";
import { ArrowRight, Clock, FileText } from "lucide-react";
import { motion } from "framer-motion";
import type { BlogPostMeta } from "@/lib/blogs";

export default function Blogs({
  posts,
  totalCount,
}: {
  posts: BlogPostMeta[];
  totalCount?: number;
}) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section id="blogs" className="container-minimal py-14 sm:py-16 border-t border-border/70">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div className="flex items-center justify-between">
          <h2 className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.28em] text-muted-foreground/60">
            <FileText className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Recent Writing</span>
          </h2>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors group"
          >
            <span>All Articles {totalCount ? `(${totalCount})` : ""}</span>
            <ArrowRight
              className="h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-foreground group-hover:translate-x-0.5 transition-all"
              aria-hidden="true"
            />
          </Link>
        </div>

        <div className="divide-y divide-border/50 border-y border-border/50">
          {posts.map((post, index) => (
            <article key={post.slug} className="py-6 first:pt-5 last:pb-5 group">
              <Link href={`/blogs/${post.slug}`} className="block">
                <div className="grid grid-cols-1 sm:grid-cols-[5.5rem_1fr] gap-2 sm:gap-6 items-baseline">
                  <div className="flex sm:flex-col items-baseline sm:items-start justify-between gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.15em] text-muted-foreground/50">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <time dateTime={post.date} className="text-[10px] tracking-[0.12em]">
                      {post.formattedDate.replace(/,\s*\d{4}$/, "")}
                    </time>
                  </div>

                  <div className="space-y-2 min-w-0">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-lg sm:text-xl font-bold text-foreground group-hover:underline decoration-1 underline-offset-6 transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/50 shrink-0">
                        <Clock className="h-3 w-3" aria-hidden="true" />
                        <span>{post.readingTime}</span>
                      </span>
                    </div>

                    {post.summary && (
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-2">
                        {post.summary}
                      </p>
                    )}
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1">
          <p className="text-sm text-muted-foreground">
            Essays on systems engineering, AI, DevSecOps, and backend architecture.
          </p>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-foreground hover:underline underline-offset-6 shrink-0 ml-4 group"
          >
            <span>Browse Archive</span>
            <ArrowRight
              className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform"
              aria-hidden="true"
            />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

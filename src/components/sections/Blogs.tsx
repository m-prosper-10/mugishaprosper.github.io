"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { BlogPostMeta } from "@/lib/blogs";

export default function Blogs({ posts }: { posts: BlogPostMeta[] }) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section id="blogs" className="container-minimal !pt-20 !pb-0">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-muted-foreground/30">
            Recent Writing
          </h2>
          <Link
            href="/blogs"
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
          >
            All Posts →
          </Link>
        </div>

        <div className="divide-y divide-border/60">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="py-5 first:pt-0 last:pb-0 group"
            >
              <Link href={`/blogs/${post.slug}`} className="block space-y-2">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-lg sm:text-xl font-medium text-foreground group-hover:underline decoration-1 underline-offset-8 transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground/60 shrink-0">
                    <time dateTime={post.date}>{post.formattedDate}</time>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                  </div>
                </div>
                {post.summary && (
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-2">
                    {post.summary}
                  </p>
                )}
              </Link>
            </article>
          ))}
        </div>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Read more thoughts on AI, systems, and software in the{" "}
          <Link
            href="/blogs"
            className="text-foreground font-medium hover:underline decoration-1 underline-offset-8 transition-colors"
          >
            blog archive
          </Link>
          .
        </p>
      </motion.div>
    </section>
  );
}

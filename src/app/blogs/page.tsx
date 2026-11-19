import type { Metadata } from "next";
import Header from "@/components/Header";
import BlogsArchiveClient from "@/components/BlogsArchiveClient";
import Footer from "@/components/sections/Footer";
import { getAllBlogs } from "@/lib/blogs";
import { siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: `Writing — ${siteConfig.name}`,
  description: `Articles and technical notes on AI engineering, machine learning, and software architecture by ${siteConfig.name}.`,
};

export default function BlogsPage() {
  const posts = getAllBlogs();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        <main className="container-minimal pt-12 sm:pt-16 pb-8">
          <header className="space-y-4 pb-10 sm:pb-12 border-b border-border/70">
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
            <BlogsArchiveClient posts={posts} />
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

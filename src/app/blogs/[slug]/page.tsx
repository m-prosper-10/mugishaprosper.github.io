import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
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

  const allPosts = getAllBlogs();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const newerPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const olderPost =
    currentIndex !== -1 && currentIndex < allPosts.length - 1
      ? allPosts[currentIndex + 1]
      : null;

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        <main className="container-minimal pt-8 sm:pt-12 pb-8">
          <div className="mb-8">
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
            >
              <span>←</span>
              <span>All Writing</span>
            </Link>
          </div>

          <header className="space-y-6 pb-10 mb-10 border-b border-border/70">
            <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-muted-foreground/70">
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
                    className="text-[10px] font-bold uppercase tracking-[0.16em] px-2.5 py-1 bg-muted/60 text-muted-foreground border border-border/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          <MarkdownRenderer content={post.content} />

          {(olderPost || newerPost) && (
            <nav
              aria-label="Adjacent articles"
              className="mt-16 pt-10 border-t border-border/70 grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {olderPost ? (
                <Link
                  href={`/blogs/${olderPost.slug}`}
                  className="group block space-y-1.5 p-4 border border-border/60 hover:border-foreground/40 transition-colors"
                >
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                    ← Previous Article
                  </span>
                  <p className="text-sm sm:text-base font-bold text-foreground group-hover:underline decoration-1 underline-offset-4 line-clamp-2">
                    {olderPost.title}
                  </p>
                </Link>
              ) : (
                <div className="hidden sm:block" />
              )}

              {newerPost && (
                <Link
                  href={`/blogs/${newerPost.slug}`}
                  className="group block space-y-1.5 p-4 border border-border/60 hover:border-foreground/40 transition-colors sm:text-right"
                >
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                    Next Article →
                  </span>
                  <p className="text-sm sm:text-base font-bold text-foreground group-hover:underline decoration-1 underline-offset-4 line-clamp-2">
                    {newerPost.title}
                  </p>
                </Link>
              )}
            </nav>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

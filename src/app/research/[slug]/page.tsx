import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Clock,
  FlaskConical,
  Github,
} from "lucide-react";
import Header from "@/components/Header";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import Footer from "@/components/sections/Footer";
import { siteConfig } from "@/lib/data";
import { getAllResearch, getResearchBySlug } from "@/lib/research";

interface ResearchDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllResearch().map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: ResearchDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getResearchBySlug(slug);

  if (!item) {
    return {
      title: `Not Found — ${siteConfig.name}`,
    };
  }

  return {
    title: `${item.title} — Research — ${siteConfig.name}`,
    description: item.subtitle ?? (item.summary || siteConfig.description),
  };
}

export default async function ResearchDetailPage({
  params,
}: ResearchDetailPageProps) {
  const { slug } = await params;
  const item = getResearchBySlug(slug);

  if (!item) {
    notFound();
  }

  const allResearch = getAllResearch();
  const currentIndex = allResearch.findIndex((r) => r.slug === slug);
  const newerItem = currentIndex > 0 ? allResearch[currentIndex - 1] : null;
  const olderItem =
    currentIndex !== -1 && currentIndex < allResearch.length - 1
      ? allResearch[currentIndex + 1]
      : null;

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        <main className="container-minimal pt-6 sm:pt-12 pb-12">
          <div className="max-w-full">
            <div className="mb-2 sm:mb-4">
              <Link
                href="/research"
                className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ArrowLeft
                  className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform"
                  aria-hidden="true"
                />
                <span>All Research</span>
              </Link>
            </div>

            <header className="space-y-5 pb-8 sm:pb-10 mb-8 sm:mb-10 border-b border-border/70">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-muted-foreground/75">
                  <span className="inline-flex items-center gap-1.5">
                    <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>
                      {item.area} · {item.year} · {item.status}
                    </span>
                  </span>
                  <span>·</span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{item.readingTime}</span>
                  </span>
                </div>

                {item.repo && (
                  <a
                    href={item.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <Github className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Code & Dataset</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                      aria-hidden="true"
                    />
                  </a>
                )}
              </div>

              <div className="space-y-2.5">
                <p className="text-xs font-mono font-bold uppercase tracking-[0.22em] text-muted-foreground/70">
                  {item.title}
                </p>
                <h1 className="text-3xl sm:text-5xl font-bold text-cold">
                  {item.subtitle ?? item.title}
                </h1>
              </div>

              {item.authors && (
                <p className="text-xs sm:text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Authors:</span>{" "}
                  {item.authors}
                </p>
              )}

              {item.metrics && (
                <p className="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-foreground/85 pt-1">
                  {item.metrics}
                </p>
              )}

              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {item.tags.map((tag) => (
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

            <MarkdownRenderer content={item.content} />

            {(olderItem || newerItem) && (
              <nav
                aria-label="Adjacent research items"
                className="mt-16 pt-10 border-t border-border/70 grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                {olderItem ? (
                  <Link
                    href={`/research/${olderItem.slug}`}
                    className="group block space-y-1.5 p-4 border border-border/60 hover:border-foreground/40 transition-colors"
                  >
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                      <ArrowLeft
                        className="h-3 w-3 group-hover:-translate-x-0.5 transition-transform"
                        aria-hidden="true"
                      />
                      <span>Previous Research</span>
                    </span>
                    <p className="text-sm sm:text-base font-bold text-foreground group-hover:underline decoration-1 underline-offset-4 line-clamp-2">
                      {olderItem.title}
                    </p>
                  </Link>
                ) : (
                  <div className="hidden sm:block" />
                )}

                {newerItem && (
                  <Link
                    href={`/research/${newerItem.slug}`}
                    className="group block space-y-1.5 p-4 border border-border/60 hover:border-foreground/40 transition-colors sm:text-right"
                  >
                    <span className="inline-flex items-center sm:justify-end gap-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                      <span>Next Research</span>
                      <ArrowRight
                        className="h-3 w-3 group-hover:translate-x-0.5 transition-transform"
                        aria-hidden="true"
                      />
                    </span>
                    <p className="text-sm sm:text-base font-bold text-foreground group-hover:underline decoration-1 underline-offset-4 line-clamp-2">
                      {newerItem.title}
                    </p>
                  </Link>
                )}
              </nav>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

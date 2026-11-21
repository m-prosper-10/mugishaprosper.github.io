import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, FlaskConical, Github } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";
import { siteConfig } from "@/lib/data";
import { getAllResearch } from "@/lib/research";

export const metadata: Metadata = {
  title: `Research — ${siteConfig.name}`,
  description: `Research papers, technical notes, and experimental systems by ${siteConfig.name}.`,
};

export default function ResearchPage() {
  const researchItems = getAllResearch();

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        <main className="container-minimal pt-10 sm:pt-16 pb-8">
          <header className="space-y-4 pb-10 sm:pb-12 border-b border-border/70">
            <div className="flex items-baseline justify-between gap-4">
              <h1 className="text-4xl sm:text-6xl font-bold text-cold">
                Research
              </h1>
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                {researchItems.length}{" "}
                {researchItems.length === 1 ? "Paper" : "Papers"}
              </span>
            </div>
            <p className="text-lg sm:text-xl text-muted-foreground tracking-tight max-w-xl leading-relaxed">
              Research papers, model architectures, and empirical evaluations across neural signal decoding and AI systems.
            </p>
          </header>

          {researchItems.length === 0 ? (
            <p className="py-12 text-muted-foreground">
              No research items published yet.
            </p>
          ) : (
            <ol className="divide-y divide-border/70">
              {researchItems.map((item, index) => (
                <li
                  key={item.slug}
                  className="py-8 sm:py-10 first:pt-8 group"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-[5.5rem_1fr] gap-4 sm:gap-8 items-start">
                    <div className="flex sm:flex-col items-baseline sm:items-start justify-between gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground/55">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <span className="text-[10px] tracking-[0.15em]">
                        {item.year}
                      </span>
                    </div>

                    <div className="space-y-3 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-muted-foreground/70">
                          <FlaskConical className="h-3 w-3" aria-hidden="true" />
                          <span>{item.area}</span>
                        </span>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] px-2.5 py-0.5 border border-border/80 text-muted-foreground">
                          {item.status}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <Link
                          href={`/research/${item.slug}`}
                          className="block text-2xl sm:text-3xl font-bold text-foreground group-hover:underline decoration-1 underline-offset-8 transition-colors leading-snug"
                        >
                          {item.title}
                        </Link>
                        {item.subtitle && (
                          <p className="text-sm sm:text-base font-medium text-foreground/80 leading-snug">
                            {item.subtitle}
                          </p>
                        )}
                      </div>

                      {item.metrics && (
                        <p className="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-muted-foreground/80">
                          {item.metrics}
                        </p>
                      )}

                      {item.summary && (
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {item.summary}
                        </p>
                      )}

                      <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                        {item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] font-bold uppercase tracking-[0.16em] px-2 py-0.5 bg-muted/60 text-muted-foreground border border-border/80"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center gap-5 shrink-0">
                          {item.repo && (
                            <a
                              href={item.repo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
                            >
                              <Github className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>Code</span>
                              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                            </a>
                          )}
                          <Link
                            href={`/research/${item.slug}`}
                            className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground hover:underline underline-offset-4"
                          >
                            <span>View Paper</span>
                            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
}

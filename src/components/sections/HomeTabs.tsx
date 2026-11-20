"use client";

import { useState, type KeyboardEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Clock,
  Code2,
  ExternalLink,
  FileText,
  FlaskConical,
  FolderGit2,
} from "lucide-react";
import { motion } from "framer-motion";
import { projects, researchItems } from "@/lib/data";
import type { BlogPostMeta } from "@/lib/blogs";

type TabId = "projects" | "research" | "articles";

const TAB_ORDER: TabId[] = ["projects", "research", "articles"];

export default function HomeTabs({
  posts,
  totalCount,
}: {
  posts: BlogPostMeta[];
  totalCount: number;
}) {
  const [activeTab, setActiveTab] = useState<TabId>("projects");

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, current: TabId) => {
    const idx = TAB_ORDER.indexOf(current);
    if (e.key === "ArrowRight") {
      e.preventDefault();
      setActiveTab(TAB_ORDER[(idx + 1) % TAB_ORDER.length]);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      setActiveTab(
        TAB_ORDER[(idx - 1 + TAB_ORDER.length) % TAB_ORDER.length]
      );
    }
  };

  return (
    <section
      aria-label="Projects, Research, and Articles"
      className="container-minimal py-8 sm:py-10 border-t border-border/70"
    >
      <div className="space-y-6">
        {/* Tab Bar + Contextual Action Link */}
        <div className="flex items-center justify-between gap-4 border-b border-border/60">
          <div
            role="tablist"
            aria-label="Homepage sections"
            className="flex items-center gap-4 sm:gap-8 -mb-px overflow-x-auto"
          >
            <button
              id="tab-projects"
              type="button"
              role="tab"
              aria-selected={activeTab === "projects"}
              aria-controls="panel-projects"
              onClick={() => setActiveTab("projects")}
              onKeyDown={(e) => handleKeyDown(e, "projects")}
              className={`relative inline-flex items-center gap-1.5 sm:gap-2 pb-3.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.26em] transition-colors cursor-pointer shrink-0 ${
                activeTab === "projects"
                  ? "text-foreground"
                  : "text-muted-foreground/60 hover:text-foreground"
              }`}
            >
              <FolderGit2 className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Projects</span>
              <span className="font-mono text-[10px] text-muted-foreground/50">
                ({projects.length})
              </span>
              {activeTab === "projects" && (
                <motion.span
                  layoutId="home-tab-underline"
                  className="absolute inset-x-0 bottom-0 h-[2px] bg-foreground"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
            </button>

            <button
              id="tab-research"
              type="button"
              role="tab"
              aria-selected={activeTab === "research"}
              aria-controls="panel-research"
              onClick={() => setActiveTab("research")}
              onKeyDown={(e) => handleKeyDown(e, "research")}
              className={`relative inline-flex items-center gap-1.5 sm:gap-2 pb-3.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.26em] transition-colors cursor-pointer shrink-0 ${
                activeTab === "research"
                  ? "text-foreground"
                  : "text-muted-foreground/60 hover:text-foreground"
              }`}
            >
              <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Research</span>
              <span className="font-mono text-[10px] text-muted-foreground/50">
                ({researchItems.length})
              </span>
              {activeTab === "research" && (
                <motion.span
                  layoutId="home-tab-underline"
                  className="absolute inset-x-0 bottom-0 h-[2px] bg-foreground"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
            </button>

            <button
              id="tab-articles"
              type="button"
              role="tab"
              aria-selected={activeTab === "articles"}
              aria-controls="panel-articles"
              onClick={() => setActiveTab("articles")}
              onKeyDown={(e) => handleKeyDown(e, "articles")}
              className={`relative inline-flex items-center gap-1.5 sm:gap-2 pb-3.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.26em] transition-colors cursor-pointer shrink-0 ${
                activeTab === "articles"
                  ? "text-foreground"
                  : "text-muted-foreground/60 hover:text-foreground"
              }`}
            >
              <FileText className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Articles</span>
              <span className="font-mono text-[10px] text-muted-foreground/50">
                ({totalCount})
              </span>
              {activeTab === "articles" && (
                <motion.span
                  layoutId="home-tab-underline"
                  className="absolute inset-x-0 bottom-0 h-[2px] bg-foreground"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
            </button>
          </div>

          <div className="hidden sm:block pb-3.5 shrink-0">
            {activeTab === "projects" && (
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors group"
              >
                <span>All Projects ({projects.length})</span>
                <ArrowRight
                  className="h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-foreground group-hover:translate-x-0.5 transition-all"
                  aria-hidden="true"
                />
              </Link>
            )}
            {activeTab === "research" && (
              <Link
                href="/research"
                className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors group"
              >
                <span>All Research ({researchItems.length})</span>
                <ArrowRight
                  className="h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-foreground group-hover:translate-x-0.5 transition-all"
                  aria-hidden="true"
                />
              </Link>
            )}
            {activeTab === "articles" && (
              <Link
                href="/blogs"
                className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors group"
              >
                <span>All Articles ({totalCount})</span>
                <ArrowRight
                  className="h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-foreground group-hover:translate-x-0.5 transition-all"
                  aria-hidden="true"
                />
              </Link>
            )}
          </div>
        </div>

        {/* Projects Panel */}
        {activeTab === "projects" && (
          <motion.div
            id="panel-projects"
            role="tabpanel"
            aria-labelledby="tab-projects"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="space-y-5"
          >
            <ol className="divide-y divide-border/50 border-b border-border/50">
              {projects.slice(0, 3).map((project, index) => (
                <li
                  key={project.name}
                  className="py-4 sm:py-5 first:pt-2 flex items-baseline justify-between gap-4 group"
                >
                  <div className="flex items-baseline gap-4 sm:gap-6 min-w-0">
                    <span className="text-muted-foreground/40 text-xs font-mono font-bold tracking-[0.2em] uppercase w-6 shrink-0">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {project.href ? (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg sm:text-2xl text-foreground font-medium group-hover:underline decoration-1 underline-offset-8 transition-colors truncate"
                      >
                        {project.name}
                      </a>
                    ) : (
                      <span className="text-lg sm:text-2xl text-foreground font-medium truncate">
                        {project.name}
                      </span>
                    )}
                  </div>

                  {project.href ? (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.name}`}
                      className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50 group-hover:text-foreground transition-colors shrink-0"
                    >
                      <span>{project.status}</span>
                      <ExternalLink className="h-3 w-3" aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/35 shrink-0">
                      <Code2 className="h-3 w-3" aria-hidden="true" />
                      <span>{project.status}</span>
                    </span>
                  )}
                </li>
              ))}
            </ol>

            <div className="flex items-center justify-between pt-1">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Showing {Math.min(3, projects.length)} featured projects.
              </p>
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground hover:underline underline-offset-6 shrink-0 ml-4 group"
              >
                <span>View Details</span>
                <ArrowRight
                  className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </motion.div>
        )}

        {/* Research Panel */}
        {activeTab === "research" && (
          <motion.div
            id="panel-research"
            role="tabpanel"
            aria-labelledby="tab-research"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="space-y-5"
          >
            <div className="divide-y divide-border/50 border-b border-border/50">
              {researchItems.slice(0, 3).map((item, index) => (
                <article
                  key={item.title}
                  className="py-4 sm:py-5 first:pt-2 group"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-[5.5rem_1fr] gap-1.5 sm:gap-6 items-baseline">
                    <div className="flex sm:flex-col items-baseline sm:items-start justify-between gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.15em] text-muted-foreground/50">
                      <span>{String(index + 1).padStart(2, "0")}</span>
                      <span className="text-[10px] tracking-[0.12em]">
                        {item.year} · {item.status}
                      </span>
                    </div>

                      <div className="space-y-1.5 min-w-0">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                          <Link
                            href={`/research/${item.slug}`}
                            className="text-base sm:text-lg font-bold text-foreground group-hover:underline decoration-1 underline-offset-6 transition-colors leading-snug"
                          >
                            {item.title}
                          </Link>
                          <span className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-muted-foreground/55 shrink-0">
                            {item.metrics ?? item.area}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {item.summary}
                        </p>
                      </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="flex items-center justify-between pt-1">
              <p className="text-xs sm:text-sm text-muted-foreground">
                Showing {Math.min(3, researchItems.length)}{" "}
                {researchItems.length === 1
                  ? "active research thread."
                  : "active research threads."}
              </p>
              <Link
                href="/research"
                className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground hover:underline underline-offset-6 shrink-0 ml-4 group"
              >
                <span>View Research</span>
                <ArrowRight
                  className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </motion.div>
        )}

        {/* Articles Panel */}
        {activeTab === "articles" && (
          <motion.div
            id="panel-articles"
            role="tabpanel"
            aria-labelledby="tab-articles"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="space-y-5"
          >
            <div className="divide-y divide-border/50 border-b border-border/50">
              {posts.map((post, index) => (
                <article
                  key={post.slug}
                  className="py-4 sm:py-5 first:pt-2 group"
                >
                  <Link href={`/blogs/${post.slug}`} className="block">
                    <div className="grid grid-cols-1 sm:grid-cols-[5.5rem_1fr] gap-1.5 sm:gap-6 items-baseline">
                      <div className="flex sm:flex-col items-baseline sm:items-start justify-between gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.15em] text-muted-foreground/50">
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <div className="flex items-center gap-2 sm:block">
                          <time
                            dateTime={post.date}
                            className="text-[10px] tracking-[0.12em]"
                          >
                            {post.formattedDate.replace(/,\s*\d{4}$/, "")}
                          </time>
                          <span className="sm:hidden text-[10px] text-muted-foreground/40">
                            · {post.readingTime}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-1.5 min-w-0">
                        <div className="flex items-baseline justify-between gap-4">
                          <h3 className="text-base sm:text-lg font-bold text-foreground group-hover:underline decoration-1 underline-offset-6 transition-colors leading-snug">
                            {post.title}
                          </h3>
                          <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/50 shrink-0">
                            <Clock className="h-3 w-3" aria-hidden="true" />
                            <span>{post.readingTime}</span>
                          </span>
                        </div>

                        {post.summary && (
                          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-1">
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
              <p className="text-xs sm:text-sm text-muted-foreground">
                Showing {posts.length} latest essays.
              </p>
              <Link
                href="/blogs"
                className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground hover:underline underline-offset-6 shrink-0 ml-4 group"
              >
                <span>Browse All {totalCount}</span>
                <ArrowRight
                  className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform"
                  aria-hidden="true"
                />
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

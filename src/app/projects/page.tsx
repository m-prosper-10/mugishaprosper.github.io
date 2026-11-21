import type { Metadata } from "next";
import { ArrowUpRight, Code2, ExternalLink, FolderGit2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";
import { contactInfo, projects, siteConfig } from "@/lib/data";

export const metadata: Metadata = {
  title: `Projects — ${siteConfig.name}`,
  description: `Selected AI engineering, systems infrastructure, and software projects built by ${siteConfig.name}.`,
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        <main className="container-minimal pt-12 sm:pt-16 pb-8">
          <header className="space-y-4 pb-10 sm:pb-12 border-b border-border/70">
            <div className="flex items-baseline justify-between gap-4">
              <h1 className="text-4xl sm:text-6xl font-bold text-cold">
                Projects
              </h1>
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                {projects.length}{" "}
                {projects.length === 1 ? "Project" : "Projects"}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <p className="text-lg sm:text-xl text-muted-foreground tracking-tight max-w-xl leading-relaxed">
                Selected systems, AI workflows, and developer tools I have built and shipped.
              </p>
              <a
                href={contactInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors shrink-0 group"
              >
                <FolderGit2 className="h-3.5 w-3.5" aria-hidden="true" />
                <span>GitHub Archive</span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                  aria-hidden="true"
                />
              </a>
            </div>
          </header>

          <ol className="divide-y divide-border/70">
            {projects.map((project, index) => (
              <li
                key={project.name}
                className="py-8 sm:py-10 first:pt-8 group"
              >
                <div className="grid grid-cols-1 sm:grid-cols-[5.5rem_1fr] gap-4 sm:gap-8 items-start">
                  <div className="flex sm:flex-col items-baseline sm:items-start justify-between gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground/55">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span className="text-[10px] tracking-[0.15em]">
                      {project.year}
                    </span>
                  </div>

                  <div className="space-y-3 min-w-0">
                    <div className="flex flex-wrap items-baseline justify-between gap-3">
                      {project.href ? (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-2xl sm:text-3xl font-bold text-foreground group-hover:underline decoration-1 underline-offset-8 transition-colors"
                        >
                          {project.name}
                        </a>
                      ) : (
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                          {project.name}
                        </h2>
                      )}

                      {project.href ? (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Visit ${project.name}`}
                          className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-[0.18em] px-2.5 py-1 border border-border/80 text-foreground hover:bg-foreground hover:text-background transition-colors shrink-0"
                        >
                          <span>{project.status}</span>
                          <ExternalLink className="h-3 w-3" aria-hidden="true" />
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.18em] px-2.5 py-1 border border-border/70 text-muted-foreground/60 shrink-0">
                          <Code2 className="h-3 w-3" aria-hidden="true" />
                          <span>{project.status}</span>
                        </span>
                      )}
                    </div>

                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {project.summary}
                    </p>

                    {project.stack.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-bold uppercase tracking-[0.16em] px-2 py-0.5 bg-muted/60 text-muted-foreground border border-border/80"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </main>
      </div>
      <Footer />
    </div>
  );
}

"use client";

import { contactInfo, projects } from "@/lib/data";
import { motion } from "framer-motion";

export default function Projects() {
  return (
    <section id="projects" className="container-minimal py-14 sm:py-16 border-t border-border/70">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <div className="flex items-baseline justify-between">
          <h2 className="text-[11px] font-bold uppercase tracking-[0.28em] text-muted-foreground/60">
            Selected Projects
          </h2>
          <a
            href={contactInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub Archive ↗
          </a>
        </div>

        <ol className="divide-y divide-border/50 border-y border-border/50">
          {projects.map((project, index) => (
            <li
              key={project.name}
              className="py-4 sm:py-5 flex items-baseline justify-between gap-4 group"
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
                  className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50 group-hover:text-foreground transition-colors shrink-0"
                >
                  Live ↗
                </a>
              ) : (
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/35 shrink-0">
                  In Dev
                </span>
              )}
            </li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
}

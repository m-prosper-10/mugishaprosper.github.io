"use client";

import Link from "next/link";
import { BookOpen, Compass, Github, Gitlab, Mail } from "lucide-react";
import { contactInfo } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="container-minimal pt-16 pb-12">
      <div className="border-t border-border/70 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
        <div className="flex items-center gap-3">
          <span>© {currentYear}</span>
          <span className="text-border">·</span>
          <span className="text-foreground/80">Mugisha Prosper</span>
        </div>

        <div className="flex flex-wrap items-center gap-6 sm:gap-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <Compass className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Index</span>
          </Link>
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Writing</span>
          </Link>
          <a
            href={contactInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <Github className="h-3.5 w-3.5" aria-hidden="true" />
            <span>GitHub</span>
          </a>
          <a
            href={contactInfo.gitlab}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <Gitlab className="h-3.5 w-3.5" aria-hidden="true" />
            <span>GitLab</span>
          </a>
          <a
            href={`mailto:${contactInfo.email}`}
            className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Mail</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

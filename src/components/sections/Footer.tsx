"use client";

import Link from "next/link";
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
            className="hover:text-foreground transition-colors"
          >
            Index
          </Link>
          <Link
            href="/blogs"
            className="hover:text-foreground transition-colors"
          >
            Writing
          </Link>
          <a
            href={contactInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
          <a
            href={contactInfo.gitlab}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitLab
          </a>
          <a
            href={`mailto:${contactInfo.email}`}
            className="hover:text-foreground transition-colors"
          >
            Mail
          </a>
        </div>
      </div>
    </footer>
  );
}

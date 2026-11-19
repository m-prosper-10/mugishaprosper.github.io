"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Compass, Terminal } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isBlogs = pathname.startsWith("/blogs");

  return (
    <header className="container-minimal pt-10 sm:pt-14 pb-8">
      <div className="flex items-center justify-between border-b border-border/70 pb-5">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-foreground hover:opacity-70 transition-opacity"
        >
          <Terminal className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
          <span>M. Prosper</span>
        </Link>

        <nav
          aria-label="Primary"
          className="flex items-center gap-6 sm:gap-8 text-[11px] font-bold uppercase tracking-[0.22em]"
        >
          <Link
            href="/"
            className={`inline-flex items-center gap-1.5 transition-colors ${
              isHome
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Compass className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Index</span>
          </Link>
          <Link
            href="/blogs"
            className={`inline-flex items-center gap-1.5 transition-colors ${
              isBlogs
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Writing</span>
          </Link>
          <span className="h-3 w-px bg-border" aria-hidden="true" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}

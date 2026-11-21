"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ArrowUpRight,
  BookOpen,
  Compass,
  FlaskConical,
  FolderGit2,
  Menu,
  Terminal,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";
import { socialLinks } from "@/lib/data";

const NAV_ITEMS = [
  { href: "/", label: "Index", icon: Compass, match: (p: string) => p === "/" },
  {
    href: "/projects",
    label: "Projects",
    icon: FolderGit2,
    match: (p: string) => p.startsWith("/projects"),
  },
  {
    href: "/research",
    label: "Research",
    icon: FlaskConical,
    match: (p: string) => p.startsWith("/research"),
  },
  {
    href: "/blogs",
    label: "Writing",
    icon: BookOpen,
    match: (p: string) => p.startsWith("/blogs"),
  },
] as const;

export default function Header() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on Escape key and lock body scroll while open
  useEffect(() => {
    if (!sidebarOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [sidebarOpen]);

  return (
    <>
      <header className="container-minimal pt-6 sm:pt-12 pb-6 sm:pb-8">
        <div className="flex items-center justify-between gap-3 border-b border-border/70 pb-4 sm:pb-5">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] sm:tracking-[0.25em] text-foreground hover:opacity-70 transition-opacity shrink-0"
          >
            <Terminal
              className="h-3.5 w-3.5 text-muted-foreground shrink-0"
              aria-hidden="true"
            />
            <span>M. Prosper</span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Primary"
            className="hidden md:flex items-center gap-7 text-[11px] font-bold uppercase tracking-[0.22em]"
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = item.match(pathname);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center gap-1.5 transition-colors ${
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <span className="h-3 w-px bg-border" aria-hidden="true" />
            <ThemeToggle />
          </nav>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <span className="h-3 w-px bg-border" aria-hidden="true" />
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={sidebarOpen}
              aria-controls="mobile-sidebar"
              className="p-1.5 -mr-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <Menu className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-xs"
              aria-hidden="true"
            />

            {/* Drawer Panel */}
            <motion.aside
              id="mobile-sidebar"
              aria-label="Mobile navigation"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 380, damping: 36 }}
              className="fixed top-0 right-0 bottom-0 w-72 max-w-[85vw] bg-background border-l border-border flex flex-col justify-between p-6"
            >
              <div className="space-y-8">
                <div className="flex items-center justify-between border-b border-border/70 pb-4">
                  <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-foreground">
                    <Terminal
                      className="h-3.5 w-3.5 text-muted-foreground"
                      aria-hidden="true"
                    />
                    <span>Navigation</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    aria-label="Close navigation menu"
                    className="p-1.5 -mr-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>

                <nav
                  aria-label="Mobile"
                  className="flex flex-col divide-y divide-border/50 border-y border-border/50"
                >
                  {NAV_ITEMS.map((item, idx) => {
                    const Icon = item.icon;
                    const active = item.match(pathname);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`py-4 flex items-center justify-between text-xs font-bold uppercase tracking-[0.22em] transition-colors ${
                          active
                            ? "text-foreground"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span className="inline-flex items-center gap-3">
                          <span className="font-mono text-[10px] text-muted-foreground/45">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <Icon className="h-4 w-4" aria-hidden="true" />
                          <span>{item.label}</span>
                        </span>
                        {active && (
                          <span
                            className="h-1.5 w-1.5 bg-foreground"
                            aria-hidden="true"
                          />
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="space-y-4 border-t border-border/70 pt-5">
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
                  Connect
                </p>
                <div className="flex flex-col gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={
                        link.href.startsWith("mailto:") ? undefined : "_blank"
                      }
                      rel={
                        link.href.startsWith("mailto:")
                          ? undefined
                          : "noopener noreferrer"
                      }
                      onClick={() => setSidebarOpen(false)}
                      className="inline-flex items-center justify-between hover:text-foreground transition-colors"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

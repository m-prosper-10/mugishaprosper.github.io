"use client";

import { socialLinks } from "@/lib/data";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id="hero" className="container-minimal pt-12 sm:pt-16 pb-16 sm:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="space-y-8"
      >
        <div className="space-y-4">
          <h1 className="text-5xl sm:text-7xl font-bold text-cold">
            Mugisha Prosper
          </h1>
          <p className="text-lg sm:text-2xl font-medium text-muted-foreground tracking-tight max-w-xl leading-relaxed">
            AI & Software Engineer.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-2 text-[11px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="hover:text-foreground transition-colors inline-flex items-center gap-1.5 group"
            >
              <span>{link.label}</span>
              <span className="text-muted-foreground/40 group-hover:text-foreground group-hover:translate-x-0.5 transition-all">
                ↗
              </span>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

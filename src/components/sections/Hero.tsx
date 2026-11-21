"use client";

import { ArrowUpRight, Github, Gitlab, Mail } from "lucide-react";
import { socialLinks } from "@/lib/data";
import { motion } from "framer-motion";

function getSocialIcon(label: string) {
  switch (label.toLowerCase()) {
    case "github":
      return <Github className="h-3.5 w-3.5" aria-hidden="true" />;
    case "gitlab":
      return <Gitlab className="h-3.5 w-3.5" aria-hidden="true" />;
    case "email":
      return <Mail className="h-3.5 w-3.5" aria-hidden="true" />;
    default:
      return null;
  }
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="container-minimal pt-4 sm:pt-12 pb-8 sm:pb-12"
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="space-y-6 sm:space-y-8"
      >
        <div className="space-y-3 sm:space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-cold">
            Mugisha Prosper
          </h1>
          <p className="text-base sm:text-xl lg:text-2xl font-medium text-muted-foreground tracking-tight max-w-xl leading-relaxed">
            Just an Engineer.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 sm:gap-x-8 pt-1 sm:pt-2 text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] sm:tracking-[0.22em] text-muted-foreground">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={
                link.href.startsWith("mailto:")
                  ? undefined
                  : "noopener noreferrer"
              }
              className="hover:text-foreground transition-colors inline-flex items-center gap-1.5 group"
            >
              {getSocialIcon(link.label)}
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

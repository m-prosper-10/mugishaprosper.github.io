"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/theme-context";

export default function ThemeToggle() {
  const { toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="p-1.5 -mr-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
      aria-label="Toggle theme"
    >
      <span className="block h-3.5 w-3.5" aria-hidden="true">
        <Sun className="h-3.5 w-3.5 dark:hidden" />
        <Moon className="hidden h-3.5 w-3.5 dark:block" />
      </span>
    </button>
  );
}

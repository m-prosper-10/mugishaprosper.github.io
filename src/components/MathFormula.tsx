"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    katex?: {
      render: (
        tex: string,
        element: HTMLElement,
        options?: {
          displayMode?: boolean;
          throwOnError?: boolean;
          strict?: boolean;
        }
      ) => void;
    };
  }
}

export function MathBlock({ tex }: { tex: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tryRender = () => {
      if (window.katex) {
        window.katex.render(tex, el, {
          displayMode: true,
          throwOnError: false,
          strict: false,
        });
        return true;
      }
      return false;
    };

    if (!tryRender()) {
      const interval = setInterval(() => {
        if (tryRender()) {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [tex]);

  return (
    <div className="my-6 py-3 sm:py-4 px-3 sm:px-5 border border-border bg-muted/40 max-w-full overflow-x-auto text-foreground text-center">
      <div ref={ref} className="text-xs sm:text-base min-w-fit mx-auto">
        {tex}
      </div>
    </div>
  );
}

export function MathInline({ tex }: { tex: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tryRender = () => {
      if (window.katex) {
        window.katex.render(tex, el, {
          displayMode: false,
          throwOnError: false,
          strict: false,
        });
        return true;
      }
      return false;
    };

    if (!tryRender()) {
      const interval = setInterval(() => {
        if (tryRender()) {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [tex]);

  return (
    <span ref={ref} className="text-foreground px-0.5">
      {tex}
    </span>
  );
}

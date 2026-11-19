import type { ReactNode } from "react";
import { MathBlock, MathInline } from "@/components/MathFormula";

function renderInline(text: string): ReactNode[] {
  const tokens = text.split(
    /(\$[^$\n]+\$|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g
  );

  return tokens.map((token, idx) => {
    if (token.startsWith("$") && token.endsWith("$") && token.length > 2) {
      return <MathInline key={idx} tex={token.slice(1, -1)} />;
    }

    if (token.startsWith("**") && token.endsWith("**") && token.length > 4) {
      return (
        <strong key={idx} className="font-bold text-foreground">
          {token.slice(2, -2)}
        </strong>
      );
    }

    if (token.startsWith("*") && token.endsWith("*") && token.length > 2) {
      return (
        <em key={idx} className="italic">
          {token.slice(1, -1)}
        </em>
      );
    }

    if (token.startsWith("`") && token.endsWith("`") && token.length > 2) {
      return (
        <code
          key={idx}
          className="px-1.5 py-0.5 text-[0.875em] font-mono bg-muted text-foreground border border-border"
        >
          {token.slice(1, -1)}
        </code>
      );
    }

    const linkMatch = token.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const isExternal = href.startsWith("http");
      return (
        <a
          key={idx}
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="text-foreground font-medium underline decoration-1 underline-offset-4 hover:text-muted-foreground transition-colors"
        >
          {label}
        </a>
      );
    }

    return token;
  });
}

export default function MarkdownRenderer({ content }: { content: string }) {
  const lines = content.split(/\r?\n/);
  const elements: ReactNode[] = [];

  let i = 0;
  let keyCounter = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i++;
      continue;
    }

    // Display Math Block ($$ ... $$)
    if (trimmed.startsWith("$$")) {
      if (trimmed.endsWith("$$") && trimmed.length > 4) {
        elements.push(
          <MathBlock
            key={`math-${keyCounter++}`}
            tex={trimmed.slice(2, -2).trim()}
          />
        );
        i++;
        continue;
      }

      const mathLines: string[] = [];
      if (trimmed.length > 2) {
        mathLines.push(trimmed.slice(2));
      }
      i++;
      while (i < lines.length && !lines[i].trim().endsWith("$$")) {
        mathLines.push(lines[i]);
        i++;
      }
      if (i < lines.length) {
        const closingLine = lines[i].trim();
        if (closingLine.length > 2) {
          mathLines.push(closingLine.slice(0, -2));
        }
        i++; // Skip closing $$
      }

      elements.push(
        <MathBlock key={`math-${keyCounter++}`} tex={mathLines.join("\n").trim()} />
      );
      continue;
    }

    // Code block
    if (trimmed.startsWith("```")) {
      const language = trimmed.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // Skip closing ```

      elements.push(
        <div
          key={`code-${keyCounter++}`}
          className="my-6 border border-border bg-muted/50 overflow-x-auto"
        >
          {language && (
            <div className="px-4 py-1.5 border-b border-border text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              {language}
            </div>
          )}
          <pre className="p-4 text-sm font-mono leading-relaxed text-foreground overflow-x-auto">
            <code>{codeLines.join("\n")}</code>
          </pre>
        </div>
      );
      continue;
    }

    // Headings
    if (trimmed.startsWith("### ")) {
      elements.push(
        <h3
          key={`h3-${keyCounter++}`}
          className="mt-10 mb-3 text-xl font-bold text-foreground tracking-tight"
        >
          {renderInline(trimmed.slice(4))}
        </h3>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith("## ")) {
      elements.push(
        <h2
          key={`h2-${keyCounter++}`}
          className="mt-12 mb-4 text-2xl sm:text-3xl font-bold text-foreground tracking-tight"
        >
          {renderInline(trimmed.slice(3))}
        </h2>
      );
      i++;
      continue;
    }

    if (trimmed.startsWith("# ")) {
      elements.push(
        <h1
          key={`h1-${keyCounter++}`}
          className="mt-12 mb-4 text-3xl sm:text-4xl font-bold text-foreground tracking-tight"
        >
          {renderInline(trimmed.slice(2))}
        </h1>
      );
      i++;
      continue;
    }

    // Blockquote
    if (trimmed.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("> ")) {
        quoteLines.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <blockquote
          key={`quote-${keyCounter++}`}
          className="my-6 pl-5 border-l-2 border-foreground text-foreground/90 italic text-lg leading-relaxed"
        >
          {renderInline(quoteLines.join(" "))}
        </blockquote>
      );
      continue;
    }

    // Unordered list
    if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
      const items: string[] = [];
      while (
        i < lines.length &&
        (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))
      ) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul
          key={`ul-${keyCounter++}`}
          className="my-5 space-y-2.5 list-disc list-outside pl-5 text-base sm:text-lg text-muted-foreground leading-relaxed"
        >
          {items.map((item, idx) => (
            <li key={idx} className="pl-1">
              {renderInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      elements.push(
        <ol
          key={`ol-${keyCounter++}`}
          className="my-5 space-y-2.5 list-decimal list-outside pl-5 text-base sm:text-lg text-muted-foreground leading-relaxed"
        >
          {items.map((item, idx) => (
            <li key={idx} className="pl-1">
              {renderInline(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Horizontal rule
    if (trimmed === "---" || trimmed === "***") {
      elements.push(
        <hr key={`hr-${keyCounter++}`} className="my-10 border-border" />
      );
      i++;
      continue;
    }

    // Paragraph
    const paragraphLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      lines[i].trim() !== "---" &&
      lines[i].trim() !== "***" &&
      !lines[i].trim().startsWith("$$") &&
      !lines[i].trim().startsWith("#") &&
      !lines[i].trim().startsWith("```") &&
      !lines[i].trim().startsWith("> ") &&
      !lines[i].trim().startsWith("- ") &&
      !lines[i].trim().startsWith("* ") &&
      !/^\d+\.\s+/.test(lines[i].trim())
    ) {
      paragraphLines.push(lines[i].trim());
      i++;
    }

    elements.push(
      <p
        key={`p-${keyCounter++}`}
        className="my-5 text-base sm:text-lg text-muted-foreground leading-relaxed"
      >
        {renderInline(paragraphLines.join(" "))}
      </p>
    );
  }

  return <article className="space-y-2">{elements}</article>;
}

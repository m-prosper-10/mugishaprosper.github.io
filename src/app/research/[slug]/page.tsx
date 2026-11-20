import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Cpu,
  FlaskConical,
  Github,
  Layers,
  ShieldCheck,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/sections/Footer";
import { researchItems, siteConfig } from "@/lib/data";
import { getResearchDetail } from "@/lib/research";

interface ResearchDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return researchItems.map((item) => ({
    slug: item.slug,
  }));
}

export async function generateMetadata({
  params,
}: ResearchDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = researchItems.find((r) => r.slug === slug);

  if (!item) {
    return {
      title: `Not Found — ${siteConfig.name}`,
    };
  }

  return {
    title: `${item.title} — Research — ${siteConfig.name}`,
    description: item.subtitle ?? item.summary,
  };
}

export default async function ResearchDetailPage({
  params,
}: ResearchDetailPageProps) {
  const { slug } = await params;
  const item = researchItems.find((r) => r.slug === slug);
  const detail = getResearchDetail(slug);

  if (!item || !detail) {
    notFound();
  }

  const currentIndex = researchItems.findIndex((r) => r.slug === slug);
  const newerItem = currentIndex > 0 ? researchItems[currentIndex - 1] : null;
  const olderItem =
    currentIndex !== -1 && currentIndex < researchItems.length - 1
      ? researchItems[currentIndex + 1]
      : null;

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Header />
        <main className="container-minimal pt-6 sm:pt-12 pb-12">
          <div className="max-w-4xl space-y-12 sm:space-y-14">
            {/* Back Navigation */}
            <div>
              <Link
                href="/research"
                className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors group"
              >
                <ArrowLeft
                  className="h-3.5 w-3.5 group-hover:-translate-x-0.5 transition-transform"
                  aria-hidden="true"
                />
                <span>All Research</span>
              </Link>
            </div>

            {/* Header */}
            <header className="space-y-5 pb-8 sm:pb-10 border-b border-border/70">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.22em] text-muted-foreground">
                  <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>
                    {item.area} · {item.year} · {item.status}
                  </span>
                </span>

                {item.repo && (
                  <a
                    href={item.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors group"
                  >
                    <Github className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Code & Dataset</span>
                    <ArrowUpRight
                      className="h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                      aria-hidden="true"
                    />
                  </a>
                )}
              </div>

              <div className="space-y-3">
                <p className="text-xs font-mono font-bold uppercase tracking-[0.24em] text-muted-foreground/70">
                  {item.title}
                </p>
                <h1 className="text-3xl sm:text-5xl font-bold text-cold">
                  {item.subtitle ?? item.title}
                </h1>
              </div>

              <div className="space-y-1.5 text-xs sm:text-sm text-muted-foreground">
                <p>
                  <span className="font-semibold text-foreground">Authors:</span>{" "}
                  {detail.authors}
                </p>
                <p className="text-xs text-muted-foreground/75">
                  {detail.affiliationNote}
                </p>
              </div>
            </header>

            {/* Key Metrics Grid */}
            <section
              aria-label="Key benchmarks"
              className="grid grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {detail.keyMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="p-4 border border-border/70 bg-muted/20 space-y-1.5"
                >
                  <p className="text-[10px] font-mono font-bold uppercase tracking-[0.18em] text-muted-foreground/70">
                    {metric.label}
                  </p>
                  <p className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
                    {metric.value}
                  </p>
                  <p className="text-[11px] text-muted-foreground leading-snug">
                    {metric.detail}
                  </p>
                </div>
              ))}
            </section>

            {/* Abstract & Core Problem */}
            <section className="space-y-4">
              <h2 className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-muted-foreground/70">
                <Activity className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Abstract & Motivation</span>
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-muted-foreground leading-relaxed">
                {detail.abstractParagraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            {/* Dataset & Preprocessing */}
            <section className="space-y-5">
              <h2 className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-muted-foreground/70">
                <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Dataset & Signal Preprocessing</span>
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {detail.datasetSummary}
              </p>

              <ol className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {detail.preprocessingSteps.map((step, idx) => (
                  <li
                    key={step}
                    className="p-3.5 border border-border/60 text-xs sm:text-sm text-muted-foreground flex items-baseline gap-3"
                  >
                    <span className="font-mono text-[10px] font-bold text-muted-foreground/50 shrink-0">
                      0{idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* Architecture Breakdown */}
            <section className="space-y-5">
              <h2 className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-muted-foreground/70">
                <Layers className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Architecture & Parameter Distribution</span>
              </h2>

              <div className="border border-border/70 divide-y divide-border/60">
                {detail.architectureModules.map((mod) => (
                  <div
                    key={mod.component}
                    className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-1 min-w-0">
                      <h3 className="text-sm sm:text-base font-bold text-foreground">
                        {mod.component}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {mod.details}
                      </p>
                    </div>
                    <div className="flex sm:flex-col items-baseline sm:items-end gap-2 sm:gap-0.5 shrink-0 font-mono">
                      <span className="text-sm font-bold text-foreground">
                        {mod.params}
                      </span>
                      <span className="text-[11px] text-muted-foreground/65">
                        {mod.share}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Experimental Results & Ablation */}
            <section className="space-y-6">
              <h2 className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-muted-foreground/70">
                Experimental Evaluation & Ablation
              </h2>

              <div className="overflow-x-auto border border-border/70">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-border/70 bg-muted/40 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      <th className="py-3 px-4">{detail.baselineHeading}</th>
                      <th className="py-3 px-4">Accuracy</th>
                      <th className="py-3 px-4">F1-Score</th>
                      <th className="py-3 px-4">AUC</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {detail.baselines.map((row) => (
                      <tr
                        key={row.model}
                        className={
                          row.highlight
                            ? "bg-muted/30 font-bold text-foreground"
                            : "text-muted-foreground"
                        }
                      >
                        <td className="py-3 px-4">{row.model}</td>
                        <td className="py-3 px-4 font-mono">{row.accuracy}</td>
                        <td className="py-3 px-4 font-mono">{row.f1}</td>
                        <td className="py-3 px-4 font-mono">{row.auc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-border/70 p-4 space-y-3">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-foreground">
                    Ablation Impact
                  </h3>
                  <ul className="divide-y divide-border/40 text-xs sm:text-sm">
                    {detail.ablations.map((ablation) => (
                      <li
                        key={ablation.variant}
                        className="py-2 flex items-center justify-between gap-2 text-muted-foreground"
                      >
                        <span>{ablation.variant}</span>
                        <span className="font-mono">
                          <strong className="text-foreground">
                            {ablation.accuracy}
                          </strong>{" "}
                          <span className="text-muted-foreground/60">
                            ({ablation.delta})
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-border/70 p-4 space-y-3">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-foreground">
                    Generalization, Calibration & SHAP
                  </h3>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {detail.generalizationNotes.map((note) => (
                      <li key={note.label}>
                        <strong className="text-foreground">{note.label}:</strong>{" "}
                        {note.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Edge Benchmarks & Deployment Note */}
            <section className="space-y-5">
              <h2 className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-muted-foreground/70">
                <Cpu className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Edge Inference Benchmarks (INT8 & ONNX / TFLite)</span>
              </h2>

              <div className="overflow-x-auto border border-border/70">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-border/70 bg-muted/40 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      <th className="py-3 px-4">Hardware Platform</th>
                      <th className="py-3 px-4">Runtime</th>
                      <th className="py-3 px-4">Latency / 4s Window</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50 text-muted-foreground">
                    {detail.edgeLatency.map((row) => (
                      <tr key={row.platform}>
                        <td className="py-3 px-4 font-medium text-foreground">
                          {row.platform}
                        </td>
                        <td className="py-3 px-4">{row.runtime}</td>
                        <td className="py-3 px-4 font-mono text-foreground">
                          {row.latency}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed border-l-2 border-border pl-4">
                <strong className="text-foreground">Deployment Note:</strong>{" "}
                {detail.deploymentNote}
              </p>
            </section>

            {/* Adjacent Research Navigation */}
            {(olderItem || newerItem) && (
              <nav
                aria-label="Adjacent research items"
                className="pt-10 border-t border-border/70 grid grid-cols-1 sm:grid-cols-2 gap-6"
              >
                {olderItem ? (
                  <Link
                    href={`/research/${olderItem.slug}`}
                    className="group block space-y-1.5 p-4 border border-border/60 hover:border-foreground/40 transition-colors"
                  >
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                      <ArrowLeft
                        className="h-3 w-3 group-hover:-translate-x-0.5 transition-transform"
                        aria-hidden="true"
                      />
                      <span>Previous Research</span>
                    </span>
                    <p className="text-sm sm:text-base font-bold text-foreground group-hover:underline decoration-1 underline-offset-4 line-clamp-2">
                      {olderItem.title}
                    </p>
                  </Link>
                ) : (
                  <div className="hidden sm:block" />
                )}

                {newerItem && (
                  <Link
                    href={`/research/${newerItem.slug}`}
                    className="group block space-y-1.5 p-4 border border-border/60 hover:border-foreground/40 transition-colors sm:text-right"
                  >
                    <span className="inline-flex items-center sm:justify-end gap-1.5 text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
                      <span>Next Research</span>
                      <ArrowRight
                        className="h-3 w-3 group-hover:translate-x-0.5 transition-transform"
                        aria-hidden="true"
                      />
                    </span>
                    <p className="text-sm sm:text-base font-bold text-foreground group-hover:underline decoration-1 underline-offset-4 line-clamp-2">
                      {newerItem.title}
                    </p>
                  </Link>
                )}
              </nav>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

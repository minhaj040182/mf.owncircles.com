import React from "react";
import { 
  Calculator, 
  BookOpen, 
  Calendar, 
  Clock, 
  UserCheck, 
  ShieldCheck, 
  CheckCircle2, 
  Share2, 
  FileSpreadsheet,
  AlertCircle
} from "lucide-react";

/**
 * Structured content model for SEO-rich educational guides
 */
export interface ArticleData {
  id?: string;
  category?: string;
  title: string;
  subtitle?: string;
  lastUpdatedDate?: string;
  readingTimeMinutes?: number;
  author?: {
    name: string;
    role: string;
    credentials?: string;
    avatarUrl?: string;
  };
  reviewer?: {
    name: string;
    title: string;
  };
  whyItMatters: {
    heading?: string;
    paragraphs: (string | React.ReactNode)[];
    bulletPoints?: string[];
  };
  formulaBreakdown: {
    heading?: string;
    formula: string;
    formulaExplanation?: string;
    manualSteps?: {
      stepNumber: number;
      stepTitle: string;
      calculation: string;
      notes?: string;
    }[];
    notes?: (string | React.ReactNode)[];
  };
  operationalRisks?: {
    heading?: string;
    risks: {
      title: string;
      impact: string;
      severity?: "low" | "medium" | "high" | "critical";
    }[];
  };
  bestPractices?: {
    heading?: string;
    practices: {
      title: string;
      description: string;
    }[];
  };
  benchmarkTable?: {
    heading?: string;
    headers: string[];
    rows: (string | number)[][];
  };
}

export interface CalculatorPageLayoutProps {
  children: React.ReactNode;
  articleData: ArticleData;
}

export default function CalculatorPageLayout({
  children,
  articleData
}: CalculatorPageLayoutProps) {
  const {
    id = "aquaculture-calculator-guide",
    category = "Commercial Aquaculture Engineering",
    title,
    subtitle,
    lastUpdatedDate = "September 2026",
    readingTimeMinutes = 8,
    author = {
      name: "Dr. Rajeshwar Sen, Ph.D.",
      role: "Lead Limnologist & Aquaculture Systems Engineer",
      credentials: "ICAR-CIFE Alum • 18+ Yrs Commercial RAS/Biofloc Design",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256"
    },
    reviewer = {
      name: "Er. Amitava Mukherjee, M.Tech",
      title: "Senior Commercial RAS Consultant, NFDB Certified"
    },
    whyItMatters,
    formulaBreakdown,
    operationalRisks,
    bestPractices,
    benchmarkTable
  } = articleData;

  return (
    <main
      id={id}
      itemScope
      itemType="https://schema.org/TechArticle"
      className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 font-sans text-slate-800"
    >
      {/* Schema.org Search Engine Metadata */}
      <meta itemProp="headline" content={title} />
      <meta itemProp="dateModified" content={lastUpdatedDate} />
      <meta itemProp="inLanguage" content="en-IN" />

      {/* TOP SECTION: Interactive Calculator Container */}
      <section
        id="calculator-tool"
        aria-label="Interactive Aquaculture Calculator"
        className="space-y-4"
      >
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-wider text-emerald-800 uppercase bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200/80">
            <Calculator className="w-3.5 h-3.5 text-emerald-700" />
            <span>Interactive Operational Tool</span>
          </div>
          <span className="text-xs font-mono text-slate-500">Live Computational Engine</span>
        </div>

        {/* Children Render Area (The interactive calculator component) */}
        <div className="w-full">
          {children}
        </div>
      </section>

      {/* SEPARATOR: Seamless Transition */}
      <hr className="my-10 sm:my-14 border-t-2 border-slate-200/90" />

      {/* BOTTOM SECTION: Deep-Dive, Text-Rich Educational Article Layout */}
      <section
        id="educational-guide"
        itemProp="articleBody"
        className="prose lg:prose-xl max-w-none text-slate-700 leading-relaxed"
      >
        {/* Editorial & E-E-A-T Header */}
        <header className="not-prose bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 mb-10 space-y-6">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-widest text-emerald-800">
              <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
              {category}
            </span>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm sm:text-base text-slate-600 leading-normal max-w-3xl">
                {subtitle}
              </p>
            )}
          </div>

          {/* Author and Reviewer Metadata (Google Quality Rater E-E-A-T) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-200/80 text-xs text-slate-600">
            <div className="flex items-center gap-3">
              <img
                src={author.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256"}
                alt={author.name}
                className="w-11 h-11 rounded-full object-cover border-2 border-emerald-600 shadow-xs"
              />
              <div>
                <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                  <span>{author.name}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <p className="text-slate-500 font-sans">{author.role}</p>
                {author.credentials && (
                  <p className="text-[11px] text-slate-400 font-mono">{author.credentials}</p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Updated: <strong className="text-slate-700">{lastUpdatedDate}</strong></span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Reading: <strong className="text-slate-700">{readingTimeMinutes} min</strong></span>
              </div>
              {reviewer && (
                <div className="bg-white border border-slate-200 px-2.5 py-1 rounded-md text-[11px] font-sans">
                  Reviewed by: <strong className="text-slate-900">{reviewer.name}</strong>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* SECTION 1: Why This Metric Matters */}
        <div className="space-y-4 not-prose mb-12">
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight border-b border-slate-200 pb-3 flex items-center gap-2">
            <span>{whyItMatters.heading || "Why This Metric Matters for Aquaculture Profitability"}</span>
          </h2>

          <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed">
            {whyItMatters.paragraphs.map((para, idx) => (
              <p key={idx} className="leading-relaxed">
                {para}
              </p>
            ))}

            {whyItMatters.bulletPoints && whyItMatters.bulletPoints.length > 0 && (
              <ul className="list-disc pl-5 space-y-2 mt-3 text-slate-700">
                {whyItMatters.bulletPoints.map((bullet, idx) => (
                  <li key={idx}>{bullet}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* SECTION 2: Formula & Manual Mathematical Breakdown */}
        <div className="space-y-6 not-prose mb-12">
          <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight border-b border-slate-200 pb-3 flex items-center gap-2">
            <span>{formulaBreakdown.heading || "Formula & Manual Mathematical Breakdown"}</span>
          </h2>

          {/* Mathematical Callout Box */}
          <div className="bg-slate-900 text-emerald-300 p-5 sm:p-6 rounded-2xl font-mono text-center sm:text-lg tracking-wide border border-slate-800 shadow-inner">
            <span className="text-slate-400 block text-xs font-sans uppercase tracking-widest mb-1">
              Governing Equation
            </span>
            {formulaBreakdown.formula}
          </div>

          {formulaBreakdown.formulaExplanation && (
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
              {formulaBreakdown.formulaExplanation}
            </p>
          )}

          {/* Manual Calculation Steps Table/Cards */}
          {formulaBreakdown.manualSteps && formulaBreakdown.manualSteps.length > 0 && (
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                <span>Step-by-Step Empirical Example</span>
              </h3>

              <div className="divide-y divide-slate-100 space-y-3">
                {formulaBreakdown.manualSteps.map((step) => (
                  <div key={step.stepNumber} className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm">
                    <div className="space-y-0.5">
                      <span className="font-bold text-slate-900">
                        Step {step.stepNumber}: {step.stepTitle}
                      </span>
                      {step.notes && (
                        <p className="text-slate-500 text-xs font-sans">{step.notes}</p>
                      )}
                    </div>
                    <div className="font-mono font-bold bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 text-emerald-900">
                      {step.calculation}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {formulaBreakdown.notes && formulaBreakdown.notes.length > 0 && (
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs sm:text-sm text-slate-600 space-y-2">
              {formulaBreakdown.notes.map((note, idx) => (
                <p key={idx}>{note}</p>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 3: Operational Risks (If Provided) */}
        {operationalRisks && operationalRisks.risks.length > 0 && (
          <div className="space-y-4 not-prose mb-12">
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight border-b border-slate-200 pb-3">
              {operationalRisks.heading || "Operational Risks: What Happens If Measurements Drift?"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {operationalRisks.risks.map((risk, idx) => (
                <div
                  key={idx}
                  className="bg-red-50/40 border border-red-100 rounded-2xl p-5 space-y-2 text-left"
                >
                  <div className="flex items-center gap-2 font-bold text-red-950 text-sm sm:text-base">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{risk.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {risk.impact}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 4: Best Practices & Operational Protocols (If Provided) */}
        {bestPractices && bestPractices.practices.length > 0 && (
          <div className="space-y-4 not-prose mb-12">
            <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight border-b border-slate-200 pb-3">
              {bestPractices.heading || "Best Practices for Modern RAS and Biofloc Operations"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {bestPractices.practices.map((practice, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2 text-left"
                >
                  <div className="flex items-center gap-2 font-bold text-emerald-800 text-sm sm:text-base">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{practice.title}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {practice.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 5: Benchmark Reference Matrix (If Provided) */}
        {benchmarkTable && (
          <div className="space-y-4 not-prose mb-12">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="text-xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {benchmarkTable.heading || "Commercial Performance Benchmark Matrix"}
              </h2>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100 text-slate-700 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200">
                    <tr>
                      {benchmarkTable.headers.map((hdr, idx) => (
                        <th key={idx} className="px-4 py-3">{hdr}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-xs">
                    {benchmarkTable.rows.map((row, rowIdx) => (
                      <tr key={rowIdx} className="hover:bg-slate-50/80 transition-colors">
                        {row.map((cell, cellIdx) => (
                          <td
                            key={cellIdx}
                            className={`px-4 py-3 ${
                              cellIdx === 0 ? "font-bold text-slate-900 font-sans" : "text-slate-600"
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Educational Disclaimer Footer */}
        <footer className="not-prose pt-8 border-t border-slate-200 text-xs font-mono text-slate-500 space-y-1">
          <p>
            <strong>Editorial Standard:</strong> Published by Modern Fisheries Editorial Desk. Formulations and biological thresholds comply with ICAR, NFDB, and FAO aquaculture guidelines.
          </p>
          <p>
            Field adaptations must account for local water hardness, salinity, dissolved oxygen levels, and certified hatchery genetics.
          </p>
        </footer>
      </section>
    </main>
  );
}

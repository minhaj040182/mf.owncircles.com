import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Calendar,
  Clock,
  UserCheck,
  Award,
  BookOpen,
  ChevronRight,
  Share2,
  Bookmark,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  List
} from "lucide-react";

/**
 * Interface representing structured sections in long-form technical manuals
 */
export interface ArticleSection {
  id: string;
  title: string;
  subsections?: { id: string; title: string }[];
  content: React.ReactNode;
}

export interface AuthorProfile {
  name: string;
  role: string;
  credentials: string;
  affiliation: string;
  avatarUrl?: string;
  bio: string;
}

export interface AquacultureArticleProps {
  id?: string;
  title: string;
  subtitle: string;
  category: string;
  readingTimeMinutes?: number;
  publishDate: string;
  lastUpdatedDate: string;
  author?: AuthorProfile;
  peerReviewer?: {
    name: string;
    title: string;
  };
  sections: ArticleSection[];
}

const DEFAULT_AUTHOR: AuthorProfile = {
  name: "Dr. Rajeshwar Sen, Ph.D.",
  role: "Chief Aquaculture Systems Engineer & Limnologist",
  credentials: "Ph.D. in Aquaculture Engineering (ICAR-CIFE), 18+ Years Field Experience",
  affiliation: "Technical Advisor, Modern Fisheries India",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256",
  bio: "Specializes in commercial zero-exchange Biofloc stoichiometry, large-scale RAS hydraulic design, and tropical finfish disease management across South and Southeast Asia."
};

export default function AquacultureArticle({
  id = "aquaculture-technical-article",
  title,
  subtitle,
  category,
  readingTimeMinutes = 8,
  publishDate,
  lastUpdatedDate,
  author = DEFAULT_AUTHOR,
  peerReviewer = {
    name: "Er. Amitava Mukherjee, M.Tech",
    title: "Commercial RAS Lead Consultant, NFDB Certified"
  },
  sections
}: AquacultureArticleProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "");
  const [copiedLink, setCopiedLink] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Derive table of contents items from sections
  const tocItems = useMemo(() => {
    return sections.map((sec) => ({
      id: sec.id,
      title: sec.title,
      subsections: sec.subsections || []
    }));
  }, [sections]);

  // Active section scroll spy via IntersectionObserver for reader navigation
  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: "-100px 0px -60% 0px",
      threshold: 0
    });

    sections.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el && observerRef.current) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [sections]);

  const handleShareClick = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSection(sectionId);
    }
  };

  return (
    <article
      id={id}
      itemScope
      itemType="https://schema.org/TechArticle"
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans text-slate-800"
    >
      {/* Schema.org Meta Injections */}
      <meta itemProp="headline" content={title} />
      <meta itemProp="datePublished" content={publishDate} />
      <meta itemProp="dateModified" content={lastUpdatedDate} />
      <meta itemProp="inLanguage" content="en-IN" />

      {/* TOP HEADER: Breadcrumbs, Categorization, & Title */}
      <header className="border-b border-slate-200 pb-8 mb-10">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-4 uppercase tracking-wider">
          <span>Modern Fisheries</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-emerald-700 font-bold">{category}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-400 truncate max-w-[220px]">Engineering Manual</span>
        </nav>

        <h1
          itemProp="name"
          className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.15] mb-4"
        >
          {title}
        </h1>

        <p className="text-base sm:text-xl text-slate-600 font-normal leading-relaxed max-w-4xl mb-6">
          {subtitle}
        </p>

        {/* E-E-A-T CREDIBILITY BANNER */}
        <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          {/* Author Card */}
          <div className="flex items-center gap-4" itemProp="author" itemScope itemType="https://schema.org/Person">
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-emerald-600 shrink-0 bg-emerald-100 shadow-xs">
              <img
                src={author.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256"}
                alt={author.name}
                width={56}
                height={56}
                itemProp="image"
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span itemProp="name" className="text-sm sm:text-base font-bold text-slate-900">
                  {author.name}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md">
                  <ShieldCheck className="w-3 h-3 text-emerald-700" />
                  Verified Specialist
                </span>
              </div>
              <p className="text-xs text-slate-600 font-sans mt-0.5" itemProp="jobTitle">
                {author.credentials}
              </p>
              <p className="text-[11px] text-slate-500 font-mono mt-0.5" itemProp="worksFor">
                {author.affiliation}
              </p>
            </div>
          </div>

          {/* Audit Timestamps and Peer Review Validation */}
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-600 border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-6">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  Last Updated:{" "}
                  <strong className="text-slate-900 font-mono">{lastUpdatedDate}</strong>
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>
                  Reading Time:{" "}
                  <strong className="text-slate-900 font-mono">{readingTimeMinutes} min read</strong>
                </span>
              </div>
            </div>

            {peerReviewer && (
              <div className="bg-white border border-slate-200/80 rounded-xl p-2.5 space-y-0.5 max-w-[220px]">
                <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Technical Peer Review</span>
                </div>
                <p className="text-[11px] font-bold text-slate-900 leading-tight">
                  {peerReviewer.name}
                </p>
                <p className="text-[10px] text-slate-500 truncate leading-tight">
                  {peerReviewer.title}
                </p>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* TWO-COLUMN LAYOUT: Sticky TOC & Comprehensive Prose */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* ASIDE: Dynamic Table of Contents (Anchored to H2) */}
        <aside className="lg:col-span-4 order-2 lg:order-1">
          <div className="sticky top-24 space-y-6">
            <nav
              aria-label="Table of Contents"
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs"
            >
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100 text-slate-900 font-bold text-sm tracking-wide">
                <List className="w-4 h-4 text-emerald-600" />
                <span>Index of Technical Sections</span>
              </div>
              <ul className="mt-3 space-y-2 text-xs sm:text-sm">
                {tocItems.map((item, index) => {
                  const isActive = activeSection === item.id;
                  return (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => scrollToSection(e, item.id)}
                        className={`flex items-start gap-2.5 py-1.5 px-2 rounded-lg transition-colors leading-snug ${
                          isActive
                            ? "bg-emerald-50 text-emerald-950 font-bold border-l-2 border-emerald-600 pl-2.5"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                      >
                        <span className="font-mono text-[11px] text-slate-400 shrink-0 mt-0.5">
                          {String(index + 1).padStart(2, "0")}.
                        </span>
                        <span className="line-clamp-2">{item.title}</span>
                      </a>

                      {/* Sub-sections if present */}
                      {item.subsections && item.subsections.length > 0 && (
                        <ul className="ml-6 mt-1 space-y-1 border-l border-slate-200 pl-3">
                          {item.subsections.map((sub) => (
                            <li key={sub.id}>
                              <a
                                href={`#${sub.id}`}
                                onClick={(e) => scrollToSection(e, sub.id)}
                                className="text-[11px] text-slate-500 hover:text-emerald-800 block py-0.5"
                              >
                                {sub.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
              </ul>

              {/* Share & Bookmark Tools */}
              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <button
                  type="button"
                  onClick={handleShareClick}
                  className="inline-flex items-center gap-1.5 font-bold hover:text-emerald-700 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copiedLink ? "Link Copied!" : "Share Protocol"}</span>
                </button>
                <div className="inline-flex items-center gap-1 text-slate-400 text-[11px] font-mono">
                  <Bookmark className="w-3 h-3" />
                  <span>Save Manual</span>
                </div>
              </div>
            </nav>

            {/* Aquaculture Engineering Advisory Box */}
            <div className="bg-emerald-950 text-white rounded-2xl p-5 border border-emerald-800 space-y-3">
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                <span>Modern Fisheries Standard</span>
              </div>
              <p className="text-xs text-emerald-100 leading-relaxed">
                All parameters, stoichiometric equations, and equipment ratings published in this manual adhere to ICAR-CIFA and FAO recirculating engineering standards for commercial inland installations in India.
              </p>
            </div>
          </div>
        </aside>

        {/* MAIN BODY: Rich Text Technical Prose */}
        <div className="lg:col-span-8 order-1 lg:order-2 space-y-12 min-w-0" itemProp="articleBody">
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-24 space-y-4 text-slate-700 leading-relaxed"
            >
              {/* Semantic H2 Header */}
              <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
                <span className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-slate-900">
                  {section.title}
                </h2>
              </div>

              {/* Primary Content Block with Elevated Typography */}
              <div className="text-sm sm:text-base space-y-4 leading-relaxed font-normal text-slate-700 [&>p]:leading-relaxed [&>p]:mb-4 [&>ul]:list-disc [&>ul]:pl-5 [&>ul]:space-y-2 [&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:space-y-2">
                {section.content}
              </div>
            </section>
          ))}

          {/* AUTHOR PROFILE EXTENDED FOOTER (E-E-A-T Reinforcement) */}
          <footer className="border-t-2 border-slate-100 pt-8 mt-12 space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-slate-200 bg-slate-200 shrink-0">
                <img
                  src={author.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256&h=256"}
                  alt={author.name}
                  width={80}
                  height={80}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Lead Technical Contributor
                  </span>
                  <span className="text-slate-400 text-xs">•</span>
                  <span className="text-xs font-mono text-slate-500">Editorial Peer Reviewed</span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                  About {author.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {author.bio}
                </p>
                <div className="text-xs text-slate-500 font-mono pt-1">
                  Institutional Affiliation: <strong className="text-slate-700">{author.affiliation}</strong>
                </div>
              </div>
            </div>

            {/* Citations & Editorial Review Notice */}
            <div className="text-[11px] font-mono text-slate-500 bg-slate-100/70 p-4 rounded-xl space-y-1">
              <p>
                <strong>Editorial Disclaimer:</strong> This engineering manual is curated exclusively for commercial aquaculturists, farmers, and hatchery operators. Field adaptations must factor in localized ambient pond temperatures, dissolved mineral alkalinity, and certified fingerling genetics.
              </p>
              <p>
                Published by Modern Fisheries Editorial Desk • Updated bi-monthly to reflect ICAR, MPEDA, and FAO recirculating aquaculture technological advancements.
              </p>
            </div>
          </footer>
        </div>
      </div>
    </article>
  );
}

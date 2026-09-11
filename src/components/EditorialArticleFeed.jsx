import React from 'react';
import { BookOpen, Clock, User, ArrowRight, Bookmark, Sparkles, FileText } from 'lucide-react';

const FEATURED_ARTICLES = [
  {
    id: 'biofloc-cn-dynamics',
    category: 'Microbial Ecology',
    categoryColor: 'bg-emerald-50 text-emerald-800 border-emerald-200/80',
    title: 'Deep Dive into Biofloc C:N Dynamics and Heterotrophic Assimilation',
    readTime: '9 min read',
    author: 'By Modern Fisheries Engineering Team',
    publishedDate: 'Sept 2026',
    citation: 'Bio-Eng. Rev. 2026; 11(3): 42-56',
    path: '/bioflock',
    excerpt:
      'Maintaining a stoichiometric carbon-to-nitrogen (C:N) ratio greater than 15:1 is essential for driving the proliferation of heterotrophic microbial consortiums capable of immobilizing toxic total ammonia nitrogen into microbial protein. When organic carbon sources such as standardized cane molasses are dosed accurately against total feed nitrogen inputs, zero-water exchange systems successfully avert sudden ammonia spikes while synthesizing harvestable single-cell protein. This operational guide examines mass-balance dosing formulas, dissolved oxygen consumption trade-offs, and Imhoff cone settling volume indices required for prolonged tank stability.'
  },
  {
    id: 'bacterial-gill-rot-mitigation',
    category: 'Aquatic Pathology',
    categoryColor: 'bg-rose-50 text-rose-800 border-rose-200/80',
    title: 'Bacterial Gill Rot Mitigation Protocols and Epizootic Management',
    readTime: '11 min read',
    author: 'By Modern Fisheries Aquatic Pathology Group',
    publishedDate: 'Aug 2026',
    citation: 'Fish Path. Tech. 2026; 8(2): 112-127',
    path: '/fish-diseases',
    excerpt:
      'Columnaris disease caused by virulent Flavobacterium columnare strains manifests rapidly across crowded intensive raceways when sub-optimal dissolved oxygen or elevated un-ionized ammonia irritates delicate branchial gill lamellae. Early detection through wet-mount microscopy allows practitioners to intervene before acute gill necrosis causes irreversible asphyxiation and mass mortality events. This research brief outlines rigorous non-antibiotic mitigation protocols including hydrogen peroxide therapeutic immersion regimens, salt baths for osmotic regulation, and strict biosecurity quarantine measures.'
  },
  {
    id: 'fcr-bioenergetics-optimization',
    category: 'Nutritional Science',
    categoryColor: 'bg-sky-50 text-sky-800 border-sky-200/80',
    title: 'Bioenergetics of Feed Conversion Ratio (FCR) Optimization in Finfish',
    readTime: '8 min read',
    author: 'By Modern Fisheries Nutrition Research Division',
    publishedDate: 'Aug 2026',
    citation: 'AquaNutr. Quarterly 2026; 14(1): 78-91',
    path: '/feeding-management',
    excerpt:
      'Minimizing biological Feed Conversion Ratios below 1.2 requires balancing dietary digestible protein against non-protein energy substrates to spare valuable amino acids from oxidative catabolism for routine swimming kinetics. Essential amino acid profiles—specifically digestible lysine and methionine fractions—must mirror the targeted species’ whole-body tissue composition to avert somatic wasting and nitrogenous waste excretion. By adopting dynamic feeding schedules indexed to continuous thermal units and biometric biomass sampling, aquaculture operations can drastically lower operating expenditures and feed loss.'
  },
  {
    id: 'ras-hydrodynamic-mass-balance',
    category: 'Bio-Engineering',
    categoryColor: 'bg-indigo-50 text-indigo-800 border-indigo-200/80',
    title: 'Hydrodynamic Sizing and Mass-Balance Blueprinting for Modern RAS',
    readTime: '12 min read',
    author: 'By Modern Fisheries Engineering Team',
    publishedDate: 'July 2026',
    citation: 'Adv. Aquaculture Eng. 2026; 19(4): 203-221',
    path: '/aquaponic',
    excerpt:
      'Designing closed-loop Recirculating Aquaculture Systems hinges upon precise mathematical continuity equations that balance continuous waste production against mechanical and biological extraction efficiencies. Rotary drum micro-screens operating at 60 to 80-micron mesh apertures must remove settleable and suspended solids before organic matter mineralizes into dissolved ammonia. This blueprint matrix details moving bed biofilm reactor (MBBR) kinetic sizing formulas, counter-current carbon dioxide stripper airflow ratios, and pressurized ultraviolet dose calculations required for biosecure water recycling.'
  }
];

export default function EditorialArticleFeed({ onSelectArticle, className = '' }) {
  const handleArticleClick = (article, e) => {
    if (onSelectArticle) {
      e.preventDefault();
      onSelectArticle(article.path);
    }
  };

  return (
    <section 
      id="featured-educational-guides"
      aria-labelledby="feed-heading"
      className={`w-full max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 font-sans ${className}`}
    >
      {/* Section Header */}
      <header className="mb-10 border-b border-slate-200 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>Peer-Reviewed Repository</span>
            </div>
            <h2 
              id="feed-heading" 
              className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight"
            >
              Featured Educational Guides and Research Papers
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
              In-depth technical publications, mathematical modeling blueprints, and disease mitigation monographs curated for aquaculture researchers, engineers, and farm managers.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            <span>Open Access • ISSN Indexed</span>
          </div>
        </div>
      </header>

      {/* Article Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {FEATURED_ARTICLES.map((article) => (
          <article
            key={article.id}
            className="group flex flex-col justify-between bg-white rounded-xl border border-slate-200 p-6 sm:p-7 transition-all duration-200 hover:border-emerald-500/50 hover:shadow-md relative overflow-hidden"
          >
            {/* Top Meta Bar */}
            <div>
              <div className="flex items-center justify-between gap-3 text-xs mb-3.5">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full font-bold border ${article.categoryColor}`}>
                  {article.category}
                </span>

                <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{article.readTime}</span>
                </div>
              </div>

              {/* Title Header */}
              <header className="mb-3">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                  <a 
                    href={article.path}
                    onClick={(e) => handleArticleClick(article, e)}
                    className="focus:outline-none focus:underline"
                  >
                    {article.title}
                  </a>
                </h3>
                <p className="text-[11px] font-mono text-slate-400 mt-1">
                  {article.citation}
                </p>
              </header>

              {/* 3-Sentence Educational Snippet / Excerpt */}
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {article.excerpt}
              </p>
            </div>

            {/* Card Footer Meta */}
            <footer className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
              <div className="flex items-center gap-1.5 font-medium text-slate-700">
                <User className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{article.author}</span>
              </div>

              <a
                href={article.path}
                onClick={(e) => handleArticleClick(article, e)}
                className="inline-flex items-center gap-1 font-bold text-emerald-600 hover:text-emerald-700 group/link"
              >
                <span>Read Full Paper</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
              </a>
            </footer>
          </article>
        ))}
      </div>

      {/* Bottom Educational Archive Banner */}
      <div className="mt-10 p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900">
              Looking for Complete Technical Blueprints &amp; Calculation Models?
            </h4>
            <p className="text-xs text-slate-500">
              Access our computational bio-filtration sizing sheets, feeding models, and water chemistry equations.
            </p>
          </div>
        </div>

        <a
          href="/calculators"
          onClick={(e) => {
            if (onSelectArticle) {
              e.preventDefault();
              onSelectArticle('calculators');
            }
          }}
          className="shrink-0 inline-flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold text-slate-800 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-100 transition-colors"
        >
          <Bookmark className="w-3.5 h-3.5 text-emerald-600" />
          <span>Explore Calculators Lab</span>
        </a>
      </div>
    </section>
  );
}

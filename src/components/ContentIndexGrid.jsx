import React from 'react';
import { 
  Calculator, 
  BookOpen, 
  FileText, 
  ShieldCheck, 
  ExternalLink, 
  ChevronRight,
  Sparkles
} from 'lucide-react';

/**
 * ContentIndexGrid
 * 
 * Flat semantic HTML navigation hub specifically optimized for Google AdSense 
 * and Search Engine crawlers (Googlebot) to discover, crawl, and index all
 * primary text guides, computational tools, and technical articles with direct
 * static anchor tags (<a href="...">).
 */
export default function ContentIndexGrid({ onNavigate }) {
  const handleNavClick = (e, path) => {
    // If onNavigate handler is provided, allow SPA routing while preserving semantic href for crawlers
    if (onNavigate && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  const sections = [
    {
      id: 'calculators-guides',
      title: 'Interactive Calculators & Sizing Engines',
      description: 'Mathematical tools, biomass algorithms, and bio-nutritional sizing.',
      icon: Calculator,
      color: 'emerald',
      badge: 'Scientific Solvers',
      links: [
        {
          title: 'Feed Conversion Ratio (FCR) Solver',
          subtitle: 'Feed fed vs biomass gain calculator & feed cost optimizer',
          href: '/calculators',
          tag: 'Essential'
        },
        {
          title: 'Biofloc C:N Ratio & Carbon Dosing Calculator',
          subtitle: 'Jaggery, molasses & sugar supplementation for ammonia assimilation',
          href: '/calculators',
          tag: 'BFT'
        },
        {
          title: 'Circular & Rectangular Tank Water Volume',
          subtitle: 'Geometric water volume, carrying capacity & liter sizing',
          href: '/calculators',
          tag: 'Sizing'
        },
        {
          title: 'Water Diagnostic Wizard & Water Quality Index',
          subtitle: 'Ammonia (TAN), nitrite (NO2), dissolved oxygen & pH triage',
          href: '/calculators',
          tag: 'Diagnostics'
        },
        {
          title: 'Formalin, Salt & Potassium Permanganate Dosage',
          subtitle: 'Parasite bath & pathogen eradication PPM calculator',
          href: '/calculators',
          tag: 'Treatment'
        },
        {
          title: 'Stocking Density & Fingerling Biomass Sizing',
          subtitle: 'Pangasius, Tilapia & IMC bio-carrying capacity estimates',
          href: '/calculators',
          tag: 'Stocking'
        }
      ]
    },
    {
      id: 'knowledge-base',
      title: 'Aquaculture Knowledge Base & Pillar Systems',
      description: 'Authoritative commercial engineering guides and system principles.',
      icon: BookOpen,
      color: 'teal',
      badge: 'Pillar Guides',
      links: [
        {
          title: 'Recirculating Aquaculture Systems (RAS) Engineering',
          subtitle: 'Drum filtration, MBBR moving bed bio-media & nitrification dynamics',
          href: '/aquaponic',
          tag: 'RAS'
        },
        {
          title: 'Commercial Biofloc Technology (BFT) Fish Farming',
          subtitle: 'Floc volume (FV), heterotrophic bacteria & zero-water exchange systems',
          href: '/bioflock',
          tag: 'Biofloc'
        },
        {
          title: 'Commercial Aquaponics Farming & Nutrient Coupling',
          subtitle: 'Symbiotic fish waste nitrification & plant root nutrient assimilation',
          href: '/aquaponics-farming',
          tag: 'Coupled'
        },
        {
          title: 'Hydroponic Cultivation Systems & Mineral Formulations',
          subtitle: 'NFT channels, Dutch buckets, EC/TDS maintenance & micronutrients',
          href: '/hydroponic',
          tag: 'Soilless'
        },
        {
          title: 'Semi-Intensive & Intensive Earthen Pond Management',
          subtitle: 'Bottom sludge aeration, soil liming, plankton blooms & chlorophyll',
          href: '/pond-farming',
          tag: 'Ponds'
        },
        {
          title: 'Fish Disease Diagnosis & Biosecurity Protocols',
          subtitle: 'Columnaris, Epizootic Ulcerative Syndrome (EUS), fin rot & protozoans',
          href: '/fish-diseases',
          tag: 'Pathology'
        },
        {
          title: 'Precision Feed Nutrition & Sinking vs Floating Pellets',
          subtitle: 'Crude protein percentages, lipid energy ratios & automated feeding',
          href: '/feeding-management',
          tag: 'Nutrition'
        }
      ]
    },
    {
      id: 'technical-tutorials',
      title: 'Commercial Technical Tutorials & Video Text Guides',
      description: 'Explanatory transcripts, step-by-step setup guides, and operational masterclasses.',
      icon: FileText,
      color: 'sky',
      badge: 'Video-To-Text',
      links: [
        {
          title: 'All Aquaculture Video Guides & Tutorials',
          subtitle: 'Complete video library covering setups, stocking, aeration & disease cures',
          href: '/farming-videos',
          tag: 'All Guides'
        },
        {
          title: 'Biofloc Tank Setup, Tarpaulin Line & Aeration Grid Guide',
          subtitle: 'Blower sizing, ring blowers vs piston air pumps & unplasticized PVC lines',
          href: '/farming-videos',
          tag: 'Engineering'
        },
        {
          title: 'Nursery Pond Seed Acclimatization & Transport Bag Dipping',
          subtitle: 'Temperature equilibrium, salinity balancing & methylene blue bath dip',
          href: '/farming-videos',
          tag: 'Seed Stock'
        },
        {
          title: 'Commercial Consultancy, Turnkey RAS & Seed Supply',
          subtitle: 'Feasibility studies, project blueprints & certified fingerling logistics',
          href: '/ourservices',
          tag: 'Consultancy'
        },
        {
          title: 'Frequently Asked Commercial Farming Questions (FAQ)',
          subtitle: 'Electricity backup requirements, profitability projections & mortality fixes',
          href: '/frequently-asked-questions',
          tag: 'Knowledge'
        }
      ]
    },
    {
      id: 'transparency-trust',
      title: 'Transparency, Author Credentials & Trust (E-E-A-T)',
      description: 'Editorial guidelines, field engineering experience, and compliance policies.',
      icon: ShieldCheck,
      color: 'slate',
      badge: 'Compliance & E-E-A-T',
      links: [
        {
          title: 'About Modern Fisheries & Aquaculture Research Team',
          subtitle: '25+ years field experience, hatchery engineering & research lineage',
          href: '/about-us',
          tag: 'Credentials'
        },
        {
          title: 'Privacy Policy & Terms of Service',
          subtitle: 'Data transparency, cookie compliance & user rights documentation',
          href: '/privacy-policy',
          tag: 'Legal'
        },
        {
          title: 'Technical Helpline & Direct Farm Inquiries',
          subtitle: 'WhatsApp assistance and direct email consultation desk',
          href: '/ourservices',
          tag: 'Contact'
        }
      ]
    }
  ];

  return (
    <section 
      id="site-content-index" 
      aria-label="Aquaculture Engineering & Content Directory"
      className="mt-16 pt-12 pb-16 bg-slate-900 border-t-2 border-emerald-500/30 text-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header / Intro for Crawlers & Users */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-slate-800 gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Complete Content Directory & Knowledge Index
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Aquaculture Knowledge Base, Calculators & Field Manuals
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Explore our comprehensive index of scientific aquaculture calculators, recirculating systems engineering, biofloc microbiology, and commercial fish disease protocols.
            </p>
          </div>
          
          <div className="text-xs font-mono text-slate-500 self-start md:self-end">
            <span>Direct Crawler Crawl-Map</span> &bull; <span>Zero JavaScript Dropdown Dependency</span>
          </div>
        </div>

        {/* Semantic Flat Navigation Grid */}
        <nav aria-label="Comprehensive Site Index" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <div 
                key={section.id} 
                className="flex flex-col rounded-2xl bg-slate-800/60 border border-slate-700/60 p-5 hover:border-slate-600 transition-colors"
              >
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-700/70">
                  <div className="p-2 rounded-xl bg-slate-700/60 text-emerald-400 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400/90 block">
                      {section.badge}
                    </span>
                    <h3 className="font-bold text-white text-sm sm:text-base leading-snug">
                      {section.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-400 mb-4 line-clamp-2">
                  {section.description}
                </p>

                {/* Flat Semantic Link List */}
                <ul className="space-y-3.5 flex-1">
                  {section.links.map((link, idx) => (
                    <li key={idx} className="group">
                      <a
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className="block rounded-lg p-2 -mx-2 hover:bg-slate-700/50 transition-all text-slate-300 hover:text-white"
                        title={link.title}
                      >
                        <div className="flex items-start justify-between gap-1.5">
                          <span className="text-xs font-semibold text-slate-200 group-hover:text-emerald-300 group-hover:underline transition-colors leading-tight">
                            {link.title}
                          </span>
                          <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 shrink-0 mt-0.5 transform group-hover:translate-x-0.5 transition-transform" />
                        </div>
                        {link.subtitle && (
                          <span className="block text-[11px] text-slate-400 group-hover:text-slate-300 mt-0.5 leading-normal">
                            {link.subtitle}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Section Bottom Anchor */}
                <div className="mt-4 pt-3 border-t border-slate-700/40 text-right">
                  <a
                    href={section.links[0].href}
                    onClick={(e) => handleNavClick(e, section.links[0].href)}
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400 hover:text-emerald-300 font-bold"
                  >
                    <span>View Section</span>
                    <ChevronRight className="w-3 h-3" />
                  </a>
                </div>

              </div>
            );
          })}
        </nav>

        {/* Crawler Crawl Budget Assurance Notice */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>
            Modern Fisheries operates as an open-access aquaculture knowledge portal and advisory hub.
          </p>
          <div className="flex items-center gap-4 text-slate-400 text-xs">
            <a 
              href="https://modernfisheriese.com/sitemap.xml" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:underline font-mono"
            >
              <span>XML Sitemap</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span>&bull;</span>
            <a 
              href="/privacy-policy" 
              onClick={(e) => handleNavClick(e, '/privacy-policy')}
              className="hover:text-slate-300 transition-colors"
            >
              Editorial Standards
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

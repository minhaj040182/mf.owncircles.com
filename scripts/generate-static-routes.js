import fs from 'fs';
import path from 'path';
import { RICH_PAGE_BODIES } from './page-rich-content.js';

const BASE_URL = 'https://modernfisheriese.com';
const TODAY = new Date().toISOString().split('T')[0];

const distDir = path.resolve('dist');
const indexPath = path.join(distDir, 'index.html');

if (!fs.existsSync(indexPath)) {
  console.error('Error: index.html not found in dist directory.');
  process.exit(1);
}

const baseIndexHtml = fs.readFileSync(indexPath, 'utf-8');

// Helper for slug generation
function createSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Extract videos from src/data.ts
function extractVideos() {
  const dataPath = path.resolve('src/data.ts');
  if (!fs.existsSync(dataPath)) return [];
  const content = fs.readFileSync(dataPath, 'utf-8');
  const videos = [];
  const regex = /\{\s*id:\s*["']([^"']+)["'][\s\S]*?title:\s*["']([^"']+)["'](?:[\s\S]*?description:\s*["']([^"']+)["'])?(?:[\s\S]*?category:\s*["']([^"']+)["'])?/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    videos.push({
      id: match[1],
      title: match[2],
      description: match[3] || 'Aquaculture technical video guide produced by Modern Fisheries.',
      category: match[4] || 'Aquaculture',
    });
  }
  return videos;
}

const videos = extractVideos();
console.log(`✓ Extracted ${videos.length} videos from src/data.ts for SEO route generation.`);

// Extract Equipment from src/data/equipmentData.ts
function extractEquipment() {
  const eqPath = path.resolve('src/data/equipmentData.ts');
  if (!fs.existsSync(eqPath)) return [];
  const content = fs.readFileSync(eqPath, 'utf-8');
  const items = [];
  const regex = /id:\s*["']([^"']+)["'],\s*slug:\s*["']([^"']+)["'],\s*name:\s*["']([^"']+)["'],\s*category:\s*["']([^"']+)["'][\s\S]*?tagline:\s*["']([^"']+)["'][\s\S]*?purpose:\s*["']([^"']+)["'][\s\S]*?whyRequired:\s*["']([^"']+)["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    items.push({
      id: match[1],
      slug: match[2],
      name: match[3],
      category: match[4],
      tagline: match[5],
      purpose: match[6],
      whyRequired: match[7]
    });
  }
  return items;
}

const equipmentList = extractEquipment();
console.log(`✓ Extracted ${equipmentList.length} equipment items from src/data/equipmentData.ts for SEO route generation.`);

// SEO Metadata Dictionary for Main Pages (Strict Canonical Routes Only)
const PAGE_METADATA = [
  {
    path: '/',
    canonical: `${BASE_URL}/`,
    title: 'Modern Fisheries | Journal of Precision Aquaculture & Bio-Engineering Research',
    description: 'Open-access educational journal and engineering portal providing peer-reviewed guides, RAS engineering blueprints, and precision aquaculture calculation tools.',
    keywords: 'modern fisheries, precision aquaculture, recirculating aquaculture systems design, RAS blueprint, fish nutrition research, FCR optimization, protein metrics, biofloc technology',
    h1: 'Modern Fisheries - Precision Aquaculture Engineering & Research Journal',
    bodyText: 'Open-access educational journal and engineering portal providing peer-reviewed guides, RAS engineering blueprints, fish nutrition metrics, and precision calculation tools.',
    changefreq: 'daily',
    priority: '1.0',
    isPrimary: true
  },
  {
    path: '/aquaponics-farming',
    canonical: `${BASE_URL}/aquaponics-farming`,
    title: 'Commercial Aquaponics Farming Systems & Equipment Guide',
    description: 'Commercial aquaponics systems & hardware: auto bell siphons, sump tanks, radial flow settlers, mineralization filters, DWC rafts & water circulation pumps.',
    keywords: 'aquaponics equipment, commercial aquaponics systems, bell siphon, radial flow settler, dual culture fish vegetables, mineralization tank, aquaponic pumps, modern fisheries',
    h1: 'Aquaponics Farming Systems, Hardware & Commercial Sizing',
    bodyText: 'Learn to design and construct high-efficiency commercial aquaponics systems integrating fish culture with soilless plant farming. Detailed engineering specifications for bell siphons, radial flow settlers, mineralization tanks, and DWC aeration grids.',
    changefreq: 'weekly',
    priority: '0.9',
    isPrimary: true
  },
  {
    path: '/bioflock',
    canonical: `${BASE_URL}/bioflock`,
    title: 'Biofloc Fish Farming Equipment & BFT Systems | Modern Fisheries',
    description: 'Master Biofloc fish farming equipment: Roots air blowers, micro-pore diffuser grids, 650 GSM PVC tarpaulin tanks, Imhoff cones, C:N ratio & sludge pumps.',
    keywords: 'biofloc equipment cost, biofloc technology, roots air blower, biofloc tarpaulin tanks, aeration diffuser grid, imhoff cone, C:N ratio calculator, submersible sludge pump, BFT fish farming',
    h1: 'Biofloc Fish Farming Equipment & High-Density BFT Systems',
    bodyText: 'Comprehensive engineering handbook for Biofloc technology equipment and hardware. Sizing guides for twin-lobe Roots air blowers, 650 GSM circular tarpaulin tanks, bottom central drain vortex pumps, and Imhoff cone floc volume diagnostics.',
    changefreq: 'weekly',
    priority: '0.9',
    isPrimary: true
  },
  {
    path: '/aquaponic',
    canonical: `${BASE_URL}/aquaponic`,
    title: 'RAS Fish Farming Machinery & Equipment | Modern Fisheries',
    description: 'Commercial RAS fish farming machinery: automatic rotary drum filters, MBBR biofilters, protein skimmers, UV sterilizers, oxygen cones & compact indoor RAS skids.',
    keywords: 'ras fish farming machinery, all in one ras, indoor ras system, rotary drum filter aquaculture, mbbr biofilter, protein skimmer, uv sterilizer, speece oxygen cone, modern fisheries',
    h1: 'Recirculating Aquaculture System (RAS) Machinery & Equipment Setup',
    bodyText: 'Turn-key commercial indoor Recirculating Aquaculture System engineering. Technical specifications for automatic micro-screen rotary drum filters (40-60 micron SS316), fluid bed MBBR biofilters with virgin K1 media, protein skimmers, amalgam UV-C sterilizers, and downflow pure oxygen cones.',
    changefreq: 'weekly',
    priority: '0.9',
    isPrimary: true
  },
  {
    path: '/hydroponic',
    canonical: `${BASE_URL}/hydroponic`,
    title: 'Hydroponic System Equipment & Nutrient Balancing Guide',
    description: 'Commercial soil-less hydroponic farming equipment: food-grade PVC NFT channels, Deep Water Culture tanks, EC/pH inline sensors, dosing pumps & chiller units.',
    keywords: 'hydroponics equipment, NFT channels, nutrient film technique, DWC rafts, EC pH doser, hydroponic water chiller, soilless indoor farming, modern fisheries',
    h1: 'Hydroponics System Equipment & Nutrient Management',
    bodyText: 'Master commercial hydroponics production using NFT channels, Dutch buckets, and Deep Water Culture (DWC). Hardware guidelines for food-grade PVC gullies, automated EC/pH dosing injection, nutrient chillers, and dissolved oxygen maintenance.',
    changefreq: 'weekly',
    priority: '0.9',
    isPrimary: true
  },
  {
    path: '/pond-farming',
    canonical: `${BASE_URL}/pond-farming`,
    title: 'Earthen Pond Fish Farming Machinery & Equipment Guide',
    description: 'Master earthen pond fish farming machinery & management: paddle wheel aerators, submersible pond bottom sludge cleaners, dredgers, seine drag nets & pumps.',
    keywords: 'earthen fish pond equipment, paddle wheel aerator price india, pond bottom cleaner, silt dredger pump, earthen pond fish culture, fish harvesting nets, pond liming, pond aeration machinery',
    h1: 'Earthen Pond Fish Farming Machinery & Water Management',
    bodyText: 'Comprehensive technical handbook for earthen fish pond machinery: 2-paddle & 4-paddle wheel aerators, submersible bottom sludge cleaners, cutter dredgers, high-flow axial dewatering pumps, knotless nylon seine drag nets, and plankton bloom management.',
    changefreq: 'weekly',
    priority: '0.9',
    isPrimary: true
  },
  {
    path: '/fish-diseases',
    canonical: `${BASE_URL}/fish-diseases`,
    title: 'Fish Disease Diagnosis & Water Quality Testing Equipment',
    description: 'Fish disease prevention & diagnostic equipment: optical DO meters, multiparameter photometers, compound microscopes, UV-C sterilizers & quarantine routine.',
    keywords: 'aquaculture testing equipment, optical DO meter, fish disease diagnosis, aquaculture microscope, multiparameter photometer, UV water sterilizer, biosecurity protocols, water testing kit',
    h1: 'Fish Disease Diagnosis, Prevention & Testing Equipment',
    bodyText: 'Diagnostic tools, field testing gear, and biosecurity hardware for commercial fish farming. Master optical dissolved oxygen sensors, multi-parameter photometers (Ammonia/Nitrite/pH), 1000x biological microscopes, and UV-C disinfection barriers.',
    changefreq: 'weekly',
    priority: '0.9',
    isPrimary: true
  },
  {
    path: '/feeding-management',
    canonical: `${BASE_URL}/feeding-management`,
    title: 'Fish Feed Machinery, Extruders & Automated Solar Feeders',
    description: 'Aquaculture feed machinery & management: programmable solar fish feeders, floating pellet extruders, hammer mills, batch mixers, FCR sizing & growth charts.',
    keywords: 'automatic fish feeder, solar fish feeder, fish feed pellet machine, floating feed extruder, hammer mill pulverizer, FCR calculator, feed conversion ratio, aquaculture nutrition',
    h1: 'Aquaculture Feed Machinery, Automated Feeders & FCR Sizing',
    bodyText: 'Commercial feed manufacturing machinery and smart feeding automation. Specifications for floating fish feed pellet extruders, stainless steel hammer mills, horizontal ribbon mixers, solar automatic broadcast feeders, and scientific FCR optimization formulas.',
    changefreq: 'weekly',
    priority: '0.9',
    isPrimary: true
  },
  {
    path: '/calculators',
    canonical: `${BASE_URL}/calculators`,
    title: 'Aquaculture Equipment & FCR Sizing Calculators | Modern Fisheries',
    description: 'Free precision aquaculture calculators: aerator horsepower sizing, biofilter volume, tank capacity, FCR, biomass growth, C:N ratio & daily feeding rates.',
    keywords: 'aquaculture calculator, aerator sizing calculator, biofilter calculator, FCR calculator, tank volume calculator, fish biomass calculator, stocking density',
    h1: 'Precision Aquaculture Calculators & Engineering Tools',
    bodyText: 'Interactive engineering calculators: Paddle wheel and blower aeration horsepower sizing, moving bed biofilter media volume, circular tank water volume, FCR solver, and daily feed requirement charts.',
    changefreq: 'weekly',
    priority: '0.9',
    isPrimary: true
  },
  {
    path: '/equipment-finder',
    canonical: `${BASE_URL}/equipment-finder`,
    title: 'Fish Farming Machinery & Processing Equipment | Modern Fisheries',
    description: 'Commercial fish farming machinery list & sizing in India: fish processing, transfer pumps, pond bottom cleaners, RAS filters & Biofloc blowers. Direct inquiry.',
    keywords: 'fish processing machine india, fish transfer pump, pond bottom cleaner, earthen fish pond equipment, ras fish farming machinery, all in one ras, indoor ras system, biofloc equipment cost, paddle wheel aerator price india, modern fisheries',
    h1: 'Commercial Fish Farming Machinery, Processing Equipment & Technical Sizing Desk',
    bodyText: 'Authoritative engineering decision-support tool for commercial fish farmers. Size fish processing and scaling machinery, non-clog live fish transfer pumps, pond bottom sludge cleaners, aeration Roots blowers, and all-in-one indoor RAS skids in India. Direct technical inquiries via WhatsApp and Email.',
    changefreq: 'weekly',
    priority: '0.9',
    isPrimary: true
  },
  {
    path: '/ourservices',
    canonical: `${BASE_URL}/ourservices`,
    title: 'Turnkey Aquaculture Machinery Setup & RAS Engineering Blueprints',
    description: 'Professional aquaculture engineering & equipment procurement: turnkey RAS modular skids, pond aeration grids, biofloc blowers, and fish processing machinery.',
    keywords: 'turnkey ras setup, aquaculture equipment supplier, fish processing machinery india, commercial aeration engineering, hatchery equipment setup, modern fisheries consultancy',
    h1: 'Turnkey Aquaculture Machinery Engineering & Equipment Setup',
    bodyText: 'Modern Fisheries provides full-scope turnkey aquaculture engineering, commercial equipment procurement, RAS modular skid integration, pond aeration grid sizing, and hatchery incubation machinery.',
    changefreq: 'weekly',
    priority: '0.85',
    isPrimary: true
  },
  {
    path: '/about-us',
    canonical: `${BASE_URL}/about-us`,
    title: 'About Modern Fisheries | Aquaculture Solutions & Services',
    description: "Learn about Modern Fisheries - India's premier aquaculture portal offering turnkey RAS design, commercial fish feed supply, seed distribution & consultancy.", // 156 chars
    keywords: 'about modern fisheries, aquaculture company india, modern farming, RAS design, aquaculture consultancy',
    h1: 'About Modern Fisheries',
    bodyText: 'Modern Fisheries is a leading technology-driven aquaculture innovation platform providing sustainable fish farming systems, technical education, certified inputs, and commercial farm setup guidance.',
    changefreq: 'monthly',
    priority: '0.8',
    isPrimary: true
  },
  {
    path: '/farming-videos',
    canonical: `${BASE_URL}/farming-videos`,
    title: 'Aquaculture Video Tutorials & Farm Guides | Modern Fisheries',
    description: 'Watch high-definition aquaculture video tutorials on RAS design, Biofloc systems, Aquaponics, fish disease diagnosis, and feeding by Modern Fisheries.', // 153 chars
    keywords: 'aquaculture videos, fish farming tutorials, biofloc video guide, modern fisheries videos',
    h1: 'Aquaculture Technical Video Library',
    bodyText: 'Explore practical video masterclasses covering pond harvesting, biofloc tank preparation, roots blower aeration grid setup, drum filter fabrication, and fish feeding techniques.',
    changefreq: 'daily',
    priority: '0.8',
    isPrimary: true
  },
  {
    path: '/faq',
    canonical: `${BASE_URL}/faq`,
    title: 'Fish Farming FAQ & Knowledge Base Guide | Modern Fisheries',
    description: 'Get expert answers to Frequently Asked Questions about Biofloc C:N ratios, RAS design, biofilter sizing, fish stocking density, and disease treatments.', // 152 chars
    keywords: 'fish farming faq, biofloc questions, RAS design questions, fish disease treatment, FCR calculator, modern fisheries faq',
    h1: 'Aquaculture Knowledge Base & FAQ',
    bodyText: 'Get expert answers to common questions regarding biofloc C:N ratio calculations, RAS biofilter sizing, oxygen levels, feed conversion optimization, and disease treatments.',
    changefreq: 'weekly',
    priority: '0.8',
    isPrimary: true
  },
  {
    path: '/privacy-policy',
    canonical: `${BASE_URL}/privacy-policy`,
    title: 'Privacy Policy & Terms of Service | Modern Fisheries',
    description: 'Official privacy policy, Google AdSense cookie disclosures, user data protection guidelines, and technical aquaculture disclaimers for Modern Fisheries.', // 152 chars
    keywords: 'privacy policy, adsense disclosures, cookie policy, modern fisheries privacy',
    h1: 'Privacy Policy & Terms of Service',
    bodyText: 'Our privacy commitment, data protection guidelines, technical disclaimers, and Google AdSense cookie compliance statements.',
    changefreq: 'yearly',
    priority: '0.3',
    isPrimary: true
  }
];

// Function to generate customized HTML string for a page
function renderCustomPageHtml(baseHtml, meta) {
  let html = baseHtml;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/s, `<title>${escapeHtml(meta.title)}</title>`);

  // Replace Description
  if (html.includes('<meta name="description"')) {
    html = html.replace(/<meta name="description" content=".*?" \/>/s, `<meta name="description" content="${escapeHtml(meta.description)}" />`);
  } else {
    html = html.replace('</head>', `  <meta name="description" content="${escapeHtml(meta.description)}" />\n</head>`);
  }

  // Replace Keywords
  if (html.includes('<meta name="keywords"')) {
    html = html.replace(/<meta name="keywords" content=".*?" \/>/s, `<meta name="keywords" content="${escapeHtml(meta.keywords)}" />`);
  } else {
    html = html.replace('</head>', `  <meta name="keywords" content="${escapeHtml(meta.keywords)}" />\n</head>`);
  }

  // Replace Canonical URL
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(/<link rel="canonical" href=".*?" \/>/s, `<link rel="canonical" href="${meta.canonical}" />`);
  } else {
    html = html.replace('</head>', `  <link rel="canonical" href="${meta.canonical}" />\n</head>`);
  }

  // Replace Open Graph Tags
  if (html.includes('<meta property="og:title"')) {
    html = html.replace(/<meta property="og:title" content=".*?" \/>/s, `<meta property="og:title" content="${escapeHtml(meta.title)}" />`);
  }
  if (html.includes('<meta property="og:description"')) {
    html = html.replace(/<meta property="og:description" content=".*?" \/>/s, `<meta property="og:description" content="${escapeHtml(meta.description)}" />`);
  }
  if (html.includes('<meta property="og:url"')) {
    html = html.replace(/<meta property="og:url" content=".*?" \/>/s, `<meta property="og:url" content="${meta.canonical}" />`);
  } else {
    html = html.replace('</head>', `  <meta property="og:url" content="${meta.canonical}" />\n</head>`);
  }

  // Route-specific structured data customization to eliminate duplicate signals
  if (meta.path === '/calculators') {
    const calculatorSchema = `<!-- Schema.org WebApplication & Custom FAQPage for Calculators -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Modern Fisheries Precision Aquaculture Calculators",
        "url": "https://modernfisheriese.com/calculators",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "description": "Free online precision aquaculture calculators for commercial fish farm managers. Compute FCR, Biofloc C:N molasses dosing, tank volume, safe stocking density, and feed requirements.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        }
      }
    </script>
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How frequently should I sample fish to recalibrate daily feed quantities?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Sample 30 to 50 individual fish at 10-day intervals to compute Average Body Weight (ABW). Multiply ABW by estimated total surviving population to determine active biomass, then apply the corresponding feeding rate percentage (typically 2.5% to 3.5% of biomass for juvenile tilapia)."
            }
          },
          {
            "@type": "Question",
            "name": "What happens if I over-dose molasses in a Biofloc tank?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Excess carbon drives an uncontrolled bacterial population explosion. The bacteria consume excessive dissolved oxygen, causing rapid DO crashes and suffocating the fish. In addition, water turbidity spikes and high CO2 levels depress pH. Always monitor floc volume in an Imhoff cone and halt carbon dosing if floc volume exceeds 35-40 mL/L."
            }
          },
          {
            "@type": "Question",
            "name": "How do I convert Parts Per Million (PPM) into grams for tank dosing?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Since 1 PPM is equivalent to 1 milligram per litre (mg/L), and 1 cubic meter contains 1,000 litres, 1 PPM equals exactly 1 gram per cubic meter of water (1 g/m³). Multiply your target PPM by your total tank water volume in cubic meters to obtain the exact grams needed."
            }
          }
        ]
      }
    </script>`;
    html = html.replace(/<!-- Schema\.org FAQPage Structured Data -->[\s\S]*?<\/script>/s, calculatorSchema);
  }

  if (meta.path === '/equipment-finder') {
    const equipmentSchema = `<!-- Schema.org WebApplication & Custom FAQPage for Equipment Finder -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": "Modern Fisheries Commercial Aquaculture Equipment Sizing Guide & Inquiry Desk",
        "url": "https://modernfisheriese.com/equipment-finder",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "All",
        "browserRequirements": "Requires JavaScript. Requires HTML5.",
        "description": "Comprehensive engineering directory and sizing calculator for Biofloc, RAS, and pond aquaculture machinery in India. Inquire specifications directly via WhatsApp and Email.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "INR"
        }
      }
    </script>
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What equipment do I need for a 10,000 liter Biofloc fish tank?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A 10,000-liter (10 m³) commercial Biofloc tank requires: (1) High-pressure Roots air blower or diaphragm pump delivering 250–350 LPM at ≥140 mbar, (2) 16mm micro-pore aeration diffuser rings, (3) Optical DO meter for monitoring dissolved oxygen above 5.0 mg/L, (4) Commercial tarpaulin circular tank (550–650 GSM PVC/HDPE with GI mesh frame), (5) Imhoff cone for floc volume tracking (15–25 mL/L target), and (6) Emergency generator backup with an ATS switch."
            }
          },
          {
            "@type": "Question",
            "name": "What is the typical price range and cost of aquaculture equipment in India?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Commercial equipment prices in India vary by capacity and motor specification: (1) Twin-Lobe Roots Blowers (1.5 HP to 3 HP): ₹24,000 – ₹58,000, (2) Rotary Drum Filters (20 m³/hr to 60 m³/hr capacity): ₹95,000 – ₹2,40,000, (3) 1 HP to 2 HP 4-Paddle Wheel Aerators: ₹18,000 – ₹32,000, (4) Optical Dissolved Oxygen (DO) Meters: ₹35,000 – ₹65,000, (5) Circular Tarpaulin Tanks (10,000L to 30,000L): ₹12,000 – ₹35,000, and (6) Submersible Solids-Handling Sludge Pumps: ₹8,500 – ₹22,000."
            }
          },
          {
            "@type": "Question",
            "name": "How do I calculate air blower size (CFM & LPM) for Biofloc aeration?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "In intensive Biofloc systems, heterotrophic bacteria and fish create massive continuous biological oxygen demand (BOD). The engineering standard is 25 to 35 Litres Per Minute (LPM) of air per cubic meter (m³) of water. For example, a 60 m³ system requires: 60 m³ × 30 LPM = 1,800 LPM. To convert LPM to CFM (Cubic Feet per Minute), divide by 28.317: 1,800 LPM ÷ 28.317 ≈ 63.6 CFM."
            }
          },
          {
            "@type": "Question",
            "name": "Why do ring blowers fail in deep fish tanks and what is the alternative?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Ring blowers (regenerative blowers) are designed to move high volumes of air at low static head pressure (typically <80–100 mbar). When submerged diffusers are placed at 1.2m to 1.5m water depth, the hydrostatic water column pushes back with 120–150 mbar of head pressure. This forces the ring blower into stall mode, causing the motor coils to overheat and trip the thermal breaker. The correct engineering solution is a positive-displacement Twin-Lobe Roots Blower, which maintains constant volumetric displacement regardless of water depth."
            }
          },
          {
            "@type": "Question",
            "name": "What micron rating is required for an automatic drum filter in RAS?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For Recirculating Aquaculture Systems (RAS), micro-screen drum filters must use a 40 to 60 micron mesh (316L stainless steel or woven polyester). A mesh coarser than 70–80 microns allows intact fecal pellets to degrade into dissolved toxic ammonia (TAN). Conversely, a mesh finer than 30 microns blinds within minutes, triggering non-stop backwashing and wasting system water."
            }
          },
          {
            "@type": "Question",
            "name": "How many paddle wheel aerators do I need per acre of earthen pond?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The standard rule of thumb for semi-intensive fish and shrimp farming is 1.0 HP of paddle wheel aeration for every 1,000 kg of target harvest biomass. For a pond with a harvest target of 4,000 kg per acre, deploy four 1.0 HP units or two 2.0 HP units. Position aerators in opposing corners to create a circular water current that concentrates pond sediment in the center drain."
            }
          },
          {
            "@type": "Question",
            "name": "Can commercial aquaculture machinery run on domestic single-phase electricity in India?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Small-scale equipment up to 1.5 HP (such as small blowers, mini aeration pumps, and dosing units) can run on 220V single-phase power. However, commercial 2.0 HP+ Roots blowers, industrial drum filters, and large circulation pumps require 415V 3-phase industrial power to prevent excessive starting current draws and voltage drops. If 3-phase is unavailable at your site, you must install a single-phase to 3-phase Variable Frequency Drive (VFD)."
            }
          },
          {
            "@type": "Question",
            "name": "What fish processing and handling machinery is required for commercial fish harvesting?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A commercial aquaculture harvest line requires: (1) Knotless seine nets and live fish transfer pumps (4-inch to 6-inch non-clog vortex or vacuum) to move fish without scale loss, (2) Stainless steel (SS304) live fish grading boxes to sort fingerlings or market biomass by size, (3) Rotary fish descaling machines capable of scaling 25–30 kg per 3-minute batch, (4) Food-grade SS304 filleting and evisceration tables with overhead washdown nozzles, and (5) Commercial flake ice machines (1 to 3 tons/day) maintaining a 1:1 ice-to-fish rapid chilling ratio for cold chain transport."
            }
          },
          {
            "@type": "Question",
            "name": "How does a pond bottom sludge cleaner work in earthen fish ponds?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A submersible pond bottom sludge cleaner utilizes a heavy-duty slurry pump fitted with a tungsten-carbide vortex cutter impeller. Guided along the pond floor via floating pontoons or telescopic booms, it vacuums accumulated black anaerobic muck (decaying feed and fecal waste) and pumps it out through a 3-inch discharge hose to exterior drying beds. This clears toxic hydrogen sulfide (H2S) deposits without draining the pond or halting fish growth."
            }
          },
          {
            "@type": "Question",
            "name": "What is an all-in-one compact indoor RAS skid and what tank volume does it support?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "An all-in-one indoor RAS skid is a factory pre-engineered, plug-and-play water treatment station combining a 50-micron automatic rotary drum filter, an aerated moving bed biofilm reactor (MBBR) filled with K1 virgin media, a counter-current protein skimmer, an inline amalgam UV-C sterilizer, and a high-flow circulation pump on a single structural base. Modular skids typically support culture volumes between 10 m³ and 60 m³ with zero on-site piping errors."
            }
          },
          {
            "@type": "Question",
            "name": "How do live fish transfer pumps move fish without mortality or scale damage?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Modern fish transfer pumps utilize recessed vortex impellers or dual-chamber vacuum suction tanks where live fish are suspended in a continuous water stream (typically 3 parts water to 1 part fish). Because fish never touch moving mechanical impeller blades directly, scale mucus membranes remain intact, eliminating transit abrasions and stress-induced bacterial ulcers during grading or harvest loading."
            }
          }
        ]
      }
    </script>`;
    html = html.replace(/<!-- Schema\.org FAQPage Structured Data -->[\s\S]*?<\/script>/s, equipmentSchema);
  }

  if (meta.path === '/fish-diseases') {
    const diseasesSchema = `<!-- Schema.org MedicalWebPage & Custom FAQPage for Fish Diseases -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        "name": "Freshwater Fish Disease Diagnosis & Veterinary Treatment Handbook",
        "url": "https://modernfisheriese.com/fish-diseases",
        "description": "Comprehensive diagnostic handbook and immersion bath treatment guide for freshwater fish pathogens including Ich, Bacterial Gill Rot, EUS, Saprolegnia, Dropsy, and Argulus.",
        "about": [
          "Fish Pathology",
          "Aquaculture Veterinary Medicine",
          "Fish Disease Treatment",
          "Biosecurity Protocols"
        ],
        "publisher": {
          "@type": "Organization",
          "name": "Modern Fisheries Health Desk",
          "url": "https://modernfisheriese.com/"
        }
      }
    </script>
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What are the earliest warning signs of disease in commercial fish tanks?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The earliest behavioral indicator is sudden feed refusal or reduction in feeding vigor. Other subtle signs include fish grouping near water inlets or aeration stones (piping for air), flashing against tank walls, clamped dorsal and pectoral fins, excess body mucus, and erratic solitary swimming away from the main school."
            }
          },
          {
            "@type": "Question",
            "name": "How do I safely calculate Potassium Permanganate (KMnO4) bath dosages?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Calculate exact tank volume in cubic meters. Apply 2.0 to 4.0 grams of KMnO4 per cubic meter (1 m³ = 1,000 Litres). Pre-dissolve KMnO4 crystals completely in a bucket of warm water before broadcasting evenly across the pond surface. Ensure the water retains a wine-red or pinkish hue for at least 4 hours. If it turns muddy brown within 30 minutes, organic matter has neutralized the chemical."
            }
          },
          {
            "@type": "Question",
            "name": "How can I differentiate between Bacterial Gill Rot and sub-lethal hypoxia?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "In sub-lethal hypoxia (low dissolved oxygen), all fish gasp at the surface simultaneously during dawn, but their gill filaments appear cherry-red and intact. In Bacterial Gill Rot (Columnaris), individual fish show localized white or yellowish necrotic patches, ragged ragged filaments covered in grey mucus, and continue gasping even when dissolved oxygen levels are elevated above 6.0 mg/L."
            }
          },
          {
            "@type": "Question",
            "name": "Why do common salt baths work effectively against freshwater fish parasites?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Freshwater fish and protozoan parasites maintain internal body osmolarity around 9 to 10 ppt. When placed in a 20 to 30 ppt (2–3%) salt bath, rapid osmotic shock draws water out of microscopic single-celled parasites (Ich, Costia, Trichodina), causing them to collapse and detach. Freshwater fish tolerate this osmotic shift for 10–15 minutes while shedding compromised skin mucus."
            }
          },
          {
            "@type": "Question",
            "name": "What biosecurity measures prevent introducing pathogens into high-density RAS or Biofloc systems?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Strict biosecurity requires: 1) Sourcing certified disease-free (SPF) fingerlings, 2) Maintaining dedicated nets and buckets per tank, sanitized in 200 ppm chlorine between uses, 3) Implementing a 14-day quarantine tank routine for all new stock, 4) Operating inline germicidal UV-C sterilizers at >30 mJ/cm², and 5) Maintaining disinfectant footwear footbaths at farm entry points."
            }
          }
        ]
      }
    </script>`;
    html = html.replace(/<!-- Schema\.org FAQPage Structured Data -->[\s\S]*?<\/script>/s, diseasesSchema);
  }

  if (meta.path === '/aquaponic') {
    const rasSchema = `<!-- Schema.org TechArticle & Custom FAQPage for RAS & Aquaponics -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": "Recirculating Aquaculture System (RAS) Machinery Specifications & Aquaponics Engineering",
        "url": "https://modernfisheriese.com/aquaponic",
        "description": "Commercial engineering blueprint for industrial indoor RAS and decoupled aquaponics. Sizing automated rotary drum filters, MBBR biofilters, pure oxygen Speece cones, and UV sterilizers.",
        "author": {
          "@type": "Organization",
          "name": "Modern Fisheries Engineering Desk"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Modern Fisheries",
          "url": "https://modernfisheriese.com/"
        }
      }
    </script>
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a Recirculating Aquaculture System (RAS) and how does it integrate with aquaponics?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "RAS is a closed-loop land-based aquaculture engineering system that recycles 90% to 99% of culture water by cycling it through mechanical solids removal (drum filters), biological nitrification (MBBR), CO2 degassing, and UV sterilization. In commercial decoupled aquaponics, nutrient-rich solids and nitrate effluent from the RAS are mineralized and delivered to hydroponic plant beds to produce both fish and organic vegetables."
            }
          },
          {
            "@type": "Question",
            "name": "How do I size an automatic rotary drum filter for an indoor RAS setup?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Drum filters are sized based on total hourly hydraulic flow rate and peak suspended solids load. The drum filter's rated hydraulic throughput must match 100% to 150% of the entire farm water volume per hour, using a 40 to 60 micron stainless steel 316L woven screen mesh to capture intact fecal pellets before they dissolve into ammonia."
            }
          },
          {
            "@type": "Question",
            "name": "What volume of K1 / MBBR biofilter media is required per kilogram of feed fed daily?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For commercial 32% protein extruded fish feed, every 1.0 kg of daily feed generates approximately 30 grams of Total Ammonia Nitrogen (TAN). At a biological conversion rate of 0.55 g TAN/m²/day on virgin HDPE K1 media (800 m²/m³ protected surface area), each kilogram of feed requires approximately 75 to 90 litres of fluidized K1 media."
            }
          },
          {
            "@type": "Question",
            "name": "Why are Speece oxygen cones and pure oxygen systems necessary in high-density RAS?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Atmospheric air contains only 21% oxygen, which limits DO saturation to ~8 mg/L at 28°C. In high-density culture (>60 kg/m³), biological oxygen demand quickly exceeds atmospheric transfer rates. Speece cones dissolve 95%+ pure O2 at 1.5–2.0 bar pressure, supersaturating sidestream water up to 30–45 mg/L to maintain tank DO safely above 6.0 mg/L."
            }
          },
          {
            "@type": "Question",
            "name": "What UV-C germicidal dosage is needed to eliminate fish pathogens in recirculation loops?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Commercial RAS requires a minimum germicidal UV-C radiation dosage of 30 to 45 mJ/cm² (30,000 to 45,000 µW·s/cm²) at 254 nm wavelength at end-of-lamp-life (EOLL) under 85% UV transmittance. This destroys viral pathogens, Aeromonas bacteria, and free-swimming parasite tomites."
            }
          }
        ]
      }
    </script>`;
    html = html.replace(/<!-- Schema\.org FAQPage Structured Data -->[\s\S]*?<\/script>/s, rasSchema);
  }

  // Remove homepage Periodical structured data from non-root pages to eliminate duplicate cross-page signals
  if (meta.path !== '/') {
    html = html.replace(/<!-- Schema\.org Periodical \/ Academic Journal Structured Data -->[\s\S]*?<\/script>\s*/s, '');
  }

  // Pre-render rich semantic HTML inside <div id="root">
  if (meta.path !== '/') {
    const mainBody = RICH_PAGE_BODIES[meta.path] || `
      <article style="max-width:1000px;margin:0 auto;color:#1e293b;line-height:1.75;font-size:16px;">
        <header style="margin-bottom:28px;">
          <h1 style="font-size:30px;font-weight:800;color:#0f172a;margin-bottom:16px;letter-spacing:-0.5px;">${escapeHtml(meta.h1 || meta.title)}</h1>
          <p style="font-size:17px;color:#334155;margin-bottom:24px;line-height:1.7;">${escapeHtml(meta.bodyText || meta.description)}</p>
        </header>
        <div style="background:#f8fafc;border:1px solid #e2e8f0;padding:24px;border-radius:10px;margin-bottom:28px;">
          <h2 style="font-size:20px;font-weight:700;color:#0369a1;margin:0 0 8px 0;">Aquaculture Operations &amp; Technical Support</h2>
          <p style="font-size:15px;color:#475569;margin:0 0 12px 0;">Explore Modern Fisheries turnkey consultancy, commercial floating feed supply, certified fingerling stocking, and online calculation tools.</p>
          <a href="/ourservices" style="color:#0284c7;font-weight:600;text-decoration:none;">View All Services &amp; Consultation &rarr;</a>
        </div>
      </article>
    `;

    const rootContent = `
    <div id="root">
      <div style="max-width:1200px;margin:0 auto;padding:32px 20px;font-family:system-ui,-apple-system,sans-serif;color:#1e293b;line-height:1.6;">
        <header style="border-bottom:2px solid #e2e8f0;padding-bottom:16px;margin-bottom:28px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
          <a href="/" style="text-decoration:none;"><span style="font-size:24px;font-weight:800;color:#0f172a;">Modern Fisheries</span></a>
          <nav style="display:flex;gap:10px;flex-wrap:wrap;font-size:14px;font-weight:600;">
            <a href="/" style="color:#0284c7;text-decoration:none;">Home</a>
            <a href="/aquaponics-farming" style="color:#0284c7;text-decoration:none;">Aquaponics</a>
            <a href="/bioflock" style="color:#0284c7;text-decoration:none;">Biofloc</a>
            <a href="/aquaponic" style="color:#0284c7;text-decoration:none;">RAS</a>
            <a href="/pond-farming" style="color:#0284c7;text-decoration:none;">Pond</a>
            <a href="/fish-diseases" style="color:#0284c7;text-decoration:none;">Diseases</a>
            <a href="/feeding-management" style="color:#0284c7;text-decoration:none;">Feeding</a>
            <a href="/equipment-finder" style="color:#0284c7;text-decoration:none;">Equipment</a>
            <a href="/calculators" style="color:#0284c7;text-decoration:none;">Calculators</a>
            <a href="/ourservices" style="color:#0284c7;text-decoration:none;">Services</a>
          </nav>
        </header>
        <main>
          ${mainBody}
        </main>
        <footer style="border-top:1px solid #e2e8f0;padding-top:20px;margin-top:32px;color:#64748b;font-size:14px;">
          Modern Fisheries &copy; 2026 Turnkey Aquaculture Portal. WhatsApp &amp; Engineering Support: +91 97489 52342
        </footer>
      </div>
    </div>`.trim();

    const rootStart = html.indexOf('<div id="root">');
    let scriptStart = html.indexOf('<!-- Application Script Entry Point -->');
    if (scriptStart === -1) {
      scriptStart = html.indexOf('<script type="module"');
    }
    if (scriptStart === -1) {
      scriptStart = html.indexOf('</body>');
    }
    if (rootStart !== -1 && scriptStart !== -1 && scriptStart > rootStart) {
      html = html.slice(0, rootStart) + rootContent + '\n\n    ' + html.slice(scriptStart);
    } else {
      html = html.replace(/<div id="root">[\s\S]*?<\/div>(\s*<!-- Application Script Entry Point -->)?\s*<script[^>]*><\/script>/s, `${rootContent}\n\n    <script type="module" src="/src/main.tsx"></script>`);
    }
  }

  return html;
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Helper to format title to exact 50-60 character length window for optimal SEO
function formatSeoTitle(baseTitle, categorySuffix = 'Modern Fisheries') {
  let fullTitle = `${baseTitle} | ${categorySuffix}`;
  if (fullTitle.length >= 50 && fullTitle.length <= 60) {
    return fullTitle;
  }
  if (fullTitle.length < 50) {
    fullTitle = `${baseTitle} Video Guide | ${categorySuffix}`;
    if (fullTitle.length < 50) {
      fullTitle = `${baseTitle} Aquaculture Tutorial | ${categorySuffix}`;
    }
  }
  if (fullTitle.length > 60) {
    const maxBaseLen = 60 - categorySuffix.length - 3;
    let trimmed = baseTitle.slice(0, maxBaseLen);
    const lastSpace = trimmed.lastIndexOf(' ');
    if (lastSpace > 20) {
      trimmed = trimmed.slice(0, lastSpace);
    }
    fullTitle = `${trimmed} | ${categorySuffix}`;
  }
  return fullTitle;
}

// Helper to format description to exact 150-160 character length window for optimal SEO
function formatSeoDescription(desc, suffix = 'Watch expert aquaculture video tutorials & guides by Modern Fisheries.') {
  let text = (desc || '').trim().replace(/\s+/g, ' ');
  if (!text) {
    return 'Watch high-definition aquaculture video tutorials on RAS design, Biofloc systems, Aquaponics, fish health, and feeding strategies by Modern Fisheries.';
  }

  if (text.length >= 150 && text.length <= 160) {
    return text;
  }

  if (text.length > 160) {
    let truncated = text.slice(0, 154);
    const lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > 110) {
      truncated = truncated.slice(0, lastSpace);
    }
    return truncated.trim() + '...';
  }

  let combined = `${text} ${suffix}`;
  if (combined.length >= 150 && combined.length <= 160) {
    return combined;
  }

  if (combined.length > 160) {
    let truncated = combined.slice(0, 154);
    const lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > 110) {
      truncated = truncated.slice(0, lastSpace);
    }
    return truncated.trim() + '...';
  }

  const paddingSuffix = ' Learn complete fish culture methods and farm management at Modern Fisheries.';
  combined = `${text}${paddingSuffix}`;
  if (combined.length > 160) {
    let truncated = combined.slice(0, 154);
    const lastSpace = truncated.lastIndexOf(' ');
    if (lastSpace > 110) {
      truncated = truncated.slice(0, lastSpace);
    }
    return truncated.trim() + '...';
  }

  return combined.padEnd(152, '.');
}

// Function to generate HTTP 410 Gone HTML for permanently removed legacy alias routes
function render410PageHtml(removedPath) {
  const cleanPath = removedPath.replace(/^\//, '');
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>410 Gone | Resource Permanently Removed - Modern Fisheries</title>
    <meta name="robots" content="noindex, follow" />
    <meta name="googlebot" content="noindex, follow" />
    <meta name="prerender-status-code" content="410" />
    <meta name="description" content="The requested legacy resource has been permanently removed and decommissioned at Modern Fisheries." />
    <style>
      body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; color: #1e293b; margin: 0; padding: 40px 20px; display: flex; align-items: center; justify-content: center; min-height: 80vh; }
      .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; max-width: 540px; width: 100%; padding: 36px 28px; text-align: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
      .badge { display: inline-block; background: #fee2e2; color: #b91c1c; font-weight: 700; font-size: 13px; padding: 4px 12px; border-radius: 9999px; margin-bottom: 14px; text-transform: uppercase; }
      h1 { font-size: 22px; font-weight: 800; color: #0f172a; margin: 0 0 12px 0; }
      p { font-size: 15px; color: #475569; line-height: 1.6; margin: 0 0 24px 0; }
      .links { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
      .btn { display: inline-block; background: #059669; color: #fff; text-decoration: none; font-weight: 600; padding: 10px 18px; border-radius: 8px; font-size: 14px; }
      .btn-outline { display: inline-block; background: #f1f5f9; color: #334155; text-decoration: none; font-weight: 600; padding: 10px 18px; border-radius: 8px; font-size: 14px; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="badge">HTTP 410 Gone</div>
      <h1>Resource Permanently Removed</h1>
      <p>The requested URL (<code>/${escapeHtml(cleanPath)}</code>) has been permanently removed and decommissioned. Explore our official aquaculture guides and calculation tools below.</p>
      <div class="links">
        <a href="/" class="btn">Modern Fisheries Home</a>
        <a href="/pond-farming" class="btn-outline">Pond Limnology</a>
        <a href="/calculators" class="btn-outline">Calculators</a>
      </div>
    </div>
  </body>
</html>`;
}

// 1. Generate 404.html and /404/index.html for static host & SPA fallback with explicit noindex and 404 signals
const notFoundMeta = {
  path: '/404',
  canonical: `${BASE_URL}/404`,
  title: '404 - Page Not Found | Modern Fisheries',
  description: 'The requested aquaculture guide, PDF, or tool could not be found on Modern Fisheries. Explore our updated RAS guides, Biofloc systems, and calculators.',
  keywords: '404 not found, modern fisheries, aquaculture guides, fish farming tools',
  h1: '404 - Page Not Found',
  bodyText: 'The requested URL does not exist or has been permanently moved. Please use our navigation below to find commercial aquaculture calculators, RAS guides, and services.'
};
let custom404Html = renderCustomPageHtml(baseIndexHtml, notFoundMeta);
// Add noindex and prerender status code
if (!custom404Html.includes('<meta name="robots"')) {
  custom404Html = custom404Html.replace('</head>', '  <meta name="robots" content="noindex, follow" />\n  <meta name="googlebot" content="noindex, follow" />\n  <meta name="prerender-status-code" content="404" />\n</head>');
} else {
  custom404Html = custom404Html.replace(/<meta name="robots".*?\/>/s, '<meta name="robots" content="noindex, follow" />\n  <meta name="googlebot" content="noindex, follow" />\n  <meta name="prerender-status-code" content="404" />');
}
fs.writeFileSync(path.join(distDir, '404.html'), custom404Html);
const notFoundDir = path.join(distDir, '404');
fs.mkdirSync(notFoundDir, { recursive: true });
fs.writeFileSync(path.join(notFoundDir, 'index.html'), custom404Html);
console.log('✓ Generated dist/404.html & dist/404/index.html with noindex & 404 signals');

// 2. Generate static HTML folders for all main pages & aliases
const sitemapUrls = [];

PAGE_METADATA.forEach((page) => {
  // Primary route
  if (page.path === '/') {
    // Overwrite dist/index.html with root SEO metadata
    const customRootHtml = renderCustomPageHtml(baseIndexHtml, page);
    fs.writeFileSync(indexPath, customRootHtml);
  } else {
    const routeName = page.path.replace(/^\//, '');
    const routeDir = path.join(distDir, routeName);
    fs.mkdirSync(routeDir, { recursive: true });

    const customHtml = renderCustomPageHtml(baseIndexHtml, page);
    fs.writeFileSync(path.join(routeDir, 'index.html'), customHtml);
    // Standalone .html for direct 200 OK without trailing-slash redirects
    fs.writeFileSync(path.join(distDir, `${routeName}.html`), customHtml);
    console.log(`✓ Generated primary static route: dist/${routeName}/index.html & dist/${routeName}.html`);
  }

  // Add primary page URL to sitemap
  sitemapUrls.push({
    url: page.canonical,
    changefreq: page.changefreq,
    priority: page.priority
  });
});

// 2.5 Generate static 410 Gone HTML files for decommissioned legacy alias routes
// Clean up any legacy alias directories to eliminate directory trailing-slash redirects
const DEPRECATED_LEGACY_ROUTES = [
  'pond',
  'home',
  'videos',
  'biofloc',
  'hydroponics',
  'feed',
  'diseases',
  'ras',
  'aquaponics',
  'calculator',
  'services',
  'about',
  'privacy'
];

DEPRECATED_LEGACY_ROUTES.forEach((legacyRoute) => {
  // Remove legacy directory if it exists to eliminate directoryslash redirects
  const legacyDir = path.join(distDir, legacyRoute);
  if (fs.existsSync(legacyDir)) {
    fs.rmSync(legacyDir, { recursive: true, force: true });
    console.log(`✓ Cleaned up deprecated directory: dist/${legacyRoute}`);
  }
  // Write static 410 HTML file
  const html410 = render410PageHtml(`/${legacyRoute}`);
  fs.writeFileSync(path.join(distDir, `${legacyRoute}.html`), html410);
  console.log(`✓ Generated 410 Gone response: dist/${legacyRoute}.html`);
});

// Also write dist/410.html and dist/410/index.html
const generic410Html = render410PageHtml('/resource');
fs.writeFileSync(path.join(distDir, '410.html'), generic410Html);
const dist410Dir = path.join(distDir, '410');
fs.mkdirSync(dist410Dir, { recursive: true });
fs.writeFileSync(path.join(dist410Dir, 'index.html'), generic410Html);

// 3. Generate static HTML files for video pages (full physical pages for all routes)
const videoBaseDir = path.join(distDir, 'video');
fs.mkdirSync(videoBaseDir, { recursive: true });

videos.forEach((v) => {
  const slug = createSlug(v.title);
  const fullSlugRoute = `video/${slug}-${v.id}`;
  const shortRoute = `video/${v.id}`;
  const videoCanonical = `${BASE_URL}/${fullSlugRoute}`;

  const videoMeta = {
    title: formatSeoTitle(v.title, 'Modern Fisheries'),
    description: formatSeoDescription(v.description),
    keywords: `${v.category}, aquaculture video, fish farming tutorial, modern fisheries`,
    canonical: videoCanonical,
    h1: v.title,
    bodyText: v.description
  };

  // Primary full slug video page: both .html and /index.html so trailing slash also serves physical page directly
  const customVideoHtml = renderCustomPageHtml(baseIndexHtml, videoMeta);
  fs.writeFileSync(path.join(distDir, `${fullSlugRoute}.html`), customVideoHtml);
  const fullSlugDir = path.join(distDir, fullSlugRoute);
  fs.mkdirSync(fullSlugDir, { recursive: true });
  fs.writeFileSync(path.join(fullSlugDir, 'index.html'), customVideoHtml);

  // Short ID physical page: both .html and /index.html with canonical pointing to primary slug URL
  fs.writeFileSync(path.join(distDir, `${shortRoute}.html`), customVideoHtml);
  const shortDir = path.join(distDir, shortRoute);
  fs.mkdirSync(shortDir, { recursive: true });
  fs.writeFileSync(path.join(shortDir, 'index.html'), customVideoHtml);

  sitemapUrls.push({
    url: videoCanonical,
    changefreq: 'weekly',
    priority: '0.8'
  });

  console.log(`✓ Generated physical video routes: dist/${fullSlugRoute}.html, dist/${fullSlugRoute}/index.html, dist/${shortRoute}.html, dist/${shortRoute}/index.html`);
});

// 3.5 Generate static HTML routes and Product schema for all 24 individual equipment items
const equipmentBaseDir = path.join(distDir, 'equipment');
fs.mkdirSync(equipmentBaseDir, { recursive: true });

equipmentList.forEach((eq) => {
  const eqRoute = `equipment/${eq.slug}`;
  const eqCanonical = `${BASE_URL}/${eqRoute}`;

  let eqTitle = `${eq.name} Sizing & Specifications | Modern Fisheries`;
  if (eqTitle.length < 50) {
    eqTitle = `${eq.name} Sizing & Equipment Specs | Modern Fisheries`;
  }
  if (eqTitle.length > 60) {
    eqTitle = eqTitle.slice(0, 57) + '...';
  }

  const eqDesc = formatSeoDescription(`${eq.name}: ${eq.tagline}. ${eq.purpose}`);

  const productSchema = `
  <!-- Schema.org Product Structured Data -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "${escapeHtml(eq.name)}",
    "description": "${escapeHtml(eq.tagline)}",
    "category": "${escapeHtml(eq.category)}",
    "brand": {
      "@type": "Brand",
      "name": "Modern Fisheries"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock",
      "url": "${eqCanonical}"
    }
  }
  </script>`;

  const eqBodyHtml = `
    <article style="max-width:1000px;margin:0 auto;color:#1e293b;line-height:1.75;font-size:16px;">
      <header style="margin-bottom:32px;border-bottom:1px solid #e2e8f0;padding-bottom:20px;">
        <span style="font-size:13px;font-weight:700;color:#0284c7;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:6px;">Aquaculture Machinery Catalog &bull; ${escapeHtml(eq.category.toUpperCase())}</span>
        <h1 style="font-size:32px;font-weight:800;color:#0f172a;line-height:1.25;margin:0 0 12px 0;">${escapeHtml(eq.name)}</h1>
        <p style="font-size:17px;color:#475569;margin:0;line-height:1.6;">${escapeHtml(eq.tagline)}</p>
      </header>

      <section style="margin-bottom:36px;">
        <h2 style="font-size:22px;font-weight:700;color:#0f172a;margin-bottom:12px;border-left:4px solid #0284c7;padding-left:12px;">Primary Operating Purpose</h2>
        <p style="font-size:16px;color:#334155;">${escapeHtml(eq.purpose)}</p>
      </section>

      <section style="margin-bottom:36px;">
        <h2 style="font-size:22px;font-weight:700;color:#0f172a;margin-bottom:12px;border-left:4px solid #0284c7;padding-left:12px;">Why Essential for Commercial Aquaculture</h2>
        <p style="font-size:16px;color:#334155;">${escapeHtml(eq.whyRequired)}</p>
      </section>

      <div style="background:#f8fafc;border:1px solid #cbd5e1;padding:24px;border-radius:12px;margin-bottom:36px;">
        <h3 style="font-size:18px;font-weight:700;color:#0369a1;margin:0 0 10px 0;">Technical Sizing &amp; Manufacturer Quotation</h3>
        <p style="font-size:15px;color:#475569;margin:0 0 16px 0;">Request verified pricing, single vs three-phase motor compatibility, and pan-India freight delivery timelines from Modern Fisheries Engineering Desk.</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <a href="/equipment-finder?item=${eq.slug}" style="background:#0284c7;color:#ffffff;padding:10px 20px;border-radius:6px;font-weight:700;text-decoration:none;font-size:14px;">Open Interactive Sizing Finder &rarr;</a>
          <a href="https://wa.me/919748952342?text=Hello%20Modern%20Fisheries,%20I%20am%20inquiring%20about%20${encodeURIComponent(eq.name)}%20pricing%20and%20specifications." style="background:#16a34a;color:#ffffff;padding:10px 20px;border-radius:6px;font-weight:700;text-decoration:none;font-size:14px;">WhatsApp Technical Desk &rarr;</a>
        </div>
      </div>
    </article>
  `;

  // Register in RICH_PAGE_BODIES dynamically
  RICH_PAGE_BODIES[`/${eqRoute}`] = eqBodyHtml;

  const eqMeta = {
    path: `/${eqRoute}`,
    canonical: eqCanonical,
    title: eqTitle,
    description: eqDesc,
    keywords: `${eq.name}, ${eq.category}, aquaculture equipment, fish farming machinery, modern fisheries`,
    h1: `${eq.name} - Commercial Aquaculture Equipment`,
    bodyText: `${eq.tagline} - ${eq.purpose}`
  };

  let customEqHtml = renderCustomPageHtml(baseIndexHtml, eqMeta);
  // Inject Product structured data into head
  customEqHtml = customEqHtml.replace('</head>', `${productSchema}\n</head>`);

  const eqDir = path.join(distDir, eqRoute);
  fs.mkdirSync(eqDir, { recursive: true });
  fs.writeFileSync(path.join(eqDir, 'index.html'), customEqHtml);
  fs.writeFileSync(path.join(distDir, `${eqRoute}.html`), customEqHtml);

  sitemapUrls.push({
    url: eqCanonical,
    changefreq: 'weekly',
    priority: '0.9'
  });

  console.log(`✓ Generated equipment route: dist/${eqRoute}/index.html & dist/${eqRoute}.html`);
});

// 4. Generate XML Sitemap with strict canonical filtering (no trailing slashes except root)
let sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
sitemapXml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

sitemapUrls.forEach((item) => {
  let cleanUrl = item.url.trim();
  // Strip trailing slashes from any subpage URL so trailing slash links are never crawled
  if (cleanUrl !== `${BASE_URL}/` && cleanUrl.endsWith('/')) {
    cleanUrl = cleanUrl.replace(/\/+$/, '');
  }
  sitemapXml += `  <url>\n`;
  sitemapXml += `    <loc>${cleanUrl}</loc>\n`;
  sitemapXml += `    <lastmod>${TODAY}</lastmod>\n`;
  sitemapXml += `    <changefreq>${item.changefreq}</changefreq>\n`;
  sitemapXml += `    <priority>${item.priority}</priority>\n`;
  sitemapXml += `  </url>\n`;
});

sitemapXml += `</urlset>\n`;

// Write sitemap.xml to dist and public
fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml);
fs.writeFileSync(path.resolve('public/sitemap.xml'), sitemapXml);
console.log(`✓ Generated sitemap.xml with ${sitemapUrls.length} indexed URLs in dist/sitemap.xml & public/sitemap.xml`);

// 5. Ensure robots.txt, 410.html, configs, and IndexNow key file are in dist
const filesToCopy = ['robots.txt', '410.html', '404.html', '_redirects', '.htaccess', 'vercel.json', 'web.config', '2eb92cb04ff4a9ef0c97.txt'];
filesToCopy.forEach((filename) => {
  const src = path.resolve(`public/${filename}`);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(distDir, filename));
    console.log(`✓ Copied ${filename} to dist/${filename}`);
  }
});

// 6. Generate explicit static 410 files for removed PDF and legacy documentation paths
const REMOVED_PDF_PATHS = [
  'assets/Docs/AquaponicseBook.pdf',
  'assets/docs/AquaponicseBook.pdf',
  'assets/docs/aquaponicsebook.pdf',
  'assets/Docs/Hydroponicsebook.pdf',
  'assets/docs/Hydroponicsebook.pdf',
  'assets/docs/hydroponicsebook.pdf',
  'assets/Docs/Bioflocebooks.pdf',
  'assets/docs/Bioflocebooks.pdf',
  'assets/docs/bioflocebooks.pdf',
  'assets/Docs/catfish.pdf',
  'assets/docs/catfish.pdf',
  'assets/Docs/Hydroponics_Feasibility.pdf',
  'assets/docs/Hydroponics_Feasibility.pdf',
  'assets/docs/hydroponics_feasibility.pdf',
  'assets/Docs',
  'assets/docs'
];

const html410Content = fs.existsSync(path.resolve('public/410.html')) 
  ? fs.readFileSync(path.resolve('public/410.html'), 'utf-8')
  : '<!doctype html><html><head><title>410 Gone | Resource Permanently Removed</title><meta name="robots" content="noindex, follow" /><meta name="prerender-status-code" content="410" /></head><body><h1>410 Gone - Permanently Removed</h1></body></html>';

// Write 410.html and /410/index.html
fs.writeFileSync(path.join(distDir, '410.html'), html410Content);
const gone410Dir = path.join(distDir, '410');
fs.mkdirSync(gone410Dir, { recursive: true });
fs.writeFileSync(path.join(gone410Dir, 'index.html'), html410Content);
console.log('✓ Generated dist/410.html & dist/410/index.html with 410 Gone status signals');

REMOVED_PDF_PATHS.forEach((pdfRelPath) => {
  const fullPath = path.join(distDir, pdfRelPath);
  if (pdfRelPath.endsWith('.pdf')) {
    const parentDir = path.dirname(fullPath);
    fs.mkdirSync(parentDir, { recursive: true });
    // Write 410 HTML content into the .pdf file so webservers returning the exact file deliver 410 markup
    fs.writeFileSync(fullPath, html410Content);
    fs.writeFileSync(`${fullPath}.html`, html410Content);
  } else {
    fs.mkdirSync(fullPath, { recursive: true });
    fs.writeFileSync(path.join(fullPath, 'index.html'), html410Content);
  }
  console.log(`✓ Generated static 410 Gone handler for removed path: dist/${pdfRelPath}`);
});

const INDEXNOW_KEY = 'bfeda5c9d23544d5a837a93d5fe31830';
const indexNowKeyFilename = `${INDEXNOW_KEY}.txt`;
const publicIndexNowPath = path.resolve(`public/${indexNowKeyFilename}`);
if (fs.existsSync(publicIndexNowPath)) {
  fs.copyFileSync(publicIndexNowPath, path.join(distDir, indexNowKeyFilename));
  console.log(`✓ Copied IndexNow key file (${indexNowKeyFilename}) to dist/${indexNowKeyFilename}`);
} else {
  fs.writeFileSync(path.join(distDir, indexNowKeyFilename), INDEXNOW_KEY);
  fs.writeFileSync(publicIndexNowPath, INDEXNOW_KEY);
  console.log(`✓ Created IndexNow key file (${indexNowKeyFilename}) in dist & public`);
}

console.log('✓ All static SEO routes, unique metadata, and Sitemap generation complete!');

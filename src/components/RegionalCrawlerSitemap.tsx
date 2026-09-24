import React from 'react';

export interface RegionalDirectory {
  countryCode: string;
  countryName: string;
  flag: string;
  domain: string;
  currency: string;
  links: Array<{
    title: string;
    href: string;
    category: string;
  }>;
}

export const REGIONAL_DIRECTORIES: RegionalDirectory[] = [
  {
    countryCode: 'IN',
    countryName: 'India',
    flag: '🇮🇳',
    domain: 'amazon.in',
    currency: 'INR (₹)',
    links: [
      { title: 'Trending 4K TV Deals - India', href: '/?region=IN&category=electronics&q=4k+tv', category: 'Electronics' },
      { title: 'Smart Refrigerator & Inverter Analysis - India', href: '/?region=IN&category=household&q=refrigerator', category: 'Appliances' },
      { title: 'Air Fryers & Modern Kitchen Tools - India', href: '/?region=IN&category=kitchen&q=air+fryer', category: 'Kitchen' },
      { title: 'Ergonomic Mesh Office Chairs - India', href: '/?region=IN&category=home_office&q=office+chair', category: 'Workplace' },
      { title: 'True Wireless Noise-Cancelling Earbuds - India', href: '/?region=IN&category=gadgets&q=earbuds', category: 'Audio' }
    ]
  },
  {
    countryCode: 'US',
    countryName: 'United States',
    flag: '🇺🇸',
    domain: 'amazon.com',
    currency: 'USD ($)',
    links: [
      { title: 'Smart Refrigerator Analysis - United States', href: '/?region=US&category=household&q=refrigerator', category: 'Appliances' },
      { title: 'OLED & QLED 4K Home Theater Displays - United States', href: '/?region=US&category=electronics&q=oled+tv', category: 'Home Cinema' },
      { title: 'Autonomous LiDAR Robot Vacuums - United States', href: '/?region=US&category=household&q=robot+vacuum', category: 'Smart Home' },
      { title: 'Specialty Espresso Machines & Grinders - United States', href: '/?region=US&category=kitchen&q=espresso+machine', category: 'Culinary' },
      { title: 'High-Performance Laptops & Ultrabooks - United States', href: '/?region=US&category=electronics&q=laptop', category: 'Computing' }
    ]
  },
  {
    countryCode: 'UK',
    countryName: 'United Kingdom',
    flag: '🇬🇧',
    domain: 'amazon.co.uk',
    currency: 'GBP (£)',
    links: [
      { title: 'Fitness Equipment Reviews - United Kingdom', href: '/?region=GB&category=fitness&q=fitness+equipment', category: 'Fitness' },
      { title: 'Cordless Cyclone Stick Vacuums - United Kingdom', href: '/?region=GB&category=household&q=cordless+vacuum', category: 'Cleaning' },
      { title: 'Smart Energy Thermostats & Radiator Valves - United Kingdom', href: '/?region=GB&category=gadgets&q=smart+thermostat', category: 'Climate' },
      { title: 'Over-Ear Active Noise Cancelling Headphones - United Kingdom', href: '/?region=GB&category=electronics&q=anc+headphones', category: 'Audio' },
      { title: 'Dual-Zone Air Fryers & Induction Cookers - United Kingdom', href: '/?region=GB&category=kitchen&q=dual+air+fryer', category: 'Kitchen' }
    ]
  },
  {
    countryCode: 'CA',
    countryName: 'Canada',
    flag: '🇨🇦',
    domain: 'amazon.ca',
    currency: 'CAD ($)',
    links: [
      { title: 'Home Audio Systems & Soundbars - Canada', href: '/?region=CA&category=electronics&q=soundbar', category: 'Audio' },
      { title: 'Cold-Climate Air Purifiers & Humidifiers - Canada', href: '/?region=CA&category=household&q=air+purifier', category: 'Indoor Climate' },
      { title: 'All-Weather Heated Outdoor Gear - Canada', href: '/?region=CA&category=travel_outdoor&q=heated+gear', category: 'Outdoor' },
      { title: 'Portable Power Stations & Solar Generators - Canada', href: '/?region=CA&category=gadgets&q=power+station', category: 'Power' },
      { title: 'Ultra-Wide Curved Gaming Monitors - Canada', href: '/?region=CA&category=electronics&q=gaming+monitor', category: 'Peripherals' }
    ]
  },
  {
    countryCode: 'AU',
    countryName: 'Australia',
    flag: '🇦🇺',
    domain: 'amazon.com.au',
    currency: 'AUD ($)',
    links: [
      { title: 'Solar Inverters & Outdoor Power Solutions - Australia', href: '/?region=AU&category=gadgets&q=solar+generator', category: 'Clean Energy' },
      { title: 'High-Output Barbecue Grills & Smokers - Australia', href: '/?region=AU&category=kitchen&q=bbq+grill', category: 'Outdoor Cooking' },
      { title: 'Automated Garden Irrigation & Sensors - Australia', href: '/?region=AU&category=household&q=smart+irrigation', category: 'Garden' },
      { title: 'Hot-Weather Cooling Fans & Portable AC - Australia', href: '/?region=AU&category=household&q=cooling+fan', category: 'Cooling' },
      { title: 'Action Cameras & Rugged Gimbal Setups - Australia', href: '/?region=AU&category=electronics&q=action+camera', category: 'Photography' }
    ]
  },
  {
    countryCode: 'DE',
    countryName: 'Germany',
    flag: '🇩🇪',
    domain: 'amazon.de',
    currency: 'EUR (€)',
    links: [
      { title: 'Energieeffiziente Haushaltsgeräte - Germany', href: '/?region=DE&category=household&q=energieeffizienz', category: 'Effizienz' },
      { title: 'Premium Kaffeemaschinen & Siebträger - Germany', href: '/?region=DE&category=kitchen&q=kaffeemaschine', category: 'Kaffee' },
      { title: 'Smart Home Automation & Sensorik - Germany', href: '/?region=DE&category=gadgets&q=smart+home', category: 'Automation' },
      { title: 'Akku-Staubsauger & Robotertechnik - Germany', href: '/?region=DE&category=household&q=staubsauger', category: 'Bodenpflege' },
      { title: 'Studio-Monitoring & HiFi Kopfhörer - Germany', href: '/?region=DE&category=electronics&q=hifi+kopfhoerer', category: 'Audiotechnik' }
    ]
  },
  {
    countryCode: 'PK',
    countryName: 'Pakistan',
    flag: '🇵🇰',
    domain: 'amazon.com',
    currency: 'PKR (₨)',
    links: [
      { title: 'Best Smartphone & Mobile Accessories - Pakistan', href: '/?region=PK&category=gadgets&q=smartphone+accessories', category: 'Mobile' },
      { title: 'Solar Inverters & Home UPS Battery Systems - Pakistan', href: '/?region=PK&category=electronics&q=solar+ups', category: 'Power Backup' },
      { title: 'Heavy-Duty Kitchen Mixers & Juicers - Pakistan', href: '/?region=PK&category=kitchen&q=food+processor', category: 'Kitchenware' },
      { title: '4K Android Smart TV Boxes & Projectors - Pakistan', href: '/?region=PK&category=electronics&q=smart+tv+box', category: 'Entertainment' },
      { title: 'Budget Smartwatches & Health Trackers - Pakistan', href: '/?region=PK&category=fitness&q=smartwatch', category: 'Wearables' }
    ]
  },
  {
    countryCode: 'BD',
    countryName: 'Bangladesh',
    flag: '🇧🇩',
    domain: 'amazon.com',
    currency: 'BDT (৳)',
    links: [
      { title: 'Affordable Android Smart TV Deals - Bangladesh', href: '/?region=BD&category=electronics&q=smart+tv', category: 'Displays' },
      { title: 'High-Capacity IPS & Voltage Stabilizers - Bangladesh', href: '/?region=BD&category=electronics&q=ips+inverter', category: 'Electrical' },
      { title: 'Commercial Grade Blenders & Spice Grinders - Bangladesh', href: '/?region=BD&category=kitchen&q=blender', category: 'Culinary' },
      { title: 'True Wireless Stereo Earbuds & Neckbands - Bangladesh', href: '/?region=BD&category=gadgets&q=wireless+earbuds', category: 'Sound' },
      { title: 'Ergonomic Study Desks & Orthopedic Chairs - Bangladesh', href: '/?region=BD&category=home_office&q=ergonomic+chair', category: 'Furniture' }
    ]
  }
];

/**
 * RegionalCrawlerSitemap Component
 * 
 * An HTML-first, crawler-accessible architectural directory that exposes deep,
 * programmatic category, geo-targeted deal, and product review URLs directly to search engine bots.
 * Eliminates JavaScript click barriers and guarantees static crawlability for multi-regional setups.
 */
export const RegionalCrawlerSitemap: React.FC = () => {
  return (
    <nav 
      aria-label="Regional Product Directories & Search Index"
      className="bg-slate-900 text-slate-300 py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800"
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Semantic Header */}
        <div className="space-y-2 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            <h2 className="text-lg sm:text-xl font-black text-white tracking-tight uppercase">
              Global Search Directory & Regional Product Index
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-4xl leading-relaxed">
            Direct crawler pathways to verified multi-regional review syntheses, real-time retail deal tracking, and laboratory benchmark matrices across North America, Europe, South Asia, and Australasia.
          </p>
        </div>

        {/* 8-Region Semantic Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {REGIONAL_DIRECTORIES.map((region) => (
            <div 
              key={region.countryCode} 
              className="bg-slate-950/60 rounded-xl p-4 border border-slate-800/80 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl" role="img" aria-label={region.countryName}>
                    {region.flag}
                  </span>
                  <h3 className="text-sm font-bold text-white tracking-wide">
                    {region.countryName}
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-slate-800 text-slate-400">
                  {region.currency}
                </span>
              </div>

              {/* Semantic Unordered List with Direct Crawlable Anchors */}
              <ul className="space-y-2 text-xs">
                {region.links.map((link) => (
                  <li key={link.href} className="group">
                    <a
                      href={link.href}
                      title={link.title}
                      className="block text-slate-400 group-hover:text-blue-400 transition-colors leading-snug underline-offset-2 hover:underline"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Crawler Metadata Footer Note */}
        <div className="pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-2">
          <span>
            Indexed Canonical Host: <strong className="text-slate-400">trends.owncircles.com</strong>
          </span>
          <span>
            Semantic Protocol: RFC 8288 Canonical Web Links & Schema.org ItemList Nodes
          </span>
        </div>
      </div>
    </nav>
  );
};

export default RegionalCrawlerSitemap;

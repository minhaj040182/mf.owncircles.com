// scripts/page-rich-content.js
// Authoritative, comprehensive semantic HTML content for pre-rendered pages to ensure complete Google indexing and eliminate thin content issues.

export const RICH_PAGE_BODIES = {
  '/bioflock': `
    <article style="max-width:1000px;margin:0 auto;color:#1e293b;line-height:1.75;font-size:16px;">
      <header style="margin-bottom:36px;border-bottom:1px solid #e2e8f0;padding-bottom:24px;">
        <span style="font-size:14px;font-weight:700;color:#0284c7;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:8px;">Aquaculture Technical Handbook</span>
        <h1 style="font-size:32px;font-weight:800;color:#0f172a;line-height:1.25;margin:0 0 16px 0;letter-spacing:-0.5px;">Biofloc Technology (BFT) Fish Farming: Complete Engineering &amp; Operational Guide</h1>
        <p style="font-size:18px;color:#475569;margin:0;line-height:1.6;">
          Master high-density sustainable aquaculture with zero water exchange. Learn microbial floc management, carbon-to-nitrogen (C:N) ratio dosing, continuous aeration sizing, and species-specific stocking protocols.
        </p>
      </header>

      <!-- Section 1: Overview -->
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">1. Fundamentals of Biofloc Technology (BFT)</h2>
        <p>
          Biofloc Technology (BFT) is an innovative, eco-friendly aquaculture production system based on in-situ microbial waste assimilation. Unlike conventional flow-through ponds or earthen reservoirs that discharge toxic metabolic wastes, Biofloc systems cultivate a dense consortium of beneficial heterotrophic bacteria, phytoplankton, protozoa, and rotifers directly within the culture water.
        </p>
        <p>
          Fish excrete approximately 70% to 80% of ingested dietary protein as dissolved total ammonia nitrogen (TAN). Under constant aeration and controlled carbon addition, heterotrophic bacteria rapidly assimilate toxic ammonium ions into high-protein microbial biomass (bacterial protein floc). Fish continuously graze on these suspended macro-aggregates, recycling waste nitrogen back into digestible protein and reducing commercial feed costs by <strong>20% to 30%</strong>.
        </p>
        <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:10px;padding:20px;margin:20px 0;">
          <h3 style="font-size:18px;font-weight:700;color:#0369a1;margin:0 0 10px 0;">Key Commercial Advantages of Biofloc Culture:</h3>
          <ul style="margin:0;padding-left:24px;color:#334155;">
            <li style="margin-bottom:8px;"><strong>Extreme Biosecurity &amp; Zero Water Exchange:</strong> Prevents disease pathogens (such as EHP and WSSV in shrimp or columnaris in fish) from entering via outside surface water.</li>
            <li style="margin-bottom:8px;"><strong>High Stocking Density:</strong> Supports 30 to 60 kg of live fish biomass per cubic meter of water (compared to 1 to 3 kg/m³ in conventional earthen ponds).</li>
            <li style="margin-bottom:8px;"><strong>Feed Conversion Ratio (FCR) Improvement:</strong> Achieves exceptional FCR ratings between 1.1 and 1.3 by providing continuous supplemental live microbial nutrition.</li>
            <li><strong>Minimal Land Footprint:</strong> Ideal for peri-urban and arid regions where vast pond areas and abundant freshwater supplies are unavailable.</li>
          </ul>
        </div>
      </section>

      <!-- Section 2: Tarpaulin Tank Construction -->
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">2. Tarpaulin Tank Engineering &amp; Sizing</h2>
        <p>
          Biofloc systems are typically deployed in circular tarpaulin tanks engineered for self-cleaning hydrodynamics. The circular shape prevents dead zones where uneaten feed and dead bacteria can settle and turn anaerobic.
        </p>
        <div style="overflow-x:auto;margin:20px 0;">
          <table style="width:100%;border-collapse:collapse;text-align:left;font-size:15px;">
            <thead>
              <tr style="background:#0f172a;color:#ffffff;">
                <th style="padding:12px;border:1px solid #334155;">Tank Diameter</th>
                <th style="padding:12px;border:1px solid #334155;">Water Height</th>
                <th style="padding:12px;border:1px solid #334155;">Usable Volume</th>
                <th style="padding:12px;border:1px solid #334155;">Recommended Species</th>
                <th style="padding:12px;border:1px solid #334155;">Expected Harvest Yield</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background:#ffffff;border-bottom:1px solid #e2e8f0;">
                <td style="padding:12px;border:1px solid #e2e8f0;font-weight:600;">4 Meters (~13 ft)</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">1.2 Meters</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">12,000 Litres</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">GIFT Tilapia / Magur</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">450 – 600 kg</td>
              </tr>
              <tr style="background:#f8fafc;border-bottom:1px solid #e2e8f0;">
                <td style="padding:12px;border:1px solid #e2e8f0;font-weight:600;">6 Meters (~20 ft)</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">1.25 Meters</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">28,000 Litres</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Tilapia, Pangasius, Singhi</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">1,000 – 1,400 kg</td>
              </tr>
              <tr style="background:#ffffff;border-bottom:1px solid #e2e8f0;">
                <td style="padding:12px;border:1px solid #e2e8f0;font-weight:600;">8 Meters (~26 ft)</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">1.3 Meters</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">50,000 Litres</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Commercial Tilapia / Shrimp</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">2,000 – 2,500 kg</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          <strong>Civil Specifications:</strong> Construct the base with a 1:10 conical central slope. Install a 3-inch central PVC drain pipe connected to an external standpipe valve. Line the perimeter with 4mm welded galvanized wire mesh and line the interior with 550 GSM to 650 GSM UV-stabilized virgin PVC multilayer tarpaulin.
        </p>
      </section>

      <!-- Section 3: Aeration Sizing -->
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">3. Aeration Grid Engineering &amp; Blower Sizing</h2>
        <p>
          Aeration is the single most critical life-support element in a Biofloc ecosystem. The aeration system must perform two vital functions simultaneously:
        </p>
        <ol style="padding-left:24px;margin-bottom:16px;">
          <li style="margin-bottom:8px;"><strong>Oxygen Dissolution:</strong> Maintain Dissolved Oxygen (DO) strictly above <strong>5.0 mg/L</strong> (optimally 6.0–8.0 mg/L) to supply the respiratory needs of both high-density fish and millions of aerobic bacteria.</li>
          <li><strong>Complete Floc Suspension:</strong> Deliver sufficient water circulation velocity (minimum 15–20 cm/second) across the entire tank floor to keep bacterial flocs in suspension and prevent anaerobic sludge decomposition.</li>
        </ol>
        <p>
          <strong>Blower Sizing Rule of Thumb:</strong> Install 25 to 35 Litres Per Minute (LPM) of continuous airflow for every 1,000 litres of tank water. For a 40,000-litre commercial tank, install a 1.0 HP to 1.5 HP oil-free regenerative ring blower connected to an Aero-Tube or weighted nano-diffuser aeration ring.
        </p>
        <p style="background:#fef2f2;border:1px solid #fecaca;padding:16px;border-radius:8px;color:#991b1b;">
          <strong>Critical Safety Warning:</strong> Biofloc bacteria consume more oxygen than the fish themselves. An electrical blackout lasting longer than 30 to 45 minutes can cause total floc die-off, toxic hydrogen sulfide spikes, and total fish mortality. Always install an automatic diesel generator (DG) or dedicated high-capacity inverter backup.
        </p>
      </section>

      <!-- Section 4: C:N Ratio Calculation -->
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">4. Carbon-to-Nitrogen (C:N) Ratio &amp; Molasses Dosing Protocol</h2>
        <p>
          Standard commercial fish feeds possess a C:N ratio between 8:1 and 10:1. In this range, autotrophic nitrifiers dominate slowly. To trigger rapid heterotrophic bacterial assimilation of toxic ammonia into bacterial protein, the systemic C:N ratio must be elevated to <strong>15:1 or 20:1</strong> through supplemental organic carbon addition (molasses, jaggery, or cassava starch).
        </p>
        <div style="background:#f0f9ff;border:1px solid #bae6fd;padding:20px;border-radius:10px;margin:20px 0;">
          <h3 style="font-size:18px;font-weight:700;color:#0369a1;margin:0 0 10px 0;">Standard Molasses Dosing Formula:</h3>
          <p style="font-family:monospace;font-size:16px;color:#0c4a6e;background:#e0f2fe;padding:12px;border-radius:6px;margin:0 0 12px 0;">
            Carbon Source Required (g) = Feed Fed (kg) &times; Crude Protein % &times; 0.6
          </p>
          <p style="margin:0;color:#334155;font-size:15px;">
            <strong>Practical Example:</strong> If feeding 2.0 kg of 32% crude protein feed per day:
            <br />
            Calculation: 2.0 &times; 32 &times; 0.6 = <strong>38.4 &rarr; ~380 to 400 grams</strong> of food-grade molasses.
          </p>
        </div>
        <p>
          <strong>Application Method:</strong> Dissolve the calculated quantity of molasses in a bucket of aerated tank water along with 5–10g of multi-strain probiotic (Bacillus subtilis, Bacillus licheniformis, and Nitrosomonas). Let ferment for 2 hours, then broadcast evenly across the active aeration zone during mid-morning.
        </p>
      </section>

      <!-- Section 5: Water Quality Matrix -->
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">5. Water Quality Parameters &amp; Monitoring Thresholds</h2>
        <div style="overflow-x:auto;margin:20px 0;">
          <table style="width:100%;border-collapse:collapse;text-align:left;font-size:15px;">
            <thead>
              <tr style="background:#0f172a;color:#ffffff;">
                <th style="padding:12px;border:1px solid #334155;">Parameter</th>
                <th style="padding:12px;border:1px solid #334155;">Optimal Range</th>
                <th style="padding:12px;border:1px solid #334155;">Testing Schedule</th>
                <th style="padding:12px;border:1px solid #334155;">Corrective Action</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background:#ffffff;border-bottom:1px solid #e2e8f0;">
                <td style="padding:12px;border:1px solid #e2e8f0;font-weight:600;">Dissolved Oxygen (DO)</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">&ge; 5.0 – 8.0 mg/L</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Twice daily (05:00 &amp; 16:00)</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Check blower filters, clear diffuser clogging, start backup air line.</td>
              </tr>
              <tr style="background:#f8fafc;border-bottom:1px solid #e2e8f0;">
                <td style="padding:12px;border:1px solid #e2e8f0;font-weight:600;">pH</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">7.2 – 7.8</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Daily at 09:00</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">If &lt; 7.0, dose agricultural lime or dolomite at 30–50 g/m³.</td>
              </tr>
              <tr style="background:#ffffff;border-bottom:1px solid #e2e8f0;">
                <td style="padding:12px;border:1px solid #e2e8f0;font-weight:600;">Total Ammonia Nitrogen (TAN)</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">&lt; 0.5 mg/L</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Every 2 days</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Increase molasses carbon dosing by 20% to accelerate heterotrophic uptake.</td>
              </tr>
              <tr style="background:#f8fafc;border-bottom:1px solid #e2e8f0;">
                <td style="padding:12px;border:1px solid #e2e8f0;font-weight:600;">Nitrite (NO2-)</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">&lt; 0.2 mg/L</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Every 2 days</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Add raw non-iodized salt (NaCl) to maintain 2.0 to 3.0 ppt salinity to prevent brown blood disease.</td>
              </tr>
              <tr style="background:#ffffff;border-bottom:1px solid #e2e8f0;">
                <td style="padding:12px;border:1px solid #e2e8f0;font-weight:600;">Alkalinity</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">120 – 180 mg/L CaCO3</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Weekly</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Add sodium bicarbonate (baking soda) or dolomite.</td>
              </tr>
              <tr style="background:#f8fafc;border-bottom:1px solid #e2e8f0;">
                <td style="padding:12px;border:1px solid #e2e8f0;font-weight:600;">Floc Volume Index (FVI)</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">20 – 35 mL/L (Tilapia)</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Daily via Imhoff Cone</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">If &gt; 40 mL/L, flush sludge valve for 20 seconds. If &lt; 15 mL/L, boost molasses and probiotics.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Section 6: Imhoff Cone Protocol -->
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">6. Imhoff Cone Floc Volume Testing Protocol</h2>
        <p>
          The Imhoff settling cone is the essential diagnostic instrument for daily Biofloc farm management. It measures the physical concentration of microbial biomass suspended in culture water:
        </p>
        <ol style="padding-left:24px;margin-bottom:16px;">
          <li style="margin-bottom:8px;">Submerge a 1,000 mL glass or acrylic Imhoff cone at mid-depth in the tank while aeration is operating at full capacity.</li>
          <li style="margin-bottom:8px;">Hang the cone vertically on a stable support rack out of direct sunlight.</li>
          <li style="margin-bottom:8px;">Allow the sample to settle undisturbed for exactly <strong>30 minutes</strong>.</li>
          <li>Read the settled floc sludge level directly on the graduated scale at the cone tip (expressed as mL of floc per litre of water).</li>
        </ol>
        <p>
          <strong>Interpreting Results:</strong> For finfish (Tilapia, Pangasius, Magur), optimal floc volume is <strong>20 to 35 mL/L</strong>. For shrimp (Vannamei), target <strong>15 to 25 mL/L</strong>. If floc exceeds 40 mL/L, water viscosity increases, gill irritation occurs, and oxygen demand peaks dangerously—purge bottom sediment immediately.
        </p>
      </section>

      <!-- Section 7: Stocking Densities -->
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">7. Commercial Fish Species &amp; Stocking Density Sizing</h2>
        <ul style="list-style:none;padding:0;margin:0;display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px;">
          <li style="background:#ffffff;border:1px solid #cbd5e1;padding:16px;border-radius:8px;">
            <h3 style="font-size:18px;font-weight:700;color:#0f172a;margin:0 0 6px 0;">Genetically Improved Farmed Tilapia (GIFT)</h3>
            <p style="font-size:14px;color:#475569;margin:0 0 8px 0;">Omnivorous filter-feeder with unmatched tolerance for high turbidity and floc consumption.</p>
            <strong style="color:#0284c7;font-size:14px;">Stocking: 50 – 70 fingerlings/m³ | Harvest: 35 – 50 kg/m³</strong>
          </li>
          <li style="background:#ffffff;border:1px solid #cbd5e1;padding:16px;border-radius:8px;">
            <h3 style="font-size:18px;font-weight:700;color:#0f172a;margin:0 0 6px 0;">Asian Stinging Catfish (Singhi / Magur)</h3>
            <p style="font-size:14px;color:#475569;margin:0 0 8px 0;">Air-breathing resilience allows extraordinary biomass packing density with premium market prices.</p>
            <strong style="color:#0284c7;font-size:14px;">Stocking: 100 – 150 fingerlings/m³ | Harvest: 45 – 60 kg/m³</strong>
          </li>
          <li style="background:#ffffff;border:1px solid #cbd5e1;padding:16px;border-radius:8px;">
            <h3 style="font-size:18px;font-weight:700;color:#0f172a;margin:0 0 6px 0;">Pacific White Shrimp (L. vannamei)</h3>
            <p style="font-size:14px;color:#475569;margin:0 0 8px 0;">Grazes continuously on microbial flocs, delivering high survival rates and rapid growth cycles.</p>
            <strong style="color:#0284c7;font-size:14px;">Stocking: 150 – 250 PL/m² | Harvest: 2.5 – 4.0 kg/m²</strong>
          </li>
        </ul>
      </section>

      <!-- Section 8: FAQ -->
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">8. Frequently Asked Questions (FAQ)</h2>
        <div style="display:flex;flex-direction:column;gap:12px;">
          <div style="background:#ffffff;border:1px solid #e2e8f0;padding:16px;border-radius:8px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 8px 0;">Why is non-iodized raw salt added to freshwater Biofloc tanks?</h3>
            <p style="margin:0;font-size:15px;color:#334155;">Raw salt is maintained at 2.0 to 3.0 parts per thousand (ppt) to protect fish from nitrite toxicity (methemoglobinemia or brown blood disease). Chloride ions compete with nitrite ions for entry at the gill lamellae, preventing toxic nitrite absorption.</p>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;padding:16px;border-radius:8px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 8px 0;">How do I correct sudden foaming on the surface of my Biofloc tank?</h3>
            <p style="margin:0;font-size:15px;color:#334155;">Surface foam indicates excess dissolved organic proteins and dead bacterial surfactant compounds. Skim off surface foam manually, test and purge bottom sludge via the central drain, verify aeration output, and temporarily reduce feed by 20%.</p>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;padding:16px;border-radius:8px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 8px 0;">Can I use sugar instead of molasses as a carbon source?</h3>
            <p style="margin:0;font-size:15px;color:#334155;">Yes! Refined cane sugar, jaggery, or wheat flour can be used. Refined sugar contains higher carbon purity (~42% carbon vs ~32% in molasses), meaning approximately 25% less sugar by weight is needed compared to molasses.</p>
          </div>
        </div>
      </section>

      <!-- Section 9: Call to Action -->
      <section style="background:linear-gradient(135deg, #0f172a 0%, #1e293b 100%);color:#ffffff;padding:28px;border-radius:12px;margin-bottom:32px;">
        <h2 style="font-size:20px;font-weight:700;color:#ffffff;margin:0 0 8px 0;">Ready to Install Commercial Biofloc Tarpaulin Tanks?</h2>
        <p style="font-size:15px;color:#cbd5e1;margin:0 0 16px 0;">Modern Fisheries provides complete turn-key engineering support, commercial roots blowers, food-grade PVC tarpaulin tanks, probiotic starter cultures, and doorstep fingerling delivery across India.</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <a href="/calculators" style="background:#0284c7;color:#ffffff;padding:10px 20px;border-radius:6px;font-weight:700;text-decoration:none;font-size:14px;">Open Biofloc Carbon Calculator &rarr;</a>
          <a href="/ourservices" style="background:#334155;color:#ffffff;padding:10px 20px;border-radius:6px;font-weight:700;text-decoration:none;font-size:14px;">Explore Turnkey Consultancy &rarr;</a>
        </div>
      </section>
    </article>
  `,

  '/aquaponic': `
    <article style="max-width:1000px;margin:0 auto;color:#1e293b;line-height:1.75;font-size:16px;">
      <header style="margin-bottom:36px;border-bottom:1px solid #e2e8f0;padding-bottom:24px;">
        <span style="font-size:14px;font-weight:700;color:#0284c7;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:8px;">RAS Engineering Manual</span>
        <h1 style="font-size:32px;font-weight:800;color:#0f172a;line-height:1.25;margin:0 0 16px 0;letter-spacing:-0.5px;">Recirculating Aquaculture System (RAS): Commercial Design &amp; Biofilter Sizing</h1>
        <p style="font-size:18px;color:#475569;margin:0;line-height:1.6;">
          Complete engineering blueprint for biosecure indoor fish farming. Learn drum filter solids separation, MBBR moving-bed biological nitrifying biofilter sizing, oxygen dissolution cones, and UV pathogen sterilization.
        </p>
      </header>

      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">1. Core Engineering Principles of Industrial RAS</h2>
        <p>
          A Recirculating Aquaculture System (RAS) is a closed-loop land-based aquaculture facility that recycles 90% to 99% of its total water volume. By continuously purifying water through mechanical, biological, and chemical treatment stages, RAS provides year-round optimal environmental parameters, extreme biosecurity, and independence from local climate variations.
        </p>
        <p>
          Water circulates continuously from culture tanks through four essential filtration loops:
        </p>
        <ol style="padding-left:24px;margin-bottom:16px;">
          <li style="margin-bottom:8px;"><strong>Mechanical Filtration (Drum Filter):</strong> Captures suspended settleable fish feces and feed fines down to 40 to 60 microns before organic solids break down into dissolved ammonia.</li>
          <li style="margin-bottom:8px;"><strong>Biological Filtration (MBBR Biofilter):</strong> Houses billions of nitrifying bacteria (Nitrosomonas and Nitrospira) on fluidised virgin HDPE plastic media (K1/K3/MBBR) to oxidize toxic ammonia into safe nitrate.</li>
          <li style="margin-bottom:8px;"><strong>Gas Exchange &amp; Stripping (CO2 Degassing Tower &amp; Oxygen Injection):</strong> Strips respiratory carbon dioxide gas from water and enriches water with pure oxygen via pressurized Low-Head Oxygenators (LHO) or oxygen cones.</li>
          <li><strong>Pathogen Disinfection (UV Sterilizer &amp; Ozone):</strong> Inactivates viral, bacterial, and fungal pathogens before recirculating clean water back to fish tanks.</li>
        </ol>
      </section>

      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">2. Water Circulation Turnover Rate &amp; Hydraulics</h2>
        <p>
          System hydraulic retention time determines ammonia accumulation rates. In intensive culture facilities holding 60 to 100 kg of fish per cubic meter, the entire system volume must cycle through the filtration loop every <strong>45 to 60 minutes</strong> (Turnover Rate = 1.0 to 1.5 times per hour). Dual-drain tank designs direct 85% of clean water through side overflows and 15% of high-solid waste through the bottom center drain directly to the drum filter.
        </p>
      </section>

      <!-- Section 3: Commercial RAS Machinery Specifications & Hardware Guide -->
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">3. Commercial RAS Machinery &amp; Hardware Specifications</h2>
        <p>
          Industrial indoor RAS facilities rely on specialized, precision-engineered hardware components designed for continuous 24/7 duty:
        </p>

        <div style="display:flex;flex-direction:column;gap:20px;margin-top:20px;">
          <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;padding:20px;">
            <h3 style="font-size:18px;font-weight:700;color:#0f172a;margin:0 0 8px 0;">A. Automatic Micro-Screen Rotary Drum Filter (SS316)</h3>
            <p style="margin:0 0 10px 0;color:#334155;">
              <strong>Operating Principle:</strong> Effluent water flows into an internal rotating cylindrical drum lined with 40 to 60 micron stainless steel 316L woven mesh. Suspended fish feces and uneaten feed pellets are trapped on the inner mesh surface. As solids accumulate, water head rises, triggering an optical or conductivity water level sensor that activates the high-pressure backwash pump and geared rotation motor.
            </p>
            <p style="margin:0 0 10px 0;color:#334155;">
              <strong>Sizing Benchmark:</strong> Rated hydraulic throughput must exceed 100% to 150% of total farm volume per hour. Backwash pressure is maintained at 6 to 8 bar using filtered system water.
            </p>
            <div style="background:#f8fafc;padding:12px;border-radius:6px;font-size:14px;color:#475569;">
              <strong>Key Features:</strong> Automatic PLC timer/level controls, internal waste sludge collection hopper, UV-stabilized corrosion-resistant casing, and emergency bypass overflow channels.
            </div>
          </div>

          <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;padding:20px;">
            <h3 style="font-size:18px;font-weight:700;color:#0f172a;margin:0 0 8px 0;">B. Moving Bed Biofilm Reactor (MBBR) &amp; Virgin K1 Media</h3>
            <p style="margin:0 0 10px 0;color:#334155;">
              <strong>Operating Principle:</strong> Fluidized plastic carriers (virgin HDPE K1 or K3 media) provide protected surface area (&gt;800 m²/m³) for autotrophic nitrifying bacteria. Coarse bubble aeration grids at the tank bottom keep the media in constant continuous motion, self-cleaning old biofilm slough while supplying oxygen for nitrification.
            </p>
            <p style="margin:0 0 10px 0;color:#334155;">
              <strong>Sizing Formula:</strong> Required media volume = (Daily Feed kg &times; 0.03 &times; 1000) / (0.55 g TAN conversion/m²/day &times; Protected Area m²/m³). Standard benchmark requires 75 to 90 Litres of K1 media per 1.0 kg of 32% protein feed distributed daily.
            </p>
          </div>

          <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;padding:20px;">
            <h3 style="font-size:18px;font-weight:700;color:#0f172a;margin:0 0 8px 0;">C. Industrial Germicidal UV-C Water Sterilizers</h3>
            <p style="margin:0 0 10px 0;color:#334155;">
              <strong>Operating Principle:</strong> High-output amalgam lamps housed inside quartz sleeves emit UV radiation at 254 nm wavelength, disrupting the DNA and RNA of bacterial pathogens (Aeromonas, Flavobacterium, Vibrio) and viruses without altering water chemistry.
            </p>
            <p style="margin:0 0 10px 0;color:#334155;">
              <strong>Dosage Standard:</strong> Minimum 30 to 45 mJ/cm² (30,000 to 45,000 µW·s/cm²) at end-of-lamp-life (EOLL) under 85% UV transmittance (UVT). Stainless steel 316L reactor chambers feature automatic wiper mechanisms to prevent quartz bio-fouling.
            </p>
          </div>

          <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;padding:20px;">
            <h3 style="font-size:18px;font-weight:700;color:#0f172a;margin:0 0 8px 0;">D. Downflow Pure Oxygen Saturator Cones (Speece Cones)</h3>
            <p style="margin:0 0 10px 0;color:#334155;">
              <strong>Operating Principle:</strong> Pure gaseous oxygen is injected at the apex of a conical vessel while water is pumped downward. As the cone widens, downward water velocity decreases until it matches the upward buoyant velocity of oxygen bubbles, trapping gas in intense counter-current shear for &gt;95% dissolution efficiency.
            </p>
            <p style="margin:0 0 10px 0;color:#334155;">
              <strong>Operating Parameters:</strong> Working pressure 1.5 to 2.2 bar. Dissolved oxygen levels in the sidestream effluent reach 25 to 45 mg/L, allowing rapid re-oxygenation of large fish rearing tanks without excess foaming.
            </p>
          </div>

          <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;padding:20px;">
            <h3 style="font-size:18px;font-weight:700;color:#0f172a;margin:0 0 8px 0;">E. Commercial Protein Skimmers / Foam Fractionators</h3>
            <p style="margin:0 0 10px 0;color:#334155;">
              <strong>Operating Principle:</strong> Fine micro-bubbles created via Venturi injection or pin-wheel impellers strip surface-active dissolved organic compounds (DOC), protein surfactants, and colloidal fines (&lt;30 microns) that pass through drum filters, discharging dry foam into an overhead drain.
            </p>
          </div>

          <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;padding:20px;">
            <h3 style="font-size:18px;font-weight:700;color:#0f172a;margin:0 0 8px 0;">F. All-In-One Compact Modular Indoor RAS Skids</h3>
            <p style="margin:0 0 10px 0;color:#334155;">
              <strong>Operating Principle:</strong> Turnkey, factory-plumbed filtration stations integrating a 50-micron drum filter, K1 fluid-bed MBBR chamber, inline amalgam UV-C sterilizer, and high-efficiency low-head circulation pump on a single structural base. Pre-tested plug-and-play setup for 10 to 60 m³ culture volumes.
            </p>
          </div>
        </div>
      </section>

      <!-- Section 4: RAS Machinery Sizing & Technical Specification Table -->
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">4. RAS Machinery Sizing &amp; Electrical Benchmark Matrix</h2>
        <div style="overflow-x:auto;margin:20px 0;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;text-align:left;">
            <thead>
              <tr style="background:#0f172a;color:#ffffff;">
                <th style="padding:12px;border:1px solid #334155;">Machinery Unit</th>
                <th style="padding:12px;border:1px solid #334155;">Capacity Range</th>
                <th style="padding:12px;border:1px solid #334155;">Power / Phase</th>
                <th style="padding:12px;border:1px solid #334155;">Key Engineering Sizing Standard</th>
                <th style="padding:12px;border:1px solid #334155;">Maintenance Interval</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background:#ffffff;border-bottom:1px solid #e2e8f0;">
                <td style="padding:12px;border:1px solid #e2e8f0;font-weight:700;">Micro-Screen Drum Filter</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">20 to 120 m³/hr</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">0.37 – 1.1 kW (1/3-Phase)</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">40–60 micron SS316, 100% farm volume/hr turnover</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Inspect spray nozzles weekly, descale mesh monthly</td>
              </tr>
              <tr style="background:#f8fafc;border-bottom:1px solid #e2e8f0;">
                <td style="padding:12px;border:1px solid #e2e8f0;font-weight:700;">MBBR Moving-Bed Reactor</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">500 to 5,000 Litres media</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Aeration blower 0.75 – 2.2 kW</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">75–90 L K1 media per kg of 32% protein feed fed daily</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Check media fluidization &amp; DO daily (&gt;4.0 mg/L)</td>
              </tr>
              <tr style="background:#ffffff;border-bottom:1px solid #e2e8f0;">
                <td style="padding:12px;border:1px solid #e2e8f0;font-weight:700;">Amalgam UV-C Sterilizer</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">15 to 80 m³/hr flow</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">120W – 800W (Low-Pressure)</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">&gt;30 mJ/cm² radiation dosage at 254 nm</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Replace lamps after 9,000 – 12,000 hours runtime</td>
              </tr>
              <tr style="background:#f8fafc;border-bottom:1px solid #e2e8f0;">
                <td style="padding:12px;border:1px solid #e2e8f0;font-weight:700;">Oxygen Speece Cone</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">10 to 60 m³/hr sidestream</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">1.5 – 3.7 kW booster pump</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">&gt;95% dissolution efficiency at 1.5–2.0 bar pressure</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Inspect safety pressure relief valve every 3 months</td>
              </tr>
              <tr style="background:#ffffff;border-bottom:1px solid #e2e8f0;">
                <td style="padding:12px;border:1px solid #e2e8f0;font-weight:700;">All-In-One Indoor RAS Skid</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">10 to 60 m³ system volume</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">1.5 – 3.0 kW total skid load</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Modular plug-and-play skid, 100% hourly turnover</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Inspect union seals, motor bearings every 500 hours</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Section 5: Decoupled RAS-Aquaponics Integration -->
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">5. Decoupled RAS &amp; Commercial Aquaponics Coupling</h2>
        <p>
          In modern commercial facilities, high-density Recirculating Aquaculture Systems (RAS) are often coupled with hydroponic grow beds in a <strong>decoupled (dual-loop) aquaponic architecture</strong>. Rather than running plant bed effluent directly back into fish tanks (which can compromise fish biosecurity and limit plant nutrient optimization), decoupled RAS operates two independent circulation loops:
        </p>
        <ol style="padding-left:24px;margin-bottom:16px;">
          <li style="margin-bottom:8px;"><strong>Fish Culture Loop (Intensive RAS):</strong> Operates at optimal water quality parameters for finfish (pH 7.2–7.8, zero pesticide exposure, high DO &gt;6.0 mg/L) with 95% internal recirculation.</li>
          <li style="margin-bottom:8px;"><strong>Mineralization Digester:</strong> Backwash discharge from the automatic drum filter (concentrated fish feces and feed solids) is routed to an aerobic sludge digestion tank where heterotrophic bacteria break organic sludge down into bioavailable ionic minerals (N, P, K, Ca, Mg).</li>
          <li style="margin-bottom:8px;"><strong>Hydroponic Plant Loop (DWC &amp; NFT):</strong> Mineralized water is dosed into Deep Water Culture (DWC) or Nutrient Film Technique (NFT) channels at plant-optimal pH (5.8–6.4) and supplemented with chelated iron (Fe-DTPA) without risking toxicity to the fish.</li>
        </ol>
      </section>

      <!-- Section 6: Water Quality Parameter Standards -->
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">6. RAS &amp; Aquaponic Water Quality Engineering Thresholds</h2>
        <div style="overflow-x:auto;margin:20px 0;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;text-align:left;">
            <thead>
              <tr style="background:#0f172a;color:#ffffff;">
                <th style="padding:10px;border:1px solid #334155;">Parameter</th>
                <th style="padding:10px;border:1px solid #334155;">Target Range (RAS Fish)</th>
                <th style="padding:10px;border:1px solid #334155;">Target Range (Aquaponic Plants)</th>
                <th style="padding:10px;border:1px solid #334155;">Correction Action</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background:#ffffff;border-bottom:1px solid #e2e8f0;">
                <td style="padding:10px;border:1px solid #e2e8f0;font-weight:600;">Dissolved Oxygen (DO)</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">&gt; 5.5 – 8.0 mg/L</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">&gt; 4.0 – 6.0 mg/L</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Increase oxygen cone pure O2 injection or blower airflow</td>
              </tr>
              <tr style="background:#f8fafc;border-bottom:1px solid #e2e8f0;">
                <td style="padding:10px;border:1px solid #e2e8f0;font-weight:600;">pH</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">7.0 – 7.6</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">5.8 – 6.8</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Buffer with Calcium Hydroxide Ca(OH)2 or Potassium Hydroxide KOH</td>
              </tr>
              <tr style="background:#ffffff;border-bottom:1px solid #e2e8f0;">
                <td style="padding:10px;border:1px solid #e2e8f0;font-weight:600;">Total Ammonia Nitrogen (TAN)</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">&lt; 0.50 mg/L</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Non-toxic to plants</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Increase MBBR aeration, check biofilter media fluidization</td>
              </tr>
              <tr style="background:#f8fafc;border-bottom:1px solid #e2e8f0;">
                <td style="padding:10px;border:1px solid #e2e8f0;font-weight:600;">Nitrite (NO2-)</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">&lt; 0.20 mg/L</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Non-toxic at low levels</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Add non-iodized NaCl to reach 0.1–0.2 ppt salinity to block gill uptake</td>
              </tr>
              <tr style="background:#ffffff;border-bottom:1px solid #e2e8f0;">
                <td style="padding:10px;border:1px solid #e2e8f0;font-weight:600;">Carbon Dioxide (CO2)</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">&lt; 15 mg/L</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Beneficial in greenhouse air</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Increase blower CFM in counter-current stripping degassing column</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Section 7: RAS Knowledge Base FAQ -->
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">7. Recirculating Aquaculture Systems (RAS) Technical FAQ</h2>
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div style="background:#ffffff;border:1px solid #e2e8f0;padding:16px;border-radius:8px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 6px 0;">What is a Recirculating Aquaculture System (RAS) and how does it integrate with aquaponics?</h3>
            <p style="font-size:14px;color:#334155;margin:0;line-height:1.6;">RAS is a closed-loop land-based aquaculture engineering system that recycles 90% to 99% of culture water by cycling it through mechanical solids removal (drum filters), biological nitrification (MBBR), CO2 degassing, and UV sterilization. In commercial decoupled aquaponics, nutrient-rich solids and nitrate effluent from the RAS are mineralized and delivered to hydroponic plant beds to produce both fish and organic vegetables.</p>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;padding:16px;border-radius:8px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 6px 0;">How do I size an automatic rotary drum filter for an indoor RAS setup?</h3>
            <p style="font-size:14px;color:#334155;margin:0;line-height:1.6;">Drum filters are sized based on total hourly hydraulic flow rate and peak suspended solids load. The drum filter's rated hydraulic throughput must match 100% to 150% of the entire farm water volume per hour, using a 40 to 60 micron stainless steel 316L woven screen mesh to capture intact fecal pellets before they dissolve into ammonia.</p>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;padding:16px;border-radius:8px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 6px 0;">What volume of K1 / MBBR biofilter media is required per kilogram of feed fed daily?</h3>
            <p style="font-size:14px;color:#334155;margin:0;line-height:1.6;">For commercial 32% protein extruded fish feed, every 1.0 kg of daily feed generates approximately 30 grams of Total Ammonia Nitrogen (TAN). At a biological conversion rate of 0.55 g TAN/m²/day on virgin HDPE K1 media (800 m²/m³ protected surface area), each kilogram of feed requires approximately 75 to 90 litres of fluidized K1 media.</p>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;padding:16px;border-radius:8px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 6px 0;">Why are Speece oxygen cones and pure oxygen systems necessary in high-density RAS?</h3>
            <p style="font-size:14px;color:#334155;margin:0;line-height:1.6;">Atmospheric air contains only 21% oxygen, which limits DO saturation to ~8 mg/L at 28°C. In high-density culture (&gt;60 kg/m³), biological oxygen demand quickly exceeds atmospheric transfer rates. Speece cones dissolve 95%+ pure O2 at 1.5–2.0 bar pressure, supersaturating sidestream water up to 30–45 mg/L to maintain tank DO safely above 6.0 mg/L.</p>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;padding:16px;border-radius:8px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 6px 0;">What UV-C germicidal dosage is needed to eliminate fish pathogens in recirculation loops?</h3>
            <p style="font-size:14px;color:#334155;margin:0;line-height:1.6;">Commercial RAS requires a minimum germicidal UV-C radiation dosage of 30 to 45 mJ/cm² (30,000 to 45,000 µW·s/cm²) at 254 nm wavelength at end-of-lamp-life (EOLL) under 85% UV transmittance. This destroys viral pathogens, Aeromonas bacteria, and free-swimming parasite tomites.</p>
          </div>
        </div>
      </section>

      <section style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:10px;padding:20px;margin-bottom:32px;">
        <h3 style="font-size:18px;font-weight:700;color:#0369a1;margin:0 0 10px 0;">Professional Turnkey RAS Consultancy &amp; Equipment Supply</h3>
        <p style="margin:0 0 12px 0;color:#475569;">Modern Fisheries designs, manufactures, and commissions commercial RAS hatcheries and grow-out facilities nationwide. We supply automated rotary drum filters, MBBR biofilter media, protein skimmers, pure oxygen generation skids, and all-in-one indoor RAS skids.</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <a href="/equipment-finder" style="background:#0284c7;color:#ffffff;padding:10px 20px;border-radius:6px;font-weight:700;text-decoration:none;font-size:14px;">Open Equipment Sizing Finder &rarr;</a>
          <a href="/ourservices" style="background:#334155;color:#ffffff;padding:10px 20px;border-radius:6px;font-weight:700;text-decoration:none;font-size:14px;">Consult Our Engineering Team &rarr;</a>
        </div>
      </section>
    </article>
  `,

  '/aquaponics-farming': `
    <article style="max-width:1000px;margin:0 auto;color:#1e293b;line-height:1.75;font-size:16px;">
      <header style="margin-bottom:36px;border-bottom:1px solid #e2e8f0;padding-bottom:24px;">
        <span style="font-size:14px;font-weight:700;color:#0284c7;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:8px;">Integrated Agriculture Guide</span>
        <h1 style="font-size:32px;font-weight:800;color:#0f172a;line-height:1.25;margin:0 0 16px 0;letter-spacing:-0.5px;">Commercial Aquaponics Systems: Fish &amp; Organic Crop Co-Cultivation</h1>
        <p style="font-size:18px;color:#475569;margin:0;line-height:1.6;">
          Combine recirculating aquaculture with soil-less hydroponic plant culture. Learn Deep Water Culture (DWC) rafts, Nutrient Film Technique (NFT), bell siphon media beds, and optimal pH balancing for fish, bacteria, and plants.
        </p>
      </header>

      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">1. The Aquaponic Symbiosis</h2>
        <p>
          Aquaponics combines recirculating aquaculture with hydroponics into a unified circular production loop. Fish consume commercial pellet feed and excrete ammonia. Nitrifying bacteria in grow beds convert ammonia into water-soluble nitrates. Vegetable crops absorb these nitrates as organic fertilizer, purifying the water before it flows back safely to the fish tanks.
        </p>
        <p>
          <strong>System pH Compromise:</strong> Plants prefer a slightly acidic pH (5.5 to 6.5), nitrifying bacteria thrive in alkaline water (7.5 to 8.2), and freshwater fish thrive in neutral water (6.5 to 8.0). Commercial aquaponics operators maintain a strict system target of <strong>pH 6.8 to 7.0</strong> to satisfy all three biological components harmoniously.
        </p>
      </section>

      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">2. High-Yield Commercial Crops for Aquaponics</h2>
        <p>Leafy greens and herbs represent the most lucrative crops due to their rapid harvest turnarounds (28 to 35 days from transplant) and high nitrogen assimilation rates:</p>
        <ul style="padding-left:24px;color:#334155;">
          <li><strong>Butterhead &amp; Romaine Lettuce:</strong> Fast growing, exceptionally crisp, and clean roots.</li>
          <li><strong>Culinary Herbs:</strong> Sweet Basil, Mint, Coriander, and Parsley.</li>
          <li><strong>Fruiting Crops:</strong> Cherry Tomatoes, Bell Peppers, and Cucumbers (require supplemental chelated iron Fe-DTPA and potassium buffering).</li>
        </ul>
      </section>
    </article>
  `,

  '/hydroponic': `
    <article style="max-width:1000px;margin:0 auto;color:#1e293b;line-height:1.75;font-size:16px;">
      <header style="margin-bottom:36px;border-bottom:1px solid #e2e8f0;padding-bottom:24px;">
        <span style="font-size:14px;font-weight:700;color:#0284c7;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:8px;">Controlled Environment Agriculture</span>
        <h1 style="font-size:32px;font-weight:800;color:#0f172a;line-height:1.25;margin:0 0 16px 0;letter-spacing:-0.5px;">Hydroponic System Management: Nutrient Formulas, EC, &amp; pH Optimization</h1>
        <p style="font-size:18px;color:#475569;margin:0;line-height:1.6;">
          Master precision soil-less plant cultivation. Formulate custom macro and micronutrient blends, manage electrical conductivity (EC), calibrate dosing reservoirs, and configure Dutch bucket, NFT, and vertical aeroponics.
        </p>
      </header>

      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">1. Essential Nutrient Solutions &amp; Chemistry</h2>
        <p>
          Hydroponics delivers essential plant nutrients directly to root zones via mineral water solutions. Complete formulations balance macro-elements (Nitrogen, Phosphorus, Potassium, Calcium, Magnesium, Sulfur) and micro-elements (Iron, Manganese, Zinc, Copper, Boron, Molybdenum).
        </p>
        <p>
          <strong>Electrical Conductivity (EC) Management:</strong> EC measures the concentration of total dissolved salts in millisiemens per centimeter (mS/cm). Leafy greens require an EC of 1.2 to 1.8 mS/cm, while heavy-feeding fruiting tomatoes demand 2.2 to 3.0 mS/cm. Maintain solution pH between 5.8 and 6.4 to maximize nutrient bioavailability.
        </p>
      </section>
    </article>
  `,

  '/pond-farming': `
    <article style="max-width:1000px;margin:0 auto;color:#1e293b;line-height:1.75;font-size:16px;">
      <header style="margin-bottom:36px;border-bottom:1px solid #e2e8f0;padding-bottom:24px;">
        <span style="font-size:14px;font-weight:700;color:#0284c7;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:8px;">Pond Aquaculture Handbook</span>
        <h1 style="font-size:32px;font-weight:800;color:#0f172a;line-height:1.25;margin:0 0 16px 0;letter-spacing:-0.5px;">Earthen Pond Fish Farming &amp; Polyculture Management</h1>
        <p style="font-size:18px;color:#475569;margin:0;line-height:1.6;">
          Complete guide for semi-intensive and commercial earthen pond management. Master pond bottom preparation, agricultural liming, organic manuring, Indian Major Carp polyculture layering, and nocturnal dissolved oxygen aeration.
        </p>
      </header>

      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">1. Earthen Pond Preparation &amp; Soil Chemistry</h2>
        <p>
          Successful pond aquaculture begins with soil disinfection and conditioning before filling with water:
        </p>
        <ol style="padding-left:24px;margin-bottom:16px;">
          <li style="margin-bottom:8px;"><strong>Sun Drying:</strong> Drain pond completely and sun-dry the pond bottom until soil cracks to a depth of 2–3 inches to oxidize accumulated organic sludge and eradicate parasitic pathogens.</li>
          <li style="margin-bottom:8px;"><strong>Liming:</strong> Apply Quicklime (CaO) or Agricultural Limestone (CaCO3) at 250 to 500 kg per acre depending on soil pH. Liming neutralizes soil acidity, sterilizes wild fish eggs, and supplies bicarbonate alkalinity buffer.</li>
          <li><strong>Phytoplankton Inoculation:</strong> Apply decomposed cow manure (1,000 kg/acre) or fermented mustard oil cake alongside urea and single superphosphate (SSP) to produce a rich natural bloom of zooplankton and rotifers.</li>
        </ol>
      </section>

      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">2. Indian Major Carp (IMC) Polyculture Species Layering</h2>
        <p>
          Polyculture maximizes primary pond productivity across all ecological strata:
        </p>
        <ul style="padding-left:24px;color:#334155;">
          <li><strong>Surface Layer (Catla / Silver Carp):</strong> Feeds voraciously on surface zooplankton and phytoplankton. Stocked at 30% to 35% of total pond population.</li>
          <li><strong>Mid-Water Column (Rohu / Grass Carp):</strong> Feeds on column plankton and soft aquatic vegetation. Stocked at 35% to 40% of population.</li>
          <li><strong>Bottom Layer (Mrigal / Common Carp):</strong> Grazes on organic detritus, benthic insects, and fallen feed pellets. Stocked at 25% to 30% of population.</li>
        </ul>
      </section>

      <!-- Section 3: Essential Earthen Pond Machinery & Hardware Guide -->
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">3. Essential Earthen Pond Machinery &amp; Equipment Guide</h2>
        <p>
          Moving from subsistence pond farming (1–2 tons/ha) to commercial high-density production (6–12 tons/ha) requires purpose-built aquaculture machinery to safeguard dissolved oxygen, manage benthic muck, and automate operations:
        </p>

        <div style="display:flex;flex-direction:column;gap:20px;margin-top:20px;">
          <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;padding:20px;">
            <h3 style="font-size:18px;font-weight:700;color:#0f172a;margin:0 0 8px 0;">A. Paddle Wheel Aerators (2HP / 4-Impeller &amp; 6-Impeller)</h3>
            <p style="margin:0 0 10px 0;color:#334155;">
              <strong>Operating Principle:</strong> High-speed nylon and polypropylene blades violently splash surface pond water into atmospheric mist while simultaneously driving a directional surface current. This de-stratifies sharp daytime thermal layers, driving oxygen-rich water to the anoxic pond bottom while sweeping accumulated sediment toward the center drain.
            </p>
            <p style="margin:0 0 10px 0;color:#334155;">
              <strong>Sizing Benchmark:</strong> Deploy <strong>1.0 HP of aeration per 1,000 kg</strong> of anticipated harvest biomass. For a 4-ton/acre carp pond, deploy two 2.0 HP 4-impeller units placed diagonally to create a circular vortex. Operate nocturnal aeration from 11:00 PM to 06:00 AM when photosynthesis is zero.
            </p>
            <div style="background:#f8fafc;padding:12px;border-radius:6px;font-size:14px;color:#475569;">
              <strong>Specification Standard:</strong> Cast iron or SS304 frame, bevel gearbox with synthetic lubricant, high-density polyethylene (HDPE) pontoon floats, and 100% copper-wound IP55 motors.
            </div>
          </div>

          <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;padding:20px;">
            <h3 style="font-size:18px;font-weight:700;color:#0f172a;margin:0 0 8px 0;">B. Submersible Pond Bottom Sludge Cleaners &amp; Dredgers</h3>
            <p style="margin:0 0 10px 0;color:#334155;">
              <strong>Operating Principle:</strong> Heavy-duty submersible cutter slurry pumps mounted on floating pontoons or guided via telescopic aluminum booms. Tungsten-carbide cutter teeth break up hard bottom silt, pumping anaerobic black muck (decaying feed and feces) out through 3-inch lay-flat hoses to drying bunds.
            </p>
            <p style="margin:0 0 10px 0;color:#334155;">
              <strong>Aquaculture Benefit:</strong> Eliminates lethal hydrogen sulfide (H2S), methane (CH4), and un-ionized ammonia (NH3) pockets from the pond bottom without requiring expensive complete pond dewatering or fish transfer.
            </p>
          </div>

          <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;padding:20px;">
            <h3 style="font-size:18px;font-weight:700;color:#0f172a;margin:0 0 8px 0;">C. Knotless Nylon Seine &amp; Pond Drag Nets</h3>
            <p style="margin:0 0 10px 0;color:#334155;">
              <strong>Operating Principle:</strong> Commercial drag netting manufactured with Raschel knotless nylon netting. The smooth diamond mesh protects delicate fish slime coats and scales from friction abrasions, eliminating post-harvest fungal Saprolegnia infections and bacterial ulcers.
            </p>
            <p style="margin:0 0 10px 0;color:#334155;">
              <strong>Rigging Specifications:</strong> Heavy lead bottom sinker chain to keep the net hugging the earthen floor mud contours, coupled with high-buoyancy closed-cell PVC top floats to prevent fish from leaping over the top line during seining.
            </p>
          </div>

          <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;padding:20px;">
            <h3 style="font-size:18px;font-weight:700;color:#0f172a;margin:0 0 8px 0;">D. High-Volume Submersible Axial Dewatering Pumps</h3>
            <p style="margin:0 0 10px 0;color:#334155;">
              <strong>Operating Principle:</strong> Low-head, high-discharge axial-flow impeller pumps engineered to transfer massive water volumes (100 to 300 m³/hr) with minimal electrical wattage. Used for seasonal pond filling from canals or rivers, emergency flushing, and rapid pre-harvest dewatering.
            </p>
          </div>

          <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;padding:20px;">
            <h3 style="font-size:18px;font-weight:700;color:#0f172a;margin:0 0 8px 0;">E. Solar &amp; Electric Programmable Automatic Fish Feeders</h3>
            <p style="margin:0 0 10px 0;color:#334155;">
              <strong>Operating Principle:</strong> Weatherproof stainless steel or polyethylene hopper (50 kg to 150 kg pellet capacity) equipped with a 12V DC timer controller and high-speed broadcast spreader disc. Disperses floating pellets in a 120-degree or 360-degree arc across 15 to 25 meters of pond surface, ensuring equal feed access for all fish and reducing FCR by 0.2 to 0.3.
            </p>
          </div>

          <div style="background:#ffffff;border:1px solid #cbd5e1;border-radius:10px;padding:20px;">
            <h3 style="font-size:18px;font-weight:700;color:#0f172a;margin:0 0 8px 0;">F. Insulated Live Fish Transport Hauling Tanks</h3>
            <p style="margin:0 0 10px 0;color:#334155;">
              <strong>Operating Principle:</strong> Heavy-duty fiberglass (FRP) tanks insulated with 50mm polyurethane foam (PUF) core to maintain steady water temperatures during highway transit. Features integrated liquid oxygen micro-diffuser hoses, anti-slosh top baffles, and bottom quick-opening knife gate valves for rapid live fish unloading at wholesale markets.
            </p>
          </div>
        </div>
      </section>

      <!-- Section 4: Earthen Pond Machinery Sizing Benchmark Matrix -->
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">4. Earthen Pond Machinery Sizing &amp; Electrical Benchmark Matrix</h2>
        <div style="overflow-x:auto;margin:20px 0;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;text-align:left;">
            <thead>
              <tr style="background:#0f172a;color:#ffffff;">
                <th style="padding:12px;border:1px solid #334155;">Equipment Unit</th>
                <th style="padding:12px;border:1px solid #334155;">Rated Specification</th>
                <th style="padding:12px;border:1px solid #334155;">Pond Sizing Formula</th>
                <th style="padding:12px;border:1px solid #334155;">Operating Protocol</th>
                <th style="padding:12px;border:1px solid #334155;">Routine Maintenance</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background:#ffffff;border-bottom:1px solid #e2e8f0;">
                <td style="padding:12px;border:1px solid #e2e8f0;font-weight:700;">Paddle Wheel Aerator</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">2.0 HP (1.5 kW), 4-Impeller, 105 RPM</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">1.0 HP per 1,000 kg harvest biomass (~2 units per acre)</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Run nightly 11:00 PM to 06:00 AM + cloudy afternoons</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Check gearbox oil level monthly, replace worn nylon bearings</td>
              </tr>
              <tr style="background:#f8fafc;border-bottom:1px solid #e2e8f0;">
                <td style="padding:12px;border:1px solid #e2e8f0;font-weight:700;">Pond Sludge Dredger</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">3.0 HP (2.2 kW) Cutter Vortex Pump</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">1 pump covers 1.0 to 5.0 acres modular rotation</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Operate monthly in central accumulation trench</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Inspect tungsten cutter blade sharpness every 100 operating hours</td>
              </tr>
              <tr style="background:#ffffff;border-bottom:1px solid #e2e8f0;">
                <td style="padding:12px;border:1px solid #e2e8f0;font-weight:700;">Knotless Seine Drag Net</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">50m – 100m Length &times; 3.0m Depth</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Net length must equal 1.25 &times; max pond diagonal width</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Slow uniform haul at dawn to minimize fish panic</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Wash with freshwater and shade dry completely after every harvest</td>
              </tr>
              <tr style="background:#f8fafc;border-bottom:1px solid #e2e8f0;">
                <td style="padding:12px;border:1px solid #e2e8f0;font-weight:700;">Axial Dewatering Pump</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">5.0 HP (3.7 kW), 150–250 m³/hr discharge</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">1 pump drains 1 acre pond (1.5m depth) within 24–36 hours</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Seasonal filling, water exchange, and harvest drain</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Clean intake suction strainer basket bi-weekly</td>
              </tr>
              <tr style="background:#ffffff;border-bottom:1px solid #e2e8f0;">
                <td style="padding:12px;border:1px solid #e2e8f0;font-weight:700;">Solar Broadcast Feeder</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">100 kg hopper, 30W solar panel + 12V battery</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">1 automatic feeder serves 0.5 to 1.0 acre water surface</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Timed 4–6 feedings per day between 08:00 AM and 05:00 PM</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Keep hopper seal clean; inspect battery voltage monthly</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Section 5: Call to Action -->
      <section style="background:linear-gradient(135deg, #0f172a 0%, #1e293b 100%);color:#ffffff;padding:28px;border-radius:12px;margin-bottom:32px;">
        <h2 style="font-size:20px;font-weight:700;color:#ffffff;margin:0 0 8px 0;">Looking for Earthen Pond Machinery Quotations?</h2>
        <p style="font-size:15px;color:#cbd5e1;margin:0 0 16px 0;">Modern Fisheries supplies factory-tested paddle wheel aerators, submersible bottom muck dredgers, knotless drag nets, and solar fish feeders with doorstep freight across India.</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <a href="/equipment-finder" style="background:#0284c7;color:#ffffff;padding:10px 20px;border-radius:6px;font-weight:700;text-decoration:none;font-size:14px;">Open Equipment Sizing Finder &rarr;</a>
          <a href="/calculators" style="background:#334155;color:#ffffff;padding:10px 20px;border-radius:6px;font-weight:700;text-decoration:none;font-size:14px;">Calculate Lime &amp; Fertilizer Sizing &rarr;</a>
        </div>
      </section>
    </article>
  `,

  '/fish-diseases': `
    <article style="max-width:1000px;margin:0 auto;color:#1e293b;line-height:1.75;font-size:16px;">
      <header style="margin-bottom:36px;border-bottom:1px solid #e2e8f0;padding-bottom:24px;">
        <span style="font-size:14px;font-weight:700;color:#0284c7;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:8px;">Aquaculture Veterinary &amp; Pathology Guide</span>
        <h1 style="font-size:32px;font-weight:800;color:#0f172a;line-height:1.25;margin:0 0 16px 0;letter-spacing:-0.5px;">Fish Disease Diagnosis &amp; Treatment Handbook: Prevention, Symptoms &amp; Field Dosages</h1>
        <p style="font-size:18px;color:#475569;margin:0;line-height:1.6;">
          Authoritative technical manual for commercial fish farmers, hatchery operators, and aquaculture biologists. Identify, diagnose, and treat common and lethal freshwater fish pathogens with verified clinical immersion bath protocols, diagnostic microscopy, and quarantine biosecurity.
        </p>
      </header>

      <!-- Section 1: Comprehensive Diagnostic Matrix -->
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">1. Diagnostic Matrix of Major Freshwater Fish Pathogens</h2>
        <p>
          Fish disease outbreaks in intensive ponds, Biofloc tanks, and RAS systems are typically triggered by environmental stressors (sub-lethal hypoxia, unionized ammonia spikes, sudden pH shifts, or mechanical net abrasions). Rapid visual triage and microscopic examination are critical to halt transmission before severe mortality occurs:
        </p>
        <div style="overflow-x:auto;margin:20px 0;">
          <table style="width:100%;border-collapse:collapse;text-align:left;font-size:14px;">
            <thead>
              <tr style="background:#0f172a;color:#ffffff;">
                <th style="padding:10px;border:1px solid #334155;">Pathogen &amp; Scientific Name</th>
                <th style="padding:10px;border:1px solid #334155;">Type</th>
                <th style="padding:10px;border:1px solid #334155;">Primary Clinical Symptoms</th>
                <th style="padding:10px;border:1px solid #334155;">Susceptible Species</th>
                <th style="padding:10px;border:1px solid #334155;">Approved Veterinary Protocol</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background:#ffffff;border-bottom:1px solid #e2e8f0;">
                <td style="padding:10px;border:1px solid #e2e8f0;font-weight:700;">Ich / White Spot<br /><span style="font-size:12px;color:#64748b;">Ichthyophthirius multifiliis</span></td>
                <td style="padding:10px;border:1px solid #e2e8f0;"><span style="background:#fee2e2;color:#991b1b;padding:2px 8px;border-radius:4px;font-weight:600;font-size:12px;">Parasitic</span></td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Salt-grain-sized white nodules on fins and skin, flashing against tank edges, clamped fins, gasping at surface.</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">IMC (Rohu, Catla), Tilapia, Pangasius, Carp</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Non-iodized salt bath (20–30 g/L for 10–15 min) or continuous 3–5 ppt pond salinity; Formalin at 25 ppm.</td>
              </tr>
              <tr style="background:#f8fafc;border-bottom:1px solid #e2e8f0;">
                <td style="padding:10px;border:1px solid #e2e8f0;font-weight:700;">Bacterial Gill Rot / Columnaris<br /><span style="font-size:12px;color:#64748b;">Flavobacterium columnare</span></td>
                <td style="padding:10px;border:1px solid #e2e8f0;"><span style="background:#fef3c7;color:#92400e;padding:2px 8px;border-radius:4px;font-weight:600;font-size:12px;">Bacterial</span></td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Frayed, necrotic white or yellowish gill filaments, excessive mucus, saddleback lesions, extreme respiratory distress.</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Tilapia, Catfish (Magur, Singhi), IMC, Trout</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Potassium Permanganate (KMnO4) bath at 2–4 mg/L or Oxytetracycline feed dressing at 50–75 mg/kg body weight for 7 days.</td>
              </tr>
              <tr style="background:#ffffff;border-bottom:1px solid #e2e8f0;">
                <td style="padding:10px;border:1px solid #e2e8f0;font-weight:700;">Fin &amp; Tail Rot<br /><span style="font-size:12px;color:#64748b;">Aeromonas &amp; Pseudomonas spp.</span></td>
                <td style="padding:10px;border:1px solid #e2e8f0;"><span style="background:#fef3c7;color:#92400e;padding:2px 8px;border-radius:4px;font-weight:600;font-size:12px;">Bacterial</span></td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Ragged, disintegrating fin rays with red inflamed margins, fin erosion exposing bony rays, feed refusal.</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">All freshwater species, especially in high organic load tanks</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Immediate 30–50% water exchange; KMnO4 bath at 2 mg/L; apply topical povidone-iodine to valuable broodstock.</td>
              </tr>
              <tr style="background:#f8fafc;border-bottom:1px solid #e2e8f0;">
                <td style="padding:10px;border:1px solid #e2e8f0;font-weight:700;">Epizootic Ulcerative Syndrome (EUS)<br /><span style="font-size:12px;color:#64748b;">Aphanomyces invadans</span></td>
                <td style="padding:10px;border:1px solid #e2e8f0;"><span style="background:#f3e8ff;color:#6b21a8;padding:2px 8px;border-radius:4px;font-weight:600;font-size:12px;">Fungal / Oomycete</span></td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Deep hemorrhagic red circular ulcers, raw exposed muscle cavities, sloughing skin, severe lethargy.</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Snakehead (Channa), Puntius, Rohu, Mrigal</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Pond liming with agricultural lime (CaCO3) or quicklime (CaO) at 200–400 kg/ha; CIFAX liquid formulation treatment.</td>
              </tr>
              <tr style="background:#ffffff;border-bottom:1px solid #e2e8f0;">
                <td style="padding:10px;border:1px solid #e2e8f0;font-weight:700;">Cotton Wool Disease (Saprolegniasis)<br /><span style="font-size:12px;color:#64748b;">Saprolegnia parasitica</span></td>
                <td style="padding:10px;border:1px solid #e2e8f0;"><span style="background:#f3e8ff;color:#6b21a8;padding:2px 8px;border-radius:4px;font-weight:600;font-size:12px;">Fungal</span></td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Fluffy, cotton-like greyish-white filamentous tufts covering unfertilized eggs or damaged epidermis in cold seasons.</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Carp broodstock, hatchery egg incubation trays, Pangasius</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Hydrogen Peroxide (H2O2 3%) bath at 250–500 mg/L for 15 min; Salt bath (20 g/L) for 10 min.</td>
              </tr>
              <tr style="background:#f8fafc;border-bottom:1px solid #e2e8f0;">
                <td style="padding:10px;border:1px solid #e2e8f0;font-weight:700;">Infectious Dropsy &amp; Ascites<br /><span style="font-size:12px;color:#64748b;">Aeromonas hydrophila &amp; Edwardsiella</span></td>
                <td style="padding:10px;border:1px solid #e2e8f0;"><span style="background:#fef3c7;color:#92400e;padding:2px 8px;border-radius:4px;font-weight:600;font-size:12px;">Bacterial</span></td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Massive abdominal fluid swelling (pine-cone appearance as scales stick out), protruding pop-eye (exophthalmia), pale gills.</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Goldfish, Koi, Indian Major Carps, Clarias Catfish</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Isolate infected fish immediately; medicated feed with Enrofloxacin or Oxytetracycline; Epsom salt bath (1 g/L) to draw out excess fluid.</td>
              </tr>
              <tr style="background:#ffffff;border-bottom:1px solid #e2e8f0;">
                <td style="padding:10px;border:1px solid #e2e8f0;font-weight:700;">Argulus (Fish Lice)<br /><span style="font-size:12px;color:#64748b;">Argulus foliaceus</span></td>
                <td style="padding:10px;border:1px solid #e2e8f0;"><span style="background:#fee2e2;color:#991b1b;padding:2px 8px;border-radius:4px;font-weight:600;font-size:12px;">Crustacean Ectoparasite</span></td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Flat, disc-shaped saucer-like green parasites (4–8mm) moving across skin, localized bleeding puncture sores, erratic darting.</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Rohu, Catla, Common Carp, Grass Carp</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Emamectin benzoate (0.05 mg/kg biomass in feed) or approved organophosphate dip under veterinary prescription; short KMnO4 dip.</td>
              </tr>
              <tr style="background:#f8fafc;border-bottom:1px solid #e2e8f0;">
                <td style="padding:10px;border:1px solid #e2e8f0;font-weight:700;">Gill &amp; Skin Flukes<br /><span style="font-size:12px;color:#64748b;">Dactylogyrus &amp; Gyrodactylus</span></td>
                <td style="padding:10px;border:1px solid #e2e8f0;"><span style="background:#fee2e2;color:#991b1b;padding:2px 8px;border-radius:4px;font-weight:600;font-size:12px;">Trematode Parasite</span></td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Microscopic worms hooked into gill filaments or skin, rapid opercular movement, excessive mucus production, surface gasping.</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Fingerlings of all freshwater species, hatchery nursery tanks</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Praziquantel bath at 2–5 mg/L or Formalin immersion bath at 150–250 ppm for 30–60 minutes with vigorous aeration.</td>
              </tr>
              <tr style="background:#ffffff;border-bottom:1px solid #e2e8f0;">
                <td style="padding:10px;border:1px solid #e2e8f0;font-weight:700;">Koi Herpesvirus (KHV)<br /><span style="font-size:12px;color:#64748b;">Cyprinid herpesvirus 3 (CyHV-3)</span></td>
                <td style="padding:10px;border:1px solid #e2e8f0;"><span style="background:#f1f5f9;color:#0f172a;border:1px solid #cbd5e1;padding:2px 8px;border-radius:4px;font-weight:700;font-size:12px;">Viral (OIE Notifiable)</span></td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Severe necrotic gill patches (red/white mottling), sunken eyes, rapid mass mortality (80–100%) between 18°C and 28°C.</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Common Carp, Koi Carp</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">No chemical cure exists. Mandatory strict farm quarantine, total pond isolation, SPF seed sourcing, and strict equipment disinfection.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Section 2: Clinical Treatment Protocols & Dosages -->
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">2. Clinical Chemical Treatment Protocols &amp; Immersion Bath Dosages</h2>
        <p>
          Always calculate total water volume accurately before dosing therapeutic chemicals. <strong>Never treat fish in stagnant or hypoxic water; provide supplemental aeration during all dip and bath procedures:</strong>
        </p>
        <div style="overflow-x:auto;margin:20px 0;">
          <table style="width:100%;border-collapse:collapse;font-size:14px;text-align:left;">
            <thead>
              <tr style="background:#0f172a;color:#ffffff;">
                <th style="padding:10px;border:1px solid #334155;">Therapeutic Agent</th>
                <th style="padding:10px;border:1px solid #334155;">Treatment Method</th>
                <th style="padding:10px;border:1px solid #334155;">Recommended Dosage</th>
                <th style="padding:10px;border:1px solid #334155;">Duration</th>
                <th style="padding:10px;border:1px solid #334155;">Key Safety Precaution</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background:#ffffff;border-bottom:1px solid #e2e8f0;">
                <td style="padding:10px;border:1px solid #e2e8f0;font-weight:700;">Non-Iodized Salt (NaCl)</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Short-Duration Dip</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">20 to 30 g/L (2.0–3.0%)</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">10 to 15 minutes</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Remove fish immediately if they lose equilibrium or roll sideways.</td>
              </tr>
              <tr style="background:#f8fafc;border-bottom:1px solid #e2e8f0;">
                <td style="padding:10px;border:1px solid #e2e8f0;font-weight:700;">Non-Iodized Salt (NaCl)</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Prolonged Pond Bath</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">3 to 5 kg per 1,000 L (3–5 ppt)</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Continuous (7–10 days)</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Osmoregulatory relief for gill stress and nitrite toxicity barrier.</td>
              </tr>
              <tr style="background:#ffffff;border-bottom:1px solid #e2e8f0;">
                <td style="padding:10px;border:1px solid #e2e8f0;font-weight:700;">Potassium Permanganate (KMnO4)</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Pond / Tank Water Bath</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">2.0 to 4.0 mg/L (PPM)</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Maintain purple hue &gt;4 hrs</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Strong oxidizer. Deactivates rapidly in high organic muck; neutralize with H2O2 if over-dosed.</td>
              </tr>
              <tr style="background:#f8fafc;border-bottom:1px solid #e2e8f0;">
                <td style="padding:10px;border:1px solid #e2e8f0;font-weight:700;">Hydrogen Peroxide (H2O2)</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Immersion Bath</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">250 to 500 mg/L</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">15 to 30 minutes</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Eco-friendly fungicide; breaks down into pure water and oxygen with zero toxic residue.</td>
              </tr>
              <tr style="background:#ffffff;border-bottom:1px solid #e2e8f0;">
                <td style="padding:10px;border:1px solid #e2e8f0;font-weight:700;">Formalin (37% Formaldehyde)</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Short Immersion Bath</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">150 to 250 mg/L</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">30 to 60 minutes</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Depletes dissolved oxygen by 1 mg/L for every 5 ppm applied. Run maximum aeration!</td>
              </tr>
              <tr style="background:#f8fafc;border-bottom:1px solid #e2e8f0;">
                <td style="padding:10px;border:1px solid #e2e8f0;font-weight:700;">Oxytetracycline (OTC)</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Medicated Feed Dressing</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">50 to 75 mg / kg live fish weight</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">7 to 10 consecutive days</td>
                <td style="padding:10px;border:1px solid #e2e8f0;">Bind to dry pellets using edible vegetable oil or gelatin. Observe mandatory 21-day withdrawal period before harvest.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Section 3: Diagnostic Instruments & Biosecurity Gear -->
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">3. Essential Diagnostic &amp; Biosecurity Equipment</h2>
        <p>
          Preventative biosecurity and rapid diagnostic instrumentation are the primary barriers protecting commercial aquaculture operations against catastrophic disease outbreaks:
        </p>

        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px;margin:20px 0;">
          <div style="background:#ffffff;border:1px solid #cbd5e1;padding:18px;border-radius:10px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 6px 0;">Optical Dissolved Oxygen (DO) Field Meter</h3>
            <p style="font-size:14px;color:#475569;margin:0 0 8px 0;">Luminescent sensor probe requiring no electrolyte replenishment. Delivers instant ±0.01 mg/L accuracy to catch sub-lethal hypoxia before opportunistic pathogens strike.</p>
            <strong style="font-size:13px;color:#0284c7;">Target: Maintain DO &gt; 5.0 mg/L continuously</strong>
          </div>

          <div style="background:#ffffff;border:1px solid #cbd5e1;padding:18px;border-radius:10px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 6px 0;">Aquaculture Multi-Parameter Photometer</h3>
            <p style="font-size:14px;color:#475569;margin:0 0 8px 0;">Digital reagent colorimeter testing Total Ammonia Nitrogen (TAN), Nitrite (NO2-), Nitrate (NO3-), and Alkalinity to identify chemical gill burning.</p>
            <strong style="font-size:13px;color:#0284c7;">Target: TAN &lt; 0.5 mg/L, NO2 &lt; 0.2 mg/L</strong>
          </div>

          <div style="background:#ffffff;border:1px solid #cbd5e1;padding:18px;border-radius:10px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 6px 0;">Compound Clinical Biological Microscope</h3>
            <p style="font-size:14px;color:#475569;margin:0 0 8px 0;">40x to 1000x magnification with mechanical stage for fresh gill snips and skin scrapes to identify mobile protozoan parasites (Trichodina, Ich, Dactylogyrus).</p>
            <strong style="font-size:13px;color:#0284c7;">Routine: Weekly microscopic scrape audits</strong>
          </div>

          <div style="background:#ffffff;border:1px solid #cbd5e1;padding:18px;border-radius:10px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 6px 0;">Industrial Germicidal UV-C In-line Barriers</h3>
            <p style="font-size:14px;color:#475569;margin:0 0 8px 0;">Low-pressure amalgam quartz units delivering &gt;35 mJ/cm² dosage to disinfect incoming hatchery water supplies, quarantine systems, and live transport recycling loops.</p>
            <strong style="font-size:13px;color:#0284c7;">Target: 99.9% pathogen microbial inactivation</strong>
          </div>
        </div>
      </section>

      <!-- Section 4: Quarantine & Farm Biosecurity Protocol -->
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">4. Three-Step Quarantine Routine for New Fingerlings</h2>
        <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:10px;padding:20px;">
          <ol style="margin:0;padding-left:24px;color:#334155;">
            <li style="margin-bottom:12px;"><strong>Visual Inspection &amp; Temperature Acclimatization:</strong> Float oxygen transport bags in the quarantine tank for 20–30 minutes until water temperatures equilibrate to within ±1°C before opening. Inspect gill movement and look for fin pinching.</li>
            <li style="margin-bottom:12px;"><strong>Prophylactic Immersion Dip:</strong> Give fingerlings a 5–10 minute prophylactic dip in a 20 g/L (2%) non-iodized salt bath with mild aeration. This burns off external protozoan hitchhikers (Ich, Costia, Trichodina) without stressing internal organs.</li>
            <li style="margin-bottom:8px;"><strong>14-Day Quarantine Isolation:</strong> House fingerlings in a dedicated quarantine tank equipped with standalone filtration and UV-C sterilization for 14 days. Monitor feed consumption, verify normal swimming posture, and test water parameters before releasing fish into production systems.</li>
          </ol>
        </div>
      </section>

      <!-- Section 5: Fish Disease Frequently Asked Questions -->
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">5. Fish Disease Diagnosis &amp; Veterinary FAQ</h2>
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div style="background:#ffffff;border:1px solid #e2e8f0;padding:16px;border-radius:8px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 6px 0;">What are the earliest warning signs of disease in commercial fish tanks?</h3>
            <p style="font-size:14px;color:#334155;margin:0;line-height:1.6;">The earliest behavioral indicator is sudden feed refusal or reduction in feeding vigor. Other subtle signs include fish grouping near water inlets or aeration stones (piping for air), flashing against tank walls, clamped dorsal and pectoral fins, excess body mucus, and erratic solitary swimming away from the main school.</p>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;padding:16px;border-radius:8px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 6px 0;">How do I safely calculate Potassium Permanganate (KMnO4) bath dosages?</h3>
            <p style="font-size:14px;color:#334155;margin:0;line-height:1.6;">Calculate exact tank volume in cubic meters. Apply 2.0 to 4.0 grams of KMnO4 per cubic meter (1 m³ = 1,000 Litres). Pre-dissolve KMnO4 crystals completely in a bucket of warm water before broadcasting evenly across the pond surface. Ensure the water retains a wine-red or pinkish hue for at least 4 hours. If it turns muddy brown within 30 minutes, organic matter has neutralized the chemical.</p>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;padding:16px;border-radius:8px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 6px 0;">How can I differentiate between Bacterial Gill Rot and sub-lethal hypoxia?</h3>
            <p style="font-size:14px;color:#334155;margin:0;line-height:1.6;">In sub-lethal hypoxia (low dissolved oxygen), all fish gasp at the surface simultaneously during dawn, but their gill filaments appear cherry-red and intact. In Bacterial Gill Rot (Columnaris), individual fish show localized white or yellowish necrotic patches, ragged ragged filaments covered in grey mucus, and continue gasping even when dissolved oxygen levels are elevated above 6.0 mg/L.</p>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;padding:16px;border-radius:8px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 6px 0;">Why do common salt baths work effectively against freshwater fish parasites?</h3>
            <p style="font-size:14px;color:#334155;margin:0;line-height:1.6;">Freshwater fish and protozoan parasites maintain internal body osmolarity around 9 to 10 ppt. When placed in a 20 to 30 ppt (2–3%) salt bath, rapid osmotic shock draws water out of microscopic single-celled parasites (Ich, Costia, Trichodina), causing them to collapse and detach. Freshwater fish tolerate this osmotic shift for 10–15 minutes while shedding compromised skin mucus.</p>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;padding:16px;border-radius:8px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 6px 0;">What biosecurity measures prevent introducing pathogens into high-density RAS or Biofloc systems?</h3>
            <p style="font-size:14px;color:#334155;margin:0;line-height:1.6;">Strict biosecurity requires: 1) Sourcing certified disease-free (SPF) fingerlings, 2) Maintaining dedicated nets and buckets per tank, sanitized in 200 ppm chlorine between uses, 3) Implementing a 14-day quarantine tank routine for all new stock, 4) Operating inline germicidal UV-C sterilizers at &gt;30 mJ/cm², and 5) Maintaining disinfectant footwear footbaths at farm entry points.</p>
          </div>
        </div>
      </section>

      <section style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:10px;padding:20px;margin-bottom:32px;">
        <h3 style="font-size:18px;font-weight:700;color:#0369a1;margin:0 0 10px 0;">Aquaculture Veterinary Support &amp; Diagnostic Consultations</h3>
        <p style="margin:0 0 12px 0;color:#475569;">Need emergency disease diagnosis or water quality troubleshooting? Connect with Modern Fisheries veterinary and technical specialists via WhatsApp or consult our interactive calculators.</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <a href="/calculators" style="background:#0284c7;color:#ffffff;padding:10px 20px;border-radius:6px;font-weight:700;text-decoration:none;font-size:14px;">Open Chemical Dosing Calculators &rarr;</a>
          <a href="https://wa.me/919748952342?text=Hello%20Modern%20Fisheries,%20I%20need%20emergency%20fish%20disease%20guidance." style="background:#16a34a;color:#ffffff;padding:10px 20px;border-radius:6px;font-weight:700;text-decoration:none;font-size:14px;">WhatsApp Veterinary Desk &rarr;</a>
        </div>
      </section>
    </article>
  `,

  '/feeding-management': `
    <article style="max-width:1000px;margin:0 auto;color:#1e293b;line-height:1.75;font-size:16px;">
      <header style="margin-bottom:36px;border-bottom:1px solid #e2e8f0;padding-bottom:24px;">
        <span style="font-size:14px;font-weight:700;color:#0284c7;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:8px;">Commercial Nutrition Handbook</span>
        <h1 style="font-size:32px;font-weight:800;color:#0f172a;line-height:1.25;margin:0 0 16px 0;letter-spacing:-0.5px;">Aquaculture Feed Management &amp; Feed Conversion Ratio (FCR) Sizing</h1>
        <p style="font-size:18px;color:#475569;margin:0;line-height:1.6;">
          Optimize feeding regimes, reduce feed costs, and accelerate fish growth rates. Calculate daily feeding rates as percentage of body weight, balance crude protein across life stages, and inspect feeding check trays.
        </p>
      </header>

      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">1. Feed Conversion Ratio (FCR) Optimization</h2>
        <p>
          Feed accounts for <strong>60% to 70%</strong> of total recurring operational expenses in commercial fish farming. Controlling Feed Conversion Ratio (FCR) is the single greatest determinant of farm profitability:
        </p>
        <div style="background:#f0f9ff;border:1px solid #bae6fd;padding:20px;border-radius:10px;margin:20px 0;">
          <p style="font-family:monospace;font-size:16px;color:#0c4a6e;background:#e0f2fe;padding:12px;border-radius:6px;margin:0 0 12px 0;">
            FCR = Total Feed Distributed (kg) &divide; Net Fish Biomass Gained (kg)
          </p>
          <p style="margin:0;color:#334155;font-size:15px;">
            A lower FCR indicates higher feed utilization. Commercial farmers target an FCR between <strong>1.1 and 1.4</strong> in modern biofloc/RAS systems, and <strong>1.4 to 1.8</strong> in earthen ponds.
          </p>
        </div>
      </section>

      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">2. Dietary Crude Protein (CP) Requirements by Growth Stage</h2>
        <ul style="padding-left:24px;color:#334155;">
          <li style="margin-bottom:8px;"><strong>Fry &amp; Early Nursery (0.5g – 5g):</strong> 40% – 45% Crude Protein micro-pellets (0.5mm – 1.0mm size) fed at 8% – 12% of total body weight daily across 4 to 6 feedings.</li>
          <li style="margin-bottom:8px;"><strong>Fingerlings (5g – 50g):</strong> 32% – 36% Crude Protein floating pellets (1.5mm – 2.0mm) fed at 4% – 6% of body weight daily across 3 feedings.</li>
          <li><strong>Grow-Out Stage (50g to Harvest):</strong> 28% – 32% Crude Protein floating pellets (3.0mm – 4.0mm) fed at 2% – 3% of body weight daily across 2 feedings.</li>
        </ul>
      </section>

      <!-- Section 3: Commercial Feed Manufacturing Machinery & Feeding Automation -->
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">3. Commercial Feed Manufacturing Machinery &amp; Automation</h2>
        <p>
          Large commercial aquaculture enterprises lower production costs by 20% to 35% through on-farm feed extrusion and automate daily feeding schedules:
        </p>

        <div style="display:flex;flex-direction:column;gap:16px;margin:20px 0;">
          <div style="background:#ffffff;border:1px solid #cbd5e1;padding:18px;border-radius:10px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 6px 0;">Small-Scale On-Farm Floating Feed Pellet Extruder</h3>
            <p style="font-size:14px;color:#475569;margin:0 0 8px 0;">
              High-shear single or twin-screw extrusion cooker producing 1.0mm to 6.0mm floating pellets. High temperature and pressure cook and gelatinize starches, providing 100% pellet buoyancy for &gt;12 hours on water. Output capacities range from 80 kg/hr to 350 kg/hr on 15 to 30 HP electric or diesel power.
            </p>
          </div>

          <div style="background:#ffffff;border:1px solid #cbd5e1;padding:18px;border-radius:10px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 6px 0;">Stainless Steel Hammer Mill Pulverizer</h3>
            <p style="font-size:14px;color:#475569;margin:0 0 8px 0;">
              High-speed rotating beaters pulverize raw soya, fishmeal, maize, and rice bran down to fine flour (60 to 80 mesh) to ensure consistent pellet binding and prevent extruder die clogging.
            </p>
          </div>

          <div style="background:#ffffff;border:1px solid #cbd5e1;padding:18px;border-radius:10px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 6px 0;">Solar / Electric Programmable Automatic Fish Feeders</h3>
            <p style="font-size:14px;color:#475569;margin:0 0 8px 0;">
              Automated broadcast spreaders programmed to feed fish at precise intervals throughout peak daytime metabolism. Delivers smaller, frequent meals that increase digestion efficiency and prevent water fouling.
            </p>
          </div>
        </div>
      </section>
    </article>
  `,

  '/calculators': `
    <article style="max-width:1000px;margin:0 auto;color:#1e293b;line-height:1.75;font-size:16px;">
      <!-- Header -->
      <header style="margin-bottom:36px;border-bottom:1px solid #e2e8f0;padding-bottom:24px;">
        <span style="font-size:14px;font-weight:700;color:#0284c7;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:8px;">Precision Aquaculture Engineering</span>
        <h1 style="font-size:32px;font-weight:800;color:#0f172a;line-height:1.25;margin:0 0 16px 0;letter-spacing:-0.5px;">Precision Aquaculture Calculators &amp; Engineering Sizing Handbook</h1>
        <p style="font-size:18px;color:#475569;margin:0;line-height:1.6;">
          Professional aquaculture mathematical models and operational calculators for commercial fish farm managers. Compute Feed Conversion Ratio (FCR), Biofloc Carbon-to-Nitrogen (C:N 15:1) molasses dosing, tank and pond water volumes, safe stocking biomass densities, chemical bath dosages, and batch harvest economics.
        </p>
      </header>

      <!-- Section 1: FCR Calculator & Feed Economics -->
      <section style="margin-bottom:44px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">1. Feed Conversion Ratio (FCR) Engineering &amp; Cost Analysis</h2>
        <p style="color:#334155;margin-bottom:16px;">
          The Feed Conversion Ratio (FCR) is the single most critical benchmark of financial efficiency in commercial aquaculture, measuring the dry kilograms of commercial feed required to produce exactly one kilogram of wet fish biomass. Because feed represents 60% to 75% of total operating expenditure, a 0.2 reduction in FCR can mean the difference between profit and loss.
        </p>

        <div style="background:#f8fafc;border:1px solid #cbd5e1;padding:20px;border-radius:10px;margin-bottom:20px;">
          <h3 style="font-size:17px;font-weight:700;color:#0369a1;margin:0 0 8px 0;">Mathematical Formula:</h3>
          <p style="font-family:monospace;font-size:16px;font-weight:600;color:#0f172a;margin:0 0 10px 0;background:#ffffff;padding:10px 14px;border-radius:6px;border:1px solid #e2e8f0;">
            FCR = Total Cumulative Feed Fed (kg) &divide; Net Harvest Biomass Gained (kg)
          </p>
          <p style="font-size:14px;color:#64748b;margin:0;">Where Net Biomass Gained = Final Live Harvest Weight (kg) &minus; Initial Stocking Fingerling Weight (kg).</p>
        </div>

        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;font-size:14px;">
          <thead>
            <tr style="background:#f1f5f9;color:#0f172a;text-align:left;">
              <th style="padding:10px 12px;border:1px solid #cbd5e1;">FCR Range</th>
              <th style="padding:10px 12px;border:1px solid #cbd5e1;">Performance Rating</th>
              <th style="padding:10px 12px;border:1px solid #cbd5e1;">Typical Culture System</th>
              <th style="padding:10px 12px;border:1px solid #cbd5e1;">Feed Cost / Ton Harvest (@ &#8377;50/kg)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;font-weight:700;color:#15803d;">1.00 &ndash; 1.20</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;color:#15803d;">World-Class Efficiency</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">Indoor Recirculating Aquaculture Systems (RAS), extruded micro-pellets</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;font-weight:600;">&#8377;50,000 &ndash; &#8377;60,000</td>
            </tr>
            <tr style="background:#f8fafc;">
              <td style="padding:10px 12px;border:1px solid #cbd5e1;font-weight:700;color:#0369a1;">1.21 &ndash; 1.40</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;color:#0369a1;">Optimal Commercial Target</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">Biofloc Technology (BFT) tarpaulin tanks (microbial floc grazing)</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;font-weight:600;">&#8377;60,500 &ndash; &#8377;70,000</td>
            </tr>
            <tr>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;font-weight:700;color:#d97706;">1.41 &ndash; 1.65</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;color:#d97706;">Acceptable Industry Standard</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">Intensive earthen ponds with paddlewheel aeration</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">&#8377;70,500 &ndash; &#8377;82,500</td>
            </tr>
            <tr style="background:#fef2f2;">
              <td style="padding:10px 12px;border:1px solid #cbd5e1;font-weight:700;color:#b91c1c;">1.70+</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;color:#b91c1c;">Suboptimal (Loss Risk)</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">Overfeeding, poor feed digestibility, water parameter stress</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;font-weight:600;color:#b91c1c;">&#8377;85,000 &ndash; &#8377;100,000+</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Section 2: Biofloc Carbon-to-Nitrogen (C:N) Molasses Calculator -->
      <section style="margin-bottom:44px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">2. Biofloc Carbon-to-Nitrogen (C:N 15:1) Molasses Dosing Calculator</h2>
        <p style="color:#334155;margin-bottom:16px;">
          In zero-exchange Biofloc tanks, heterotrophic bacteria assimilate toxic Total Ammonia Nitrogen (TAN) into microbial single-cell protein. To synthesize new bacterial biomass, these heterotrophs require a stoichiometric Carbon-to-Nitrogen (C:N) ratio of at least 15:1. Standard commercial feeds provide an average C:N ratio of only 9:1 to 10:1, creating a carbon deficit that must be supplemented daily with organic carbon sources like sugarcane molasses (approx. 50% carbon purity) or jaggery.
        </p>

        <div style="background:#f8fafc;border:1px solid #cbd5e1;padding:20px;border-radius:10px;margin-bottom:20px;">
          <h3 style="font-size:17px;font-weight:700;color:#0369a1;margin:0 0 8px 0;">Stoichiometric Dosing Derivation:</h3>
          <ul style="margin:0;padding-left:20px;color:#334155;font-size:15px;line-height:1.7;">
            <li><strong>Step 1: Calculate Daily Nitrogen (N) input:</strong> Fish feed protein contains 16% nitrogen. For feed mass <em>F</em> (grams) with crude protein percentage <em>CP%</em>: <br/><code style="background:#e2e8f0;padding:2px 6px;border-radius:4px;">Nitrogen Input (g) = F &times; (CP &divide; 100) &times; 0.16</code></li>
            <li><strong>Step 2: Total Carbon (C) needed for 15:1 ratio:</strong> <code style="background:#e2e8f0;padding:2px 6px;border-radius:4px;">Total C Needed (g) = Nitrogen Input (g) &times; 15</code></li>
            <li><strong>Step 3: Feed Carbon credit:</strong> Feed typically provides approximately 50% carbon by dry weight: <code style="background:#e2e8f0;padding:2px 6px;border-radius:4px;">Feed Carbon (g) = F &times; 0.50</code></li>
            <li><strong>Step 4: Carbon Deficit to supplement:</strong> <code style="background:#e2e8f0;padding:2px 6px;border-radius:4px;">Carbon Deficit (g) = Total C Needed &minus; Feed Carbon</code></li>
            <li><strong>Step 5: Molasses Dosage (50% carbon purity):</strong> <code style="background:#e2e8f0;padding:2px 6px;border-radius:4px;">Molasses Dose (g) = Carbon Deficit (g) &divide; 0.50</code></li>
          </ul>
        </div>

        <h3 style="font-size:18px;font-weight:700;color:#0f172a;margin-bottom:12px;">Ready-Reckoner: Molasses Dosing Per 10 kg Daily Commercial Feed</h3>
        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;font-size:14px;">
          <thead>
            <tr style="background:#f1f5f9;color:#0f172a;text-align:left;">
              <th style="padding:10px 12px;border:1px solid #cbd5e1;">Feed Crude Protein (%)</th>
              <th style="padding:10px 12px;border:1px solid #cbd5e1;">Daily Nitrogen Load (g)</th>
              <th style="padding:10px 12px;border:1px solid #cbd5e1;">Total Carbon Target (15:1)</th>
              <th style="padding:10px 12px;border:1px solid #cbd5e1;">Recommended Molasses Dose (g/day)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;font-weight:600;">24% CP (Grow-out Carp/Pangasius)</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">384 g</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">5,760 g</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;font-weight:700;color:#0284c7;">1,520 g (1.52 kg)</td>
            </tr>
            <tr style="background:#f8fafc;">
              <td style="padding:10px 12px;border:1px solid #cbd5e1;font-weight:600;">28% CP (Tilapia Grow-out)</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">448 g</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">6,720 g</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;font-weight:700;color:#0284c7;">3,440 g (3.44 kg)</td>
            </tr>
            <tr>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;font-weight:600;">32% CP (Juvenile Tilapia/Catfish)</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">512 g</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">7,680 g</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;font-weight:700;color:#0284c7;">5,360 g (5.36 kg)</td>
            </tr>
            <tr style="background:#f8fafc;">
              <td style="padding:10px 12px;border:1px solid #cbd5e1;font-weight:600;">35% CP (Shrimp / Nursery Fry)</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">560 g</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">8,400 g</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;font-weight:700;color:#0284c7;">6,800 g (6.80 kg)</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Section 3: Tank & Pond Water Volume Sizing -->
      <section style="margin-bottom:44px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">3. Culture Tank &amp; Farm Pond Water Volume Sizing</h2>
        <p style="color:#334155;margin-bottom:16px;">
          Accurate volume calculation is essential for correctly measuring chemical prophylactic baths, probiotic inoculations, water exchange rates, and safe stocking densities.
        </p>

        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px;margin-bottom:20px;">
          <div style="background:#ffffff;border:1px solid #cbd5e1;padding:18px;border-radius:10px;">
            <h3 style="font-size:17px;font-weight:700;color:#0369a1;margin:0 0 8px 0;">Circular Tarpaulin Tanks</h3>
            <p style="font-family:monospace;font-size:14px;background:#f8fafc;padding:8px;border-radius:6px;border:1px solid #e2e8f0;margin:0 0 8px 0;">Volume = &pi; &times; (Diameter &divide; 2)&sup2; &times; Water Depth</p>
            <p style="font-size:13px;color:#64748b;margin:0;">1 cubic meter (m&sup3;) = 1,000 Litres = 264.17 US Gallons. Account for 10-15 cm safety freeboard from the top edge.</p>
          </div>
          <div style="background:#ffffff;border:1px solid #cbd5e1;padding:18px;border-radius:10px;">
            <h3 style="font-size:17px;font-weight:700;color:#0369a1;margin:0 0 8px 0;">Rectangular Culture &amp; Nursery Tanks</h3>
            <p style="font-family:monospace;font-size:14px;background:#f8fafc;padding:8px;border-radius:6px;border:1px solid #e2e8f0;margin:0 0 8px 0;">Volume = Length &times; Width &times; Effective Water Depth</p>
            <p style="font-size:13px;color:#64748b;margin:0;">Example: 6m length &times; 4m width &times; 1.2m depth = 28.8 m&sup3; = 28,800 Litres of culture water capacity.</p>
          </div>
        </div>

        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;font-size:14px;">
          <thead>
            <tr style="background:#f1f5f9;color:#0f172a;text-align:left;">
              <th style="padding:10px 12px;border:1px solid #cbd5e1;">Tank Diameter (m)</th>
              <th style="padding:10px 12px;border:1px solid #cbd5e1;">Effective Water Depth (m)</th>
              <th style="padding:10px 12px;border:1px solid #cbd5e1;">Water Volume (Cubic Meters)</th>
              <th style="padding:10px 12px;border:1px solid #cbd5e1;">Water Volume (Litres)</th>
              <th style="padding:10px 12px;border:1px solid #cbd5e1;">US Gallons</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;font-weight:600;">3 meters</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">1.2 meters</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">8.48 m&sup3;</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;font-weight:600;">8,482 Litres</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">2,240 gal</td>
            </tr>
            <tr style="background:#f8fafc;">
              <td style="padding:10px 12px;border:1px solid #cbd5e1;font-weight:600;">4 meters (Standard)</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">1.2 meters</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">15.08 m&sup3;</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">15,080 Litres</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">3,984 gal</td>
            </tr>
            <tr>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;font-weight:600;">5 meters</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">1.2 meters</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">23.56 m&sup3;</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">23,560 Litres</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">6,224 gal</td>
            </tr>
            <tr style="background:#f8fafc;">
              <td style="padding:10px 12px;border:1px solid #cbd5e1;font-weight:600;">6 meters (Commercial)</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">1.2 meters</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">33.93 m&sup3;</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">33,930 Litres</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">8,963 gal</td>
            </tr>
            <tr>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;font-weight:600;">8 meters (Industrial)</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">1.2 meters</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">60.32 m&sup3;</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">60,320 Litres</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">15,934 gal</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Section 4: Stocking Density & Aeration Capacity Calculator -->
      <section style="margin-bottom:44px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">4. Safe Stocking Density &amp; Biomass Capacity Guidelines</h2>
        <p style="color:#334155;margin-bottom:16px;">
          Stocking beyond biological oxygen carrying capacity is the leading cause of catastrophic night-time fish suffocation. Biomass capacity scales directly with artificial aeration airflow rates:
        </p>

        <table style="width:100%;border-collapse:collapse;margin-bottom:20px;font-size:14px;">
          <thead>
            <tr style="background:#f1f5f9;color:#0f172a;text-align:left;">
              <th style="padding:10px 12px;border:1px solid #cbd5e1;">Aeration System Installed</th>
              <th style="padding:10px 12px;border:1px solid #cbd5e1;">Safe Max Biomass Density</th>
              <th style="padding:10px 12px;border:1px solid #cbd5e1;">Tilapia Fingerlings / 15,000L Tank</th>
              <th style="padding:10px 12px;border:1px solid #cbd5e1;">Harvest Output @ 500g</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;font-weight:600;">Zero Artificial Aeration (Pond)</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">5 &ndash; 10 kg / m&sup3;</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">250 &ndash; 300 fingerlings</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">125 &ndash; 150 kg</td>
            </tr>
            <tr style="background:#f8fafc;">
              <td style="padding:10px 12px;border:1px solid #cbd5e1;font-weight:600;">Paddlewheel Aerators (Pond/Raceway)</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">25 &ndash; 35 kg / m&sup3;</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">900 &ndash; 1,100 fingerlings</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">450 &ndash; 550 kg</td>
            </tr>
            <tr>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;font-weight:600;">Continuous Blower Nano-Diffusers (BFT)</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">50 &ndash; 80 kg / m&sup3;</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">1,800 &ndash; 2,500 fingerlings</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">900 &ndash; 1,200 kg</td>
            </tr>
            <tr style="background:#f0fdf4;">
              <td style="padding:10px 12px;border:1px solid #cbd5e1;font-weight:600;color:#15803d;">Pure Oxygen Injected RAS</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;font-weight:700;color:#15803d;">80 &ndash; 100+ kg / m&sup3;</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">2,800 &ndash; 3,500 fingerlings</td>
              <td style="padding:10px 12px;border:1px solid #cbd5e1;">1,400 &ndash; 1,750 kg</td>
            </tr>
          </tbody>
        </table>
      </section>

      <!-- Section 5: Water Treatment & Chemical Dosage Formulations -->
      <section style="margin-bottom:44px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">5. Chemical Disinfection &amp; Bath Dosage Calculations</h2>
        <p style="color:#334155;margin-bottom:16px;">
          Dosage calculation for pond treatments and quarantine dips must be calculated in milligrams per litre (mg/L, identical to Parts Per Million / PPM):
        </p>
        <div style="background:#f8fafc;border:1px solid #cbd5e1;padding:16px;border-radius:8px;margin-bottom:16px;font-family:monospace;font-size:15px;color:#0f172a;">
          Required Chemical Mass (grams) = Target Dosage (PPM or mg/L) &times; Water Volume (m&sup3;)
        </div>
        <ul style="padding-left:20px;color:#334155;font-size:15px;line-height:1.8;">
          <li><strong>Potassium Permanganate (KMnO4):</strong> 2 to 4 PPM short bath (10-15 minutes) for fungal infections and bacterial gill rot; or 1.0 to 1.5 PPM prolonged pond application. (For a 15 m&sup3; tank at 2 PPM: dose exactly 30 grams).</li>
          <li><strong>Rock Salt (NaCl) Bath:</strong> 20 to 30 grams per litre (2% to 3% salinity) for a 5-10 minute dip to eliminate protozoan parasites (Ichthyophthirius / Trichodina).</li>
          <li><strong>Agricultural Limestone (CaCO3):</strong> Applied at 200 to 500 kg per acre during pond dry-out to buffer water alkalinity (&gt; 100 mg/L) and stabilize morning pH swings.</li>
        </ul>
      </section>

      <!-- Section 6: Financial Profit & Batch Margin Model -->
      <section style="margin-bottom:44px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">6. Commercial Aquaculture Batch Profit &amp; Margin Model</h2>
        <p style="color:#334155;margin-bottom:16px;">
          Forecast net farm profits before stocking a new cycle using this standardized unit economics model:
        </p>
        <div style="background:#f8fafc;border:1px solid #cbd5e1;padding:20px;border-radius:10px;font-size:15px;color:#334155;line-height:1.8;">
          <p style="margin:0 0 10px 0;"><strong>&bull; Gross Sales Revenue:</strong> Total Harvest Biomass (kg) &times; Farmgate Sale Price (&#8377;/kg)</p>
          <p style="margin:0 0 10px 0;"><strong>&bull; Total Feed Cost:</strong> Total Harvest Biomass (kg) &times; Actual FCR &times; Feed Cost per kg (&#8377;/kg)</p>
          <p style="margin:0 0 10px 0;"><strong>&bull; Fingerling Seed Cost:</strong> Total Stocking Number &times; Price per Fingerling (including transport packing)</p>
          <p style="margin:0 0 10px 0;"><strong>&bull; Operating Overhead:</strong> Electricity (Aeration kWh), Probiotics, Molasses, Minerals &amp; Farm Labor</p>
          <p style="margin:0;font-weight:700;color:#15803d;font-size:16px;">&bull; Net Operating Profit = Gross Revenue &minus; (Feed Cost + Seed Cost + Overhead)</p>
        </div>
      </section>

      <!-- Section 7: FAQs -->
      <section style="margin-bottom:44px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">Frequently Asked Questions: Aquaculture Calculations</h2>
        <div style="display:flex;flex-direction:column;gap:16px;">
          <div style="background:#ffffff;border:1px solid #cbd5e1;padding:18px;border-radius:8px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 6px 0;">How frequently should I sample fish to recalibrate daily feed quantities?</h3>
            <p style="font-size:14px;color:#475569;margin:0;">Sample 30 to 50 individual fish at 10-day intervals to compute Average Body Weight (ABW). Multiply ABW by estimated total surviving population to determine active biomass, then apply the corresponding feeding rate percentage (typically 2.5% to 3.5% of biomass for juvenile tilapia).</p>
          </div>
          <div style="background:#ffffff;border:1px solid #cbd5e1;padding:18px;border-radius:8px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 6px 0;">What happens if I over-dose molasses in a Biofloc tank?</h3>
            <p style="font-size:14px;color:#475569;margin:0;">Excess carbon drives an uncontrolled bacterial population explosion. The bacteria consume excessive dissolved oxygen, causing rapid DO crashes and suffocating the fish. In addition, water turbidity spikes and high CO2 levels depress pH. Always monitor floc volume in an Imhoff cone and halt carbon dosing if floc volume exceeds 35-40 mL/L.</p>
          </div>
          <div style="background:#ffffff;border:1px solid #cbd5e1;padding:18px;border-radius:8px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 6px 0;">How do I convert Parts Per Million (PPM) into grams for tank dosing?</h3>
            <p style="font-size:14px;color:#475569;margin:0;">Since 1 PPM is equivalent to 1 milligram per litre (mg/L), and 1 cubic meter contains 1,000 litres, 1 PPM equals exactly 1 gram per cubic meter of water (1 g/m&sup3;). Multiply your target PPM by your total tank water volume in cubic meters to obtain the exact grams needed.</p>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <div style="background:#f0f9ff;border:1px solid #bae6fd;padding:24px;border-radius:10px;text-align:center;">
        <h3 style="font-size:20px;font-weight:700;color:#0369a1;margin:0 0 8px 0;">Need Turnkey Farm Sizing &amp; Professional System Design?</h3>
        <p style="font-size:15px;color:#475569;margin:0 0 16px 0;">Modern Fisheries provides complete engineering sizing audits, commercial extruded feed supply, and certified fingerling stocking packages.</p>
        <a href="/ourservices" style="background:#0284c7;color:#ffffff;padding:12px 24px;border-radius:8px;font-weight:700;text-decoration:none;display:inline-block;">View Commercial Services &amp; Consultancy &rarr;</a>
      </div>
    </article>

  `,

  '/ourservices': `
    <article style="max-width:1000px;margin:0 auto;color:#1e293b;line-height:1.75;font-size:16px;">
      <header style="margin-bottom:36px;border-bottom:1px solid #e2e8f0;padding-bottom:24px;">
        <span style="font-size:14px;font-weight:700;color:#0284c7;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:8px;">Modern Fisheries Commercial Services</span>
        <h1 style="font-size:32px;font-weight:800;color:#0f172a;line-height:1.25;margin:0 0 16px 0;letter-spacing:-0.5px;">Turnkey Aquaculture Engineering, Commercial Feed Supply &amp; Seed Distribution</h1>
        <p style="font-size:18px;color:#475569;margin:0;line-height:1.6;">
          End-to-end commercial solutions for progressive fish farmers. Turnkey RAS and Biofloc design, certified high-growth fingerling delivery, premium extruded floating feed supply, and on-site technical farm audits.
        </p>
      </header>

      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">Our Commercial Capabilities &amp; Services:</h2>
        <div style="display:flex;flex-direction:column;gap:16px;margin:20px 0;">
          <div style="background:#ffffff;border:1px solid #cbd5e1;padding:20px;border-radius:10px;">
            <h3 style="font-size:18px;font-weight:700;color:#0f172a;margin:0 0 6px 0;">1. Turnkey RAS &amp; Biofloc Engineering</h3>
            <p style="margin:0;color:#475569;">Site topographical survey, AutoCAD piping layout, civil tank construction, automated drum filter integration, MBBR biofilter sizing, and emergency generator power backup configuration.</p>
          </div>
          <div style="background:#ffffff;border:1px solid #cbd5e1;padding:20px;border-radius:10px;">
            <h3 style="font-size:18px;font-weight:700;color:#0f172a;margin:0 0 6px 0;">2. Certified High-Growth Fish Seed (Fingerlings)</h3>
            <p style="margin:0;color:#475569;">Doorstep oxygen-packed delivery of certified disease-free Mono-sex Tilapia (GIFT), Jayanti Rohu, Catla, Pangasius, and Magur fingerlings with guaranteed live arrival.</p>
          </div>
          <div style="background:#ffffff;border:1px solid #cbd5e1;padding:20px;border-radius:10px;">
            <h3 style="font-size:18px;font-weight:700;color:#0f172a;margin:0 0 6px 0;">3. Premium Commercial Extruded Floating Feed Supply</h3>
            <p style="margin:0;color:#475569;">High-protein formulations (28% to 45% crude protein) manufactured with steam extrusion technology for superior water stability, high digestibility, and low FCR.</p>
          </div>
        </div>
      </section>

      <section style="background:#f8fafc;border:1px solid #e2e8f0;padding:24px;border-radius:10px;">
        <h3 style="font-size:18px;font-weight:700;color:#0369a1;margin:0 0 8px 0;">Contact Modern Fisheries Consultation Desk:</h3>
        <p style="margin:0 0 12px 0;color:#334155;">Speak directly with our senior aquaculture engineers for project quotations, machinery selection, and farm audits.</p>
        <p style="font-size:18px;font-weight:700;color:#0f172a;margin:0;">Direct Phone / WhatsApp: <a href="tel:+919748952342" style="color:#0284c7;text-decoration:none;">+91 97489 52342</a></p>
      </section>
    </article>
  `,

  '/about-us': `
    <article style="max-width:1000px;margin:0 auto;color:#1e293b;line-height:1.75;font-size:16px;">
      <header style="margin-bottom:36px;border-bottom:1px solid #e2e8f0;padding-bottom:24px;">
        <span style="font-size:14px;font-weight:700;color:#0284c7;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:8px;">About Modern Fisheries</span>
        <h1 style="font-size:32px;font-weight:800;color:#0f172a;line-height:1.25;margin:0 0 16px 0;letter-spacing:-0.5px;">About Modern Fisheries: Pioneering Scientific Aquaculture Technology</h1>
        <p style="font-size:18px;color:#475569;margin:0;line-height:1.6;">
          Modern Fisheries is a premier Indian aquaculture innovation platform dedicated to modernizing fish farming through Recirculating Aquaculture Systems (RAS), Biofloc Technology, high-grade certified seed supplies, and sustainable water treatment engineering.
        </p>
      </header>

      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">Our Mission &amp; Vision</h2>
        <p>
          Founded by seasoned aquaculture engineers, microbiologists, and commercial farm operators, Modern Fisheries bridges the gap between scientific biotechnology and commercial farm profitability. Our mission is to empower farmers across India and Southeast Asia with biosecure, eco-friendly, zero-waste fish culture systems that produce healthy, residue-free protein while conserving freshwater resources.
        </p>
      </section>

      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">Our Expertise &amp; Facilities</h2>
        <ul style="padding-left:24px;color:#334155;">
          <li style="margin-bottom:8px;"><strong>Aquaculture Engineering:</strong> Custom design and fabrication of mechanical drum filters, MBBR biofilters, oxygenation systems, and circular tarpaulin tanks.</li>
          <li style="margin-bottom:8px;"><strong>Microbiology &amp; Water Analysis:</strong> In-house water quality testing laboratories optimizing bacterial inoculants and probiotic fermentation protocols.</li>
          <li style="margin-bottom:8px;"><strong>Hatchery Partnerships:</strong> Certified supply network providing disease-free GIFT Tilapia, Pangasius, and Indian Major Carp fingerlings.</li>
          <li><strong>Farmer Training &amp; Support:</strong> Hands-on technical workshops, digital calculators, and round-the-clock emergency telephone consultancy.</li>
        </ul>
      </section>
    </article>
  `,

  '/farming-videos': `
    <article style="max-width:1000px;margin:0 auto;color:#1e293b;line-height:1.75;font-size:16px;">
      <header style="margin-bottom:36px;border-bottom:1px solid #e2e8f0;padding-bottom:24px;">
        <span style="font-size:14px;font-weight:700;color:#0284c7;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:8px;">Video Masterclasses</span>
        <h1 style="font-size:32px;font-weight:800;color:#0f172a;line-height:1.25;margin:0 0 16px 0;letter-spacing:-0.5px;">Aquaculture Technical Video Library &amp; Practical Farm Demonstrations</h1>
        <p style="font-size:18px;color:#475569;margin:0;line-height:1.6;">
          Watch real-world video masterclasses recorded at commercial aquaculture farms. Learn Biofloc tank fabrication, root blower aeration installation, automatic drum filter maintenance, fish harvesting techniques, and disease treatments.
        </p>
      </header>

      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">Featured Video Masterclass Topics:</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(280px, 1fr));gap:16px;margin:20px 0;">
          <div style="background:#ffffff;border:1px solid #cbd5e1;padding:16px;border-radius:8px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 6px 0;">Complete 10,000L Biofloc Setup</h3>
            <p style="font-size:14px;color:#475569;margin:0;">Site preparation, iron mesh framing, central slope drainage, and probiotic water inoculation.</p>
          </div>
          <div style="background:#ffffff;border:1px solid #cbd5e1;padding:16px;border-radius:8px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 6px 0;">Calculating C:N Ratio &amp; Molasses</h3>
            <p style="font-size:14px;color:#475569;margin:0;">Step-by-step mathematical demonstration of carbon dosing based on fish feed protein percentage.</p>
          </div>
          <div style="background:#ffffff;border:1px solid #cbd5e1;padding:16px;border-radius:8px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 6px 0;">Automatic Drum Filter Fabrication</h3>
            <p style="font-size:14px;color:#475569;margin:0;">Constructing stainless steel mesh drum filters for indoor RAS systems to trap suspended solids automatically.</p>
          </div>
          <div style="background:#ffffff;border:1px solid #cbd5e1;padding:16px;border-radius:8px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 6px 0;">Commercial Tilapia Harvesting</h3>
            <p style="font-size:14px;color:#475569;margin:0;">High-density harvest procedures, live transport tank loading, and market grading standards.</p>
          </div>
        </div>
      </section>
    </article>
  `,

  '/frequently-asked-questions': `
    <article style="max-width:1000px;margin:0 auto;color:#1e293b;line-height:1.75;font-size:16px;">
      <header style="margin-bottom:36px;border-bottom:1px solid #e2e8f0;padding-bottom:24px;">
        <span style="font-size:14px;font-weight:700;color:#0284c7;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:8px;">Aquaculture Knowledge Base</span>
        <h1 style="font-size:32px;font-weight:800;color:#0f172a;line-height:1.25;margin:0 0 16px 0;letter-spacing:-0.5px;">Aquaculture Frequently Asked Questions (FAQ) &amp; Technical Reference</h1>
        <p style="font-size:18px;color:#475569;margin:0;line-height:1.6;">
          Authoritative answers to the most common questions on Biofloc Technology, Recirculating Aquaculture Systems (RAS), fish health, feeding schedules, and commercial farm profitability.
        </p>
      </header>

      <section style="display:flex;flex-direction:column;gap:16px;margin-bottom:40px;">
        <div style="background:#ffffff;border:1px solid #e2e8f0;padding:20px;border-radius:10px;">
          <h2 style="font-size:18px;font-weight:700;color:#0f172a;margin:0 0 8px 0;">What is Biofloc Technology (BFT) and how does it save feed costs?</h2>
          <p style="margin:0;color:#334155;font-size:15px;">Biofloc is a closed, zero-exchange aquaculture system where heterotrophic bacteria convert toxic fish ammonia waste into protein-rich microbial biomass. Fish graze continuously on these suspended flocs, reducing purchased commercial feed requirements by 20% to 30%.</p>
        </div>

        <div style="background:#ffffff;border:1px solid #e2e8f0;padding:20px;border-radius:10px;">
          <h2 style="font-size:18px;font-weight:700;color:#0f172a;margin:0 0 8px 0;">How does a Recirculating Aquaculture System (RAS) filter water?</h2>
          <p style="margin:0;color:#334155;font-size:15px;">A commercial RAS cleans and recycles up to 95-99% of water via mechanical drum filters (trapping solid feces), moving bed biofilm reactors or MBBRs (converting ammonia to nitrate), degassing towers (stripping CO2), and ultraviolet sterilizers (killing pathogens) before pumping clean oxygenated water back to culture tanks.</p>
        </div>

        <div style="background:#ffffff;border:1px solid #e2e8f0;padding:20px;border-radius:10px;">
          <h2 style="font-size:18px;font-weight:700;color:#0f172a;margin:0 0 8px 0;">What is a good Feed Conversion Ratio (FCR) in commercial aquaculture?</h2>
          <p style="margin:0;color:#334155;font-size:15px;">FCR measures kilograms of feed required to produce one kilogram of fish body weight (Total Feed &divide; Net Weight Gained). An FCR of 1.1 to 1.3 is considered world-class in intensive Biofloc or RAS systems, while 1.4 to 1.7 is typical in traditional semi-intensive earthen ponds.</p>
        </div>
      </section>
    </article>
  `,

  '/faq': `
    <article style="max-width:1000px;margin:0 auto;color:#1e293b;line-height:1.75;font-size:16px;">
      <header style="margin-bottom:36px;border-bottom:1px solid #e2e8f0;padding-bottom:24px;">
        <span style="font-size:14px;font-weight:700;color:#0284c7;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:8px;">Aquaculture Knowledge Base</span>
        <h1 style="font-size:32px;font-weight:800;color:#0f172a;line-height:1.25;margin:0 0 16px 0;letter-spacing:-0.5px;">Aquaculture Frequently Asked Questions (FAQ) &amp; Technical Reference</h1>
        <p style="font-size:18px;color:#475569;margin:0;line-height:1.6;">
          Authoritative answers to the most common questions on Biofloc Technology, Recirculating Aquaculture Systems (RAS), fish health, feeding schedules, and commercial farm profitability.
        </p>
      </header>

      <section style="display:flex;flex-direction:column;gap:16px;margin-bottom:40px;">
        <div style="background:#ffffff;border:1px solid #e2e8f0;padding:20px;border-radius:10px;">
          <h2 style="font-size:18px;font-weight:700;color:#0f172a;margin:0 0 8px 0;">What is Biofloc Technology (BFT) and how does it save feed costs?</h2>
          <p style="margin:0;color:#334155;font-size:15px;">Biofloc is a closed, zero-exchange aquaculture system where heterotrophic bacteria convert toxic fish ammonia waste into protein-rich microbial biomass. Fish graze continuously on these suspended flocs, reducing purchased commercial feed requirements by 20% to 30%.</p>
        </div>

        <div style="background:#ffffff;border:1px solid #e2e8f0;padding:20px;border-radius:10px;">
          <h2 style="font-size:18px;font-weight:700;color:#0f172a;margin:0 0 8px 0;">How does a Recirculating Aquaculture System (RAS) filter water?</h2>
          <p style="margin:0;color:#334155;font-size:15px;">A commercial RAS cleans and recycles up to 95-99% of water via mechanical drum filters (trapping solid feces), moving bed biofilm reactors or MBBRs (converting ammonia to nitrate), degassing towers (stripping CO2), and ultraviolet sterilizers (killing pathogens) before pumping clean oxygenated water back to culture tanks.</p>
        </div>

        <div style="background:#ffffff;border:1px solid #e2e8f0;padding:20px;border-radius:10px;">
          <h2 style="font-size:18px;font-weight:700;color:#0f172a;margin:0 0 8px 0;">What is a good Feed Conversion Ratio (FCR) in commercial aquaculture?</h2>
          <p style="margin:0;color:#334155;font-size:15px;">FCR measures kilograms of feed required to produce one kilogram of fish body weight (Total Feed &divide; Net Weight Gained). An FCR of 1.1 to 1.3 is considered world-class in intensive Biofloc or RAS systems, while 1.4 to 1.7 is typical in traditional semi-intensive earthen ponds.</p>
        </div>
      </section>
    </article>
  `,

  '/equipment-finder': `
    <article style="max-width:1000px;margin:0 auto;color:#1e293b;line-height:1.75;font-size:16px;">
      <header style="margin-bottom:36px;border-bottom:1px solid #e2e8f0;padding-bottom:24px;">
        <span style="font-size:14px;font-weight:700;color:#0284c7;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:8px;">Aquaculture Engineering Decision-Support Handbook</span>
        <h1 style="font-size:32px;font-weight:800;color:#0f172a;line-height:1.25;margin:0 0 16px 0;letter-spacing:-0.5px;">Aquaculture Equipment Finder &amp; Sizing Decision Guide</h1>
        <p style="font-size:18px;color:#475569;margin:0;line-height:1.6;">
          Identify essential aquaculture machinery for Recirculating Aquaculture Systems (RAS), Biofloc, Earthen Ponds, Aquaponics, and Hatcheries. Calculate precise dynamic capacity requirements for aeration air blowers, micro-screen drum filters, water pumps, and explore verified suppliers across India.
        </p>
      </header>

      <!-- Section 1: System-by-System Equipment Overview -->
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">1. System-Specific Aquaculture Machinery Requirements</h2>
        <p>
          Aquaculture facilities require distinct mechanical infrastructures depending on their biological stocking density and water exchange turnover. Selecting mismatched equipment causes high mortality, energy waste, and catastrophic biofilter failures.
        </p>
        <div style="overflow-x:auto;margin:20px 0;">
          <table style="width:100%;border-collapse:collapse;text-align:left;font-size:14px;">
            <thead>
              <tr style="background:#0f172a;color:#ffffff;">
                <th style="padding:12px;border:1px solid #334155;">Culture System</th>
                <th style="padding:12px;border:1px solid #334155;">Stocking Density</th>
                <th style="padding:12px;border:1px solid #334155;">Core Essential Machinery</th>
                <th style="padding:12px;border:1px solid #334155;">Primary Sizing Constraint</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background:#ffffff;">
                <td style="padding:12px;border:1px solid #cbd5e1;font-weight:700;">Biofloc (BFT)</td>
                <td style="padding:12px;border:1px solid #cbd5e1;">30 – 60 kg/m³</td>
                <td style="padding:12px;border:1px solid #cbd5e1;">Continuous Roots Air Blower, Micro-pore Diffusers, DO Meter, Emergency Generator</td>
                <td style="padding:12px;border:1px solid #cbd5e1;">25–35 LPM air flow per m³ against 140 mbar head pressure</td>
              </tr>
              <tr style="background:#f8fafc;">
                <td style="padding:12px;border:1px solid #cbd5e1;font-weight:700;">Recirculating (RAS)</td>
                <td style="padding:12px;border:1px solid #cbd5e1;">40 – 80 kg/m³</td>
                <td style="padding:12px;border:1px solid #cbd5e1;">Automatic Rotary Drum Filter, MBBR Biofilter, Axial Circulation Pump, UV Sterilizer, DO Meter</td>
                <td style="padding:12px;border:1px solid #cbd5e1;">Turnover 100–150% farm volume/hour, solids removal &lt;45 min</td>
              </tr>
              <tr style="background:#ffffff;">
                <td style="padding:12px;border:1px solid #cbd5e1;font-weight:700;">Earthen Ponds</td>
                <td style="padding:12px;border:1px solid #cbd5e1;">3 – 12 kg/m³</td>
                <td style="padding:12px;border:1px solid #cbd5e1;">Paddle Wheel Aerators, Dewatering Pumps, Automatic Solar Feeders, Seine Drag Nets</td>
                <td style="padding:12px;border:1px solid #cbd5e1;">1.0 to 1.5 HP aeration per 1,000 kg harvest biomass</td>
              </tr>
              <tr style="background:#f8fafc;">
                <td style="padding:12px;border:1px solid #cbd5e1;font-weight:700;">Aquaponics</td>
                <td style="padding:12px;border:1px solid #cbd5e1;">15 – 35 kg/m³</td>
                <td style="padding:12px;border:1px solid #cbd5e1;">Submersible Low-Head Pump, Swirl Solid Separator, Ring Blower, Digital pH/EC Monitor</td>
                <td style="padding:12px;border:1px solid #cbd5e1;">Continuous low-energy recirculating lift and plant root aeration</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- Section 2: Technical Sizing Formulas -->
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">2. Engineering Sizing Formulas &amp; Calculations</h2>
        <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:10px;padding:20px;margin:20px 0;">
          <h3 style="font-size:18px;font-weight:700;color:#0369a1;margin:0 0 10px 0;">A. Aeration Air Blower Airflow Equation</h3>
          <p style="margin:0 0 10px 0;">
            To maintain dissolved oxygen above 5.0 mg/L in Biofloc tanks with active bacterial respiration:
          </p>
          <p style="font-family:monospace;background:#ffffff;padding:12px;border-radius:6px;border:1px solid #e2e8f0;margin:0 0 10px 0;">
            Required Airflow (LPM) = Water Volume (m³) &times; 28 LPM/m³ &times; Safety Factor (1.25)
          </p>
          <p style="font-size:14px;color:#475569;margin:0;">
            For a standard 50 m³ system, minimum airflow is 50 &times; 28 &times; 1.25 = <strong>1,750 LPM (~62 CFM)</strong> at ≥150 mbar hydrostatic discharge backpressure.
          </p>
        </div>

        <div style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:10px;padding:20px;margin:20px 0;">
          <h3 style="font-size:18px;font-weight:700;color:#0369a1;margin:0 0 10px 0;">B. Moving Bed Biofilm Reactor (MBBR) Media Sizing</h3>
          <p style="margin:0 0 10px 0;">
            Nitrifying bacteria on virgin K1/K3 Kaldnes media convert toxic TAN at an active rate of 0.55 g TAN/m² protected surface area per day:
          </p>
          <p style="font-family:monospace;background:#ffffff;padding:12px;border-radius:6px;border:1px solid #e2e8f0;margin:0 0 10px 0;">
            K1 Media Volume (Litres) = Daily Feed (kg) &times; 0.03 &times; 1,000 / (0.55 &times; 800 m²/m³) &times; 1,000
          </p>
          <p style="font-size:14px;color:#475569;margin:0;">
            Rule of thumb: Feed load requires approximately <strong>75 to 90 Litres of K1 media per 1.0 kg of 32% protein feed</strong> fed daily.
          </p>
        </div>
      </section>

      <!-- Section 3: Buyer Precautions & Maintenance Checklist -->
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">3. Buyer Checklist &amp; Equipment Maintenance Protocol</h2>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
          <div style="background:#ffffff;border:1px solid #e2e8f0;padding:20px;border-radius:10px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 10px 0;">Common Procurement Pitfalls:</h3>
            <ul style="margin:0;padding-left:20px;font-size:14px;color:#475569;">
              <li style="margin-bottom:6px;">Buying unrated vortex blowers unable to overcome hydrostatic water depth head.</li>
              <li style="margin-bottom:6px;">Omitting dual air filters in dusty, humid agricultural environments.</li>
              <li style="margin-bottom:6px;">Operating without non-return check valves, allowing culture water to siphoning back into the blower stator.</li>
              <li>Purchasing cast-iron pumps for saline or brackish shrimp culture instead of SS316 marine-grade units.</li>
            </ul>
          </div>

          <div style="background:#ffffff;border:1px solid #e2e8f0;padding:20px;border-radius:10px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 10px 0;">Routine Preventative Maintenance:</h3>
            <ul style="margin:0;padding-left:20px;font-size:14px;color:#475569;">
              <li style="margin-bottom:6px;">Wash intake foam air filters bi-weekly using clean freshwater and low-pressure air.</li>
              <li style="margin-bottom:6px;">Inspect micro-pore diffuser tubing every 30 days for bacterial carbonate scale buildup.</li>
              <li style="margin-bottom:6px;">Soak optical DO sensor membranes in deionized water and calibrate monthly.</li>
              <li>Test emergency auto-start diesel generator (DG ATS) under live load every 7 days.</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Section 4: Direct Equipment Inquiry Desk -->
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">4. Direct Equipment Inquiry &amp; Technical Sizing Desk</h2>
        <p>
          Need verified manufacturer pricing, single-phase vs three-phase motor compatibility advice, or customized aeration manifold design? Contact the Modern Fisheries Engineering Desk directly:
        </p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-top:16px;">
          <div style="background:#f0fdf4;border:1px solid #bbf7d0;padding:20px;border-radius:12px;">
            <h3 style="font-size:16px;font-weight:700;color:#166534;margin:0 0 8px 0;">Instant WhatsApp Technical Desk</h3>
            <p style="font-size:14px;color:#1e293b;margin:0 0 12px 0;">Fast technical responses on equipment availability, power compatibility, and pan-India freight delivery.</p>
            <p style="font-size:15px;font-weight:700;color:#15803d;margin:0 0 12px 0;">WhatsApp: +91 97489 52342</p>
            <a href="https://wa.me/919748952342?text=Hello%20Modern%20Fisheries,%20I%20am%20inquiring%20about%20commercial%20aquaculture%20equipment%20specifications%20and%20procurement." style="display:inline-block;background:#16a34a;color:#ffffff;padding:8px 16px;border-radius:8px;font-weight:700;text-decoration:none;font-size:13px;">Chat on WhatsApp &rarr;</a>
          </div>
          <div style="background:#f8fafc;border:1px solid #cbd5e1;padding:20px;border-radius:12px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 8px 0;">Email Engineering Desk</h3>
            <p style="font-size:14px;color:#334155;margin:0 0 12px 0;">Submit project layouts, commercial farm blueprints, tenders, or itemized Bills of Quantities (BOQ).</p>
            <p style="font-size:15px;font-weight:700;color:#0284c7;margin:0 0 12px 0;">Email: mf@owncircles.com</p>
            <a href="mailto:mf@owncircles.com?subject=Equipment%20Inquiry%20-%20Modern%20Fisheries" style="display:inline-block;background:#0f172a;color:#ffffff;padding:8px 16px;border-radius:8px;font-weight:700;text-decoration:none;font-size:13px;">Send Email &rarr;</a>
          </div>
        </div>
      </section>

      <!-- Section 5: Real Search Queries & Frequently Asked Questions -->
      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">5. Aquaculture Machinery FAQ &amp; Search Queries</h2>
        <div style="display:flex;flex-direction:column;gap:16px;margin-top:16px;">
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:18px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 8px 0;">What equipment do I need for a 10,000 liter Biofloc fish tank?</h3>
            <p style="font-size:14px;color:#334155;margin:0;line-height:1.6;">
              A 10,000-liter (10 m³) commercial Biofloc tank requires: (1) High-pressure Roots air blower or diaphragm pump delivering 250–350 LPM at &ge;140 mbar, (2) 16mm micro-pore aeration diffuser rings, (3) Optical DO meter for monitoring dissolved oxygen above 5.0 mg/L, (4) Commercial tarpaulin circular tank (550–650 GSM PVC/HDPE with GI mesh frame), (5) Imhoff cone for floc volume tracking (15–25 mL/L target), and (6) Emergency generator backup with an ATS switch.
            </p>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:18px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 8px 0;">What is the typical price range and cost of aquaculture equipment in India?</h3>
            <p style="font-size:14px;color:#334155;margin:0;line-height:1.6;">
              Commercial equipment prices in India vary by capacity and motor specification: (1) Twin-Lobe Roots Blowers (1.5 HP to 3 HP): ₹24,000 – ₹58,000, (2) Rotary Drum Filters (20 m³/hr to 60 m³/hr capacity): ₹95,000 – ₹2,40,000, (3) 1 HP to 2 HP 4-Paddle Wheel Aerators: ₹18,000 – ₹32,000, (4) Optical Dissolved Oxygen (DO) Meters: ₹35,000 – ₹65,000, (5) Circular Tarpaulin Tanks (10,000L to 30,000L): ₹12,000 – ₹35,000, and (6) Submersible Solids-Handling Sludge Pumps: ₹8,500 – ₹22,000.
            </p>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:18px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 8px 0;">How do I calculate air blower size (CFM &amp; LPM) for Biofloc aeration?</h3>
            <p style="font-size:14px;color:#334155;margin:0;line-height:1.6;">
              In intensive Biofloc systems, heterotrophic bacteria and fish create massive continuous biological oxygen demand (BOD). The engineering standard is 25 to 35 Litres Per Minute (LPM) of air per cubic meter (m³) of water. For example, a 60 m³ system requires: 60 m³ &times; 30 LPM = 1,800 LPM. To convert LPM to CFM (Cubic Feet per Minute), divide by 28.317: 1,800 LPM &divide; 28.317 &asymp; 63.6 CFM.
            </p>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:18px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 8px 0;">Why do ring blowers fail in deep fish tanks and what is the alternative?</h3>
            <p style="font-size:14px;color:#334155;margin:0;line-height:1.6;">
              Ring blowers (regenerative blowers) are designed to move high volumes of air at low static head pressure (typically &lt;80–100 mbar). When submerged diffusers are placed at 1.2m to 1.5m water depth, the hydrostatic water column pushes back with 120–150 mbar of head pressure. This forces the ring blower into stall mode, causing the motor coils to overheat and trip the thermal breaker. The correct engineering solution is a positive-displacement Twin-Lobe Roots Blower, which maintains constant volumetric displacement regardless of water depth.
            </p>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:18px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 8px 0;">Can commercial aquaculture machinery run on domestic single-phase electricity in India?</h3>
            <p style="font-size:14px;color:#334155;margin:0;line-height:1.6;">
              Small-scale equipment up to 1.5 HP (such as small blowers, mini aeration pumps, and dosing units) can run on 220V single-phase power. However, commercial 2.0 HP+ Roots blowers, industrial drum filters, and large circulation pumps require 415V 3-phase industrial power to prevent excessive starting current draws and voltage drops. If 3-phase is unavailable at your site, you must install a single-phase to 3-phase Variable Frequency Drive (VFD).
            </p>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:18px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 8px 0;">What fish processing and handling machinery is required for commercial fish harvesting?</h3>
            <p style="font-size:14px;color:#334155;margin:0;line-height:1.6;">
              A commercial aquaculture harvest line requires: (1) Knotless seine nets and live fish transfer pumps (4-inch to 6-inch non-clog vortex or vacuum) to move fish without scale loss, (2) Stainless steel (SS304) live fish grading boxes to sort fingerlings or market biomass by size, (3) Rotary fish descaling machines capable of scaling 25–30 kg per 3-minute batch, (4) Food-grade SS304 filleting and evisceration tables with overhead washdown nozzles, and (5) Commercial flake ice machines (1 to 3 tons/day) maintaining a 1:1 ice-to-fish rapid chilling ratio for cold chain transport.
            </p>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:18px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 8px 0;">How does a pond bottom sludge cleaner work in earthen fish ponds?</h3>
            <p style="font-size:14px;color:#334155;margin:0;line-height:1.6;">
              A submersible pond bottom sludge cleaner utilizes a heavy-duty slurry pump fitted with a tungsten-carbide vortex cutter impeller. Guided along the pond floor via floating pontoons or telescopic booms, it vacuums accumulated black anaerobic muck (decaying feed and fecal waste) and pumps it out through a 3-inch discharge hose to exterior drying beds. This clears toxic hydrogen sulfide (H2S) deposits without draining the pond or halting fish growth.
            </p>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:18px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 8px 0;">What is an all-in-one compact indoor RAS skid and what tank volume does it support?</h3>
            <p style="font-size:14px;color:#334155;margin:0;line-height:1.6;">
              An all-in-one indoor RAS skid is a factory pre-engineered, plug-and-play water treatment station combining a 50-micron automatic rotary drum filter, an aerated moving bed biofilm reactor (MBBR) filled with K1 virgin media, a counter-current protein skimmer, an inline amalgam UV-C sterilizer, and a high-flow circulation pump on a single structural base. Modular skids typically support culture volumes between 10 m³ and 60 m³ with zero on-site piping errors.
            </p>
          </div>
          <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:10px;padding:18px;">
            <h3 style="font-size:16px;font-weight:700;color:#0f172a;margin:0 0 8px 0;">How do live fish transfer pumps move fish without mortality or scale damage?</h3>
            <p style="font-size:14px;color:#334155;margin:0;line-height:1.6;">
              Modern fish transfer pumps utilize recessed vortex impellers or dual-chamber vacuum suction tanks where live fish are suspended in a continuous water stream (typically 3 parts water to 1 part fish). Because fish never touch moving mechanical impeller blades directly, scale mucus membranes remain intact, eliminating transit abrasions and stress-induced bacterial ulcers during grading or harvest loading.
            </p>
          </div>
        </div>
      </section>
    </article>
  `
};

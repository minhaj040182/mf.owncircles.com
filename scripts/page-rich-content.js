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

      <section style="background:#f8fafc;border:1px solid #cbd5e1;border-radius:10px;padding:20px;margin-bottom:32px;">
        <h3 style="font-size:18px;font-weight:700;color:#0369a1;margin:0 0 10px 0;">Professional Turnkey RAS Consultancy &amp; Equipment Supply</h3>
        <p style="margin:0 0 12px 0;color:#475569;">Modern Fisheries designs, manufactures, and commissions commercial RAS hatcheries and grow-out facilities nationwide. We supply automated rotary drum filters, MBBR biofilter media, protein skimmers, and pure oxygen generation skids.</p>
        <a href="/ourservices" style="color:#0284c7;font-weight:700;text-decoration:none;">Consult Our Aquaculture Engineering Team &rarr;</a>
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
    </article>
  `,

  '/fish-diseases': `
    <article style="max-width:1000px;margin:0 auto;color:#1e293b;line-height:1.75;font-size:16px;">
      <header style="margin-bottom:36px;border-bottom:1px solid #e2e8f0;padding-bottom:24px;">
        <span style="font-size:14px;font-weight:700;color:#0284c7;text-transform:uppercase;letter-spacing:0.05em;display:block;margin-bottom:8px;">Aquaculture Veterinary Guide</span>
        <h1 style="font-size:32px;font-weight:800;color:#0f172a;line-height:1.25;margin:0 0 16px 0;letter-spacing:-0.5px;">Fish Disease Diagnosis &amp; Treatment Handbook</h1>
        <p style="font-size:18px;color:#475569;margin:0;line-height:1.6;">
          Identify, diagnose, and treat common freshwater fish pathogens. Step-by-step veterinary protocols for White Spot (Ich), Bacterial Gill Rot, Dropsy, Argulus fish lice, Epizootic Ulcerative Syndrome (EUS), and chemical bath dosages.
        </p>
      </header>

      <section style="margin-bottom:40px;">
        <h2 style="font-size:24px;font-weight:700;color:#0f172a;margin-bottom:16px;border-left:4px solid #0284c7;padding-left:12px;">1. Diagnostic Matrix of Common Fish Diseases</h2>
        <div style="overflow-x:auto;margin:20px 0;">
          <table style="width:100%;border-collapse:collapse;text-align:left;font-size:15px;">
            <thead>
              <tr style="background:#0f172a;color:#ffffff;">
                <th style="padding:12px;border:1px solid #334155;">Disease</th>
                <th style="padding:12px;border:1px solid #334155;">Pathogen Type</th>
                <th style="padding:12px;border:1px solid #334155;">Clinical Symptoms</th>
                <th style="padding:12px;border:1px solid #334155;">Approved Treatment Protocol</th>
              </tr>
            </thead>
            <tbody>
              <tr style="background:#ffffff;border-bottom:1px solid #e2e8f0;">
                <td style="padding:12px;border:1px solid #e2e8f0;font-weight:600;">White Spot (Ich)</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Protozoan (I. multifiliis)</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Tiny white cysts on skin and fins, fish flashing against tank walls.</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">2–3% Salt bath (20–30 g/L for 10 min) or Formalin at 25 ppm.</td>
              </tr>
              <tr style="background:#f8fafc;border-bottom:1px solid #e2e8f0;">
                <td style="padding:12px;border:1px solid #e2e8f0;font-weight:600;">Bacterial Gill Rot</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Bacterial (F. columnare)</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Frayed, discolored necrotic gill filaments, fish piping for air at surface.</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Potassium Permanganate (KMnO4) bath at 2–4 ppm or Oxytetracycline feed dosing.</td>
              </tr>
              <tr style="background:#ffffff;border-bottom:1px solid #e2e8f0;">
                <td style="padding:12px;border:1px solid #e2e8f0;font-weight:600;">Argulus (Fish Lice)</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Crustacean Ectoparasite</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Visible disc-shaped green lice attached to scales, erratic swimming.</td>
                <td style="padding:12px;border:1px solid #e2e8f0;">Emamectin benzoate or organophosphate dip under professional veterinary supervision.</td>
              </tr>
            </tbody>
          </table>
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
  `
};

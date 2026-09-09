import React from "react";
import { 
  BookOpen, 
  Scale, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  ShieldAlert, 
  Waves, 
  Fish, 
  Coins, 
  HelpCircle,
  FileSpreadsheet
} from "lucide-react";

export default function FcrEducationalGuide() {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden text-left font-sans mt-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-6 sm:p-10 border-b border-emerald-800/40">
        <div className="max-w-4xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-mono font-bold tracking-wide uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Commercial Aquaculture Engineering Manual</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-sans font-black tracking-tight text-white leading-tight">
            Feed Conversion Ratio (FCR): Technical Guide for Commercial Fish Farming
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
            A comprehensive operational and mathematical reference for hatchery operators, farm managers, and aquaculture entrepreneurs managing intensive Recirculating Aquaculture Systems (RAS) and Biofloc environments.
          </p>
        </div>
      </div>

      {/* Main Educational Content Body */}
      <div className="p-6 sm:p-10 space-y-12 max-w-5xl text-slate-800 leading-relaxed">
        
        {/* SECTION 1 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-sm shrink-0">
              01
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Understanding the Importance of the Feed Conversion Ratio (FCR) Solver
            </h2>
          </div>

          <div className="prose prose-slate max-w-none text-sm sm:text-base space-y-4 text-slate-700">
            <p>
              In contemporary commercial aquaculture, formulated feed constitutes between <strong>60% and 75% of total variable operational expenditures (OPEX)</strong>. Whether cultivating Indian Major Carps (Rohu, Catla), freshwater table fish (GIFT Tilapia, Pangasius, Desi Magur), or high-value crustaceans (Pacific White Shrimp <em>Litopenaeus vannamei</em>), financial solvency hinges on how efficiently administered nutrition translates into marketable harvested biomass.
            </p>
            <p>
              The <strong>Feed Conversion Ratio (FCR)</strong> is the universally accepted quantitative benchmark defining the biological and nutritional efficiency of a culture batch. Expressed simply, it measures the exact kilograms of dry commercial feed required to produce one single kilogram of live wet body weight gain.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4.5 space-y-1.5">
                <span className="text-xs font-mono font-bold text-emerald-800 uppercase tracking-wider block">Direct Margin Protection</span>
                <p className="text-xs sm:text-sm text-slate-700 leading-normal">
                  In a 50-metric-ton commercial farm, an FCR drift of just <strong>0.20 units</strong> wastes over 10,000 kg of feed—eroding ₹450,000 to ₹650,000 in net operational profits.
                </p>
              </div>

              <div className="bg-blue-50/70 border border-blue-200/80 rounded-2xl p-4.5 space-y-1.5">
                <span className="text-xs font-mono font-bold text-blue-800 uppercase tracking-wider block">Biofilter & System Health</span>
                <p className="text-xs sm:text-sm text-slate-700 leading-normal">
                  High FCR values indicate unassimilated protein expelled as fecal waste or unconsumed pellets, instantly choking mechanical micro-screens and spiking Total Ammonia Nitrogen (TAN).
                </p>
              </div>

              <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4.5 space-y-1.5">
                <span className="text-xs font-mono font-bold text-amber-800 uppercase tracking-wider block">Herd Diagnostic Barometer</span>
                <p className="text-xs sm:text-sm text-slate-700 leading-normal">
                  A subtle escalation in local FCR frequently manifests days before clinical signs of subclinical disease, parasite infestation, or gill pathology appear.
                </p>
              </div>
            </div>

            <p>
              FCR is not merely an accounting figure logged at post-harvest reconciliation; it is an active diagnostic compass. Utilizing a dedicated <strong>Feed Conversion Ratio Solver</strong> throughout the culture lifecycle equips aquaculturists with immediate, data-driven validation to assess feed pellet palatability, pellet water stability, feeding frequency efficacy, and environmental stability.
            </p>
          </div>
        </section>

        {/* SECTION 2 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-sm shrink-0">
              02
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              The Mathematical Formula and Manual Calculation Example
            </h2>
          </div>

          <div className="text-sm sm:text-base space-y-4 text-slate-700">
            <p>
              The basic scientific equation governing the Feed Conversion Ratio compares cumulative distributed feed mass against the net biological biomass gain achieved across the designated culture window:
            </p>

            {/* Formula Callout */}
            <div className="bg-slate-900 text-emerald-300 p-5 sm:p-6 rounded-2xl font-mono text-center sm:text-lg tracking-wide border border-slate-800 shadow-inner my-4">
              <span className="text-slate-400 block text-xs font-sans uppercase tracking-widest mb-1">Fundamental Equation</span>
              FCR = Total Weight of Feed Fed (kg) ÷ Net Biomass Weight Gain (kg)
            </div>

            <p>
              To accurately establish <strong>Net Biomass Weight Gain</strong>, the starting seed biomass must be subtracted from the final live biomass, adjusted for intermediate cullings and recorded mortalities:
            </p>

            <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl font-mono text-xs sm:text-sm text-slate-800 space-y-1">
              <p><strong>Net Biomass Gain (kg)</strong> = (Final Stock Count × Final Average Weight) - (Initial Stock Count × Initial Average Weight)</p>
            </div>

            <h3 className="font-bold text-slate-900 text-base sm:text-lg pt-2 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Realistic Commercial Step-by-Step Example</span>
            </h3>

            <p>
              Consider an intensive commercial growout tank stocked with monosex Nile Tilapia (<em>Oreochromis niloticus</em>) operated in an Indian inland facility over a 30-day feeding cycle:
            </p>

            {/* Step-by-Step Box */}
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="space-y-2 border-b sm:border-b-0 sm:border-r border-slate-100 pb-3 sm:pb-0 sm:pr-4">
                  <span className="font-bold text-slate-900 block font-sans">Initial Stock Parameters (Day 0):</span>
                  <ul className="space-y-1 text-slate-600 font-mono text-xs">
                    <li>• Stock Population: <strong>2,000 fingerlings</strong></li>
                    <li>• Initial Average Body Weight (ABW): <strong>50 grams (0.050 kg)</strong></li>
                    <li>• Initial Tank Biomass: 2,000 × 0.050 kg = <strong>100.00 kg</strong></li>
                  </ul>
                </div>

                <div className="space-y-2 sm:pl-2">
                  <span className="font-bold text-slate-900 block font-sans">Sampling & Feed Log (Day 30):</span>
                  <ul className="space-y-1 text-slate-600 font-mono text-xs">
                    <li>• Total Cumulative Feed Administered: <strong>500.00 kg</strong></li>
                    <li>• Surviving Fish Census: <strong>1,960 fish</strong> (98% survival)</li>
                    <li>• Sampled Day 30 ABW: <strong>280 grams (0.280 kg)</strong></li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-2.5 text-xs sm:text-sm">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <span className="text-slate-600"><strong>Step 1: Calculate Final Standing Biomass</strong></span>
                  <span className="font-mono font-bold text-slate-900">1,960 fish × 0.280 kg = 548.80 kg</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <span className="text-slate-600"><strong>Step 2: Calculate Net Biomass Gain</strong></span>
                  <span className="font-mono font-bold text-slate-900">548.80 kg - 100.00 kg = 448.80 kg</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 bg-emerald-50 p-3 rounded-xl border border-emerald-200">
                  <span className="text-emerald-950 font-bold">Step 3: Solve for FCR</span>
                  <span className="font-mono font-extrabold text-emerald-800 text-sm sm:text-base">500.00 kg Feed ÷ 448.80 kg Gain = 1.114 → 1.11 FCR</span>
                </div>
              </div>
            </div>

            <div className="text-xs sm:text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
              <p>
                <strong>Economic vs. Biological FCR Distinction:</strong> In strict biological accounting, incorporating the 40 deceased fish (which consumed feed before mortality, accumulating approximately 4.0 kg biomass) yields a <em>Biological FCR</em> of <strong>1.104</strong> [500 ÷ (448.8 + 4.0)]. However, commercial farm accountants rely on <em>Economic FCR</em> (<strong>1.114</strong>) because dead fish cannot be delivered to distributors at harvest.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-black text-sm shrink-0">
              03
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Operational Risks: What Happens If Your Calculations Are Incorrect?
            </h2>
          </div>

          <div className="text-sm sm:text-base space-y-4 text-slate-700">
            <p>
              Inaccurate biomass estimations and uncalibrated FCR metrics trigger cascading biological failures. When feed rations are computed on erroneous assumptions, facilities encounter severe economic and ecological hazards:
            </p>

            <div className="space-y-4 mt-4">
              {/* Risk 1 */}
              <div className="border border-red-100 bg-red-50/40 rounded-2xl p-5 space-y-2">
                <h4 className="font-bold text-red-950 text-base flex items-center gap-2">
                  <AlertTriangle className="w-4.5 h-4.5 text-red-600 shrink-0" />
                  <span>1. Toxic Ammonia Cascades (NH₃ / TAN Toxicity)</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  When calculations lead to overfeeding, uneaten high-protein extruded pellets begin disintegrating within 15 to 30 minutes. Heterotrophic mineralization rapidly releases toxic Total Ammonia Nitrogen (TAN). At elevated tropical pond pH (&gt;8.0) and temperatures (&gt;28°C), the toxic un-ionized fraction (<strong>NH₃</strong>) proliferates. Un-ionized ammonia damages gill epithelial tissues, induces asphyxiation despite normal oxygen levels, suppresses the immune system, and can wipe out entire tank inventories overnight.
                </p>
              </div>

              {/* Risk 2 */}
              <div className="border border-amber-100 bg-amber-50/40 rounded-2xl p-5 space-y-2">
                <h4 className="font-bold text-amber-950 text-base flex items-center gap-2">
                  <Waves className="w-4.5 h-4.5 text-amber-600 shrink-0" />
                  <span>2. Catastrophic Dissolved Oxygen (DO) Depletion</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Every single kilogram of decomposing uneaten feed exerts a massive <strong>Biochemical Oxygen Demand (BOD)</strong>, consuming 200 to 250 grams of pure dissolved oxygen from the water column. Aeration equipment designed solely for fish respiration becomes starved by bacterial decomposition, causing dangerous nighttime oxygen crashes below 3.0 mg/L and crippling metabolic conversion.
                </p>
              </div>

              {/* Risk 3 */}
              <div className="border border-slate-200 bg-slate-50 rounded-2xl p-5 space-y-2">
                <h4 className="font-bold text-slate-900 text-base flex items-center gap-2">
                  <ShieldAlert className="w-4.5 h-4.5 text-slate-700 shrink-0" />
                  <span>3. Chronic Underfeeding and Stunted Fish Growth</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Conversely, calculating on artificially depressed FCR figures causes severe underfeeding. Cultured stocks experience stunted growth trajectories, non-uniform sizing (shooters vs. runts), and elevated aggression. In cannibalistic species like Asian Seabass (Barramundi) and Desi Magur, underfeeding triggers predatory behavior, severely slashing total survival percentages.
                </p>
              </div>

              {/* Risk 4 */}
              <div className="border border-purple-100 bg-purple-50/40 rounded-2xl p-5 space-y-2">
                <h4 className="font-bold text-purple-950 text-base flex items-center gap-2">
                  <TrendingUp className="w-4.5 h-4.5 text-purple-700 shrink-0" />
                  <span>4. Nitrite Spikes & Brown Blood Disease (Methemoglobinemia)</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Excessive nitrogen loading outpaces the oxidation rate of slow-growing autotrophic <em>Nitrobacter</em> and <em>Nitrospira</em> bacteria. Intermediate nitrite (<strong>NO₂⁻</strong>) accumulates. Nitrite binds directly with fish hemoglobin to produce methemoglobin, which cannot transport oxygen, effectively suffocating fish internally even in oxygenated water.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
            <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-900 flex items-center justify-center font-black text-sm shrink-0">
              04
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Best Practices for Managing This Data in Modern RAS and Biofloc Systems
            </h2>
          </div>

          <div className="text-sm sm:text-base space-y-4 text-slate-700">
            <p>
              Operating high-density closed loop recirculating aquaculture systems and biofloc ponds demands rigorous, systematic protocols to maintain FCR at optimal biological ceilings. Implement these commercial engineering practices across your operations:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
              {/* Practice 1 */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Bi-Weekly Stratified Biometric Sampling</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Conduct biometrics every 10 to 14 days without exception. Sample 5% to 10% of total tank biomass (minimum 50 to 100 fish). Always weigh specimens in tared water-filled containers to avoid mucous coat abrasions. Recalculate mean Average Body Weight (ABW) and total standing biomass immediately to reset the daily feed ration.
                </p>
              </div>

              {/* Practice 2 */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Acoustic & Submerged Feed Tray Audits</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Never blindly broadcast daily quotas. For shrimp and demersal fish, inspect feeding trays 45 minutes after feeding. For floating pelleted species, observe ingestion voracity over 15 minutes. If more than 2% of feed lingers, withhold 25% to 50% of the subsequent feeding and log an immediate FCR audit.
                </p>
              </div>

              {/* Practice 3 */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Water Temperature & DO Dynamic Corrections</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Aquatic species are strict poikilotherms. When temperatures drift outside optimal metabolic windows (26°C–31°C for Tilapia and Pangasius), digestion slows significantly. Curtail feed allotments by 20% if temperatures drop below 24°C, and cut rations by 50% if DO dips below 4.5 mg/L, preventing undigested fecal waste from inflating your FCR.
                </p>
              </div>

              {/* Practice 4 */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-emerald-700 font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Carbon-Nitrogen (C:N) Synchronization in Biofloc</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  In Biofloc setups, calculated feed intake determines external organic carbon dosing (molasses, jaggery, rice flour). Keep carbon additions calibrated to maintain a strict 15:1 to 18:1 C:N ratio. Overestimating feed consumption causes over-carbonation, triggering filamentous bacterial blooms and suffocating floc densities exceeding 50 mL/L in Imhoff cones.
                </p>
              </div>
            </div>

            {/* Commercial Reference Benchmarks */}
            <div className="mt-8 border border-slate-200 rounded-2xl overflow-hidden">
              <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 font-bold text-slate-900 text-xs sm:text-sm font-sans flex items-center justify-between">
                <span>Standard Commercial FCR Targets by Species</span>
                <span className="font-mono text-[11px] text-slate-500 font-normal">Modern RAS & Biofloc Facilities</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-50 text-slate-600 font-mono text-[11px] border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-2.5">Cultured Species</th>
                      <th className="px-4 py-2.5">System Type</th>
                      <th className="px-4 py-2.5">Optimal FCR Range</th>
                      <th className="px-4 py-2.5">Crude Protein Req</th>
                      <th className="px-4 py-2.5">Operational Risk Threshold</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-xs">
                    <tr>
                      <td className="px-4 py-2.5 font-bold text-slate-900 font-sans">GIFT Tilapia</td>
                      <td className="px-4 py-2.5 text-slate-600">Biofloc / RAS</td>
                      <td className="px-4 py-2.5 font-bold text-emerald-700">1.10 – 1.30</td>
                      <td className="px-4 py-2.5 text-slate-600">28% – 32%</td>
                      <td className="px-4 py-2.5 text-red-600 font-semibold">&gt; 1.45 FCR</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-bold text-slate-900 font-sans">Pangasius (Basa)</td>
                      <td className="px-4 py-2.5 text-slate-600">Intensive RAS</td>
                      <td className="px-4 py-2.5 font-bold text-emerald-700">1.25 – 1.45</td>
                      <td className="px-4 py-2.5 text-slate-600">28% – 30%</td>
                      <td className="px-4 py-2.5 text-red-600 font-semibold">&gt; 1.60 FCR</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-bold text-slate-900 font-sans">Indian Major Carp (Rohu)</td>
                      <td className="px-4 py-2.5 text-slate-600">Semi-Intensive</td>
                      <td className="px-4 py-2.5 font-bold text-emerald-700">1.35 – 1.55</td>
                      <td className="px-4 py-2.5 text-slate-600">26% – 30%</td>
                      <td className="px-4 py-2.5 text-red-600 font-semibold">&gt; 1.70 FCR</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-bold text-slate-900 font-sans">Whiteleg Shrimp (Vannamei)</td>
                      <td className="px-4 py-2.5 text-slate-600">Zero-Exchange Biofloc</td>
                      <td className="px-4 py-2.5 font-bold text-emerald-700">1.15 – 1.35</td>
                      <td className="px-4 py-2.5 text-slate-600">35% – 38%</td>
                      <td className="px-4 py-2.5 text-red-600 font-semibold">&gt; 1.50 FCR</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2.5 font-bold text-slate-900 font-sans">Desi Magur / Catfish</td>
                      <td className="px-4 py-2.5 text-slate-600">Intensive Tanks</td>
                      <td className="px-4 py-2.5 font-bold text-emerald-700">1.10 – 1.25</td>
                      <td className="px-4 py-2.5 text-slate-600">34% – 40%</td>
                      <td className="px-4 py-2.5 text-red-600 font-semibold">&gt; 1.40 FCR</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 mt-6 flex gap-3 text-xs sm:text-sm text-emerald-950 font-sans">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p>
                <strong>Operational Summary:</strong> Regularly recording total feed bags opened alongside empirical batch weight sampling ensures early detection of nutritional inefficiency. When calculated FCR drifts higher than 1.40 in commercial Tilapia or Catfish culture, perform an immediate water quality diagnostic, check biofilter backwash intervals, inspect fish for gill parasites, and calibrate daily feed schedules accordingly.
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

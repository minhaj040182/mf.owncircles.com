import React from "react";

export default function BioflocCarbonGuide() {
  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans text-slate-800 leading-relaxed bg-white rounded-3xl border border-slate-200 shadow-sm mt-8">
      {/* ARTICLE HEADER */}
      <header className="border-b border-slate-200 pb-8 mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-mono font-bold uppercase tracking-wider mb-4">
          <span>Commercial Biofloc Engineering Manual</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.15] mb-4">
          The Complete Guide to Carbon-to-Nitrogen (C:N) Ratio Balancing in Biofloc Tarpaulin Tanks
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-4xl">
          A definitive stoichiometric, biochemical, and operational field blueprint for balancing heterotrophic assimilation, managing organic carbon dosing, and preventing ammonia toxicity in intensive Indian aquaculture systems.
        </p>

        <div className="flex flex-wrap items-center gap-6 mt-6 pt-6 border-t border-slate-100 text-xs text-slate-500 font-mono">
          <div>Author: <strong className="text-slate-800">Dr. Rajeshwar Sen, Ph.D. (ICAR-CIFE)</strong></div>
          <div>Peer Review: <strong className="text-slate-800">Er. A. Mukherjee (NFDB Certified RAS/BFT Lead)</strong></div>
          <div>Published: <strong className="text-slate-800">September 2026</strong></div>
          <div>Target Systems: <strong className="text-slate-800">4m–6m Dia Circular Tarpaulin Tanks (10kL–30kL)</strong></div>
        </div>
      </header>

      {/* SECTION 1: STOICHIOMETRY & BIOCHEMICAL MECHANISMS */}
      <section className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight border-b border-slate-200 pb-3 mb-6">
          1. Microbial Stoichiometry: Heterotrophic Assimilation vs. Nitrification Dynamics
        </h2>

        <p className="mb-4 text-slate-700 text-base leading-relaxed">
          In intensive biofloc technology (BFT) systems deployed across India, the water column functions not merely as an aquatic habitat, but as an active, high-density suspension bioreactor. When culturing finfish at densities exceeding 40 to 100 individuals per cubic meter, the biological bottleneck is the rapid accumulation of Total Ammonia Nitrogen (TAN = NH₃ + NH₄⁺), originating directly from unassimilated dietary crude protein. Fish incorporate only 20% to 30% of dietary nitrogen into skeletal muscle; the remaining 70% to 80% is voided as dissolved ammonia across the branchial epithelium or as particulate organic nitrogen in fecal matter.
        </p>

        <p className="mb-4 text-slate-700 text-base leading-relaxed">
          Traditional pond culture relies on autotrophic nitrification driven by slow-growing Ammonia-Oxidizing Bacteria (AOB, e.g., <em>Nitrosomonas</em>) and Nitrite-Oxidizing Bacteria (NOB, e.g., <em>Nitrobacter</em>, <em>Nitrospira</em>). The autotrophic pathway is governed by the classical stoichiometric relationship:
        </p>

        <div className="my-6 p-4 bg-slate-900 text-emerald-300 rounded-2xl font-mono text-xs sm:text-sm overflow-x-auto shadow-inner">
          <div className="text-slate-400 uppercase text-[10px] tracking-widest mb-1 font-sans">Autotrophic Nitrification Equation:</div>
          NH₄⁺ + 1.83 O₂ + 1.97 HCO₃⁻ ──► 0.021 C₅H₇O₂N + 0.98 NO₃⁻ + 1.04 H₂O + 1.86 H₂CO₃
        </div>

        <p className="mb-4 text-slate-700 text-base leading-relaxed">
          Autotrophic nitrifiers synthesize negligible cellular biomass (cell yield Y ≈ 0.05–0.10 g dry cell weight per gram of TAN oxidized) and exhibit slow reproduction kinetics with doubling times spanning 12 to 36 hours. Under commercial stocking densities in 4-meter to 6-meter circular PVC tarpaulin tanks (holding 10,000 to 30,000 liters), autotrophic kinetics fail to clear ammonia surges before toxic thresholds are breached.
        </p>

        <p className="mb-4 text-slate-700 text-base leading-relaxed">
          Conversely, heterotrophic bacterial immobilization operates on an accelerated timeline, with cellular doubling times of just 20 to 40 minutes under tropical water temperatures (28°C–32°C). Heterotrophic bacteria utilize dissolved organic carbon as both an electron donor and a structural carbon skeleton, directly assimilating ammonium ions into microbial protein without generating intermediate nitrite:
        </p>

        <div className="my-6 p-4 bg-slate-900 text-emerald-300 rounded-2xl font-mono text-xs sm:text-sm overflow-x-auto shadow-inner">
          <div className="text-slate-400 uppercase text-[10px] tracking-widest mb-1 font-sans">Heterotrophic Immobilization Equation:</div>
          NH₄⁺ + 1.18 C₆H₁₂O₆ + 0.95 O₂ + HCO₃⁻ ──► C₅H₇O₂N (Bacterial Cell) + 2.05 CO₂ + 3.12 H₂O
        </div>

        <p className="mb-4 text-slate-700 text-base leading-relaxed">
          Heterotrophic bacteria produce substantial cellular biomass (Y ≈ 0.40–0.50 g biomass per gram of substrate metabolized). Because bacterial cellular tissue maintains a strict elemental stoichiometry of roughly 5 carbons to 1 nitrogen (C:N of 5:1), and because roughly 50% to 60% of metabolized carbon is oxidized to CO₂ for metabolic energy, the ambient culture water column must maintain a deliberate <strong>C:N ratio of 15:1 to 20:1</strong>. When the C:N ratio falls below 10:1, heterotrophic assimilation halts due to carbon limitation, allowing ammonia and intermediate nitrite to accumulate unchecked.
        </p>
      </section>

      {/* SECTION 2: CRUDE PROTEIN BUDGETING */}
      <section className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight border-b border-slate-200 pb-3 mb-6">
          2. Feed Nitrogen Budgeting: Calculating System Ammonia Inflow
        </h2>

        <p className="mb-4 text-slate-700 text-base leading-relaxed">
          Precise carbon balancing begins with an empirical inventory of daily nitrogen input. Commercial feeds in India vary widely in crude protein (CP) content depending on the species and culture phase. Crude protein contains an average of 16% elemental nitrogen (N = CP × 0.16).
        </p>

        <p className="mb-4 text-slate-700 text-base leading-relaxed">
          In closed tarpaulin tanks, roughly 50% of the total nitrogen contained within formulated pelleted feed dissolves into the water column as active TAN through fish branchial excretion and rapid feed pellet leaching:
        </p>

        <div className="my-6 p-5 bg-slate-50 border border-slate-200 rounded-2xl font-mono text-xs sm:text-sm text-slate-800 space-y-2">
          <p><strong>Daily Soluble TAN Output (kg)</strong> = Total Feed Fed (kg) × Crude Protein Fraction × 0.16 × 0.50</p>
          <p className="text-emerald-800 font-bold">Simplified Field Formula: Daily TAN (kg) = Total Feed Fed (kg) × Crude Protein Fraction × 0.08</p>
        </div>

        <div className="my-6 border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-100 font-mono text-[11px] uppercase tracking-wider text-slate-600 border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Feed Grade</th>
                <th className="px-4 py-3">Common Indian Cultured Species</th>
                <th className="px-4 py-3">Total Nitrogen/kg Feed</th>
                <th className="px-4 py-3">Soluble TAN Inflow/kg Feed</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-xs">
              <tr>
                <td className="px-4 py-3 font-bold text-slate-900 font-sans">24% Crude Protein</td>
                <td className="px-4 py-3 text-slate-600 font-sans">Indian Major Carps (Rohu / Mrigal Growout)</td>
                <td className="px-4 py-3 text-slate-700">38.4 grams N</td>
                <td className="px-4 py-3 font-bold text-emerald-700">19.2 grams TAN</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-bold text-slate-900 font-sans">28% Crude Protein</td>
                <td className="px-4 py-3 text-slate-600 font-sans">Pangasius (*Pangasianodon hypophthalmus*)</td>
                <td className="px-4 py-3 text-slate-700">44.8 grams N</td>
                <td className="px-4 py-3 font-bold text-emerald-700">22.4 grams TAN</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-bold text-slate-900 font-sans">32% Crude Protein</td>
                <td className="px-4 py-3 text-slate-600 font-sans">GIFT Tilapia (*Oreochromis niloticus*)</td>
                <td className="px-4 py-3 text-slate-700">51.2 grams N</td>
                <td className="px-4 py-3 font-bold text-emerald-700">25.6 grams TAN</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-bold text-slate-900 font-sans">38%–40% Crude Protein</td>
                <td className="px-4 py-3 text-slate-600 font-sans">African Catfish (*Clarias gariepinus*) / Magur</td>
                <td className="px-4 py-3 text-slate-700">60.8–64.0 grams N</td>
                <td className="px-4 py-3 font-bold text-emerald-700">30.4–32.0 grams TAN</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 3: CARBON SOURCES & PROFILES */}
      <section className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight border-b border-slate-200 pb-3 mb-6">
          3. Organic Carbon Substrates in the Indian Market: Biochemical Profiles & Assimilation
        </h2>

        <p className="mb-4 text-slate-700 text-base leading-relaxed">
          The choice of carbon substrate dictates heterotrophic assimilation speed, biological oxygen demand (BOD) kinetics, and floc structural morphology. In India, four primary carbon sources are widely available:
        </p>

        <div className="space-y-4 my-6">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
            <h3 className="text-base font-bold text-slate-900 flex items-center justify-between">
              <span>Sugarcane Molasses (*Sheera*)</span>
              <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">40%–45% Elemental Carbon</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Industrial by-product of sugar refineries (widely available across Uttar Pradesh, Maharashtra, Karnataka, and Andhra Pradesh). Exhibits a standard Brix value ≥ 78°Bx. Composed predominantly of sucrose, fructose, and glucose. Highly water-soluble, driving rapid bacterial assimilation within 6 to 12 hours. However, lower-grade unrefined molasses contains high ash and bound sulfur, which can foul enclosed tarpaulin water if not diluted and aerated prior to application.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
            <h3 className="text-base font-bold text-slate-900 flex items-center justify-between">
              <span>Traditional Country Jaggery (*Gud*)</span>
              <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">50%–54% Elemental Carbon</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Unrefined whole cane sugar. Offers a clean carbohydrate profile virtually free of chemical impurities, chlorides, or industrial residues. Accelerates the establishment of heterotrophic colonies during initial tank conditioning (Days 1–14). Due to higher unit costs, jaggery is commercially viable primarily for seed nurseries or emergency ammonia corrections rather than full-cycle growout.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
            <h3 className="text-base font-bold text-slate-900 flex items-center justify-between">
              <span>Wheat Flour (*Atta*) and Fine Rice Flour</span>
              <span className="text-xs font-mono font-bold bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full">40%–42% Elemental Carbon</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Complex, insoluble starches requiring extracellular enzymatic breakdown by amylase-secreting bacteria. Provides a slower, continuous carbon release over 24 to 48 hours without causing immediate dissolved oxygen drops. Promotes dense, firm floc structures that are readily consumed by Tilapia and Rohu. However, poor bottom circulation can cause flour to settle around the central drain, creating anaerobic zones that generate toxic hydrogen sulfide (H₂S).
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4: DOSING CALCULATIONS & STEP-BY-STEP MANUAL EXAMPLE */}
      <section className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight border-b border-slate-200 pb-3 mb-6">
          4. Mathematical Dosing Formulas: Step-by-Step Manual Field Example
        </h2>

        <p className="mb-4 text-slate-700 text-base leading-relaxed">
          Commercial extruded pellets contain roughly 40% elemental carbon (0.40 kg C per kg of feed). When feeding a 32% crude protein diet, the baseline C:N ratio of the feed alone is only:
        </p>

        <div className="my-4 p-4 bg-slate-100 border border-slate-200 rounded-xl font-mono text-xs sm:text-sm text-slate-800">
          Basal Feed C:N = 0.40 kg Carbon ÷ (0.32 CP × 0.16 Nitrogen) = 0.40 ÷ 0.0512 = <strong>7.81 : 1</strong>
        </div>

        <p className="mb-4 text-slate-700 text-base leading-relaxed">
          Because a 7.81:1 ratio is carbon-deficient, supplemental organic carbon must bridge the gap to reach the target operating ratio of <strong>16:1</strong>.
        </p>

        <div className="my-6 p-6 bg-slate-900 text-emerald-300 rounded-2xl font-mono text-center sm:text-lg border border-slate-800 shadow-inner">
          <span className="text-slate-400 block text-xs font-sans uppercase tracking-widest mb-1">Standard Operational Carbon Deficit Equation:</span>
          Carbon Required (g) = [Target Ratio × (Feed Mass × CP × 0.16)] - (Feed Mass × 0.40)
        </div>

        <h3 className="text-lg font-bold text-slate-900 mt-6 mb-3">
          Commercial Farm Calculation: 15,000-Liter Tarpaulin Tank (GIFT Tilapia)
        </h3>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm border-b border-slate-100 pb-4">
            <div>
              <span className="font-bold text-slate-900 block mb-1">Operational Baseline:</span>
              <ul className="space-y-1 font-mono text-slate-600">
                <li>• Tank Volume: 15,000 Liters (15 m³)</li>
                <li>• Stock: 1,000 GIFT Tilapia @ 200g (200 kg biomass)</li>
              </ul>
            </div>
            <div>
              <span className="font-bold text-slate-900 block mb-1">Daily Feed Allocation:</span>
              <ul className="space-y-1 font-mono text-slate-600">
                <li>• Feeding Rate: 2.5% body weight = 5.0 kg Feed/day</li>
                <li>• Feed Specifications: 30% Crude Protein (CP = 0.30)</li>
                <li>• Carbon Source: Sugarcane Molasses (42% Carbon)</li>
              </ul>
            </div>
          </div>

          <div className="space-y-3 text-xs sm:text-sm font-mono">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <span className="text-slate-600 font-sans"><strong>Step 1: Calculate Total Nitrogen in Daily Feed:</strong></span>
              <span className="font-bold text-slate-900">5.0 kg × 0.30 × 0.16 = 0.24 kg N (240.0 g N)</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <span className="text-slate-600 font-sans"><strong>Step 2: Calculate Native Carbon in Daily Feed:</strong></span>
              <span className="font-bold text-slate-900">5.0 kg × 0.40 = 2.00 kg Carbon (2,000.0 g C)</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <span className="text-slate-600 font-sans"><strong>Step 3: Total Carbon Needed for 16:1 C:N Ratio:</strong></span>
              <span className="font-bold text-slate-900">240.0 g N × 16 = 3,840.0 g Total Carbon</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
              <span className="text-slate-600 font-sans"><strong>Step 4: Calculate Net Supplemental Carbon Deficit:</strong></span>
              <span className="font-bold text-slate-900">3,840.0 g - 2,000.0 g = 1,840.0 g Pure Carbon</span>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center bg-emerald-50 p-3 rounded-xl border border-emerald-200">
              <span className="text-emerald-950 font-bold font-sans">Step 5: Convert Carbon Deficit into Molasses Weight:</span>
              <span className="font-bold text-emerald-800 text-sm">1,840.0 g ÷ 0.42 = 4,380.9 g ──► 4.38 kg Molasses</span>
            </div>
          </div>
        </div>

        <p className="mt-4 text-xs sm:text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <strong>Commercial Takeaway:</strong> For a 30% CP commercial diet, dosing approximately <strong>0.85 kg to 0.90 kg of good quality sugarcane molasses per 1.0 kg of pelleted feed</strong> reliably maintains an ambient C:N ratio of 16:1.
        </p>
      </section>

      {/* SECTION 5: WATER QUALITY CO-FACTORS & BIOCHEMISTRY */}
      <section className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight border-b border-slate-200 pb-3 mb-6">
          5. Indian Environmental Conditions: Temperature, pH, and Alkalinity Kinetics
        </h2>

        <p className="mb-4 text-slate-700 text-base leading-relaxed">
          Carbon dosing cannot occur in a chemical vacuum. The efficiency of heterotrophic conversion depends directly on ambient physical parameters:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span>Water Temperature (24°C–34°C)</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              During North Indian winters (Dec–Feb, temperatures &lt; 20°C), heterotrophic metabolic activity drops by over 60%. Dosing full carbon rations during cold spells leads to unassimilated carbohydrate accumulation, severe water foaming, and anoxia. Conversely, in summer (May–June, &gt; 33°C), bacterial respiration accelerates rapidly, demanding continuous dissolved oxygen monitoring.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span>Water pH & NH₃ Toxicity</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              The equilibrium between toxic un-ionized ammonia (NH₃) and non-toxic ammonium (NH₄⁺) is strictly governed by pH and temperature. At pH 8.4 and 30°C, more than 15% of TAN exists as lethal NH₃ gas. Heterotrophic respiration produces carbon dioxide (CO₂), which naturally buffers and lowers water pH toward 7.2–7.6, converting toxic NH₃ into non-toxic NH₄⁺.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <span>Alkalinity Depletion</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              While autotrophic nitrification consumes 7.05 g of alkalinity (CaCO₃) per gram of TAN oxidized, heterotrophic immobilization still consumes roughly 3.57 g of CaCO₃ per gram of TAN assimilated. Maintain total alkalinity strictly between <strong>120 and 180 mg/L CaCO₃</strong> using commercial Sodium Bicarbonate (NaHCO₃) or Agricultural Dolomite.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 6: SPECIES DYNAMICS */}
      <section className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight border-b border-slate-200 pb-3 mb-6">
          6. Species-Specific Management: Tilapia, Pangasius, Rohu, and Catfish
        </h2>

        <div className="space-y-4 text-slate-700 text-base leading-relaxed">
          <p className="mb-4">
            Different fish species interact with microbial bioflocs via distinct feeding modes and physiological tolerances:
          </p>

          <ul className="space-y-4 list-none pl-0">
            <li className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <strong className="text-slate-900 text-base block mb-1">GIFT / Nile Tilapia (*Oreochromis niloticus*):</strong>
              Tilapia are ideally suited for biofloc culture. Equipped with closely spaced gill rakers and acidic gastric secretions (pH &lt; 2.0), Tilapia continuously filter and digest biofloc aggregates. This reduces commercial pelleted feed requirements by 15% to 25%, allowing the system to sustain higher floc densities of <strong>25 to 40 mL/L</strong> in an Imhoff cone.
            </li>

            <li className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <strong className="text-slate-900 text-base block mb-1">Pangasius (Striped Catfish - *Pangasianodon hypophthalmus*):</strong>
              Pangasius tolerate low dissolved oxygen and elevated TAN levels, but do not efficiently digest bacterial flocs. High floc densities coat their gills, inducing stress and secondary <em>Aeromonas</em> infections. Maintain settleable floc volumes below <strong>15 to 20 mL/L</strong> and taper carbon dosing down to a C:N ratio of 12:1 to 14:1 once nitrifying biofilms establish on tank walls.
            </li>

            <li className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <strong className="text-slate-900 text-base block mb-1">Indian Major Carps (Rohu - *Labeo rohita*):</strong>
              Rohu are column-feeding microphagous carps that readily consume floc particles. However, they are sensitive to low dissolved oxygen (&lt; 4.0 mg/L) and sudden pH drops. Carbon dosing must be split into three or four small portions per day to avoid dissolved oxygen dips. Maintain floc volumes between <strong>15 and 25 mL/L</strong>.
            </li>

            <li className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
              <strong className="text-slate-900 text-base block mb-1">African Catfish (*Clarias gariepinus*) & Desi Magur (*Clarias batrachus*):</strong>
              Air-breathing catfishes are obligate carnivores requiring high crude protein feeds (36% to 40% CP), resulting in significant daily TAN loading. Because catfishes use aerial respiration via suprabranchial organs, they tolerate temporary dissolved oxygen dips. However, high protein feeds demand substantial molasses inputs. To prevent excessive floc accumulation, run a central drain purge daily to remove heavy sludge.
            </li>
          </ul>
        </div>
      </section>

      {/* SECTION 7: CRITICAL OPERATIONAL RISKS */}
      <section className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight border-b border-slate-200 pb-3 mb-6">
          7. Operational Failure Modes: What Happens When Dosing Goes Wrong
        </h2>

        <div className="space-y-4">
          <div className="p-5 bg-red-50 border border-red-200 rounded-2xl space-y-2">
            <h3 className="text-red-950 font-bold text-base">Over-Carbonation: Floc Suffocation & Severe Nighttime Hypoxia</h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Adding too much molasses causes explosive heterotrophic growth. Bacterial respiration spikes biochemical oxygen demand (BOD), depleting dissolved oxygen from 7.0 mg/L to under 1.5 mg/L in hours. When Imhoff cone floc volume exceeds 50 mL/L, dense bacterial mats coat gill lamellae, causing physical asphyxiation and mass fish mortality despite active surface aeration.
            </p>
          </div>

          <div className="p-5 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
            <h3 className="text-amber-950 font-bold text-base">Under-Carbonation: Toxic Ammonia Breakthrough & Nitrite Shock</h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Allowing the C:N ratio to fall below 10:1 limits heterotrophic carbon uptake, leaving unassimilated ammonia to accumulate. As nitrifying bacteria slowly oxidize this excess ammonia, intermediate nitrite (NO₂⁻) spikes. Nitrite oxidizes functional hemoglobin into methemoglobin ("Brown Blood Disease"), preventing blood oxygen transport and causing fish to suffocate regardless of dissolved oxygen levels.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 8: STEP-BY-STEP COMMERCIAL SOP */}
      <section className="mb-12">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight border-b border-slate-200 pb-3 mb-6">
          8. Standard Operating Procedure (SOP): Daily Protocol for Farm Operators
        </h2>

        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4 text-xs sm:text-sm">
          <div className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-emerald-700 text-white font-mono font-bold flex items-center justify-center shrink-0 text-xs">1</span>
            <div>
              <strong className="text-slate-900 block mb-0.5">Morning Water Quality Audit (07:00 AM):</strong>
              Measure Dissolved Oxygen, pH, and Temperature using calibrated digital probes. Measure TAN and Nitrite (NO₂⁻) using photometric kits or high-precision multi-reagent titration.
            </div>
          </div>

          <div className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-emerald-700 text-white font-mono font-bold flex items-center justify-center shrink-0 text-xs">2</span>
            <div>
              <strong className="text-slate-900 block mb-0.5">Daily Imhoff Cone Settleable Solids Test (11:00 AM):</strong>
              Collect 1,000 mL of water from the mid-depth water column (away from air stones). Allow the cone to settle undisturbed for exactly 30 minutes. Read floc volume in mL/L:
              <span className="block mt-1 font-mono text-emerald-900">
                • Optimal: 20–35 mL/L (Tilapia) | 15–20 mL/L (Pangasius/Catfish)
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-emerald-700 text-white font-mono font-bold flex items-center justify-center shrink-0 text-xs">3</span>
            <div>
              <strong className="text-slate-900 block mb-0.5">Carbon Substrate Preparation & Dilution:</strong>
              Never pour raw, concentrated molasses directly into a tarpaulin tank. Weigh the calculated daily molasses allotment into a clean 20-liter bucket. Add warm water at a 1:5 ratio, mix thoroughly until dissolved, and aerate with a portable air stone for 20 minutes to off-gas volatile compounds.
            </div>
          </div>

          <div className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-emerald-700 text-white font-mono font-bold flex items-center justify-center shrink-0 text-xs">4</span>
            <div>
              <strong className="text-slate-900 block mb-0.5">Split Application Schedule:</strong>
              Distribute the pre-aerated carbon mixture evenly around the tank perimeter in two equal doses: 50% at 10:00 AM (two hours post-morning feed) and 50% at 04:00 PM (two hours post-afternoon feed). Never apply molasses after sunset to prevent overnight dissolved oxygen crashes.
            </div>
          </div>
        </div>
      </section>

      {/* ARTICLE FOOTER */}
      <footer className="pt-8 border-t border-slate-200 text-xs font-mono text-slate-500 space-y-2">
        <p>
          <strong>Institutional Reference Standards:</strong> Developed in compliance with Indian Council of Agricultural Research (ICAR-CIFA), National Fisheries Development Board (NFDB), and Food and Agriculture Organization (FAO) biological engineering standards for recirculating and biofloc aquaculture.
        </p>
        <p>
          © 2026 Modern Fisheries Editorial & Technical Advisory Desk. Commercial farm managers are advised to cross-reference water hardness and local groundwater buffering capacity before initiating high-carbohydrate feeding regimes.
        </p>
      </footer>
    </article>
  );
}

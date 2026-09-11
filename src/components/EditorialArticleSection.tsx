import React from "react";
import { BookOpen, Award, FileText, CheckCircle2, TrendingUp, Droplets, ShieldCheck, Microscope } from "lucide-react";

export default function EditorialArticleSection() {
  return (
    <article 
      id="state-of-aquaculture-editorial" 
      className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-sm space-y-8 text-left leading-relaxed font-sans"
    >
      {/* Journal Header Bar */}
      <div className="border-b border-slate-200 pb-6 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-mono font-bold uppercase tracking-wider">
            <Microscope className="w-3.5 h-3.5 text-emerald-600" />
            <span>Peer-Reviewed Educational Review</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
            <span>Special Issue: Precision Bio-Engineering</span>
            <span>•</span>
            <span>Open Access Review Paper</span>
          </div>
        </div>

        <h2 className="font-sans font-black text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight leading-tight pt-1">
          The State of Precision Aquaculture Technology in India
        </h2>
        <p className="text-slate-600 text-sm sm:text-base italic font-serif">
          A critical analysis of macroeconomic growth metrics, ecological advantages of zero-water exchange bio-reactors, and the physiological dynamics governing high-density fish husbandry.
        </p>
      </div>

      {/* Editorial Body Content */}
      <div className="space-y-8 text-slate-700 text-sm sm:text-base">
        
        {/* Section 1: Industry Macro-Statistics */}
        <section className="space-y-4">
          <h3 className="font-sans font-extrabold text-xl text-slate-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            1. Macroeconomic Trajectory and Production Metrics in Indian Aquaculture
          </h3>
          <p>
            India represents the second-largest aquaculture producing country globally, contributing approximately 8% to global fish production. In recent fiscal cycles, national production surpassed 17.5 million metric tonnes (MMT), with the inland inland aquaculture domain generating more than 75% (13.5+ MMT) of this aggregate volume. Under strategic governmental frameworks such as the Pradhan Mantri Matsya Sampada Yojana (PMMSY)—backed by an allocated public expenditure exceeding ₹20,050 crore (US$ 2.4 billion)—the sector is systematically shifting away from extensive, low-input pond farming toward scientifically managed, technology-intensive closed systems.
          </p>
          <p>
            Traditional freshwater aquaculture across the Godavari basin, Bengal floodplains, and Punjab canal belts historically yielded modest biomass outputs ranging from 2.0 to 4.5 metric tonnes per hectare per annum. Conversely, modern Recirculating Aquaculture Systems (RAS) and Biofloc Technology (BFT) installations routinely achieve production densities of 40 to 80 kilograms per cubic meter (equivalent to 400 to 800 metric tonnes per hectare normalized). This transition is economically vital: as arable rural land values appreciate and freshwater resources face unprecedented depletion, intensification through precision hardware offers a mathematically reproducible path to national protein self-sufficiency.
          </p>
          
          {/* Statistical Highlights Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
              <span className="block text-xs font-mono font-bold text-emerald-700 uppercase">National Inland Yield</span>
              <strong className="block text-2xl font-mono font-black text-slate-900 mt-1">13.5+ MMT</strong>
              <span className="text-xs text-slate-500 mt-1 block">Annual inland fisheries production</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
              <span className="block text-xs font-mono font-bold text-emerald-700 uppercase">Intensive Density Multiplier</span>
              <strong className="block text-2xl font-mono font-black text-slate-900 mt-1">15x – 25x</strong>
              <span className="text-xs text-slate-500 mt-1 block">Output yield per unit volume</span>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl">
              <span className="block text-xs font-mono font-bold text-emerald-700 uppercase">Freshwater Conservation</span>
              <strong className="block text-2xl font-mono font-black text-slate-900 mt-1">90% – 95%</strong>
              <span className="text-xs text-slate-500 mt-1 block">Water reduction via closed loops</span>
            </div>
          </div>
        </section>

        {/* Section 2: Environmental Benefits of Zero-Water Exchange */}
        <section className="space-y-4">
          <h3 className="font-sans font-extrabold text-xl text-slate-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            2. Ecological Dynamics and Freshwater Conservation in Zero-Water Exchange
          </h3>
          <p>
            Conventional static aquaculture operations require daily water discharge exchanges between 10% and 30% of total pond volume to stave off organic sludge accumulation and prevent acute ammonia toxicity. In water-stressed agro-climatic zones, such heavy hydraulic throughput is environmentally unsustainable. Zero-water exchange closed loops, specifically engineered through Biofloc microbial consortiums and multi-stage mechanical/biological RAS loops, remediate up to 99% of culture water continuously within the cultivation perimeter.
          </p>
          <p>
            The environmental dividend of zero-water exchange manifests across two critical vectors: hydrological conservation and effluent abatement. Mechanically, closed-loop recirculating matrices utilize approximately 100 to 300 liters of replacement water per kilogram of harvested finfish, compared to 15,000 to 30,000 liters required in unmanaged earthen ponds. Ecologically, the complete containment of nutrient-loaded effluent eliminates the unmitigated discharge of dissolved reactive phosphorus (DRP) and nitrogenous organic loads into riparian river networks, thereby preventing anthropogenic eutrophication, harmful algal blooms (HABs), and groundwater contamination.
          </p>
          <p>
            Furthermore, biosecurity integrity is intrinsically heightened. In flow-through or open estuarine ponds, inlet water carries wild pathogen vectors, including <em>Aeromonas hydrophila</em>, <em>Flavobacterium columnare</em>, and parasitic crustacean copepods. Closed zero-water systems isolate the culture biomass behind physical micro-strainers and ultraviolet (UV) germicidal irradiation loops operating at dosages exceeding 30,000 µW·s/cm², virtually eliminating horizontal pathogen transmission from ambient water reservoirs.
          </p>
        </section>

        {/* Section 3: Biology and Physiology of High-Density Fish Husbandry */}
        <section className="space-y-4">
          <h3 className="font-sans font-extrabold text-xl text-slate-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            3. Biological Mechanisms and Biochemical Equilibria in Intensive Culture
          </h3>
          <p>
            Sustaining fish biomass at concentrations exceeding 50 kg/m³ requires rigorous computational control over biological carrying capacity, respiratory stoichiometry, and metabolic waste transformations. The primary biological constraint in intensive finfish cultivation is the rapid buildup of Total Ammonia Nitrogen (TAN), comprising ionized ammonium (NH₄⁺) and un-ionized toxic ammonia gas (NH₃). The fundamental chemical equilibrium is dictated by ambient pH and water temperature according to the Henderson-Hasselbalch equation:
          </p>
          
          <div className="bg-slate-900 text-emerald-300 p-4 rounded-2xl font-mono text-xs sm:text-sm overflow-x-auto shadow-inner">
            <p className="text-slate-400 mb-1">// Thermodynamic Dissociation Ratio of Toxic Un-ionized Ammonia (NH3):</p>
            <p>NH₄⁺ + H₂O &hArr; NH₃ + H₃O⁺ &nbsp;|&nbsp; pKa = 0.09018 + (2729.92 / (273.15 + T_Celsius))</p>
            <p className="mt-2 text-slate-400">// Toxic NH3 Fraction (%):</p>
            <p>% NH₃ = 100 / [ 10^(pKa - pH) + 1 ]</p>
          </div>

          <p>
            Because un-ionized ammonia crosses the gill epithelium via passive diffusion into lipid bilayer membranes, concentrations exceeding 0.05 mg/L inflict severe gill hyperplasia, sub-lethal osmoregulatory distress, and elevated blood cortisol titers. In biological bio-reactors, autotrophic nitrifiers—primarily <em>Nitrosomonas</em> and <em>Nitrospira</em>—oxidize ammonia into nitrite (NO₂⁻) and subsequently nitrate (NO₃⁻). In heterotrophic Biofloc regimes, organic carbon supplementation (molasses or sucrose) adjusted to a strict C:N stoichiometric ratio of 15:1 prompts heterotrophic bacterial communities to immobilize ammonium directly into single-cell microbial protein flocs (SCP), which are re-ingested by grazing species such as Genetically Improved Farmed Tilapia (GIFT) and <em>Pangasianodon hypophthalmus</em>.
          </p>
          <p>
            Concurrently, respiratory kinetics govern system survival. The Oxygen Consumption Rate ($VO_2$) of active finfish scales directly with feeding intensity and temperature, spiking postprandially to 400–600 mg O₂ per kilogram of biomass per hour. Consequently, precision aeration architecture—combining fine-bubble micro-porous aero-tubes with liquid oxygen (LOX) injection cones—must maintain dissolved oxygen (DO) tensions persistently above 5.5 mg/L. When oxygen saturation remains stable, physiological Feed Conversion Ratios (FCR) compress toward 1.15 to 1.30, maximizing protein retention while drastically reducing unassimilated nitrogen excreted into the aquatic medium.
          </p>
        </section>

        {/* Section 4: Concluding Research Perspective */}
        <section className="space-y-4 border-t border-slate-100 pt-6">
          <h3 className="font-sans font-extrabold text-xl text-slate-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
            4. Computational Modeling as the Foundation for Modern Aquatic Agriculture
          </h3>
          <p>
            The modernization of India's fisheries sector requires transitioning from empirical intuition to mathematically grounded biological engineering. By integrating mass-balance equations for solids removal, hydraulic retention time sizing, and predictive nutrition formulas, researchers and commercial culturists can systematically mitigate systemic risks. Open-access research, reproducible system blueprints, and precision calculation algorithms remain the key drivers propelling sustainable, climate-resilient aquaculture across the subcontinent.
          </p>
        </section>

      </div>
      
      {/* Editorial Attribution Footer */}
      <div className="border-t border-slate-200 pt-4 flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-500">
        <span>Published by Modern Fisheries Technical Editorial Board</span>
        <span>ISSN: Open-Access Aquatic Research Matrix</span>
      </div>
    </article>
  );
}

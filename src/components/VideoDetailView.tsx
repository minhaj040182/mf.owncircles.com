import React, { useState } from "react";
import { Video } from "../types";
import { ThumbsUp, Share2, Eye, Calendar, ArrowLeft, RefreshCw, CheckCircle, ExternalLink, X, Youtube } from "lucide-react";
import AdBanner from "./AdBanner";
import OwnCirclesAnnouncement from "./OwnCirclesAnnouncement";

interface VideoDetailViewProps {
  video: Video;
  relatedVideos: Video[];
  onBack: () => void;
  onSelectVideo: (video: Video) => void;
}

const VIDEO_TECHNICAL_GUIDES: Record<string, { focus: string; checkpoints: string[] }> = {
  "Biofloc": {
    focus: "Biofloc performance depends on stable aeration, alkalinity, carbon dosing, suspended-floc volume, and careful control of total ammonia nitrogen. Treat every tank as a biological reactor and make adjustments from measured water data rather than appearance alone.",
    checkpoints: ["Confirm uninterrupted aeration and backup power", "Measure pH, alkalinity, ammonia, nitrite, and settled floc", "Adjust the carbon source gradually against daily feed input", "Remove excess sludge before it consumes oxygen"],
  },
  "RAS": {
    focus: "A recirculating aquaculture system succeeds when hydraulic flow, solids capture, nitrification, gas exchange, oxygenation, and disinfection operate as one balanced treatment train. Equipment capacity should be checked against peak biomass and feed load.",
    checkpoints: ["Verify culture-tank turnover and pump duty point", "Remove settleable and suspended solids early", "Track ammonia and nitrite across the biofilter", "Maintain redundancy for pumps, oxygen, and alarms"],
  },
  "Aquaponics": {
    focus: "Aquaponics links fish feeding, microbial mineralization, nitrification, and plant uptake. A productive design balances feed input with crop area while protecting fish from root-zone solids, low oxygen, and sudden pH changes.",
    checkpoints: ["Match planted area to sustainable daily feed input", "Keep solids away from sensitive plant roots", "Monitor pH for fish, bacteria, and nutrient availability", "Check water flow through every grow bed or channel"],
  },
  "Hydroponics": {
    focus: "Hydroponic crop performance is governed by root-zone oxygen, nutrient concentration, pH, temperature, water movement, and sanitation. Crop-specific electrical conductivity targets are more reliable than using a single nutrient strength for every growth stage.",
    checkpoints: ["Calibrate pH and EC meters before dosing", "Inspect roots for oxygen stress or discoloration", "Prevent stagnant sections and blocked emitters", "Record nutrient additions and reservoir changes"],
  },
  "Pond Setup": {
    focus: "Pond preparation should combine soil and water assessment, secure embankments, screened inlets, dependable drainage, liming based on alkalinity, and aeration sized for expected biomass. Stocking before the pond stabilizes increases avoidable risk.",
    checkpoints: ["Inspect dikes, inlet screens, and drainage structures", "Test source water before filling or exchanging", "Base lime and fertilizer use on measured conditions", "Prepare emergency aeration before stocking"],
  },
  "Harvesting": {
    focus: "Harvest quality depends on planning well before the net enters the water. Feed withdrawal, oxygen management, gentle crowding, clean equipment, rapid grading, temperature control, and accurate biomass records reduce stress and protect sale value.",
    checkpoints: ["Plan feed withdrawal for the species and market", "Harvest during cooler, well-oxygenated conditions", "Minimize crowding time and physical damage", "Record count, average weight, survival, and total yield"],
  },
  "Feeding": {
    focus: "Feed is usually the largest operating cost in intensive aquaculture. Good management connects pellet size, protein level, feeding frequency, appetite, temperature, dissolved oxygen, biomass estimates, and feed-conversion records instead of following a fixed ration blindly.",
    checkpoints: ["Sample fish regularly to update biomass", "Match pellet size and protein to growth stage", "Reduce feeding when oxygen or appetite declines", "Calculate FCR from verified feed and weight-gain records"],
  },
  "Diseases": {
    focus: "Visible symptoms alone rarely identify a fish disease reliably. Diagnosis should combine behavior, recent mortality, skin and gill observations, water-quality measurements, stocking history, and laboratory support where available before selecting a treatment.",
    checkpoints: ["Check dissolved oxygen, pH, ammonia, and nitrite first", "Isolate affected stock and disinfect shared equipment", "Document symptoms, mortality, and recent management changes", "Use medications only with qualified local guidance"],
  },
  "Breeding": {
    focus: "Hatchery consistency requires healthy broodstock, controlled spawning conditions, hygienic egg handling, stable incubation flow, rapid removal of dead eggs, and stage-appropriate live or formulated feeds for fry. Small deviations can sharply reduce survival.",
    checkpoints: ["Track broodstock origin, condition, and sex ratio", "Stabilize temperature, oxygen, and incubation flow", "Separate weak or dead eggs promptly", "Grade fry and record hatch and survival percentages"],
  },
  "Water Quality": {
    focus: "Water-quality decisions should be based on trends, not one isolated reading. Dissolved oxygen, temperature, pH, alkalinity, ammonia, nitrite, and system-specific solids measurements interact and should be logged at consistent times each day.",
    checkpoints: ["Calibrate instruments and label sampling locations", "Measure oxygen during the daily low-risk window", "Relate ammonia toxicity to pH and temperature", "Change water or dose chemicals gradually"],
  },
  "Innovation": {
    focus: "Aquaculture automation is valuable only when sensors, controls, mechanics, and backup procedures remain dependable in wet farm conditions. New equipment should be trialed at small scale and compared with manual measurements before production depends on it.",
    checkpoints: ["Validate sensor readings against a trusted instrument", "Provide manual override and power-loss recovery", "Protect wiring and moving parts from water and corrosion", "Measure labor, energy, survival, and feed savings"],
  },
};

function getVideoTechnicalGuide(video: Video) {
  return VIDEO_TECHNICAL_GUIDES[video.category] || {
    focus: "Apply the method as part of a measured farm-management plan. Confirm species requirements, system capacity, water quality, operating cost, and local conditions before scaling a demonstration into commercial production.",
    checkpoints: ["Record baseline conditions before changing the system", "Test the method on a manageable production unit", "Monitor fish behavior and water quality", "Compare measured results with cost and labor inputs"],
  };
}

export default function VideoDetailView({ video, relatedVideos, onBack, onSelectVideo }: VideoDetailViewProps) {
  const [shareCopied, setShareCopied] = useState(false);
  const [showAd, setShowAd] = useState(true);

  // Extract standard YouTube ID
  const getYouTubeId = (url: string) => {
    if (!url) return "";
    let videoId = "";
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    if (match && match[2] && match[2].length === 11) {
      videoId = match[2];
    } else {
      const trimmed = url.trim();
      if (trimmed.length === 11) {
        videoId = trimmed;
      }
    }
    return videoId;
  };

  const ytId = getYouTubeId(video.videoUrl);
  const technicalGuide = getVideoTechnicalGuide(video);

  const handleShare = () => {
    const appUrl = window.location.href;
    navigator.clipboard.writeText(appUrl).then(() => {
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    }).catch((err) => {
      console.error("Failed to copy URL:", err);
    });
  };

  const getEmbedUrl = (url: string) => {
    if (!url) return "";
    if (url.includes("/embed/")) {
      return url;
    }
    return ytId ? `https://www.youtube.com/embed/${ytId}` : url;
  };

  const renderDescriptionWithLinks = (text: string) => {
    if (!text) return null;
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 hover:underline font-semibold break-all inline-flex items-center gap-0.5"
          >
            {part.length > 40 ? part.substring(0, 37) + "..." : part}
            <ExternalLink className="w-3 h-3 shrink-0" />
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="w-full max-w-full">
      
      {/* Back button */}
      <button 
        id="btn-back-to-list"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-green-700 hover:text-green-800 font-semibold font-sans text-sm mb-6 transition-all group cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Video Gallery</span>
      </button>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left 2 Cols: Player & Details */}
        <div className="lg:col-span-2">
          
          {/* Custom Video Player Wrapper */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-900 shadow-md">
            <iframe
              id="active-video-iframe"
              src={getEmbedUrl(video.videoUrl)}
              title={video.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>

            {/* Opaque Advertisement Panel at bottom of video player */}
            {showAd && (
              <div className="absolute inset-x-0 bottom-0 bg-slate-950/90 backdrop-blur-md text-white py-1 px-2 border-t border-white/10 shadow-2xl animate-fade-in flex flex-col items-center justify-center z-10">
                {/* Close Button positioned at Top Right */}
                <div className="w-full flex items-center justify-end px-1">
                  <button
                    onClick={() => setShowAd(false)}
                    className="text-slate-400 hover:text-white p-0.5 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                    title="Close Advertisement"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Centered Ad Frame matching 728x90 leaderboard spec */}
                <div className="w-full flex items-center justify-center overflow-hidden py-0.5">
                  <div className="relative w-full max-w-[728px] aspect-[728/90] flex items-center justify-center overflow-hidden">
                    <div
                      className="absolute w-[728px] h-[90px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 origin-center transform scale-[0.38] min-[400px]:scale-[0.5] sm:scale-[0.72] md:scale-[0.85] lg:scale-100 flex items-center justify-center bg-slate-900 text-[10px] font-mono uppercase tracking-widest text-slate-400"
                      aria-label="Advertisement"
                    >
                      Advertisement
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Float share button inside the player at bottom-left */}
            <button
              id="float-share-video"
              onClick={handleShare}
              className={`absolute left-4 bottom-4 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-lg backdrop-blur-md border cursor-pointer transition-all active:scale-95 ${
                shareCopied 
                  ? "bg-emerald-500 border-emerald-500 text-white" 
                  : "bg-slate-900/90 hover:bg-slate-800/90 border-white/20 text-[#1877F2]"
              }`}
              title="Share current app page link"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{shareCopied ? "Link Copied!" : "Share Link"}</span>
            </button>
          </div>

          {/* Top Advertisement Banner right after the Video Player */}
          <div id="video-detail-top-ad" className="mt-4 mb-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xs p-1">
            <AdBanner reloadKey={`video-detail-${video.id}`} />
          </div>

          {/* Personal Advertisement OwnCircles Dev Panel */}
          <div id="video-detail-owncircles-ad" className="my-2">
            <OwnCirclesAnnouncement mode="mobile" />
          </div>

          {/* Title & Actions bar */}
          <div className="mt-5 border-b border-green-50 pb-6">
            <div className="flex gap-2 mb-3">
              {video.type === "own" || (video.creator || "").toLowerCase().includes("modern fisheries") ? (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-600 text-white">
                  Modern Fisheries
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide bg-red-600 text-white flex items-center gap-1">
                  <Youtube className="w-3 h-3" />
                  <span>{video.creator || "YouTube Channel"}</span>
                </span>
              )}
              {video.category && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-green-50 text-green-800 border border-green-100/50">
                  {video.category}
                </span>
              )}
            </div>

            <h1 className="font-sans font-extrabold text-xl sm:text-2xl text-slate-900 tracking-tight leading-tight">
              {video.title}
            </h1>

            {/* Video Meta & Action Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
              <div className="flex items-center gap-4 text-xs font-mono text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-slate-400" />
                  <span>{video.views}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Published {video.publishDate}</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <div
                  id="badge-likes-video"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border bg-slate-50 border-slate-200 text-slate-600 select-none"
                  title="Likes count"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-slate-400" />
                  <span>{video.likes ? video.likes.toLocaleString() : 0} Likes</span>
                </div>

                <button
                  id="btn-share-video"
                  onClick={handleShare}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
                    shareCopied 
                      ? "bg-emerald-500 border-emerald-500 text-white" 
                      : "bg-white hover:bg-slate-50 border-slate-200 text-[#1877F2]"
                  }`}
                  title="Share current app page link"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{shareCopied ? "Link Copied!" : "Share Link"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Description & Channel Bio */}
          <div className="mt-6 border-b border-green-50 pb-6">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center text-green-800 font-extrabold text-sm border-2 border-green-50 shrink-0">
                {(video.creator || "Modern Fisheries").slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="font-sans font-bold text-slate-900 text-sm flex items-center gap-1.5">
                  {video.creator || "Modern Fisheries"}
                  <CheckCircle className="w-4 h-4 text-green-500 fill-current" />
                </h3>
                <p className="text-slate-500 text-[11px] font-mono">
                  {video.type === "own" || (video.creator || "").toLowerCase().includes("modern fisheries") ? "Official Channel" : "YouTube Creator"}
                </p>
              </div>
            </div>

            <p className="font-sans text-sm text-slate-600 leading-relaxed whitespace-pre-line bg-slate-50/50 p-4 rounded-xl border border-slate-100">
              {renderDescriptionWithLinks(video.description)}
            </p>

            <section className="mt-5 space-y-4" aria-labelledby={`technical-notes-${video.id}`}>
              <div>
                <h2 id={`technical-notes-${video.id}`} className="font-sans font-extrabold text-lg text-slate-900">
                  Technical notes for {video.title}
                </h2>
                <p className="mt-2 font-sans text-sm text-slate-600 leading-relaxed">
                  This {video.category || "aquaculture"} lesson focuses on {(video.description || "the demonstrated farm method").toLowerCase()} Use the demonstration as a practical reference, then verify dimensions, dosages, stocking levels, and equipment capacity for your own species, biomass, climate, and water source.
                </p>
              </div>

              <p className="font-sans text-sm text-slate-600 leading-relaxed">
                {technicalGuide.focus}
              </p>

              <div>
                <h3 className="font-sans font-bold text-sm text-slate-900">Field checklist before implementation</h3>
                <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-600">
                  {technicalGuide.checkpoints.map((checkpoint) => (
                    <li key={checkpoint} className="flex items-start gap-2 rounded-lg border border-slate-100 bg-white p-3">
                      <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <span>{checkpoint}.</span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="font-sans text-sm text-slate-600 leading-relaxed">
                Before copying the setup shown in <strong>{video.title}</strong>, write down the starting water parameters, fish number and average weight, daily feed, energy use, and expected outcome. Recheck the same indicators after implementation. This simple before-and-after record helps distinguish a genuine production improvement from a short-term visual change and creates evidence for future stocking, feeding, maintenance, and investment decisions.
              </p>
            </section>
          </div>

        </div>

        {/* Right 1 Col: Related Videos Sidebar */}
        <div>
          <h3 className="font-sans font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-green-600" />
            <span>Recommended Videos</span>
          </h3>

          <div className="space-y-4">
            {relatedVideos.map((item) => {
              const itemCreator = item.creator || "Modern Fisheries";
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectVideo(item)}
                  className="group flex gap-3 p-2 bg-white rounded-xl border border-green-50 hover:border-green-200/80 cursor-pointer shadow-xs hover:shadow-sm transition-all"
                >
                  {/* Thumbnail */}
                  <div className="relative w-28 aspect-video rounded-lg overflow-hidden bg-slate-100 shrink-0">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute bottom-1 right-1 px-1 py-0.5 rounded-sm text-[9px] font-mono bg-slate-950/80 text-white font-semibold">
                      {item.duration}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="flex flex-col justify-between py-0.5 flex-1 min-w-0">
                    <div>
                      <h4 className="font-sans font-semibold text-slate-900 group-hover:text-green-700 text-xs leading-snug line-clamp-2 transition-colors">
                        {item.title}
                      </h4>
                      <span className="text-[10px] text-slate-500 font-sans mt-0.5 block truncate">{itemCreator}</span>
                    </div>
                    <div className="flex justify-between items-center text-[9px] font-mono text-slate-400">
                      <span>{item.views}</span>
                      <span className="px-1.5 py-0.2 rounded-full text-[8px] font-bold bg-slate-100 text-slate-700 truncate max-w-[90px]">
                        {itemCreator}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}

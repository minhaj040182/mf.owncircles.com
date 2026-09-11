import React from "react";

interface BrandLogoProps {
  variant?: "header" | "full" | "emblem" | "footer";
  size?: number;
  className?: string;
  showTagline?: boolean;
}

/**
 * Modern Fisheries Official Brand Logo Component
 * Precision vector reproduction of the official trademarked emblem & typography lockup:
 * - Leaping fish with splash droplets & ocean waves
 * - Community ring of 3 human figures in Cyan/Blue, Green, and Orange
 * - Typography: "Modern" (White) + "Fisheries" (Vibrant Cyan) + (TM)
 * - Sub-title: "FISH & SEEDS SUPPLIER" framed by cyan horizontal rules
 */
export const BrandEmblem: React.FC<{ size?: number; className?: string }> = ({ 
  size = 44, 
  className = "" 
}) => {
  return (
    <svg 
      viewBox="0 0 200 200" 
      width={size} 
      height={size} 
      className={`shrink-0 select-none ${className}`}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Modern Fisheries Emblem"
    >
      <defs>
        {/* Figure Head Gradients */}
        <linearGradient id="mf-blue-head" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00D2FF" />
          <stop offset="100%" stopColor="#0052CC" />
        </linearGradient>
        <linearGradient id="mf-orange-head" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFA62B" />
          <stop offset="100%" stopColor="#FA541C" />
        </linearGradient>
        <linearGradient id="mf-green-head" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        {/* Inner Water Sphere */}
        <radialGradient id="mf-water-sphere" cx="45%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#0099FF" />
          <stop offset="70%" stopColor="#0055D4" />
          <stop offset="100%" stopColor="#00359E" />
        </radialGradient>
        {/* Fish Upper Body Gradient */}
        <linearGradient id="mf-fish-dorsal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E5FF" />
          <stop offset="45%" stopColor="#0077EE" />
          <stop offset="100%" stopColor="#0044AA" />
        </linearGradient>
      </defs>

      {/* Outer Glow / White Rim Ring */}
      <circle cx="100" cy="100" r="94" fill="#0052CC" stroke="#FFFFFF" strokeWidth="2.5" />

      {/* 3 Interlocking Curved Community Arcs */}
      {/* Top Arc (Cyan/Blue) */}
      <path 
        d="M 46,72 A 88,88 0 0,1 154,72 L 140,84 A 66,66 0 0,0 60,84 Z" 
        fill="url(#mf-blue-head)" 
        stroke="#FFFFFF" 
        strokeWidth="2.5" 
      />
      {/* Bottom Right Arc (Orange) */}
      <path 
        d="M 160,82 A 88,88 0 0,1 108,188 L 104,168 A 66,66 0 0,0 144,92 Z" 
        fill="url(#mf-orange-head)" 
        stroke="#FFFFFF" 
        strokeWidth="2.5" 
      />
      {/* Bottom Left Arc (Green) */}
      <path 
        d="M 92,188 A 88,88 0 0,1 40,82 L 56,92 A 66,66 0 0,0 96,168 Z" 
        fill="url(#mf-green-head)" 
        stroke="#FFFFFF" 
        strokeWidth="2.5" 
      />

      {/* 3 Circular Figure Heads with Crisp White Outlines */}
      {/* Top Head (Cyan/Blue) */}
      <circle cx="100" cy="38" r="19" fill="url(#mf-blue-head)" stroke="#FFFFFF" strokeWidth="4" />
      {/* Bottom Right Head (Orange) */}
      <circle cx="156" cy="138" r="19" fill="url(#mf-orange-head)" stroke="#FFFFFF" strokeWidth="4" />
      {/* Bottom Left Head (Green) */}
      <circle cx="44" cy="138" r="19" fill="url(#mf-green-head)" stroke="#FFFFFF" strokeWidth="4" />

      {/* Inner Central Aperture (Aquatic Circle) */}
      <circle cx="100" cy="100" r="62" fill="url(#mf-water-sphere)" stroke="#FFFFFF" strokeWidth="3.5" />

      {/* Water Waves at Bottom */}
      <path 
        d="M 40,118 Q 60,104 80,116 T 120,116 T 160,118 L 160,162 L 40,162 Z" 
        fill="#002E7A" 
        opacity="0.8" 
      />
      <path 
        d="M 40,126 C 60,112 78,138 106,122 C 126,110 144,130 160,122 L 160,162 L 40,162 Z" 
        fill="#00B4D8" 
        opacity="0.75" 
      />
      <path 
        d="M 46,134 Q 72,118 100,132 T 154,128 L 154,162 L 46,162 Z" 
        fill="#00E5FF" 
      />

      {/* The Jumping Fish - Leaping Upward at 45° angle */}
      {/* Upper Fish Body & Dorsal Ridge (Vibrant Blue/Cyan) */}
      <path 
        d="M 64,118 C 68,98 86,72 122,68 C 130,67 140,72 144,78 C 132,86 114,96 104,112 C 92,114 76,116 64,118 Z" 
        fill="url(#mf-fish-dorsal)" 
      />
      {/* Lower Fish Body & Belly (Pure Crisp White) */}
      <path 
        d="M 66,118 C 78,116 96,114 106,110 C 124,100 136,88 144,78 C 138,88 128,98 116,106 C 100,116 82,122 68,121 Z" 
        fill="#FFFFFF" 
      />
      {/* Dorsal Fin */}
      <path 
        d="M 90,77 Q 104,59 116,68 Q 108,75 100,80 Z" 
        fill="#00E5FF" 
        stroke="#FFFFFF" 
        strokeWidth="1.2" 
      />
      {/* Tail Fin */}
      <path 
        d="M 66,118 Q 52,115 48,104 Q 58,113 64,118 Q 54,124 48,134 Q 56,124 66,118 Z" 
        fill="#00C0FF" 
        stroke="#FFFFFF" 
        strokeWidth="1.2" 
      />
      {/* Pectoral Fin */}
      <path 
        d="M 100,105 Q 110,113 118,111 Q 110,103 100,105 Z" 
        fill="#FFFFFF" 
      />
      {/* Fish Eye with White Catchlight */}
      <circle cx="134" cy="76" r="3.2" fill="#FFFFFF" />
      <circle cx="135" cy="76" r="1.8" fill="#002D62" />
      <circle cx="135.5" cy="75.5" r="0.6" fill="#FFFFFF" />

      {/* Splashing Water Bubbles / Droplets */}
      <circle cx="130" cy="59" r="3.2" fill="#00E5FF" />
      <circle cx="140" cy="64" r="2.4" fill="#FFFFFF" />
      <circle cx="146" cy="55" r="2" fill="#00E5FF" />
      <circle cx="74" cy="98" r="2.2" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
};

export default function BrandLogo({
  variant = "header",
  size = 40,
  className = "",
  showTagline = true,
}: BrandLogoProps) {
  if (variant === "emblem") {
    return <BrandEmblem size={size} className={className} />;
  }

  // Footer Variant: High-contrast on white/slate footer background
  if (variant === "footer") {
    return (
      <div className={`flex items-center gap-3 select-none ${className}`}>
        <BrandEmblem size={38} className="drop-shadow-xs" />
        <div className="flex flex-col">
          <div className="flex items-center gap-1 leading-none">
            <span className="font-sans font-black text-lg tracking-tight text-slate-900">
              Modern
            </span>
            <span className="font-sans font-black text-lg tracking-tight text-[#0099FF]">
              Fisheries
            </span>
            <span className="text-[9px] font-bold text-slate-400 border border-slate-300 rounded-full px-1 py-0 leading-none">
              TM
            </span>
          </div>
          {showTagline && (
            <div className="flex items-center gap-1.5 mt-1">
              <span className="h-[1.5px] w-3 bg-[#0099FF] rounded-full"></span>
              <span className="text-[8.5px] font-mono font-extrabold tracking-[0.16em] uppercase text-slate-500">
                Aquaculture Research &amp; Engineering
              </span>
              <span className="h-[1.5px] w-3 bg-[#0099FF] rounded-full"></span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Full Brand Banner Lockup (like the user-uploaded image with royal blue background)
  if (variant === "full") {
    return (
      <div className={`relative overflow-hidden bg-gradient-to-r from-[#0055D4] via-[#0066FF] to-[#0055D4] rounded-2xl p-4 sm:p-6 text-white shadow-xl select-none ${className}`}>
        <div className="flex items-center gap-4 sm:gap-6 max-w-full">
          {/* Circular Emblem */}
          <BrandEmblem size={72} className="sm:w-24 sm:h-24 drop-shadow-md shrink-0" />
          
          {/* Typography Lockup */}
          <div className="flex flex-col justify-center min-w-0">
            <div className="flex items-start">
              <h2 className="font-sans font-black text-2xl sm:text-4xl lg:text-5xl tracking-tight leading-none text-white drop-shadow-sm flex items-baseline">
                <span>Modern</span>
                <span className="text-[#00E5FF] ml-1 sm:ml-2">Fisheries</span>
              </h2>
              <span className="ml-1 sm:ml-1.5 -mt-1 text-[10px] sm:text-xs font-bold text-[#00E5FF] border border-[#00E5FF]/70 rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center shrink-0">
                ™
              </span>
            </div>

            {/* Tagline with Cyan Dividing Rules */}
            {showTagline && (
              <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-3 w-full">
                <span className="h-[2px] sm:h-[3px] flex-1 bg-[#00E5FF] rounded-full max-w-[80px]"></span>
                <span className="text-[9px] sm:text-xs lg:text-sm font-sans font-extrabold tracking-[0.22em] uppercase text-white whitespace-nowrap">
                  Aquaculture Research &amp; Engineering
                </span>
                <span className="h-[2px] sm:h-[3px] flex-1 bg-[#00E5FF] rounded-full max-w-[80px]"></span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default: Header Navbar Lockup
  return (
    <div className={`flex items-center space-x-2.5 sm:space-x-3 select-none ${className}`}>
      {/* Circular Emblem */}
      <div className="relative flex items-center justify-center shrink-0 drop-shadow-xs">
        <BrandEmblem size={size} />
      </div>

      {/* Typography with 'Modern' in White and 'Fisheries' in Cyan */}
      <div className="flex flex-col justify-center">
        <div className="flex items-start leading-none">
          <div className="font-sans font-black text-base sm:text-lg lg:text-xl tracking-tight text-white flex items-baseline">
            <span>Modern</span>
            <span className="text-[#00E5FF] ml-1 font-black">Fisheries</span>
          </div>
          <span 
            className="ml-1 text-[8px] sm:text-[9px] font-bold text-[#00E5FF] border border-[#00E5FF]/60 rounded-full w-3.5 h-3.5 flex items-center justify-center shrink-0 -mt-0.5"
            title="Registered Trademark"
          >
            ™
          </span>
        </div>

        {/* Sub-heading with Cyan Accent Lines */}
        {showTagline && (
          <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5">
            <span className="h-[1.5px] w-2 sm:w-3 bg-[#00E5FF] rounded-full opacity-90 shrink-0"></span>
            <span className="block text-[7.5px] sm:text-[8.5px] font-sans font-black tracking-[0.16em] sm:tracking-[0.2em] text-white uppercase whitespace-nowrap">
              Aquaculture Research &amp; Engineering
            </span>
            <span className="h-[1.5px] w-2 sm:w-3 bg-[#00E5FF] rounded-full opacity-90 shrink-0"></span>
          </div>
        )}
      </div>
    </div>
  );
}

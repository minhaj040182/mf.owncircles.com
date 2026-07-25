import React, { useState } from "react";
import { Mail, Copy, Check, Sparkles, Code, Smartphone, Globe, ArrowRight, ShieldCheck } from "lucide-react";

interface OwnCirclesAnnouncementProps {
  /**
   * Mode:
   * - "square": compact square card (ideal for top of right sidebar on desktop)
   * - "mobile": horizontal sliding banner (ideal for right under top ad on mobile)
   * - "auto": responsive (mobile layout on small screens, square card on large screens)
   */
  mode?: "square" | "mobile" | "auto";
  className?: string;
}

export default function OwnCirclesAnnouncement({ mode = "auto", className = "" }: OwnCirclesAnnouncementProps) {
  const [copied, setCopied] = useState(false);
  const email = "info@owncircles.com";

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Square Layout (For Desktop Right Sidebar Top)
  const renderSquare = () => (
    <div className="relative w-full aspect-square max-w-[240px] mx-auto rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 p-4 border border-amber-400/40 shadow-xl overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:border-amber-400 hover:shadow-amber-500/10">
      {/* Decorative Glow */}
      <div className="absolute -top-10 -right-10 w-28 h-28 bg-amber-400/15 rounded-full blur-xl pointer-events-none group-hover:bg-amber-400/25 transition-all" />
      <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-blue-500/20 rounded-full blur-xl pointer-events-none" />

      {/* Header Badge */}
      <div className="relative z-10 flex items-center justify-between">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-xs">
          <Sparkles className="w-3 h-3 text-slate-950" />
          OwnCircles
        </span>
        <span className="flex items-center gap-1 text-[10px] font-mono text-amber-300/90 font-bold">
          <Code className="w-3 h-3" /> App & Web
        </span>
      </div>

      {/* Main Copy */}
      <div className="relative z-10 space-y-1.5 my-auto py-1">
        <h4 className="text-xs sm:text-sm font-black text-white leading-tight tracking-tight">
          Want a Similar Website, Software or App?
        </h4>
        <p className="text-[11px] text-slate-300 leading-snug font-normal">
          Extremely <span className="text-amber-300 font-semibold">nominal price</span> & <span className="text-amber-300 font-semibold">very short duration</span>.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 space-y-1.5 pt-1">
        <a
          href={`mailto:${email}?subject=Inquiry%20for%20Website%20or%20App%20Development&body=Hello%20OwnCircles%20Team%2C%0A%0AI%20am%20interested%20in%20getting%20a%20similar%20website%2Fsoftware%2Fmobile%20app%20developed.%20Here%20are%20my%20requirements%3A%0A%0A`}
          className="w-full py-1.5 px-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition-all flex items-center justify-center gap-1.5 shadow-md hover:shadow-amber-400/20 active:scale-95"
        >
          <Mail className="w-3.5 h-3.5 shrink-0" />
          <span>Send Requirement</span>
          <ArrowRight className="w-3 h-3 shrink-0" />
        </a>

        <button
          onClick={handleCopyEmail}
          className="w-full py-1 px-2 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 text-[10px] font-mono transition-all flex items-center justify-center gap-1 border border-white/10"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-emerald-400" />
              <span className="text-emerald-300 font-bold">Email Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3 text-slate-400" />
              <span>{email}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  // Mobile Layout (Horizontal Sliding Banner for Mobile under Top Ad)
  const renderMobile = () => (
    <div className="relative w-full rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-3.5 border border-amber-400/40 shadow-lg overflow-hidden animate-in fade-in slide-in-from-right-4 duration-500 my-2">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 relative z-10">
        <div className="flex items-center gap-3 min-w-0 text-left w-full sm:w-auto">
          <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-amber-400/20 border border-amber-400/30 text-amber-300 shrink-0 shadow-xs">
            <Globe className="w-5 h-5" />
          </div>

          <div className="min-w-0 space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-xs font-black tracking-wider uppercase">
                OwnCircles Dev
              </span>
              <span className="text-xs text-amber-300 font-mono font-bold">Website & App</span>
            </div>
            <h4 className="text-sm sm:text-base font-black text-white leading-tight">
              Want a Similar Website, Software or App?
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-snug">
              Extremely <span className="text-amber-300 font-bold">nominal price</span> & <span className="text-amber-300 font-bold">very short duration</span>. Send requirement!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
          <button
            onClick={handleCopyEmail}
            className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-100 text-xs sm:text-sm font-mono font-bold transition-all flex items-center gap-1.5 border border-white/15"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-300 font-bold">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-slate-300" />
                <span className="hidden min-[380px]:inline">{email}</span>
                <span className="min-[380px]:hidden">Copy</span>
              </>
            )}
          </button>

          <a
            href={`mailto:${email}?subject=Inquiry%20for%20Website%20or%20App%20Development&body=Hello%20OwnCircles%20Team%2C%0A%0AI%20am%20interested%20in%20getting%20a%20similar%20website%2Fsoftware%2Fmobile%20app%20developed.%20Here%20are%20my%20requirements%3A%0A%0A`}
            className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-black transition-all flex items-center gap-1.5 shadow-md shrink-0"
          >
            <Mail className="w-4 h-4" />
            <span>Send Requirement</span>
          </a>
        </div>
      </div>
    </div>
  );

  if (mode === "square") return <div className={className}>{renderSquare()}</div>;
  if (mode === "mobile") return <div className={className}>{renderMobile()}</div>;

  return (
    <div className={className}>
      {/* Mobile view: Horizontal sliding banner */}
      <div className="lg:hidden">{renderMobile()}</div>
      {/* Desktop view: Square card */}
      <div className="hidden lg:block">{renderSquare()}</div>
    </div>
  );
}

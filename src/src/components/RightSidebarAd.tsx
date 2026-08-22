import React from "react";
import OwnCirclesAnnouncement from "./OwnCirclesAnnouncement";

interface RightSidebarAdProps {
  reloadKey: string;
}

export default function RightSidebarAd({ reloadKey }: RightSidebarAdProps) {
  return (
    <aside id={`right-advertisement-${reloadKey}`} aria-label="Advertisement and site announcement" className="hidden lg:flex w-full max-w-[240px] mx-auto min-h-[600px] p-2 bg-slate-50 border border-slate-200/60 rounded-2xl flex-col items-center justify-start gap-4 select-none sticky top-20 shadow-xs">
      <div className="w-full transition-all duration-500 animate-in fade-in slide-in-from-right-4">
        <OwnCirclesAnnouncement mode="square" />
      </div>
      <div className="flex flex-col items-center justify-center w-full pt-1 border-t border-slate-200/60">
        <div className="w-[160px] h-[600px] bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center text-[10px] font-mono uppercase tracking-widest text-slate-400 [writing-mode:vertical-rl]">
          Advertisement
        </div>
      </div>
    </aside>
  );
}

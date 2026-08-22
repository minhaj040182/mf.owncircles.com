import React from "react";

interface AdBannerProps {
  reloadKey: string;
}

export default function AdBanner({ reloadKey }: AdBannerProps) {
  return (
    <aside
      id={`advertisement-${reloadKey}`}
      aria-label="Advertisement"
      className="w-full py-0.5 bg-slate-50 flex items-center justify-center select-none"
    >
      <div className="w-full max-w-[728px] min-h-[90px] rounded-md bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-mono uppercase tracking-widest text-slate-400">
        Advertisement
      </div>
    </aside>
  );
}

import React from 'react';

/**
 * DeferredModalContent
 * 
 * Standalone asynchronous sub-panel component that is code-split out of the
 * main bundle. It is only fetched over the network and compiled by V8 when
 * the user clicks the modal trigger.
 */
export default function DeferredModalContent({ onClose }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
            ✓
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900">On-Demand Sub-Layout</h3>
            <p className="text-[11px] text-slate-500">Evaluated only after explicit user interaction</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg text-xs transition-colors cursor-pointer"
        >
          ✕
        </button>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed">
        By deferring this sub-panel's import and render cycle, the browser parsed <strong>0 bytes</strong> of this component’s JSX, styling rules, and hooks during initial page paint. This saves critical main-thread milliseconds and drops Total Blocking Time (TBT).
      </p>

      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200/70 text-xs space-y-1.5 font-mono text-slate-700">
        <div className="text-[10px] uppercase font-bold text-slate-400">Execution Diagnostics</div>
        <div>• Evaluation: Deferred (Post-Interaction)</div>
        <div>• Bundle: Standalone Async Chunk</div>
        <div>• Layout Shift: 0 CLS</div>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer"
        >
          Close Sub-Layout
        </button>
      </div>
    </div>
  );
}

import React, { useState, useEffect, useRef, useTransition, Suspense, lazy } from 'react';
import { runWhenIdle, cancelIdle, yieldToMain, processInTimeSlices, deferExternalScript } from '../utils/idleScheduler';

/**
 * Lazy import for sub-layouts or modal dialogues.
 * This guarantees the component code is NOT parsed, compiled, or evaluated
 * on the main thread during initial page load.
 */
const LazyModalDialog = lazy(() => import('./DeferredModalContent'));

/**
 * MainThreadOptimizer
 * 
 * Production template demonstrating 3 key strategies for eliminating Total Blocking Time (TBT):
 * 1. Non-blocking deferral of third-party analytics & telemetry scripts via requestIdleCallback.
 * 2. Breaking heavy client-side computation into time-sliced chunks using `yieldToMain()`.
 * 3. On-demand conditional rendering: sub-layouts/modals evaluate zero JS until triggered.
 */
export default function MainThreadOptimizer({
  rawItems = [],
  trackingScriptUrl,
  trackingAttributes = {},
  onDataProcessed,
  children,
}) {
  const [processedData, setProcessedData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  // Modal / sub-layout state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasEverOpened, setHasEverOpened] = useState(false);
  const [isPending, startTransition] = useTransition();

  const idleTaskRef = useRef(null);

  // =========================================================================
  // 1. DEFER NON-CRITICAL TRACKING SCRIPTS & ANALYTICS VIA IDLE CALLBACK
  // =========================================================================
  useEffect(() => {
    if (!trackingScriptUrl) return;

    // Defer injection until main thread is completely free or upon first user interaction
    deferExternalScript(trackingScriptUrl, trackingAttributes, 4000);
  }, [trackingScriptUrl]);

  // =========================================================================
  // 2. BREAK UP LONG-RUNNING CLIENT-SIDE TASKS INTO CHUNKED ASYNC SLICES
  // =========================================================================
  useEffect(() => {
    if (!rawItems || rawItems.length === 0) return;

    let isMounted = true;
    setIsProcessing(true);

    // Schedule heavy computation when the browser reaches an idle phase
    idleTaskRef.current = runWhenIdle(async (deadline) => {
      const startTime = performance.now();
      const results = [];
      const CHUNK_SIZE = 12; // Process 12 items per animation frame budget

      for (let i = 0; i < rawItems.length; i += CHUNK_SIZE) {
        if (!isMounted) break;

        const chunk = rawItems.slice(i, i + CHUNK_SIZE);

        // Process current slice
        chunk.forEach((item) => {
          // Simulated CPU work (e.g. data normalization, scoring, regex transforms)
          results.push({
            ...item,
            _computedScore: (item.id || 0) * 1.618,
            _normalizedAt: Date.now(),
          });
        });

        // Update progress percentage
        const currentProgress = Math.min(100, Math.round(((i + chunk.length) / rawItems.length) * 100));
        setProgress(currentProgress);

        // COOPERATIVE YIELD: Relinquish main thread back to browser event loop
        // If remaining frame budget is low or another task is queued, yield immediately
        if (deadline.timeRemaining() < 5 || i + CHUNK_SIZE < rawItems.length) {
          await yieldToMain();
        }
      }

      if (isMounted) {
        setProcessedData(results);
        setIsProcessing(false);
        if (onDataProcessed) onDataProcessed(results);
      }
    }, 2000);

    return () => {
      isMounted = false;
      if (idleTaskRef.current) {
        cancelIdle(idleTaskRef.current);
      }
    };
  }, [rawItems]);

  // =========================================================================
  // 3. OPTIMIZED CONDITIONAL RENDERING (ZERO-EVALUATION MODALS & PANELS)
  // =========================================================================
  const handleOpenModal = () => {
    // Flag ensures chunk bundle download only initiates on first user intent
    if (!hasEverOpened) {
      setHasEverOpened(true);
    }

    // Wrap transition in non-urgent scheduler transition to avoid freezing clicks
    startTransition(() => {
      setIsModalOpen(true);
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-6">
      {/* Header & Status Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Main-Thread Optimization Engine
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Asynchronous task slicing and deferred script orchestration for 0ms Total Blocking Time (TBT).
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Action Trigger for Deferred Sub-Layout */}
          <button
            type="button"
            onClick={handleOpenModal}
            className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Open Deferred Modal</span>
          </button>
        </div>
      </div>

      {/* Task Slicing Visual Progress (Non-Blocking) */}
      <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-4">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-bold text-slate-700">Cooperative Task Slicing Queue</span>
          <span className="font-mono text-emerald-800 font-black">
            {isProcessing ? `Processing: ${progress}%` : `Ready (${processedData.length} items parsed)`}
          </span>
        </div>
        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div
            className="bg-emerald-600 h-2 rounded-full transition-all duration-150 ease-out"
            style={{ width: `${isProcessing ? progress : 100}%` }}
          ></div>
        </div>
        <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 font-mono">
          <span>Frame Budget: &lt;16.6ms / slice</span>
          <span>Yield Method: scheduler.yield() / MessageChannel</span>
        </div>
      </div>

      {/* Children content (Main layout remains responsive instantly) */}
      <div className="w-full">{children}</div>

      {/* 
        OPTIMIZED CONDITIONAL MODAL:
        1. Does NOT evaluate, import, or mount until `hasEverOpened` is toggled true.
        2. Hidden with CSS when closed, but never executes unnecessary code during initial page load.
        3. Wrapped in React Suspense with zero-CLS fallback.
      */}
      {hasEverOpened && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${
            isModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        >
          {/* Backdrop */}
          <div
            onClick={handleCloseModal}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
          ></div>

          {/* Modal Content Box */}
          <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100 z-10 animate-slide-in">
            <Suspense
              fallback={
                <div className="py-12 flex flex-col items-center justify-center space-y-3">
                  <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-xs text-slate-500 font-medium">Asynchronously loading dialog module...</span>
                </div>
              }
            >
              <LazyModalDialog onClose={handleCloseModal} />
            </Suspense>
          </div>
        </div>
      )}
    </div>
  );
}

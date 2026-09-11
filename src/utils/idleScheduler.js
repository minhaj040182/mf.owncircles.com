/**
 * Idle Scheduler & Main-Thread Task Slicing Engine
 * 
 * Optimized for eliminating Total Blocking Time (TBT) and maximizing INP (Interaction to Next Paint):
 * 1. Safely wraps window.requestIdleCallback with cross-browser fallback.
 * 2. Implements cooperative multitasking via `yieldToMain` (using scheduler.yield, MessageChannel, or macro-tasks).
 * 3. Slices intensive JavaScript computation into micro-chunks to preserve 60 FPS frame budgets.
 * 4. Defers non-critical third-party trackers and analytical scripts until after the page is fully idle or upon first user interaction.
 */

/**
 * Executes a callback when the browser's main thread is idle.
 * @param {Function} callback - Task to perform.
 * @param {number} [timeout=2500] - Maximum wait time before forcing execution.
 * @returns {number|any} Task identifier for cancellation.
 */
export function runWhenIdle(callback, timeout = 2500) {
  if (typeof window === 'undefined') {
    return null;
  }

  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, { timeout });
  }

  // Fallback to requestAnimationFrame + setTimeout for safari/older browsers
  return window.setTimeout(() => {
    const start = performance.now();
    callback({
      didTimeout: false,
      timeRemaining: () => Math.max(0, 50 - (performance.now() - start)),
    });
  }, Math.min(timeout, 300));
}

/**
 * Cancels a scheduled idle task.
 * @param {any} handle 
 */
export function cancelIdle(handle) {
  if (typeof window === 'undefined' || !handle) return;
  if ('cancelIdleCallback' in window) {
    window.cancelIdleCallback(handle);
  } else {
    clearTimeout(handle);
  }
}

/**
 * Cooperative multitasking yield.
 * Yields execution back to the browser's event loop so pending user inputs,
 * clicks, or render frames can dispatch immediately, slashing TBT to 0.
 * 
 * Prioritizes standard `scheduler.yield()`, falls back to zero-delay MessageChannel.
 * @returns {Promise<void>}
 */
export function yieldToMain() {
  if (typeof window !== 'undefined' && 'scheduler' in window && typeof window.scheduler.yield === 'function') {
    return window.scheduler.yield();
  }

  return new Promise((resolve) => {
    if (typeof MessageChannel !== 'undefined') {
      const channel = new MessageChannel();
      channel.port1.onmessage = () => resolve();
      channel.port2.postMessage(null);
    } else {
      setTimeout(resolve, 0);
    }
  });
}

/**
 * Breaks a large array transformation or heavy computation into non-blocking chunked time-slices.
 * 
 * @param {Array} items - The source dataset.
 * @param {Function} processor - Callback for each individual item or chunk.
 * @param {number} [chunkSize=10] - Number of items processed before yielding to main thread.
 * @param {Function} [onComplete] - Final callback with processed results.
 */
export async function processInTimeSlices(items, processor, chunkSize = 15, onComplete = null) {
  const results = [];
  
  for (let i = 0; i < items.length; i += chunkSize) {
    const slice = items.slice(i, i + chunkSize);
    
    // Process current batch
    for (const item of slice) {
      results.push(processor(item));
    }

    // Yield control back to browser to process pending paints/clicks if more work remains
    if (i + chunkSize < items.length) {
      await yieldToMain();
    }
  }

  if (onComplete) {
    onComplete(results);
  }
  return results;
}

/**
 * Defers loading of external analytical / tracking scripts until the user initiates
 * their first interaction (scroll, touch, click, keydown) or after a safe idle timeout.
 * 
 * @param {string} src - Script URL.
 * @param {Object} [attributes={}] - Additional HTML attributes (id, data-*, etc).
 * @param {number} [idleTimeout=3500] - Fallback timeout in ms.
 */
export function deferExternalScript(src, attributes = {}, idleTimeout = 3500) {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;

  // Prevent duplicate injections
  if (document.querySelector(`script[src="${src}"]`)) return;

  let injected = false;
  const loadScript = () => {
    if (injected) return;
    injected = true;

    // Clean up event listeners
    ['pointerdown', 'scroll', 'touchstart', 'keydown'].forEach((eventName) => {
      window.removeEventListener(eventName, loadScript);
    });

    runWhenIdle(() => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.defer = true;
      Object.entries(attributes).forEach(([key, val]) => {
        script.setAttribute(key, val);
      });
      document.head.appendChild(script);
    });
  };

  // 1. Listen for first user intent
  ['pointerdown', 'scroll', 'touchstart', 'keydown'].forEach((eventName) => {
    window.addEventListener(eventName, loadScript, { once: true, passive: true });
  });

  // 2. Safety timeout fallback
  setTimeout(loadScript, idleTimeout);
}

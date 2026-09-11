import React, { useState } from 'react';

/**
 * OptimizedImage
 * 
 * Production-ready image component engineered for optimal Core Web Vitals:
 * - Drastically improves Largest Contentful Paint (LCP) and First Contentful Paint (FCP)
 * - Eliminates Cumulative Layout Shift (CLS = 0) with explicit aspect ratio & dimensions
 * - Asynchronous off-main-thread decoding (`decoding="async"`)
 * - Native browser-level lazy loading (`loading="lazy"`) with LCP `priority` bypass
 * - Automatic modern format resolution (`<picture>` with `.webp` source fallback)
 * - Animated low-overhead skeleton & blur-up load transitions
 * - Resilient error fallback handling
 */
export default function OptimizedImage({
  src,
  webpSrc = null,
  alt = '',
  width = undefined,
  height = undefined,
  className = '',
  containerClassName = '',
  priority = false,
  loading = undefined,
  decoding = 'async',
  sizes = undefined,
  srcSet = undefined,
  fallbackSrc = undefined,
  objectFit = 'cover',
  onLoad = undefined,
  onError = undefined,
  ...restProps
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // If priority is true, it is an above-the-fold LCP image: load eagerly with high fetch priority
  const effectiveLoading = loading || (priority ? 'eager' : 'lazy');
  const fetchPriority = priority ? 'high' : 'auto';

  // Automatically derive WebP path if not explicitly passed and source is .png/.jpg/.jpeg
  const derivedWebpSrc = webpSrc || (
    typeof src === 'string' && /\.(png|jpe?g)$/i.test(src)
      ? src.replace(/\.(png|jpe?g)$/i, '.webp')
      : null
  );

  const handleLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    if (fallbackSrc && e.currentTarget.src !== fallbackSrc) {
      e.currentTarget.src = fallbackSrc;
    } else {
      setHasError(true);
    }
    if (onError) onError(e);
  };

  // Object-fit utility mapping
  const objectFitClasses = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
    'scale-down': 'object-scale-down',
  };

  // Compute aspect ratio style to reserve layout box and prevent CLS
  const containerStyle = {};
  if (width && height && !isNaN(Number(width)) && !isNaN(Number(height))) {
    containerStyle.aspectRatio = `${width} / ${height}`;
  }

  return (
    <div
      className={`relative overflow-hidden bg-slate-100 ${containerClassName}`}
      style={containerStyle}
    >
      {/* 1. Lightweight Animated Skeleton Placeholder & Blur Canvas */}
      {!isLoaded && !hasError && (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100 animate-pulse z-0"
        >
          <svg
            className="w-8 h-8 text-slate-300/80"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}

      {/* 2. Resilient Error Fallback View */}
      {hasError && (
        <div
          role="img"
          aria-label={alt || 'Image failed to load'}
          className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-3 text-center border border-slate-200 rounded-lg z-10"
        >
          <svg
            className="w-6 h-6 mb-1 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span className="text-[11px] font-medium text-slate-500 line-clamp-1">
            {alt || 'Preview unavailable'}
          </span>
        </div>
      )}

      {/* 3. Modern Multi-Format Picture Container (<picture> with .webp fallback) */}
      <picture className="w-full h-full block">
        {/* Next-gen WebP source for modern browsers (~30-80% smaller payload) */}
        {derivedWebpSrc && (
          <source
            type="image/webp"
            srcSet={derivedWebpSrc}
            sizes={sizes}
          />
        )}

        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={effectiveLoading}
          decoding={decoding}
          // @ts-ignore - fetchPriority is supported in modern Chromium/WebKit browsers
          fetchpriority={fetchPriority}
          sizes={sizes}
          srcSet={srcSet}
          onLoad={handleLoad}
          onError={handleError}
          className={`w-full h-full ${objectFitClasses[objectFit] || 'object-cover'} transition-all duration-300 ease-out ${
            isLoaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-xs scale-[1.02]'
          } ${className}`}
          {...restProps}
        />
      </picture>
    </div>
  );
}

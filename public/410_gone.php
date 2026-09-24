<?php
/**
 * Standalone 410 Gone HTTP Handler for Permanently Deleted URLs
 * Emits raw HTTP 410 Gone header and preserves the exact site design (Navbar, 410 card, Footer)
 * Works with or without JavaScript enabled.
 */

// 1. Send genuine HTTP 410 Gone headers
http_response_code(410);
header('HTTP/1.1 410 Gone');
header('Status: 410 Gone');
header('X-Robots-Tag: noindex, follow');
header('Content-Type: text/html; charset=UTF-8');

$requestUri = $_SERVER['REQUEST_URI'] ?? '/';
$pathOnly = parse_url($requestUri, PHP_URL_PATH) ?? $requestUri;
$safePath = htmlspecialchars($pathOnly, ENT_QUOTES, 'UTF-8');
$cleanPath = trim($safePath, '/');
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="noindex, follow">
  <title>410 Content Removed or Permanently Deleted | TrendPulse</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.3s ease-out forwards;
    }
  </style>
</head>
<body className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased font-sans">
  <div class="min-h-screen flex flex-col bg-slate-50">
    
    <!-- Site Header & Navbar (Matching React App Header Design) -->
    <header class="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white rounded-b-[2rem] sm:rounded-b-[2.5rem] shadow-xl pt-6 pb-5 px-4 sm:px-8">
      <div class="max-w-7xl mx-auto space-y-5">
        
        <!-- Top Header Row -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <!-- Logo & Title -->
          <a href="/" class="flex items-center gap-3 text-left group hover:opacity-90 transition-all text-white no-underline">
            <div class="w-11 h-11 rounded-2xl bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-inner shrink-0 group-hover:bg-white/25 transition-colors">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect width="20" height="15" x="2" y="7" rx="2" ry="2" stroke-width="2"/>
                <polyline points="17 2 12 7 7 2" stroke-width="2"/>
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-black tracking-tight text-white flex items-center gap-2 m-0 leading-tight">
                TrendPulse
              </h1>
              <p class="text-xs text-blue-100/90 font-medium m-0">
                Trending Product Discovery & Verified Video Reviews
              </p>
            </div>
          </a>

          <!-- Search & Controls -->
          <div class="flex items-center gap-2 sm:gap-3 flex-wrap">
            <form action="/" method="GET" class="relative flex-1 sm:w-72">
              <input 
                type="text" 
                name="q"
                placeholder="Search trending products..." 
                class="w-full pl-9 pr-4 py-2 bg-white/15 hover:bg-white/20 focus:bg-white focus:text-slate-900 focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-blue-100/70 text-xs rounded-xl border border-white/20 transition-all shadow-inner"
              />
              <svg class="w-4 h-4 text-blue-100/70 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" stroke-width="2"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke-width="2"/>
              </svg>
            </form>

            <a href="/" class="px-3.5 py-2 bg-white/15 hover:bg-white/25 border border-white/30 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 no-underline">
              <span>🏠 Home Catalog</span>
            </a>
          </div>
        </div>

        <!-- Category Pills -->
        <div class="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs font-bold">
          <a href="/" class="px-3.5 py-1.5 bg-white text-blue-700 shadow-md rounded-xl whitespace-nowrap no-underline">⚡ All Reviews</a>
          <a href="/?category=electronics" class="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl whitespace-nowrap transition-colors no-underline">💻 Electronics</a>
          <a href="/?category=kitchen" class="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl whitespace-nowrap transition-colors no-underline">🍳 Kitchen & Cooking</a>
          <a href="/?category=household" class="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl whitespace-nowrap transition-colors no-underline">🏠 Household</a>
          <a href="/?category=fitness" class="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl whitespace-nowrap transition-colors no-underline">🏋️ Fitness & Health</a>
          <a href="/?category=gadgets" class="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-xl whitespace-nowrap transition-colors no-underline">✨ Home Gadgets</a>
        </div>
      </div>
    </header>

    <!-- Main Content Area: 410 Gone Card -->
    <main class="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex items-center justify-center">
      <div id="not-found-page" class="w-full flex items-center justify-center py-6">
        <div class="max-w-xl w-full bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-lg text-center space-y-6 animate-fadeIn">
          
          <!-- Visual Badge Icon -->
          <div class="relative inline-block">
            <div class="w-20 h-20 rounded-3xl mx-auto flex items-center justify-center shadow-inner bg-rose-50 text-rose-500 border border-rose-100">
              <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <polyline points="3 6 5 6 21 6" stroke-width="2"/>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke-width="2"/>
                <line x1="10" y1="11" x2="10" y2="17" stroke-width="2"/>
                <line x1="14" y1="11" x2="14" y2="17" stroke-width="2"/>
              </svg>
            </div>
            <span class="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-slate-900 text-white shadow-xs">
              410 Gone
            </span>
          </div>

          <!-- Heading & Subtitle -->
          <div class="space-y-2">
            <h1 class="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight m-0">
              Content Removed or Permanently Deleted
            </h1>
            <p class="text-sm text-slate-500 leading-relaxed max-w-md mx-auto m-0">
              The requested article or legacy review has been permanently deleted or moved to an updated format.
            </p>
          </div>

          <!-- Display Attempted Slug info -->
          <?php if (!empty($cleanPath)): ?>
          <div class="bg-slate-50 border border-gray-200/80 rounded-2xl p-3.5 text-xs text-slate-600 space-y-1 text-left">
            <span class="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block">
              Requested URL
            </span>
            <p class="font-mono text-slate-800 break-all line-clamp-2 select-all bg-white p-2 rounded-xl border border-gray-200 m-0">
              <?php echo $safePath; ?>
            </p>
          </div>
          <?php endif; ?>

          <!-- Primary Action Buttons -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              id="not-found-home-btn"
              href="/"
              class="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 no-underline"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke-width="2"/>
                <polyline points="9 22 9 12 15 12 15 22" stroke-width="2"/>
              </svg>
              <span>Return to Live Trending Catalog</span>
            </a>

            <button
              id="not-found-back-btn"
              onclick="if(window.history.length > 1) { window.history.back(); } else { window.location.href='/'; }"
              class="w-full sm:w-auto px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer border-0"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <line x1="19" y1="12" x2="5" y2="12" stroke-width="2"/>
                <polyline points="12 19 5 12 12 5" stroke-width="2"/>
              </svg>
              <span>Go Back</span>
            </button>
          </div>

          <!-- Quick Category Jump -->
          <div class="pt-4 border-t border-gray-100 space-y-3">
            <p class="text-xs font-bold text-slate-500 uppercase tracking-wider m-0">
              Explore Active Product Categories
            </p>
            <div class="flex flex-wrap items-center justify-center gap-2">
              <a href="/?category=electronics" class="px-3 py-1.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 hover:border-blue-200 rounded-xl text-xs font-bold text-slate-700 transition-all flex items-center gap-1.5 no-underline">
                <span>⚡</span> <span>Electronics</span>
              </a>
              <a href="/?category=kitchen" class="px-3 py-1.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 hover:border-blue-200 rounded-xl text-xs font-bold text-slate-700 transition-all flex items-center gap-1.5 no-underline">
                <span>🍳</span> <span>Kitchen</span>
              </a>
              <a href="/?category=household" class="px-3 py-1.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 hover:border-blue-200 rounded-xl text-xs font-bold text-slate-700 transition-all flex items-center gap-1.5 no-underline">
                <span>🏠</span> <span>Household</span>
              </a>
              <a href="/?category=fitness" class="px-3 py-1.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 hover:border-blue-200 rounded-xl text-xs font-bold text-slate-700 transition-all flex items-center gap-1.5 no-underline">
                <span>🏋️</span> <span>Fitness</span>
              </a>
              <a href="/?category=gadgets" class="px-3 py-1.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 hover:border-blue-200 rounded-xl text-xs font-bold text-slate-700 transition-all flex items-center gap-1.5 no-underline">
                <span>📱</span> <span>Smart Gadgets</span>
              </a>
              <a href="/?category=home_office" class="px-3 py-1.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 hover:border-blue-200 rounded-xl text-xs font-bold text-slate-700 transition-all flex items-center gap-1.5 no-underline">
                <span>🏢</span> <span>Home Office</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Site Footer (Matching React App Footer Design) -->
    <footer class="bg-slate-100 border-t border-gray-200 text-slate-600 py-10 px-4 mt-16 text-xs">
      <div class="max-w-7xl mx-auto space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          <!-- Brand Info -->
          <div class="md:col-span-7 space-y-3">
            <div class="flex items-center gap-2.5">
              <div class="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" stroke-width="2"/>
                </svg>
              </div>
              <span class="text-lg font-black text-slate-900 tracking-tight">
                Trend<span class="text-blue-600">Pulse</span>
              </span>
            </div>
            <p class="text-xs text-slate-600 leading-relaxed max-w-md m-0">
              YouTube video curation for household innovations, daily exercise gear, and trending home gadgets with extracted product reviews and viewer sentiment analysis.
            </p>
          </div>

          <!-- Categories & Sitemap -->
          <div class="md:col-span-5 space-y-2">
            <h4 class="text-xs font-bold text-slate-900 uppercase tracking-wider m-0">
              Categories & Navigation
            </h4>
            <div class="grid grid-cols-2 gap-1.5 text-xs text-slate-600">
              <a href="/?category=household" class="hover:text-blue-600 transition-colors no-underline text-slate-600">Household Items</a>
              <a href="/?category=gadgets" class="hover:text-blue-600 transition-colors no-underline text-slate-600">Home Gadgets</a>
              <a href="/?category=fitness" class="hover:text-blue-600 transition-colors no-underline text-slate-600">Fitness Gear</a>
              <a href="/?category=kitchen" class="hover:text-blue-600 transition-colors no-underline text-slate-600">Kitchen Innovations</a>
            </div>
            <div class="pt-2">
              <a href="/sitemap.xml" class="hover:text-blue-600 transition-colors no-underline text-slate-500 text-xs">
                XML Sitemap Index
              </a>
            </div>
          </div>
        </div>

        <div class="pt-6 border-t border-gray-200 text-center text-slate-400 text-[11px]">
          &copy; <?php echo date('Y'); ?> TrendPulse &bull; OwnCircles. All rights reserved. HTTP 410 Gone permanent response emitted.
        </div>
      </div>
    </footer>
  </div>
</body>
</html>

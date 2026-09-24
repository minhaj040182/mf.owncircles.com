import React from 'react';
import { Home, ArrowLeft, Search, HelpCircle, FileQuestion, Trash2 } from 'lucide-react';
import { Category } from '../types';

interface NotFoundProps {
  attemptedUrl?: string;
  isDeletedUrl?: boolean;
  onGoHome: () => void;
  onSelectCategory?: (category: Category) => void;
}

export const NotFound: React.FC<NotFoundProps> = ({
  attemptedUrl,
  isDeletedUrl = false,
  onGoHome,
  onSelectCategory
}) => {
  const currentPath = attemptedUrl || (typeof window !== 'undefined' ? window.location.pathname : '');
  const cleanPath = currentPath.replace(/^\/+|\/+$/g, '').replace(/-/g, ' ');

  const quickCategories: { key: Category; label: string; icon: string }[] = [
    { key: 'electronics', label: 'Electronics', icon: '⚡' },
    { key: 'kitchen', label: 'Kitchen', icon: '🍳' },
    { key: 'household', label: 'Household', icon: '🏠' },
    { key: 'fitness', label: 'Fitness', icon: '🏋️' },
    { key: 'gadgets', label: 'Smart Gadgets', icon: '📱' },
    { key: 'home_office', label: 'Home Office', icon: '🏢' },
  ];

  return (
    <div id="not-found-page" className="min-h-[75vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-xl w-full bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-lg text-center space-y-6 animate-fadeIn">
        {/* Visual Badge Icon */}
        <div className="relative inline-block">
          <div className={`w-20 h-20 rounded-3xl mx-auto flex items-center justify-center shadow-inner ${
            isDeletedUrl ? 'bg-rose-50 text-rose-500 border border-rose-100' : 'bg-blue-50 text-blue-600 border border-blue-100'
          }`}>
            {isDeletedUrl ? (
              <Trash2 className="w-10 h-10" />
            ) : (
              <FileQuestion className="w-10 h-10" />
            )}
          </div>
          <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider bg-slate-900 text-white shadow-xs">
            {isDeletedUrl ? '410 Gone' : '404'}
          </span>
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {isDeletedUrl ? 'Content Removed or Permanently Deleted' : 'Page Not Found'}
          </h1>
          <p className="text-sm text-slate-500 leading-relaxed max-w-md mx-auto">
            {isDeletedUrl
              ? 'The requested article or legacy review has been permanently deleted or moved to an updated format.'
              : 'The link or product review you are looking for does not exist or has been moved.'}
          </p>
        </div>

        {/* Display Attempted Slug info */}
        {cleanPath && cleanPath !== '/' && (
          <div className="bg-slate-50 border border-gray-200/80 rounded-2xl p-3.5 text-xs text-slate-600 space-y-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Requested URL
            </span>
            <p className="font-mono text-slate-800 break-all line-clamp-2 select-all bg-white p-2 rounded-xl border border-gray-200">
              {currentPath}
            </p>
          </div>
        )}

        {/* Primary Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            id="not-found-home-btn"
            onClick={onGoHome}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs rounded-xl flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Live Trending Catalog</span>
          </button>

          <button
            id="not-found-back-btn"
            onClick={() => {
              if (window.history.length > 1) {
                window.history.back();
              } else {
                onGoHome();
              }
            }}
            className="w-full sm:w-auto px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>

        {/* Quick Category Jump */}
        {onSelectCategory && (
          <div className="pt-4 border-t border-gray-100 space-y-3">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Explore Active Product Categories
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {quickCategories.map(cat => (
                <button
                  key={cat.key}
                  onClick={() => {
                    onSelectCategory(cat.key);
                  }}
                  className="px-3 py-1.5 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 border border-gray-200 hover:border-blue-200 rounded-xl text-xs font-bold text-slate-700 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

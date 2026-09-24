import React, { useState } from 'react';
import { Clock, Play, CheckCircle, Sparkles, Bookmark } from 'lucide-react';

export interface Chapter {
  seconds: number;
  timeLabel: string;
  title: string;
  badge?: string;
}

interface VideoChaptersProps {
  onSeek: (seconds: number) => void;
  activeSeconds?: number;
  productName?: string;
  category?: string;
}

export const VideoChapters: React.FC<VideoChaptersProps> = ({
  onSeek,
  activeSeconds = 0,
  productName = 'Product',
  category = 'tech'
}) => {
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  const defaultChapters: Chapter[] = [
    { seconds: 0, timeLabel: '00:00', title: 'Intro & Unboxing First Look', badge: 'Overview' },
    { seconds: 95, timeLabel: '01:35', title: 'Design & Build Quality Inspection', badge: 'Hardware' },
    { seconds: 205, timeLabel: '03:25', title: 'Real-World Performance Stress Test', badge: 'Live Test' },
    { seconds: 320, timeLabel: '05:20', title: 'Key Pros & Cons Breakdown', badge: 'Analysis' },
    { seconds: 450, timeLabel: '07:30', title: 'Final Value & Buying Verdict', badge: 'Decision' }
  ];

  const handleChapterClick = (seconds: number, index: number) => {
    setSelectedIdx(index);
    onSeek(seconds);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
              <span>Key Video Chapters &amp; Timestamps</span>
              <span className="text-[10px] bg-blue-100 text-blue-800 font-extrabold px-2 py-0.5 rounded-full">
                Interactive
              </span>
            </h3>
            <p className="text-xs text-slate-500">Jump directly to hands-on testing and review sections</p>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
          <Bookmark className="w-3.5 h-3.5 text-amber-500" />
          Click to Jump
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {defaultChapters.map((ch, idx) => {
          const isSelected = selectedIdx === idx;
          return (
            <button
              key={idx}
              onClick={() => handleChapterClick(ch.seconds, idx)}
              className={`p-3 rounded-xl border text-left transition-all flex items-start gap-2.5 group cursor-pointer ${
                isSelected
                  ? 'bg-blue-50/80 border-blue-300 ring-2 ring-blue-500/20 shadow-xs'
                  : 'bg-slate-50 hover:bg-slate-100/90 border-gray-200 text-slate-700'
              }`}
            >
              <div className={`px-2 py-1 rounded-md text-[11px] font-black shrink-0 flex items-center gap-1 transition-colors ${
                isSelected 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-200 group-hover:bg-blue-600 group-hover:text-white text-slate-700'
              }`}>
                <Play className="w-3 h-3 fill-current" />
                <span>{ch.timeLabel}</span>
              </div>

              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900 truncate leading-snug group-hover:text-blue-600 transition-colors">
                    {ch.title}
                  </span>
                </div>
                {ch.badge && (
                  <span className="inline-block text-[10px] font-bold text-slate-500 bg-white px-1.5 py-0.2 rounded border border-gray-200">
                    {ch.badge}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  ShieldCheck, 
  ThumbsUp, 
  ThumbsDown, 
  Plus, 
  MessageSquare, 
  Sparkles,
  Award,
  Flame,
  Check
} from 'lucide-react';

interface ProsConsVotingProps {
  pros: string[];
  cons: string[];
  slug?: string;
  productName?: string;
}

export const ProsConsVoting: React.FC<ProsConsVotingProps> = ({
  pros,
  cons,
  slug = 'general-review',
  productName = 'Product'
}) => {
  const storageKey = `trendpulse_votes_${slug}`;
  
  // Votes state
  const [votes, setVotes] = useState<{ [key: string]: { up: number; userVoted: 'up' | 'down' | null } }>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Could not read vote storage', e);
    }
    
    // Default initial seed counts
    const initial: { [key: string]: { up: number; userVoted: 'up' | 'down' | null } } = {};
    pros.forEach((p, idx) => {
      initial[`pro_${idx}`] = { up: 28 + (idx * 7) % 19, userVoted: null };
    });
    cons.forEach((c, idx) => {
      initial[`con_${idx}`] = { up: 14 + (idx * 5) % 11, userVoted: null };
    });
    return initial;
  });

  const [notification, setNotification] = useState<string | null>(null);
  const [customInsight, setCustomInsight] = useState('');
  const [isAddingInsight, setIsAddingInsight] = useState(false);
  const [insightType, setInsightType] = useState<'pro' | 'con'>('pro');
  const [userAddedPros, setUserAddedPros] = useState<string[]>([]);
  const [userAddedCons, setUserAddedCons] = useState<string[]>([]);

  const handleVote = (key: string, type: 'up' | 'down') => {
    setVotes(prev => {
      const current = prev[key] || { up: 10, userVoted: null };
      let newUp = current.up;
      let newUserVoted: 'up' | 'down' | null = type;

      if (current.userVoted === type) {
        // Toggle off
        newUserVoted = null;
        newUp = type === 'up' ? newUp - 1 : newUp;
      } else {
        if (type === 'up') {
          newUp = current.userVoted === 'down' ? newUp + 1 : newUp + 1;
        } else {
          newUp = current.userVoted === 'up' ? newUp - 1 : newUp;
        }
      }

      const updated = {
        ...prev,
        [key]: { up: Math.max(0, newUp), userVoted: newUserVoted }
      };

      try {
        localStorage.setItem(storageKey, JSON.stringify(updated));
      } catch (err) {
        console.warn('Vote save error:', err);
      }

      return updated;
    });

    setNotification(type === 'up' ? '👍 Feedback noted! Marked as helpful.' : 'Feedback recorded.');
    setTimeout(() => setNotification(null), 2200);
  };

  const handleAddCustomInsight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInsight.trim()) return;

    if (insightType === 'pro') {
      setUserAddedPros(prev => [...prev, customInsight.trim()]);
    } else {
      setUserAddedCons(prev => [...prev, customInsight.trim()]);
    }

    setCustomInsight('');
    setIsAddingInsight(false);
    setNotification('🎉 Thanks! Your buyer insight has been added to the community board.');
    setTimeout(() => setNotification(null), 3000);
  };

  const combinedPros = [...pros, ...userAddedPros];
  const combinedCons = [...cons, ...userAddedCons];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm space-y-5">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <ThumbsUp className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <span>Interactive Pros &amp; Cons Community Voting</span>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-full">
                Live Feedback
              </span>
            </h3>
            <p className="text-xs text-slate-500">Vote on which advantages &amp; drawbacks matter most to your buying decision</p>
          </div>
        </div>

        <button
          onClick={() => setIsAddingInsight(!isAddingInsight)}
          className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5 text-blue-600" />
          <span>Add Buyer Insight</span>
        </button>
      </div>

      {/* Floating Notification */}
      {notification && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-2 animate-fadeIn shadow-2xs">
          <Check className="w-4 h-4 text-emerald-600" />
          <span>{notification}</span>
        </div>
      )}

      {/* Add Insight Form Drawer */}
      {isAddingInsight && (
        <form onSubmit={handleAddCustomInsight} className="bg-slate-50 border border-indigo-100 rounded-xl p-4 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between">
            <div className="text-xs font-black text-slate-900">Share your experience with this item:</div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setInsightType('pro')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  insightType === 'pro' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border'
                }`}
              >
                + Advantage (Pro)
              </button>
              <button
                type="button"
                onClick={() => setInsightType('con')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  insightType === 'con' ? 'bg-rose-600 text-white' : 'bg-white text-slate-600 border'
                }`}
              >
                - Drawback (Con)
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={customInsight}
              onChange={(e) => setCustomInsight(e.target.value)}
              placeholder={insightType === 'pro' ? 'e.g. Battery lasts 3 days with heavy use...' : 'e.g. The included cable is slightly short...'}
              className="flex-1 px-3.5 py-2 bg-white border border-gray-300 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            />
            <button
              type="submit"
              disabled={!customInsight.trim()}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs rounded-xl transition-all shadow-xs"
            >
              Post
            </button>
          </div>
        </form>
      )}

      {/* 2-Column Pros vs Cons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Pros Column */}
        <div className="space-y-3 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100">
          <div className="flex items-center justify-between border-b border-emerald-100/80 pb-2">
            <h4 className="font-extrabold text-emerald-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Verified Advantages ({combinedPros.length})
            </h4>
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded">
              High Confidence
            </span>
          </div>

          <div className="space-y-2.5">
            {combinedPros.map((pro, idx) => {
              const key = `pro_${idx}`;
              const voteData = votes[key] || { up: 24 + idx * 5, userVoted: null };
              const hasVoted = voteData.userVoted === 'up';

              return (
                <div 
                  key={idx} 
                  className="bg-white p-3 rounded-xl border border-emerald-100 shadow-2xs flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900 leading-snug">{pro}</span>
                  </div>

                  <button
                    onClick={() => handleVote(key, 'up')}
                    className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                      hasVoted
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs scale-105'
                        : 'bg-slate-50 hover:bg-emerald-50 text-slate-700 border-gray-200 hover:border-emerald-300'
                    }`}
                    title="Click if you find this pro accurate or helpful"
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${hasVoted ? 'fill-current' : 'text-emerald-600'}`} />
                    <span>{voteData.up}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cons Column */}
        <div className="space-y-3 bg-rose-50/50 p-4 rounded-xl border border-rose-100">
          <div className="flex items-center justify-between border-b border-rose-100/80 pb-2">
            <h4 className="font-extrabold text-rose-950 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-rose-600" />
              Considerations &amp; Trade-offs ({combinedCons.length})
            </h4>
            <span className="text-[10px] font-bold text-rose-700 bg-rose-100/70 px-2 py-0.5 rounded">
              Buyer Feedback
            </span>
          </div>

          <div className="space-y-2.5">
            {combinedCons.map((con, idx) => {
              const key = `con_${idx}`;
              const voteData = votes[key] || { up: 12 + idx * 3, userVoted: null };
              const hasVoted = voteData.userVoted === 'up';

              return (
                <div 
                  key={idx} 
                  className="bg-white p-3 rounded-xl border border-rose-100 shadow-2xs flex items-start justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900 leading-snug">{con}</span>
                  </div>

                  <button
                    onClick={() => handleVote(key, 'up')}
                    className={`px-2.5 py-1.5 rounded-lg border text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer ${
                      hasVoted
                        ? 'bg-rose-600 text-white border-rose-600 shadow-xs scale-105'
                        : 'bg-slate-50 hover:bg-rose-50 text-slate-700 border-gray-200 hover:border-rose-300'
                    }`}
                    title="Click if this consideration is important to you"
                  >
                    <ThumbsUp className={`w-3.5 h-3.5 ${hasVoted ? 'fill-current' : 'text-rose-600'}`} />
                    <span>{voteData.up}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-gray-100">
        <span className="flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          Community votes updated in real-time
        </span>
        <span className="font-medium">Total Community Feedback: {Object.values(votes).reduce((acc: number, v: { up: number; userVoted: 'up' | 'down' | null }) => acc + (v?.up || 0), 0)} votes</span>
      </div>
    </div>
  );
};

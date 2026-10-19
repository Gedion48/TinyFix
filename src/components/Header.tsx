import React from 'react';
import { Bookmark, CheckCircle2, Shuffle, Sparkles, Wrench } from 'lucide-react';

interface HeaderProps {
  completedCount: number;
  savedCount: number;
  onOpenMyFixes: (tab?: 'saved' | 'completed') => void;
  onSurpriseMe: () => void;
  onResetToHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  completedCount,
  savedCount,
  onOpenMyFixes,
  onSurpriseMe,
  onResetToHome,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8E2D8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <button
          onClick={onResetToHome}
          className="flex items-center gap-2.5 group text-left transition-transform active:scale-95"
          aria-label="TinyFix Home"
        >
          <div className="w-10 h-10 rounded-xl bg-[#FF5C28] text-white flex items-center justify-center shadow-md shadow-[#FF5C28]/25 group-hover:bg-[#E54817] transition-colors">
            <Wrench className="w-5 h-5 -rotate-45" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-[#0F1E36]">
                Tiny<span className="text-[#FF5C28]">Fix</span>
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#FF5C28]/10 text-[#FF5C28] border border-[#FF5C28]/20">
                v1.0
              </span>
            </div>
            <p className="text-[11px] text-[#556987] font-medium hidden sm:block">
              Practical everyday solutions in 2–10 mins
            </p>
          </div>
        </button>

        {/* Action Controls & My Fixes quick counters */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Surprise Me Quick Button */}
          <button
            onClick={onSurpriseMe}
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white text-[#0F1E36] border border-[#E2D9CC] hover:border-[#FF5C28]/50 hover:bg-[#FFFDFB] shadow-sm transition-all active:scale-95"
            title="Random fix from our curated local dataset"
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF5C28]" />
            <span className="hidden xs:inline">Surprise Me</span>
            <span className="xs:hidden">Random</span>
          </button>

          {/* Saved Fixes Indicator */}
          <button
            onClick={() => onOpenMyFixes('saved')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all active:scale-95 ${
              savedCount > 0
                ? 'bg-[#FFF7ED] text-[#C2410C] border-[#FFEDD5] hover:bg-[#FFEDD5]'
                : 'bg-white text-[#556987] border-[#E2D9CC] hover:bg-[#F8F5EE]'
            }`}
            title="View saved solutions"
          >
            <Bookmark className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Saved</span>
            <span className="px-1.5 py-0.2 rounded-full text-xs font-bold bg-white/80">
              {savedCount}
            </span>
          </button>

          {/* Completed Fixes Indicator */}
          <button
            onClick={() => onOpenMyFixes('completed')}
            className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all active:scale-95 ${
              completedCount > 0
                ? 'bg-[#ECFDF5] text-[#047857] border-[#A7F3D0] hover:bg-[#D1FAE5]'
                : 'bg-white text-[#556987] border-[#E2D9CC] hover:bg-[#F8F5EE]'
            }`}
            title="View completed fixes"
          >
            <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span className="hidden sm:inline">Done</span>
            <span className="px-1.5 py-0.2 rounded-full text-xs font-bold bg-white/80">
              {completedCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

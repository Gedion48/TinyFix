import React, { useEffect, useState } from 'react';
import {
  Bookmark,
  CheckCircle2,
  Clock,
  ExternalLink,
  Flame,
  RotateCcw,
  Sparkles,
  Trash2,
  Wrench,
  X,
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { SOLUTIONS } from '../data/solutions';
import { CompletedFixRecord, FixSolution } from '../types';

interface MyFixesModalProps {
  isOpen: boolean;
  initialTab?: 'saved' | 'completed';
  savedIds: string[];
  completedFixes: CompletedFixRecord[];
  onClose: () => void;
  onRemoveSaved: (id: string) => void;
  onRequestClearHistory: () => void;
  onSelectSolution: (sol: FixSolution) => void;
}

export const MyFixesModal: React.FC<MyFixesModalProps> = ({
  isOpen,
  initialTab = 'saved',
  savedIds,
  completedFixes,
  onClose,
  onRemoveSaved,
  onRequestClearHistory,
  onSelectSolution,
}) => {
  const [activeTab, setActiveTab] = useState<'saved' | 'completed'>(initialTab);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Escape key handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Retrieve full solution objects for saved IDs
  const savedSolutions = savedIds
    .map((id) => SOLUTIONS.find((s) => s.id === id))
    .filter((s): s is FixSolution => Boolean(s));

  // Compute total minutes completed
  const totalCompletedMinutes = completedFixes.reduce(
    (acc, curr) => acc + (curr.timeMinutes || 0),
    0
  );

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center p-3 sm:p-6 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#FAF7F2] rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-[#E8E2D8] overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 pb-4 bg-white border-b border-[#E8E2D8] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#FF5C28] text-white flex items-center justify-center shadow-xs">
              <Wrench className="w-5 h-5 -rotate-45" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-[#0F1E36]">My Fixes Hub</h2>
              <p className="text-xs text-[#556987]">
                Saved solutions & personal completion log
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-[#64748B] hover:text-[#0F1E36] hover:bg-[#F4EFEA] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Bar */}
        <div className="px-5 sm:px-6 pt-3 bg-white border-b border-[#E8E2D8] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('saved')}
              className={`flex items-center gap-2 pb-3 px-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === 'saved'
                  ? 'border-[#FF5C28] text-[#FF5C28]'
                  : 'border-transparent text-[#64748B] hover:text-[#0F1E36]'
              }`}
            >
              <Bookmark className="w-4 h-4" />
              <span>Saved for Later</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#FAF7F2] border border-[#E8E2D8] text-[#0F1E36]">
                {savedSolutions.length}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('completed')}
              className={`flex items-center gap-2 pb-3 px-3 text-sm font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === 'completed'
                  ? 'border-[#FF5C28] text-[#FF5C28]'
                  : 'border-transparent text-[#64748B] hover:text-[#0F1E36]'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Completed Log</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#FAF7F2] border border-[#E8E2D8] text-[#0F1E36]">
                {completedFixes.length}
              </span>
            </button>
          </div>

          {activeTab === 'completed' && completedFixes.length > 0 && (
            <button
              type="button"
              onClick={onRequestClearHistory}
              className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 pb-3 transition-colors cursor-pointer"
              title="Clear completion history"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset History</span>
            </button>
          )}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3">
          {activeTab === 'saved' ? (
            /* SAVED FIXES LIST */
            savedSolutions.length > 0 ? (
              <div className="space-y-3">
                {savedSolutions.map((sol) => {
                  const cat = CATEGORIES.find((c) => c.id === sol.category);
                  return (
                    <div
                      key={sol.id}
                      className="p-4 bg-white rounded-2xl border border-[#E8E2D8] hover:border-[#D1C7B7] shadow-xs flex items-center justify-between gap-4 transition-all"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                              cat ? `${cat.bgTint} ${cat.textColor} ${cat.borderColor}` : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {cat?.label || sol.category}
                          </span>
                          <span className="text-[11px] font-bold text-[#EA580C] bg-[#FFF4ED] px-2 py-0.5 rounded-md border border-[#FFDDD0] flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {sol.timeMinutes} mins
                          </span>
                        </div>
                        <h4 className="font-bold text-sm sm:text-base text-[#0F1E36] truncate">
                          {sol.title}
                        </h4>
                        <p className="text-xs text-[#556987] line-clamp-1 italic">
                          "{sol.problem}"
                        </p>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            onSelectSolution(sol);
                            onClose();
                          }}
                          className="px-3 py-1.5 rounded-xl text-xs font-bold bg-[#FAF7F2] text-[#0F1E36] hover:bg-[#FF5C28] hover:text-white transition-colors flex items-center gap-1 border border-[#E8E2D8]"
                        >
                          <span>Open</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => onRemoveSaved(sol.id)}
                          className="p-1.5 rounded-xl text-[#94A3B8] hover:text-red-500 hover:bg-red-50 transition-colors"
                          title="Remove from saved"
                          aria-label="Remove saved solution"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 px-4">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-[#F4EFEA] text-[#94A3B8] flex items-center justify-center mb-3">
                  <Bookmark className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-base text-[#0F1E36] mb-1">
                  No saved solutions yet
                </h4>
                <p className="text-xs sm:text-sm text-[#556987] max-w-sm mx-auto mb-4">
                  Browse or search everyday fixes and click "Save for later" on any card to keep it handy here.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#FF5C28] text-white hover:bg-[#E54817] transition-colors"
                >
                  Explore Fixes
                </button>
              </div>
            )
          ) : (
            /* COMPLETED FIXES LIST */
            <div>
              {/* Summary stat cards */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3.5 bg-white rounded-2xl border border-[#E8E2D8] text-center">
                  <span className="block text-2xl font-black text-[#047857]">
                    {completedFixes.length}
                  </span>
                  <span className="text-xs font-semibold text-[#556987]">
                    Problems Solved
                  </span>
                </div>
                <div className="p-3.5 bg-white rounded-2xl border border-[#E8E2D8] text-center">
                  <span className="block text-2xl font-black text-[#FF5C28]">
                    {totalCompletedMinutes}m
                  </span>
                  <span className="text-xs font-semibold text-[#556987]">
                    Action Time Logged
                  </span>
                </div>
              </div>

              {completedFixes.length > 0 ? (
                <div className="space-y-2.5">
                  {completedFixes.map((record, index) => {
                    const originalSol = SOLUTIONS.find((s) => s.id === record.solutionId);
                    const formattedDate = new Date(record.completedAt).toLocaleDateString(
                      undefined,
                      {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      }
                    );

                    return (
                      <div
                        key={`${record.solutionId}-${index}`}
                        className="p-3.5 bg-white rounded-2xl border border-[#E8E2D8] flex items-center justify-between gap-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-8 h-8 rounded-full bg-[#ECFDF5] text-[#059669] flex items-center justify-center flex-shrink-0">
                            <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-xs sm:text-sm text-[#0F1E36] truncate">
                              {record.title}
                            </h4>
                            <p className="text-[11px] text-[#64748B]">
                              Completed {formattedDate} • {record.timeMinutes} mins
                            </p>
                          </div>
                        </div>

                        {originalSol && (
                          <button
                            type="button"
                            onClick={() => {
                              onSelectSolution(originalSol);
                              onClose();
                            }}
                            className="p-2 rounded-xl text-[#556987] hover:text-[#0F1E36] hover:bg-[#F4EFEA] transition-colors"
                            title="View solution card"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 px-4">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-[#ECFDF5] text-[#059669] flex items-center justify-center mb-3">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-base text-[#0F1E36] mb-1">
                    No completed fixes yet
                  </h4>
                  <p className="text-xs sm:text-sm text-[#556987] max-w-sm mx-auto mb-4">
                    When you finish an action sprint, hit "Mark as done" to record your progress and celebrate quick wins.
                  </p>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#FF5C28] text-white hover:bg-[#E54817] transition-colors"
                  >
                    Start a 2-Minute Fix
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-white border-t border-[#E8E2D8] flex items-center justify-between text-xs text-[#556987]">
          <span>Data stays in your browser's local storage.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-xl font-bold bg-[#F4EFEA] hover:bg-[#EAE3D9] text-[#0F1E36] transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/**
 * TinyFix — Creative Everyday Problem Solver
 * Built with React, TypeScript, Vite, and Tailwind CSS.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Filter,
  Flame,
  HelpCircle,
  RotateCcw,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { CategoryCard } from './components/CategoryCard';
import { FixFinder } from './components/FixFinder';
import { Header } from './components/Header';
import { MyFixesModal } from './components/MyFixesModal';
import { ResetConfirmModal } from './components/ResetConfirmModal';
import { SolutionCard } from './components/SolutionCard';
import { Toast } from './components/Toast';
import { CATEGORIES } from './data/categories';
import { SOLUTIONS } from './data/solutions';
import { CategoryType, FixSolution, TimeMinutes } from './types';
import { findMatches, getRandomSolution } from './utils/matcher';
import {
  clearCompletedHistory,
  getCompletedFixes,
  getSavedSolutionIds,
  recordFixCompleted,
  removeSavedSolution,
  toggleSaveSolution,
} from './utils/storage';

export default function App() {
  // -----------------------------------------------------------------
  // Persistent State
  // -----------------------------------------------------------------
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [completedFixes, setCompletedFixes] = useState(() => getCompletedFixes());

  // Load saved IDs on mount
  useEffect(() => {
    setSavedIds(getSavedSolutionIds());
  }, []);

  // -----------------------------------------------------------------
  // Filter & Search State
  // -----------------------------------------------------------------
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | 'all'>('all');
  const [selectedTime, setSelectedTime] = useState<TimeMinutes | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Result state
  const [displayedSolutions, setDisplayedSolutions] = useState<FixSolution[]>(() => SOLUTIONS);
  const [isFallback, setIsFallback] = useState<boolean>(false);
  const [matchMessage, setMatchMessage] = useState<string>('Showing all 30 curated micro-fixes');

  // Surprise / Highlight state
  const [surpriseId, setSurpriseId] = useState<string | null>(null);
  const [lastRandomId, setLastRandomId] = useState<string | undefined>(undefined);

  // Modals & Feedback
  const [isMyFixesOpen, setIsMyFixesOpen] = useState<boolean>(false);
  const [myFixesInitialTab, setMyFixesInitialTab] = useState<'saved' | 'completed'>('saved');
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Section reference for smooth scrolling
  const resultsRef = useRef<HTMLDivElement>(null);

  // -----------------------------------------------------------------
  // Recommendation Execution
  // -----------------------------------------------------------------
  const executeRecommendation = (
    cat: CategoryType | 'all' = selectedCategory,
    time: TimeMinutes | 'all' = selectedTime,
    query: string = searchQuery
  ) => {
    setSurpriseId(null);
    const result = findMatches({
      category: cat,
      timeMinutes: time,
      query,
    });

    setDisplayedSolutions(result.solutions);
    setIsFallback(result.isFallback);
    setMatchMessage(result.matchReason || 'Showing matched solutions');
  };

  // Trigger search on filter changes if query is present, or reset view
  const handleCategorySelect = (catId: CategoryType) => {
    if (selectedCategory === catId) {
      // Toggle back to all
      setSelectedCategory('all');
      executeRecommendation('all', selectedTime, searchQuery);
    } else {
      setSelectedCategory(catId);
      executeRecommendation(catId, selectedTime, searchQuery);
    }

    // Scroll gently toward results
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleTimeChange = (time: TimeMinutes | 'all') => {
    setSelectedTime(time);
    executeRecommendation(selectedCategory, time, searchQuery);
  };

  const handleSearchSubmit = () => {
    executeRecommendation(selectedCategory, selectedTime, searchQuery);
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // -----------------------------------------------------------------
  // Surprise Me (Random Fix with no immediate repeat)
  // -----------------------------------------------------------------
  const handleSurpriseMe = () => {
    const randomPick = getRandomSolution(lastRandomId);
    setLastRandomId(randomPick.id);
    setSurpriseId(randomPick.id);
    setSelectedCategory('all');
    setSelectedTime('all');
    setSearchQuery('');
    setDisplayedSolutions([randomPick]);
    setIsFallback(false);
    setMatchMessage(`✨ Surprise Pick: Here's a quick fix ready for you right now!`);
    setToastMessage(`🎲 Found a surprise fix: "${randomPick.title}"`);

    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Reset all filters to initial state
  const handleResetToHome = () => {
    setSelectedCategory('all');
    setSelectedTime('all');
    setSearchQuery('');
    setSurpriseId(null);
    setDisplayedSolutions(SOLUTIONS);
    setIsFallback(false);
    setMatchMessage('Showing all 30 curated micro-fixes');
  };

  // -----------------------------------------------------------------
  // Storage Actions (Saved & Completed)
  // -----------------------------------------------------------------
  const handleToggleSave = (id: string) => {
    const result = toggleSaveSolution(id);
    setSavedIds(result.allIds);
  };

  const handleRemoveSaved = (id: string) => {
    const updated = removeSavedSolution(id);
    setSavedIds(updated);
    setToastMessage('Removed from saved solutions.');
  };

  const handleMarkDone = (solution: FixSolution) => {
    const updated = recordFixCompleted(solution);
    setCompletedFixes(updated);
  };

  const handleConfirmClearHistory = () => {
    clearCompletedHistory();
    setCompletedFixes([]);
    setIsResetConfirmOpen(false);
    setToastMessage('Completed fixes history has been reset.');
  };

  // -----------------------------------------------------------------
  // Category counts memo
  // -----------------------------------------------------------------
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const sol of SOLUTIONS) {
      counts[sol.category] = (counts[sol.category] || 0) + 1;
    }
    return counts;
  }, []);

  // Completion count by solution ID
  const completionCountMap = useMemo(() => {
    const map: Record<string, number> = {};
    for (const record of completedFixes) {
      map[record.solutionId] = (map[record.solutionId] || 0) + 1;
    }
    return map;
  }, [completedFixes]);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#0F1E36] flex flex-col font-sans">
      {/* Top Navigation */}
      <Header
        completedCount={completedFixes.length}
        savedCount={savedIds.length}
        onOpenMyFixes={(tab) => {
          setMyFixesInitialTab(tab || 'saved');
          setIsMyFixesOpen(true);
        }}
        onSurpriseMe={handleSurpriseMe}
        onResetToHome={handleResetToHome}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10">
        {/* Fix Finder Section */}
        <FixFinder
          selectedCategory={selectedCategory}
          selectedTime={selectedTime}
          searchQuery={searchQuery}
          onCategoryChange={(cat) => {
            setSelectedCategory(cat);
            executeRecommendation(cat, selectedTime, searchQuery);
          }}
          onTimeChange={handleTimeChange}
          onSearchQueryChange={setSearchQuery}
          onSubmitSearch={handleSearchSubmit}
          onSurpriseMe={handleSurpriseMe}
        />

        {/* 5 Category Exploration Cards */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#0F1E36] tracking-tight">
                Explore by Category
              </h2>
              <p className="text-xs sm:text-sm text-[#556987]">
                Click any zone to filter practical solutions instantly
              </p>
            </div>
            {selectedCategory !== 'all' && (
              <button
                type="button"
                onClick={handleResetToHome}
                className="text-xs font-bold text-[#FF5C28] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Show all</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                isSelected={selectedCategory === cat.id}
                count={categoryCounts[cat.id] || 0}
                onSelect={handleCategorySelect}
              />
            ))}
          </div>
        </section>

        {/* Results & Solutions Feed */}
        <section ref={resultsRef} className="scroll-mt-24 mb-16">
          {/* Results Status Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-white border border-[#E8E2D8] mb-6 shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#E2D9CC] flex items-center justify-center text-[#FF5C28] flex-shrink-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base text-[#0F1E36]">
                  {matchMessage}
                </h3>
                <p className="text-xs text-[#556987]">
                  Showing {displayedSolutions.length} practical{' '}
                  {displayedSolutions.length === 1 ? 'solution' : 'solutions'}
                </p>
              </div>
            </div>

            {/* Quick Filter Reset */}
            {(selectedCategory !== 'all' || selectedTime !== 'all' || searchQuery || surpriseId) && (
              <button
                type="button"
                onClick={handleResetToHome}
                className="self-start sm:self-auto px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#FAF7F2] hover:bg-[#F1EAE0] text-[#0F1E36] border border-[#E2D9CC] flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#64748B]" />
                <span>Reset all filters</span>
              </button>
            )}
          </div>

          {/* Fallback Notice Banner */}
          {isFallback && (
            <div className="mb-6 p-4 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] flex items-start gap-3 text-xs sm:text-sm text-[#92400E]">
              <AlertCircle className="w-5 h-5 text-[#D97706] flex-shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold">
                  No exact keyword match in our rule system
                </p>
                <p className="text-[#B45309]">
                  We showed you this versatile general fix instead of an empty screen so you can start making progress immediately.
                </p>
              </div>
            </div>
          )}

          {/* Solutions Grid */}
          {displayedSolutions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {displayedSolutions.map((sol) => (
                <SolutionCard
                  key={sol.id}
                  solution={sol}
                  isSaved={savedIds.includes(sol.id)}
                  completionCount={completionCountMap[sol.id] || 0}
                  onToggleSave={handleToggleSave}
                  onMarkDone={handleMarkDone}
                  onShowToast={setToastMessage}
                />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="text-center py-16 px-4 bg-white rounded-3xl border border-[#E8E2D8]">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#FAF7F2] text-[#94A3B8] flex items-center justify-center mb-4 border border-[#E8E2D8]">
                <HelpCircle className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#0F1E36] mb-1">
                No solutions found
              </h3>
              <p className="text-sm text-[#556987] max-w-md mx-auto mb-6">
                Try selecting "Any" time or clearing your search keywords.
              </p>
              <button
                type="button"
                onClick={handleResetToHome}
                className="px-5 py-2.5 rounded-xl font-bold text-sm bg-[#FF5C28] text-white hover:bg-[#E54817] transition-colors"
              >
                Show All Solutions
              </button>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#E8E2D8] py-8 sm:py-10 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#FF5C28] text-white flex items-center justify-center">
              <Wrench className="w-4 h-4 -rotate-45" />
            </div>
            <span className="font-bold text-sm text-[#0F1E36]">
              Tiny<span className="text-[#FF5C28]">Fix</span>
            </span>
            <span className="text-xs text-[#64748B]">
              — Practical 2–10 minute everyday fixes.
            </span>
          </div>

          <p className="text-xs text-[#556987]">
            Client-first & private. No accounts, cookies, or external AI calls required.
          </p>
        </div>
      </footer>

      {/* My Fixes Hub Modal */}
      <MyFixesModal
        isOpen={isMyFixesOpen}
        initialTab={myFixesInitialTab}
        savedIds={savedIds}
        completedFixes={completedFixes}
        onClose={() => setIsMyFixesOpen(false)}
        onRemoveSaved={handleRemoveSaved}
        onRequestClearHistory={() => setIsResetConfirmOpen(true)}
        onSelectSolution={(sol) => {
          setSelectedCategory(sol.category);
          setDisplayedSolutions([sol]);
          setMatchMessage(`Viewing saved fix: "${sol.title}"`);
          setTimeout(() => {
            resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
          }, 100);
        }}
      />

      {/* Reset Confirmation Modal */}
      <ResetConfirmModal
        isOpen={isResetConfirmOpen}
        onConfirm={handleConfirmClearHistory}
        onCancel={() => setIsResetConfirmOpen(false)}
      />

      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}

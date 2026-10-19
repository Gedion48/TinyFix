import React, { useState } from 'react';
import { Clock, Search, Sparkles, X, Zap } from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { CategoryType, TimeMinutes } from '../types';

interface FixFinderProps {
  selectedCategory: CategoryType | 'all';
  selectedTime: TimeMinutes | 'all';
  searchQuery: string;
  onCategoryChange: (cat: CategoryType | 'all') => void;
  onTimeChange: (time: TimeMinutes | 'all') => void;
  onSearchQueryChange: (query: string) => void;
  onSubmitSearch: () => void;
  onSurpriseMe: () => void;
}

const QUICK_PROMPTS = [
  { label: 'Messy room in 10 mins', cat: 'home' as CategoryType, time: 10 as TimeMinutes },
  { label: 'I keep procrastinating', cat: 'productivity' as CategoryType, time: 2 as TimeMinutes },
  { label: 'Nothing in fridge to cook', cat: 'food' as CategoryType, time: 5 as TimeMinutes },
  { label: 'Busy day: pick next task', cat: 'productivity' as CategoryType, time: 5 as TimeMinutes },
  { label: 'Torn between two choices', cat: 'decisions' as CategoryType, time: 2 as TimeMinutes },
];

export const FixFinder: React.FC<FixFinderProps> = ({
  selectedCategory,
  selectedTime,
  searchQuery,
  onCategoryChange,
  onTimeChange,
  onSearchQueryChange,
  onSubmitSearch,
  onSurpriseMe,
}) => {
  const [inputVal, setInputVal] = useState(searchQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchQueryChange(inputVal);
    onSubmitSearch();
  };

  const handleQuickPrompt = (prompt: { label: string; cat: CategoryType; time: TimeMinutes }) => {
    setInputVal(prompt.label);
    onSearchQueryChange(prompt.label);
    onCategoryChange(prompt.cat);
    onTimeChange(prompt.time);
    onSubmitSearch();
  };

  const handleClear = () => {
    setInputVal('');
    onSearchQueryChange('');
  };

  return (
    <section className="bg-white rounded-3xl border border-[#E8E2D8] p-5 sm:p-8 shadow-sm mb-10">
      <div className="max-w-2xl mx-auto text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF4ED] text-[#FF5C28] text-xs font-bold border border-[#FFDDD0] mb-3">
          <Zap className="w-3.5 h-3.5" />
          <span>Quick Action Engine</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0F1E36] tracking-tight mb-2">
          What's your tiny problem today?
        </h2>
        <p className="text-sm sm:text-base text-[#556987]">
          Describe what is stuck or choose a quick prompt to get an actionable, realistic 2–10 minute fix.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-3xl mx-auto">
        {/* Search input field */}
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-[#94A3B8] absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Describe your snag (e.g. room messy, can't start paper, hungry, torn between 2 options)..."
            className="w-full pl-12 pr-10 py-3.5 sm:py-4 bg-[#FAF8F5] border border-[#E2D9CC] rounded-2xl text-sm sm:text-base text-[#0F1E36] placeholder-[#94A3B8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#FF5C28] focus:border-[#FF5C28] transition-all"
          />
          {inputVal && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3.5 p-1 text-[#94A3B8] hover:text-[#0F1E36] rounded-full hover:bg-[#EAE3D9] transition-colors"
              aria-label="Clear search input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Inspiration Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-xs font-semibold text-[#64748B] flex items-center gap-1">
            Try:
          </span>
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleQuickPrompt(prompt)}
              className="text-xs px-3 py-1.5 rounded-full bg-[#F4EFEA] hover:bg-[#EFE8DE] text-[#334155] font-medium border border-[#E5DDD2] transition-colors"
            >
              {prompt.label}
            </button>
          ))}
        </div>

        {/* Filters Row: Category & Time */}
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {/* Category Dropdown/Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#556987] mb-1.5">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => onCategoryChange(e.target.value as CategoryType | 'all')}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF8F5] border border-[#E2D9CC] text-xs sm:text-sm text-[#0F1E36] font-semibold focus:outline-none focus:ring-2 focus:ring-[#FF5C28]"
            >
              <option value="all">All Categories (30 Fixes)</option>
              {CATEGORIES.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Time Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#556987] mb-1.5">
              Available Time
            </label>
            <div className="grid grid-cols-4 gap-1.5 bg-[#FAF8F5] p-1 rounded-xl border border-[#E2D9CC]">
              {(['all', 2, 5, 10] as (TimeMinutes | 'all')[]).map((timeOption) => (
                <button
                  key={timeOption}
                  type="button"
                  onClick={() => onTimeChange(timeOption)}
                  className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
                    selectedTime === timeOption
                      ? 'bg-[#FF5C28] text-white shadow-xs'
                      : 'text-[#556987] hover:text-[#0F1E36]'
                  }`}
                >
                  {timeOption === 'all' ? 'Any' : `${timeOption} min`}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
          <button
            type="submit"
            className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base text-white bg-[#FF5C28] hover:bg-[#E54817] shadow-md shadow-[#FF5C28]/25 transition-all active:scale-98 cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Find my fix</span>
          </button>

          <button
            type="button"
            onClick={onSurpriseMe}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm sm:text-base text-[#0F1E36] bg-[#FAF8F5] hover:bg-[#F2ECE1] border border-[#E2D9CC] transition-all cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-[#FF5C28]" />
            <span>Surprise me</span>
          </button>
        </div>
      </form>

      {/* Transparent System Note */}
      <div className="mt-5 pt-4 border-t border-[#F2ECE1] text-center">
        <p className="text-[11px] text-[#64748B]">
          ⚡ Rule-based matching engine: Instant, private recommendation logic running 100% in your browser.
        </p>
      </div>
    </section>
  );
};

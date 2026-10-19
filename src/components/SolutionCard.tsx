import React, { useEffect, useState } from 'react';
import {
  Bookmark,
  BookmarkCheck,
  Check,
  CheckCircle2,
  Clock,
  Copy,
  Lightbulb,
  Pause,
  Play,
  RotateCcw,
  Sparkles,
  Timer as TimerIcon,
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { FixSolution } from '../types';
import { sound } from '../utils/sound';

interface SolutionCardProps {
  solution: FixSolution;
  isSaved: boolean;
  completionCount: number;
  onToggleSave: (id: string) => void;
  onMarkDone: (solution: FixSolution) => void;
  onShowToast: (message: string) => void;
}

export const SolutionCard: React.FC<SolutionCardProps> = ({
  solution,
  isSaved,
  completionCount,
  onToggleSave,
  onMarkDone,
  onShowToast,
}) => {
  // Checkbox state for individual steps
  const [checkedSteps, setCheckedSteps] = useState<Record<number, boolean>>({});
  
  // Interactive Step Timer
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(solution.timeMinutes * 60);
  const [timerFinished, setTimerFinished] = useState<boolean>(false);

  // Category visual metadata
  const catMeta = CATEGORIES.find((c) => c.id === solution.category);

  // Reset checked steps and timer if solution changes
  useEffect(() => {
    setCheckedSteps({});
    setTimerActive(false);
    setSecondsRemaining(solution.timeMinutes * 60);
    setTimerFinished(false);
  }, [solution.id, solution.timeMinutes]);

  // Countdown timer effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (timerActive && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            setTimerActive(false);
            setTimerFinished(true);
            sound.playSuccessChime();
            onShowToast(`🎉 Time's up for "${solution.title}"! Excellent job.`);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerActive, secondsRemaining, solution.title, onShowToast]);

  const toggleStep = (index: number) => {
    sound.playTick();
    setCheckedSteps((prev) => {
      const next = { ...prev, [index]: !prev[index] };
      const allDone = solution.steps.every((_, i) => next[i]);
      if (allDone && !prev[index]) {
        sound.playSuccessChime();
        onShowToast(`✨ All steps completed for "${solution.title}"!`);
      }
      return next;
    });
  };

  const allStepsDone = solution.steps.length > 0 && solution.steps.every((_, i) => checkedSteps[i]);

  const handleMarkDone = () => {
    sound.playSuccessChime();
    onMarkDone(solution);
    onShowToast(`✓ Marked "${solution.title}" as completed!`);
  };

  const handleToggleSave = () => {
    sound.playTick();
    onToggleSave(solution.id);
    onShowToast(isSaved ? `Removed from saved fixes` : `Saved to "My Fixes"`);
  };

  const handleCopySteps = async () => {
    const textToCopy = `TinyFix: ${solution.title} (${solution.timeMinutes} mins)\nProblem: ${solution.problem}\n\nSteps:\n${solution.steps
      .map((s, i) => `${i + 1}. ${s}`)
      .join('\n')}\n\nPro Tip: ${solution.proTip}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      sound.playTick();
      onShowToast('📋 Steps copied to clipboard!');
    } catch {
      onShowToast('Could not copy to clipboard.');
    }
  };

  // Format seconds into MM:SS
  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const totalSeconds = solution.timeMinutes * 60;
  const progressPercent = Math.max(0, Math.min(100, ((totalSeconds - secondsRemaining) / totalSeconds) * 100));

  return (
    <article className="bg-white rounded-2xl border border-[#E8E2D8] shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between">
      {/* Card Header */}
      <div className="p-5 sm:p-6 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3.5">
          <div className="flex items-center gap-2">
            {/* Category badge */}
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${
                catMeta ? `${catMeta.bgTint} ${catMeta.textColor} ${catMeta.borderColor}` : 'bg-gray-100 text-gray-800'
              }`}
            >
              {catMeta?.label || solution.category}
            </span>

            {/* Time badge */}
            <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-[#FFF4ED] text-[#EA580C] border border-[#FFDDD0]">
              <Clock className="w-3.5 h-3.5" />
              {solution.timeMinutes} min{solution.timeMinutes > 1 ? 's' : ''}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Completion count pill */}
            {completionCount > 0 && (
              <span className="flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]">
                <Check className="w-3 h-3 stroke-[3]" />
                Done {completionCount}x
              </span>
            )}

            {/* Copy button */}
            <button
              type="button"
              onClick={handleCopySteps}
              className="p-1.5 rounded-lg text-[#556987] hover:text-[#0F1E36] hover:bg-[#F4EFEA] transition-colors"
              title="Copy solution steps to clipboard"
              aria-label="Copy solution steps"
            >
              <Copy className="w-4 h-4" />
            </button>

            {/* Save toggle button */}
            <button
              type="button"
              onClick={handleToggleSave}
              className={`p-1.5 rounded-lg transition-colors ${
                isSaved
                  ? 'text-[#FF5C28] bg-[#FFF2EC]'
                  : 'text-[#556987] hover:text-[#FF5C28] hover:bg-[#F4EFEA]'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save for later'}
              aria-label={isSaved ? 'Remove from saved' : 'Save for later'}
            >
              {isSaved ? <BookmarkCheck className="w-4 h-4 fill-[#FF5C28]" /> : <Bookmark className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-extrabold text-lg sm:text-xl text-[#0F1E36] leading-snug mb-2">
          {solution.title}
        </h3>

        {/* Problem statement */}
        <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#EFE8DE] text-xs sm:text-sm text-[#475569] mb-4">
          <span className="font-bold text-[#0F1E36]">Solves: </span>
          <span className="italic">"{solution.problem}"</span>
        </div>

        {/* Actionable Steps with interactive checkboxes */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#556987]">
              Action Steps ({Object.values(checkedSteps).filter(Boolean).length}/{solution.steps.length})
            </span>
            {allStepsDone && (
              <span className="flex items-center gap-1 text-xs font-bold text-[#059669] animate-pulse">
                <Sparkles className="w-3.5 h-3.5" /> All steps cleared!
              </span>
            )}
          </div>

          <ol className="space-y-2">
            {solution.steps.map((step, idx) => {
              const isChecked = !!checkedSteps[idx];
              return (
                <li
                  key={idx}
                  onClick={() => toggleStep(idx)}
                  className={`flex items-start gap-3 p-2.5 rounded-xl border text-xs sm:text-sm cursor-pointer transition-all ${
                    isChecked
                      ? 'bg-[#F0FDF4] border-[#BBF7D0] text-[#166534] line-through opacity-85'
                      : 'bg-white hover:bg-[#FCFBF8] border-[#EAE3D9] text-[#1E293B]'
                  }`}
                >
                  <div
                    className={`mt-0.5 flex-shrink-0 w-4.5 h-4.5 rounded-md border flex items-center justify-center transition-colors ${
                      isChecked
                        ? 'bg-[#16A34A] border-[#16A34A] text-white'
                        : 'border-[#CBD5E1] bg-white group-hover:border-[#94A3B8]'
                    }`}
                  >
                    {isChecked ? <Check className="w-3 h-3 stroke-[3]" /> : <span className="text-[10px] font-bold text-[#64748B]">{idx + 1}</span>}
                  </div>
                  <span className="leading-snug select-none">{step}</span>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Interactive Step Timer */}
        <div className="p-3 rounded-xl bg-[#FFFDF9] border border-[#EFE8DE] mb-4">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F1E36]">
              <TimerIcon className="w-4 h-4 text-[#FF5C28]" />
              <span>Fix Timer:</span>
              <span className="font-mono font-bold text-sm text-[#FF5C28]">
                {formatTime(secondsRemaining)}
              </span>
            </div>

            <div className="flex items-center gap-1">
              {!timerActive ? (
                <button
                  type="button"
                  onClick={() => {
                    sound.playTick();
                    setTimerActive(true);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-[#FF5C28] text-white hover:bg-[#E54817] transition-colors"
                >
                  <Play className="w-3 h-3 fill-white" />
                  <span>{secondsRemaining === totalSeconds ? 'Start' : 'Resume'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    sound.playTick();
                    setTimerActive(false);
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-[#0F1E36] text-white hover:bg-[#1E293B] transition-colors"
                >
                  <Pause className="w-3 h-3 fill-white" />
                  <span>Pause</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  sound.playTick();
                  setTimerActive(false);
                  setSecondsRemaining(totalSeconds);
                  setTimerFinished(false);
                }}
                className="p-1 rounded-lg text-[#64748B] hover:text-[#0F1E36] hover:bg-[#F1EBE4] transition-colors"
                title="Reset timer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-[#EFE8DE] h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                timerFinished ? 'bg-[#16A34A]' : 'bg-[#FF5C28]'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Pro Tip */}
        <div className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FFFBEB] border border-[#FEF3C7] text-xs text-[#92400E]">
          <Lightbulb className="w-4 h-4 text-[#D97706] flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="font-bold text-[#78350F]">Why it works: </strong>
            {solution.proTip}
          </p>
        </div>
      </div>

      {/* Card Footer Actions */}
      <div className="p-4 sm:p-5 pt-3 border-t border-[#F2ECE1] bg-[#FAF8F5]/60 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={handleToggleSave}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
            isSaved
              ? 'bg-[#FFF2EC] text-[#FF5C28] border-[#FF5C28]/40 hover:bg-[#FFE6DC]'
              : 'bg-white text-[#556987] border-[#E2D9CC] hover:bg-[#F8F5EE]'
          }`}
        >
          {isSaved ? <BookmarkCheck className="w-4 h-4 fill-[#FF5C28]" /> : <Bookmark className="w-4 h-4" />}
          <span>{isSaved ? 'Saved' : 'Save for later'}</span>
        </button>

        <button
          type="button"
          onClick={handleMarkDone}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white transition-all shadow-sm active:scale-98 ${
            allStepsDone
              ? 'bg-[#16A34A] hover:bg-[#15803D] ring-2 ring-[#86EFAC]'
              : 'bg-[#0F1E36] hover:bg-[#1C2C47]'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Mark as Done</span>
        </button>
      </div>
    </article>
  );
};

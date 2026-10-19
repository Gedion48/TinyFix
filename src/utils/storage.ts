import { CompletedFixRecord, FixSolution } from '../types';

const STORAGE_KEYS = {
  SAVED_SOLUTIONS: 'tinyfix_saved_solutions_v1',
  COMPLETED_FIXES: 'tinyfix_completed_fixes_v1',
};

/**
 * Safely parse JSON from localStorage with fallbacks
 */
function safeGetItem<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    const parsed = JSON.parse(raw);
    return Array.isArray(defaultValue) && !Array.isArray(parsed) ? defaultValue : parsed;
  } catch (err) {
    console.warn(`[TinyFix Storage] Error reading ${key}:`, err);
    return defaultValue;
  }
}

function safeSetItem<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.warn(`[TinyFix Storage] Error writing ${key}:`, err);
    return false;
  }
}

// ----------------------------------------------------
// SAVED SOLUTIONS
// ----------------------------------------------------

export function getSavedSolutionIds(): string[] {
  return safeGetItem<string[]>(STORAGE_KEYS.SAVED_SOLUTIONS, []);
}

export function isSolutionSaved(id: string): boolean {
  const list = getSavedSolutionIds();
  return list.includes(id);
}

export function toggleSaveSolution(id: string): { isSaved: boolean; allIds: string[] } {
  const current = getSavedSolutionIds();
  const exists = current.includes(id);
  const updated = exists ? current.filter((item) => item !== id) : [...current, id];
  safeSetItem(STORAGE_KEYS.SAVED_SOLUTIONS, updated);
  return { isSaved: !exists, allIds: updated };
}

export function removeSavedSolution(id: string): string[] {
  const current = getSavedSolutionIds();
  const updated = current.filter((item) => item !== id);
  safeSetItem(STORAGE_KEYS.SAVED_SOLUTIONS, updated);
  return updated;
}

// ----------------------------------------------------
// COMPLETED FIXES
// ----------------------------------------------------

export function getCompletedFixes(): CompletedFixRecord[] {
  return safeGetItem<CompletedFixRecord[]>(STORAGE_KEYS.COMPLETED_FIXES, []);
}

export function recordFixCompleted(solution: FixSolution): CompletedFixRecord[] {
  const current = getCompletedFixes();
  const newRecord: CompletedFixRecord = {
    solutionId: solution.id,
    title: solution.title,
    category: solution.category,
    timeMinutes: solution.timeMinutes,
    completedAt: new Date().toISOString(),
  };

  // Prepend so newest appears first
  const updated = [newRecord, ...current];
  safeSetItem(STORAGE_KEYS.COMPLETED_FIXES, updated);
  return updated;
}

export function clearCompletedHistory(): void {
  safeSetItem(STORAGE_KEYS.COMPLETED_FIXES, []);
}

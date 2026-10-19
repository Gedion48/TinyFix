/**
 * Core type definitions for TinyFix
 */

export type CategoryType = 
  | 'productivity'
  | 'home'
  | 'food'
  | 'study'
  | 'decisions';

export type TimeMinutes = 2 | 5 | 10;

export interface FixSolution {
  id: string;
  title: string;
  category: CategoryType;
  timeMinutes: TimeMinutes;
  problem: string;
  tagline: string;
  steps: string[];
  proTip: string;
  tags: string[];
  difficulty: 'Effortless' | 'Quick Sprint' | 'Focused Blitz';
}

export interface CategoryInfo {
  id: CategoryType;
  label: string;
  shortDesc: string;
  iconName: string;
  bgTint: string;
  borderColor: string;
  textColor: string;
  accentBadge: string;
}

export interface CompletedFixRecord {
  solutionId: string;
  title: string;
  category: CategoryType;
  timeMinutes: TimeMinutes;
  completedAt: string; // ISO 8601 string
}

export interface UserStats {
  completedCount: number;
  totalMinutesSaved: number;
  streakDays: number;
}

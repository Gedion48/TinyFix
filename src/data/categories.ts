import { CategoryInfo, CategoryType } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'productivity',
    label: 'Productivity',
    shortDesc: 'Break inertia, unstick tasks, and stop scrolling',
    iconName: 'Zap',
    bgTint: 'bg-amber-50/70',
    borderColor: 'border-amber-200/80',
    textColor: 'text-amber-900',
    accentBadge: 'bg-amber-100 text-amber-800 border-amber-300',
  },
  {
    id: 'home',
    label: 'Home & Organization',
    shortDesc: 'Quick tidy sweeps and micro-spaces sorted',
    iconName: 'Home',
    bgTint: 'bg-emerald-50/70',
    borderColor: 'border-emerald-200/80',
    textColor: 'text-emerald-900',
    accentBadge: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  },
  {
    id: 'food',
    label: 'Food & Cooking',
    shortDesc: 'Fast meals with whatever you have in the pantry',
    iconName: 'UtensilsCrossed',
    bgTint: 'bg-orange-50/70',
    borderColor: 'border-orange-200/80',
    textColor: 'text-orange-900',
    accentBadge: 'bg-orange-100 text-orange-800 border-orange-300',
  },
  {
    id: 'study',
    label: 'Study & Learning',
    shortDesc: 'Active recall, reading kickstarts, and exam clarity',
    iconName: 'BookOpen',
    bgTint: 'bg-blue-50/70',
    borderColor: 'border-blue-200/80',
    textColor: 'text-blue-900',
    accentBadge: 'bg-blue-100 text-blue-800 border-blue-300',
  },
  {
    id: 'decisions',
    label: 'Daily Decisions',
    shortDesc: 'Cut through analysis paralysis in under 5 minutes',
    iconName: 'Compass',
    bgTint: 'bg-purple-50/70',
    borderColor: 'border-purple-200/80',
    textColor: 'text-purple-900',
    accentBadge: 'bg-purple-100 text-purple-800 border-purple-300',
  },
];

export const GENERAL_FALLBACK_SOLUTION = {
  id: 'general-micro-reset',
  title: 'The 3-Minute Grounding Reset',
  category: 'productivity' as CategoryType,
  timeMinutes: 2 as const,
  problem: 'Feeling stuck, scattered, or not sure what to start right now',
  tagline: 'When in doubt, clear physical friction and choose one physical next step.',
  steps: [
    'Stand up, drink a cold glass of water, and roll your shoulders back 3 times.',
    'Take a clean piece of paper or sticky note and write ONLY 1 physical action that takes under 5 minutes.',
    'Put your phone screen-down in another room or out of arm reach.',
    'Start a 3-minute timer and touch only that 1 action until the timer rings.'
  ],
  proTip: 'Action precedes motivation. You never need to feel ready to begin; you only need to lower the threshold of the first motion.',
  tags: ['stuck', 'general', 'overwhelmed', 'scattered', 'reset', 'motivation', 'start'],
  difficulty: 'Effortless' as const
};

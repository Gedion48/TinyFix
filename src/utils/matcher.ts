import { GENERAL_FALLBACK_SOLUTION } from '../data/categories';
import { SOLUTIONS } from '../data/solutions';
import { CategoryType, FixSolution, TimeMinutes } from '../types';

// Common English stopwords to ignore so we focus on key problem nouns & verbs
const STOP_WORDS = new Set([
  'a', 'about', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'can', 'do',
  'does', 'for', 'from', 'have', 'how', 'i', 'in', 'is', 'it', 'my', 'me',
  'no', 'not', 'of', 'on', 'or', 'so', 'that', 'the', 'their', 'then',
  'there', 'this', 'to', 'too', 'want', 'what', 'when', 'where', 'which',
  'who', 'why', 'will', 'with', 'would', 'you', 'your'
]);

export interface MatchQuery {
  category?: CategoryType | 'all';
  timeMinutes?: TimeMinutes | 'all';
  query?: string;
}

export interface MatchResult {
  solutions: FixSolution[];
  isFallback: boolean;
  matchReason?: string;
  matchedKeywords: string[];
}

/**
 * Tokenizes and normalizes user input into significant keywords
 */
export function extractKeywords(text: string): string[] {
  if (!text) return [];
  const words = text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
  return Array.from(new Set(words));
}

/**
 * Rule-based recommendation algorithm:
 * 1. Filters candidates by category if selected
 * 2. Compares extracted keywords against tags, title, problem statement, and steps
 * 3. Applies time suitability weighting
 * 4. Ranks solutions by score
 * 5. Returns curated match or provides an actionable fallback fix
 */
export function findMatches(params: MatchQuery): MatchResult {
  const { category = 'all', timeMinutes = 'all', query = '' } = params;
  const keywords = extractKeywords(query);

  // 1. Initial pool based on category
  let candidatePool = SOLUTIONS;
  if (category && category !== 'all') {
    candidatePool = candidatePool.filter((sol) => sol.category === category);
  }

  // If no search query was entered, simply filter by category & time
  if (keywords.length === 0) {
    let filtered = candidatePool;
    if (timeMinutes && timeMinutes !== 'all') {
      const targetTime = Number(timeMinutes);
      // Prefer exact or <= target time
      filtered = filtered.filter((sol) => sol.timeMinutes <= targetTime);
      if (filtered.length === 0) {
        // Fallback to pool if none <= target time
        filtered = candidatePool;
      }
    }

    return {
      solutions: filtered.length > 0 ? filtered : candidatePool,
      isFallback: false,
      matchedKeywords: [],
      matchReason: category !== 'all' ? `Browsing solutions for ${category}` : 'Showing top curated solutions',
    };
  }

  // 2. Score candidates using rule weights
  interface ScoredCandidate {
    solution: FixSolution;
    score: number;
    hits: string[];
  }

  const scored: ScoredCandidate[] = candidatePool.map((sol) => {
    let score = 0;
    const hits: string[] = [];

    // Keyword matching
    for (const kw of keywords) {
      // High weight: Tag match (+20)
      const tagMatch = sol.tags.some((t) => t.includes(kw) || kw.includes(t));
      if (tagMatch) {
        score += 20;
        hits.push(kw);
      }

      // High weight: Title match (+15)
      if (sol.title.toLowerCase().includes(kw)) {
        score += 15;
        if (!hits.includes(kw)) hits.push(kw);
      }

      // Medium weight: Problem statement (+12)
      if (sol.problem.toLowerCase().includes(kw)) {
        score += 12;
        if (!hits.includes(kw)) hits.push(kw);
      }

      // Supporting weight: Steps content (+5)
      const stepHit = sol.steps.some((s) => s.toLowerCase().includes(kw));
      if (stepHit) {
        score += 5;
        if (!hits.includes(kw)) hits.push(kw);
      }
    }

    // Time suitability adjustments
    if (timeMinutes && timeMinutes !== 'all') {
      const targetTime = Number(timeMinutes);
      if (sol.timeMinutes === targetTime) {
        score += 15; // Exact time match bonus
      } else if (sol.timeMinutes < targetTime) {
        score += 5; // Fits comfortably inside available time
      } else {
        score -= 10; // Exceeds requested time window
      }
    }

    return {
      solution: sol,
      score,
      hits,
    };
  });

  // 3. Filter scored solutions
  const positiveMatches = scored
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  if (positiveMatches.length > 0) {
    const topHits = Array.from(new Set(positiveMatches.flatMap((m) => m.hits)));
    return {
      solutions: positiveMatches.map((m) => m.solution),
      isFallback: false,
      matchedKeywords: topHits,
      matchReason: `Matched ${positiveMatches.length} fix${positiveMatches.length > 1 ? 'es' : ''} based on "${topHits.join(', ')}"`,
    };
  }

  // 4. Fallback when no keywords matched
  // If the user selected a category, return the best quick fix from that category;
  // otherwise return the universal general fallback fix
  const categoryFallback = candidatePool.find((s) => (timeMinutes !== 'all' ? s.timeMinutes <= Number(timeMinutes) : true)) || candidatePool[0];

  const fallbackSol: FixSolution = categoryFallback || GENERAL_FALLBACK_SOLUTION;

  return {
    solutions: [fallbackSol],
    isFallback: true,
    matchedKeywords: [],
    matchReason: `No exact rule match found for "${query}". Showing a reliable, instant micro-fix to get you moving.`,
  };
}

/**
 * Returns a random solution avoiding the immediate previous solution ID
 */
export function getRandomSolution(lastId?: string): FixSolution {
  const pool = SOLUTIONS.filter((s) => s.id !== lastId);
  const selectedPool = pool.length > 0 ? pool : SOLUTIONS;
  const randomIndex = Math.floor(Math.random() * selectedPool.length);
  return selectedPool[randomIndex];
}

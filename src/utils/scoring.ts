// Scoring system for Mandarin HSK Flashcard Assessment

export type HSKLevel = 1 | 2 | 3 | 4 | 5;
export type AssessmentType = 'membaca' | 'mengartikan' | 'kalimat';

// Re-export from vocabulary data
export { 
  type Vocabulary, 
  vocabularyDatabase, 
  getVocabularyByLevel,
  getVocabularyCounts, 
  prepareVocabularyList,
  shuffleArray 
} from '@/data/hskVocabulary';

// Legacy type alias for backward compatibility
export type Level = HSKLevel;
export type Kosakata = import('@/data/hskVocabulary').Vocabulary;

export interface AssessmentResult {
  kosakataId: string;
  membaca: boolean | null;
  mengartikan: boolean | null;
  kalimat: boolean | null;
  baseScore: number;
  bonusScore: number;
  totalScore: number;
  timestamp: Date;
}

export interface SessionState {
  currentIndex: number;
  results: AssessmentResult[];
  totalScore: number;
  streak: number;
  maxStreak: number;
}

// Base points for reading Hanzi (Membaca Hanzi)
export const READING_POINTS: Record<HSKLevel, number> = {
  1: 2,
  2: 3,
  3: 4,
  4: 5,
  5: 6,
};

// Additional points for meaning (Mengartikan)
export const MEANING_POINTS: Record<HSKLevel, number> = {
  1: 1,
  2: 2,
  3: 2,
  4: 3,
  5: 3,
};

// Additional points for sentence (Menyebutkan dalam kalimat)
export const SENTENCE_POINTS: Record<HSKLevel, number> = {
  1: 2,
  2: 3,
  3: 4,
  4: 5,
  5: 6,
};

// Maximum streak bonus (30 soal = 30 poin tambahan maksimal)
export const MAX_STREAK_BONUS = 30;

/**
 * Calculate base score for a single assessment
 */
export function calculateBaseScore(
  level: HSKLevel,
  membaca: boolean,
  mengartikan: boolean,
  kalimat: boolean
): number {
  let score = 0;

  if (membaca) {
    score += READING_POINTS[level];
  }
  if (mengartikan) {
    score += MEANING_POINTS[level];
  }
  if (kalimat) {
    score += SENTENCE_POINTS[level];
  }

  return score;
}

/**
 * Calculate maximum possible score for a level
 */
export function calculateMaxScore(level: HSKLevel): number {
  return READING_POINTS[level] + MEANING_POINTS[level] + SENTENCE_POINTS[level];
}

/**
 * Update streak and calculate bonus
 */
export function updateStreak(
  currentStreak: number,
  isCorrect: boolean
): { newStreak: number; bonusPoints: number } {
  if (!isCorrect) {
    return { newStreak: 0, bonusPoints: 0 };
  }

  const newStreak = Math.min(currentStreak + 1, MAX_STREAK_BONUS);
  const bonusPoints = newStreak <= MAX_STREAK_BONUS ? 1 : 0;

  return { newStreak, bonusPoints };
}

/**
 * Check if membaca and mengartikan are both correct (for streak bonus)
 */
export function isMembacaMengartikanCorrect(
  membaca: boolean | null,
  mengartikan: boolean | null
): boolean {
  return membaca === true && mengartikan === true;
}

/**
 * Check if all parts of an assessment are correct
 */
export function isFullyCorrect(
  membaca: boolean | null,
  mengartikan: boolean | null,
  kalimat: boolean | null
): boolean {
  return membaca === true && mengartikan === true && kalimat === true;
}

/**
 * Format score for display
 */
export function formatScore(score: number): string {
  return score.toLocaleString('id-ID');
}

/**
 * Get HSK level display info
 */
export function getLevelInfo(level: HSKLevel): {
  label: string;
  description: string;
  maxPoints: number;
} {
  const descriptions: Record<HSKLevel, string> = {
    1: 'Dasar',
    2: 'Pemula',
    3: 'Menengah',
    4: 'Lanjutan',
    5: 'Mahir',
  };

  return {
    label: `HSK ${level}`,
    description: descriptions[level],
    maxPoints: calculateMaxScore(level),
  };
}

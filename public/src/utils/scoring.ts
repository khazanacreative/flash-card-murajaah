// Scoring system for Mufradat assessment

export type Level = 'A' | 'B' | 'C';
export type AssessmentType = 'membaca' | 'mengartikan' | 'kalimat';
// GameMode removed - always random now

export interface Mufradat {
  id: string;
  arabic: string; // Arabic text without harakat
  meaning: string; // Indonesian meaning
  level: Level;
}

export interface AssessmentResult {
  mufradatId: string;
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

// Base points for reading (Membaca tanpa harakat)
export const READING_POINTS: Record<Level, number> = {
  A: 2,
  B: 4,
  C: 6,
};

// Additional points for meaning (Mengartikan)
export const MEANING_POINTS: Record<Level, number> = {
  A: 1,
  B: 2,
  C: 3,
};

// Additional points for sentence (Menyebutkan dalam kalimat)
export const SENTENCE_POINTS: Record<Level, number> = {
  A: 2,
  B: 4,
  C: 6,
};

// Maximum streak bonus (30 soal = 30 poin tambahan maksimal)
export const MAX_STREAK_BONUS = 30;

/**
 * Calculate base score for a single assessment
 */
export function calculateBaseScore(
  level: Level,
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
export function calculateMaxScore(level: Level): number {
  return READING_POINTS[level] + MEANING_POINTS[level] + SENTENCE_POINTS[level];
}

/**
 * Update streak and calculate bonus
 * Returns new streak count and bonus points earned
 */
export function updateStreak(
  currentStreak: number,
  isCorrect: boolean
): { newStreak: number; bonusPoints: number } {
  if (!isCorrect) {
    return { newStreak: 0, bonusPoints: 0 };
  }

  const newStreak = Math.min(currentStreak + 1, MAX_STREAK_BONUS);
  // +1 bonus point per correct answer in streak
  const bonusPoints = newStreak <= MAX_STREAK_BONUS ? 1 : 0;

  return { newStreak, bonusPoints };
}

/**
 * Check if membaca and mengartikan are both correct (for streak bonus)
 * Note: kalimat is NOT included in streak calculation
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
 * Get level display info
 */
export function getLevelInfo(level: Level): {
  label: string;
  description: string;
  maxPoints: number;
} {
  const descriptions: Record<Level, string> = {
    A: 'Dasar',
    B: 'Menengah',
    C: 'Lanjutan',
  };

  return {
    label: `Level ${level}`,
    description: descriptions[level],
    maxPoints: calculateMaxScore(level),
  };
}

/**
 * Mufradat data from Al-Arabiyyah Bayna Yadaik Juz II Bab 1 & 2
 */
export const mufradatDatabase: Mufradat[] = [
  // ===== LEVEL A (30 mufradat) =====
  { id: 'a1', arabic: 'نعم', meaning: 'ya', level: 'A' },
  { id: 'a2', arabic: 'لا', meaning: 'tidak', level: 'A' },
  { id: 'a3', arabic: 'كيف', meaning: 'bagaimana', level: 'A' },
  { id: 'a4', arabic: 'ماذا', meaning: 'apa', level: 'A' },
  { id: 'a5', arabic: 'أين', meaning: 'di mana', level: 'A' },
  { id: 'a6', arabic: 'متى', meaning: 'kapan', level: 'A' },
  { id: 'a7', arabic: 'الآن', meaning: 'sekarang', level: 'A' },
  { id: 'a8', arabic: 'ثم', meaning: 'kemudian', level: 'A' },
  { id: 'a9', arabic: 'بعد', meaning: 'setelah', level: 'A' },
  { id: 'a10', arabic: 'قبل', meaning: 'sebelum', level: 'A' },
  { id: 'a11', arabic: 'في', meaning: 'di', level: 'A' },
  { id: 'a12', arabic: 'على', meaning: 'di atas', level: 'A' },
  { id: 'a13', arabic: 'إلى', meaning: 'ke', level: 'A' },
  { id: 'a14', arabic: 'من', meaning: 'dari', level: 'A' },
  { id: 'a15', arabic: 'هنا', meaning: 'di sini', level: 'A' },
  { id: 'a16', arabic: 'هناك', meaning: 'di sana', level: 'A' },
  { id: 'a17', arabic: 'ذهب', meaning: 'pergi', level: 'A' },
  { id: 'a18', arabic: 'أكل', meaning: 'makan', level: 'A' },
  { id: 'a19', arabic: 'شرب', meaning: 'minum', level: 'A' },
  { id: 'a20', arabic: 'كبير', meaning: 'besar', level: 'A' },
  { id: 'a21', arabic: 'قليل', meaning: 'sedikit', level: 'A' },
  { id: 'a22', arabic: 'كثير', meaning: 'banyak', level: 'A' },
  { id: 'a23', arabic: 'مثل', meaning: 'seperti', level: 'A' },
  { id: 'a24', arabic: 'قصة', meaning: 'cerita', level: 'A' },
  { id: 'a25', arabic: 'قال', meaning: 'berkata', level: 'A' },
  { id: 'a26', arabic: 'ثم', meaning: 'lalu', level: 'A' },
  { id: 'a27', arabic: 'به', meaning: 'dengannya', level: 'A' },
  { id: 'a28', arabic: 'له', meaning: 'baginya', level: 'A' },
  { id: 'a29', arabic: 'منه', meaning: 'darinya', level: 'A' },
  { id: 'a30', arabic: 'الذي', meaning: 'yang', level: 'A' },

  // ===== LEVEL B (30 mufradat) =====
  { id: 'b1', arabic: 'مريض', meaning: 'sakit', level: 'B' },
  { id: 'b2', arabic: 'جامعة', meaning: 'universitas', level: 'B' },
  { id: 'b3', arabic: 'حكمة', meaning: 'hikmah', level: 'B' },
  { id: 'b4', arabic: 'الناس', meaning: 'manusia', level: 'B' },
  { id: 'b5', arabic: 'نافع', meaning: 'bermanfaat', level: 'B' },
  { id: 'b6', arabic: 'طبيب', meaning: 'dokter', level: 'B' },
  { id: 'b7', arabic: 'دواء', meaning: 'obat', level: 'B' },
  { id: 'b8', arabic: 'بطن', meaning: 'perut', level: 'B' },
  { id: 'b9', arabic: 'شفي', meaning: 'sembuh', level: 'B' },
  { id: 'b10', arabic: 'ألم', meaning: 'rasa sakit', level: 'B' },
  { id: 'b11', arabic: 'شديد', meaning: 'parah', level: 'B' },
  { id: 'b12', arabic: 'أمر', meaning: 'memerintah', level: 'B' },
  { id: 'b13', arabic: 'يسقي', meaning: 'memberi minum', level: 'B' },
  { id: 'b14', arabic: 'سقى', meaning: 'telah memberi minum', level: 'B' },
  { id: 'b15', arabic: 'اشترى', meaning: 'membeli', level: 'B' },
  { id: 'b16', arabic: 'يشتري', meaning: 'membeli', level: 'B' },
  { id: 'b17', arabic: 'محلات', meaning: 'toko-toko', level: 'B' },
  { id: 'b18', arabic: 'بيع', meaning: 'penjualan', level: 'B' },
  { id: 'b19', arabic: 'سوق', meaning: 'pasar', level: 'B' },
  { id: 'b20', arabic: 'عسل', meaning: 'madu', level: 'B' },
  { id: 'b21', arabic: 'رسول', meaning: 'rasul', level: 'B' },
  { id: 'b22', arabic: 'صحابي', meaning: 'sahabat Nabi', level: 'B' },
  { id: 'b23', arabic: 'سبحان', meaning: 'Maha Suci', level: 'B' },
  { id: 'b24', arabic: 'مرات', meaning: 'beberapa kali', level: 'B' },
  { id: 'b25', arabic: 'تناول', meaning: 'mengonsumsi', level: 'B' },
  { id: 'b26', arabic: 'رياضة', meaning: 'olahraga', level: 'B' },
  { id: 'b27', arabic: 'كثيرا', meaning: 'banyak (secara kuantitas)', level: 'B' },
  { id: 'b28', arabic: 'قليل', meaning: 'sedikit (secara kuantitas)', level: 'B' },
  { id: 'b29', arabic: 'مع ذلك', meaning: 'meskipun begitu', level: 'B' },
  { id: 'b30', arabic: 'نتيجة', meaning: 'akibat', level: 'B' },

  // ===== LEVEL C (30 mufradat) =====
  { id: 'c1', arabic: 'شفاء', meaning: 'kesembuhan', level: 'C' },
  { id: 'c2', arabic: 'علاج', meaning: 'pengobatan', level: 'C' },
  { id: 'c3', arabic: 'العلاج بالعسل', meaning: 'terapi madu', level: 'C' },
  { id: 'c4', arabic: 'شرب العسل', meaning: 'minum madu', level: 'C' },
  { id: 'c5', arabic: 'اشتكى', meaning: 'mengeluh', level: 'C' },
  { id: 'c6', arabic: 'أشعر', meaning: 'aku merasa', level: 'C' },
  { id: 'c7', arabic: 'تجربة', meaning: 'pengalaman', level: 'C' },
  { id: 'c8', arabic: 'عالج', meaning: 'mengobati', level: 'C' },
  { id: 'c9', arabic: 'نبوي', meaning: 'kenabian', level: 'C' },
  { id: 'c10', arabic: 'محاولة', meaning: 'usaha', level: 'C' },
  { id: 'c11', arabic: 'تناول كثيرا', meaning: 'makan banyak', level: 'C' },
  { id: 'c12', arabic: 'اتباع', meaning: 'mengikuti', level: 'C' },
  { id: 'c13', arabic: 'شكر', meaning: 'ucapan terima kasih', level: 'C' },
  { id: 'c14', arabic: 'الحليب', meaning: 'susu', level: 'C' },
  { id: 'c15', arabic: 'عصير الفواكه', meaning: 'jus buah', level: 'C' },
  { id: 'c16', arabic: 'الحلوى', meaning: 'manisan', level: 'C' },
  { id: 'c17', arabic: 'صحة', meaning: 'kesehatan', level: 'C' },
  { id: 'c18', arabic: 'تكرار', meaning: 'pengulangan', level: 'C' },
  { id: 'c19', arabic: 'متابعة', meaning: 'pemantauan', level: 'C' },
  { id: 'c20', arabic: 'تغيير', meaning: 'perubahan', level: 'C' },
  { id: 'c21', arabic: 'أثر العلاج', meaning: 'efek pengobatan', level: 'C' },
  { id: 'c22', arabic: 'نتيجة التجربة', meaning: 'hasil pengalaman', level: 'C' },
  { id: 'c23', arabic: 'شفاء البطن', meaning: 'penyembuhan perut', level: 'C' },
  { id: 'c24', arabic: 'تكرار العلاج', meaning: 'pengulangan pengobatan', level: 'C' },
  { id: 'c25', arabic: 'حي', meaning: 'lingkungan', level: 'C' },
  { id: 'c26', arabic: 'دواء طبيعي', meaning: 'obat alami', level: 'C' },
  { id: 'c27', arabic: 'حمية', meaning: 'diet', level: 'C' },
  { id: 'c28', arabic: 'أثر', meaning: 'dampak', level: 'C' },
  { id: 'c29', arabic: 'تكرار العلاج', meaning: 'pengulangan pengobatan', level: 'C' },
  { id: 'c30', arabic: 'شفاء كامل', meaning: 'sembuh total', level: 'C' },
];

/**
 * Get mufradat filtered by level
 */
export function getMufradatByLevel(level: Level | 'all'): Mufradat[] {
  if (level === 'all') {
    return mufradatDatabase;
  }
  return mufradatDatabase.filter((m) => m.level === level);
}

/**
 * Get mufradat count per level
 */
export function getMufradatCounts(): Record<Level | 'all', number> {
  return {
    A: mufradatDatabase.filter((m) => m.level === 'A').length,
    B: mufradatDatabase.filter((m) => m.level === 'B').length,
    C: mufradatDatabase.filter((m) => m.level === 'C').length,
    all: mufradatDatabase.length,
  };
}

/**
 * Prepare mufradat list - always random
 * - Single level: 30 soal dari level tersebut (atau semua jika kurang dari 30)
 * - All levels: 10 soal dari masing-masing level A, B, C (total 30)
 */
export function prepareMufradatList(level: Level | 'all'): Mufradat[] {
  if (level === 'all') {
    // Get 10 random from each level (total 30)
    const levelA = shuffleArray(getMufradatByLevel('A')).slice(0, 10);
    const levelB = shuffleArray(getMufradatByLevel('B')).slice(0, 10);
    const levelC = shuffleArray(getMufradatByLevel('C')).slice(0, 10);
    // Combine and shuffle again
    return shuffleArray([...levelA, ...levelB, ...levelC]);
  } else {
    // Get 30 random from selected level (or all if less than 30)
    const levelList = shuffleArray(getMufradatByLevel(level));
    return levelList.slice(0, 30);
  }
}

/**
 * Shuffle array (Fisher-Yates)
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

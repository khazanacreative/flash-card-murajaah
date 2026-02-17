import { Vocabulary } from '@/data/hskVocabulary';
import { AssessmentResult } from '@/utils/scoring';

export type Kosakata = Vocabulary;

export interface Session {
  id: string;
  code: string;
  level: string;
  current_index: number;
  mufradat_order: string[]; // DB column name - keep as-is
  total_score: number;
  streak: number;
  max_streak: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface SessionResult {
  id: string;
  session_id: string;
  mufradat_id: string; // DB column name - keep as-is
  membaca: boolean | null;
  mengartikan: boolean | null;
  kalimat: boolean | null;
  base_score: number;
  bonus_score: number;
  total_score: number;
  created_at: string;
}

export type UserRole = 'guru' | 'murid';

export interface SessionContextData {
  session: Session | null;
  results: SessionResult[];
  kosakataList: Kosakata[];
  currentKosakata: Kosakata | null;
  role: UserRole;
  isLoading: boolean;
  error: string | null;
}

import { Mufradat, AssessmentResult } from '@/utils/scoring';

export interface Session {
  id: string;
  code: string;
  level: string;
  current_index: number;
  mufradat_order: string[];
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
  mufradat_id: string;
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
  mufradatList: Mufradat[];
  currentMufradat: Mufradat | null;
  role: UserRole;
  isLoading: boolean;
  error: string | null;
}

import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, SessionResult, UserRole } from '@/types/session';
import { Vocabulary as Kosakata, vocabularyDatabase, HSKLevel as Level, prepareVocabularyList, calculateBaseScore, updateStreak, isMembacaMengartikanCorrect } from '@/utils/scoring';
import { generateSessionCode } from '@/utils/sessionCode';

interface UseSessionReturn {
  session: Session | null;
  results: SessionResult[];
  kosakataList: Kosakata[];
  currentKosakata: Kosakata | null;
  role: UserRole | null;
  isLoading: boolean;
  error: string | null;
  
  createSession: (level: Level | 'all') => Promise<string | null>;
  nextKosakata: () => Promise<void>;
  previousKosakata: () => Promise<void>;
  submitAssessment: (membaca: boolean, mengartikan: boolean, kalimat: boolean) => Promise<void>;
  endSession: () => Promise<void>;
  joinSession: (code: string) => Promise<boolean>;
  leaveSession: () => void;
  
  currentIndex: number;
  totalKosakata: number;
  totalScore: number;
  streak: number;
  maxStreak: number;
  hasSubmitted: boolean;
  isComplete: boolean;
}

const getSessionsTable = () => (supabase as any).from('sessions');
const getResultsTable = () => (supabase as any).from('session_results');

export function useSession(): UseSessionReturn {
  const [session, setSession] = useState<Session | null>(null);
  const [results, setResults] = useState<SessionResult[]>([]);
  const [kosakataList, setKosakataList] = useState<Kosakata[]>([]);
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Subscribe to realtime updates
  useEffect(() => {
    if (!session?.id) return;

    const sessionChannel = supabase
      .channel(`session-${session.id}`)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'sessions', filter: `id=eq.${session.id}` },
        (payload) => {
          if (payload.eventType === 'UPDATE') {
            setSession(payload.new as Session);
          } else if (payload.eventType === 'DELETE') {
            setSession(null);
            setRole(null);
          }
        }
      )
      .subscribe();

    const resultsChannel = supabase
      .channel(`results-${session.id}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'session_results', filter: `session_id=eq.${session.id}` },
        (payload) => {
          setResults(prev => [...prev, payload.new as SessionResult]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(sessionChannel);
      supabase.removeChannel(resultsChannel);
    };
  }, [session?.id]);

  // Rebuild kosakata list when session changes
  useEffect(() => {
    if (session?.mufradat_order && session.mufradat_order.length > 0) {
      const orderedList = session.mufradat_order
        .map(id => vocabularyDatabase.find(m => m.id === id))
        .filter((m): m is Kosakata => m !== undefined);
      setKosakataList(orderedList);
    }
  }, [session?.mufradat_order]);

  const currentKosakata = kosakataList[session?.current_index ?? 0] || null;
  const currentIndex = session?.current_index ?? 0;
  const totalKosakata = kosakataList.length;
  const totalScore = session?.total_score ?? 0;
  const streak = session?.streak ?? 0;
  const maxStreak = session?.max_streak ?? 0;
  
  const hasSubmitted = results.some(r => r.mufradat_id === currentKosakata?.id);
  const isComplete = results.length === kosakataList.length && kosakataList.length > 0;

  const createSession = useCallback(async (level: Level | 'all'): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const code = generateSessionCode();
      const list = prepareVocabularyList(level);
      const kosakataOrder = list.map(m => m.id);

      const { data, error: insertError } = await getSessionsTable()
        .insert({
          code,
          level,
          mufradat_order: kosakataOrder,
          current_index: 0,
          total_score: 0,
          streak: 0,
          max_streak: 0,
          is_active: true,
        })
        .select()
        .single();

      if (insertError) throw insertError;

      setSession(data as Session);
      setKosakataList(list);
      setRole('guru');
      setResults([]);
      
      return code;
    } catch (err) {
      console.error('Error creating session:', err);
      setError('Gagal membuat sesi. Silakan coba lagi.');
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const joinSession = useCallback(async (code: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: sessionData, error: sessionError } = await getSessionsTable()
        .select('*')
        .eq('code', code.toUpperCase())
        .eq('is_active', true)
        .maybeSingle();

      if (sessionError) throw sessionError;
      if (!sessionData) {
        setError('Kode sesi tidak ditemukan atau sudah berakhir.');
        return false;
      }

      const { data: resultsData, error: resultsError } = await getResultsTable()
        .select('*')
        .eq('session_id', sessionData.id);

      if (resultsError) throw resultsError;

      setSession(sessionData as Session);
      setResults((resultsData as SessionResult[]) || []);
      setRole('murid');
      
      return true;
    } catch (err) {
      console.error('Error joining session:', err);
      setError('Gagal bergabung ke sesi. Silakan coba lagi.');
      return false;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const nextKosakata = useCallback(async () => {
    if (!session || role !== 'guru' || currentIndex >= totalKosakata - 1) return;
    const newIndex = currentIndex + 1;
    try {
      const { error: updateError } = await getSessionsTable()
        .update({ current_index: newIndex, updated_at: new Date().toISOString() })
        .eq('id', session.id);
      if (updateError) throw updateError;
      setSession(prev => prev ? { ...prev, current_index: newIndex } : null);
    } catch (err) {
      console.error('Error moving to next kosakata:', err);
    }
  }, [session, role, currentIndex, totalKosakata]);

  const previousKosakata = useCallback(async () => {
    if (!session || role !== 'guru' || currentIndex <= 0) return;
    const newIndex = currentIndex - 1;
    try {
      const { error: updateError } = await getSessionsTable()
        .update({ current_index: newIndex, updated_at: new Date().toISOString() })
        .eq('id', session.id);
      if (updateError) throw updateError;
      setSession(prev => prev ? { ...prev, current_index: newIndex } : null);
    } catch (err) {
      console.error('Error moving to previous kosakata:', err);
    }
  }, [session, role, currentIndex]);

  const submitAssessment = useCallback(async (
    membaca: boolean,
    mengartikan: boolean,
    kalimat: boolean
  ) => {
    if (!session || !currentKosakata || role !== 'guru' || hasSubmitted) return;

    try {
      const baseScore = calculateBaseScore(currentKosakata.level, membaca, mengartikan, kalimat);
      const membacaMengartikanCorrect = isMembacaMengartikanCorrect(membaca, mengartikan);
      const { newStreak, bonusPoints } = updateStreak(streak, membacaMengartikanCorrect);

      const { data: insertedResult, error: insertError } = await getResultsTable()
        .insert({
          session_id: session.id,
          mufradat_id: currentKosakata.id,
          membaca,
          mengartikan,
          kalimat,
          base_score: baseScore,
          bonus_score: bonusPoints,
          total_score: baseScore + bonusPoints,
        })
        .select()
        .single();

      if (insertError) throw insertError;
      if (insertedResult) {
        setResults(prev => [...prev, insertedResult as SessionResult]);
      }

      const newTotalScore = totalScore + baseScore + bonusPoints;
      const newMaxStreak = Math.max(maxStreak, newStreak);
      
      const { error: updateError } = await getSessionsTable()
        .update({
          total_score: newTotalScore,
          streak: newStreak,
          max_streak: newMaxStreak,
          updated_at: new Date().toISOString(),
        })
        .eq('id', session.id);

      if (updateError) throw updateError;

      setSession(prev => prev ? {
        ...prev,
        total_score: newTotalScore,
        streak: newStreak,
        max_streak: newMaxStreak,
      } : null);
    } catch (err) {
      console.error('Error submitting assessment:', err);
    }
  }, [session, currentKosakata, role, hasSubmitted, streak, totalScore, maxStreak]);

  const endSession = useCallback(async () => {
    if (!session || role !== 'guru') return;
    try {
      await getSessionsTable()
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .eq('id', session.id);
      setSession(null);
      setRole(null);
      setResults([]);
      setKosakataList([]);
    } catch (err) {
      console.error('Error ending session:', err);
    }
  }, [session, role]);

  const leaveSession = useCallback(() => {
    setSession(null);
    setRole(null);
    setResults([]);
    setKosakataList([]);
    setError(null);
  }, []);

  return {
    session,
    results,
    kosakataList,
    currentKosakata,
    role,
    isLoading,
    error,
    createSession,
    nextKosakata,
    previousKosakata,
    submitAssessment,
    endSession,
    joinSession,
    leaveSession,
    currentIndex,
    totalKosakata,
    totalScore,
    streak,
    maxStreak,
    hasSubmitted,
    isComplete,
  };
}

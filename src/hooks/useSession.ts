import { useState, useCallback, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, SessionResult, UserRole } from '@/types/session';
import { Vocabulary as Mufradat, vocabularyDatabase as mufradatDatabase, HSKLevel as Level, prepareVocabularyList as prepareMufradatList, calculateBaseScore, updateStreak, isMembacaMengartikanCorrect } from '@/utils/scoring';
import { generateSessionCode } from '@/utils/sessionCode';

interface UseSessionReturn {
  // Session state
  session: Session | null;
  results: SessionResult[];
  mufradatList: Mufradat[];
  currentMufradat: Mufradat | null;
  role: UserRole | null;
  isLoading: boolean;
  error: string | null;
  
  // Actions for Guru
  createSession: (level: Level | 'all') => Promise<string | null>;
  nextMufradat: () => Promise<void>;
  previousMufradat: () => Promise<void>;
  submitAssessment: (membaca: boolean, mengartikan: boolean, kalimat: boolean) => Promise<void>;
  endSession: () => Promise<void>;
  
  // Actions for Murid
  joinSession: (code: string) => Promise<boolean>;
  
  // Common actions
  leaveSession: () => void;
  
  // Computed values
  currentIndex: number;
  totalMufradat: number;
  totalScore: number;
  streak: number;
  maxStreak: number;
  hasSubmitted: boolean;
  isComplete: boolean;
}

// Helper to get a typed client for our tables
const getSessionsTable = () => (supabase as any).from('sessions');
const getResultsTable = () => (supabase as any).from('session_results');

export function useSession(): UseSessionReturn {
  const [session, setSession] = useState<Session | null>(null);
  const [results, setResults] = useState<SessionResult[]>([]);
  const [mufradatList, setMufradatList] = useState<Mufradat[]>([]);
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Subscribe to realtime updates
  useEffect(() => {
    if (!session?.id) return;

    // Subscribe to session changes
    const sessionChannel = supabase
      .channel(`session-${session.id}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'sessions',
          filter: `id=eq.${session.id}`,
        },
        (payload) => {
          if (payload.eventType === 'UPDATE') {
            const updatedSession = payload.new as Session;
            setSession(updatedSession);
          } else if (payload.eventType === 'DELETE') {
            // Session ended
            setSession(null);
            setRole(null);
          }
        }
      )
      .subscribe();

    // Subscribe to results changes
    const resultsChannel = supabase
      .channel(`results-${session.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'session_results',
          filter: `session_id=eq.${session.id}`,
        },
        (payload) => {
          const newResult = payload.new as SessionResult;
          setResults(prev => [...prev, newResult]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(sessionChannel);
      supabase.removeChannel(resultsChannel);
    };
  }, [session?.id]);

  // Rebuild mufradat list when session changes
  useEffect(() => {
    if (session?.mufradat_order && session.mufradat_order.length > 0) {
      const orderedList = session.mufradat_order
        .map(id => mufradatDatabase.find(m => m.id === id))
        .filter((m): m is Mufradat => m !== undefined);
      setMufradatList(orderedList);
    }
  }, [session?.mufradat_order]);

  const currentMufradat = mufradatList[session?.current_index ?? 0] || null;
  const currentIndex = session?.current_index ?? 0;
  const totalMufradat = mufradatList.length;
  const totalScore = session?.total_score ?? 0;
  const streak = session?.streak ?? 0;
  const maxStreak = session?.max_streak ?? 0;
  
  const hasSubmitted = results.some(r => r.mufradat_id === currentMufradat?.id);
  const isComplete = results.length === mufradatList.length && mufradatList.length > 0;

  // Create a new session (Guru only)
  const createSession = useCallback(async (level: Level | 'all'): Promise<string | null> => {
    setIsLoading(true);
    setError(null);

    try {
      const code = generateSessionCode();
      const list = prepareMufradatList(level);
      const mufradatOrder = list.map(m => m.id);

      const { data, error: insertError } = await getSessionsTable()
        .insert({
          code,
          level,
          mufradat_order: mufradatOrder,
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
      setMufradatList(list);
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

  // Join an existing session (Murid only)
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

      // Fetch existing results
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

  // Navigate to next mufradat (Guru only)
  const nextMufradat = useCallback(async () => {
    if (!session || role !== 'guru' || currentIndex >= totalMufradat - 1) return;

    const newIndex = currentIndex + 1;
    
    try {
      const { error: updateError } = await getSessionsTable()
        .update({ 
          current_index: newIndex,
          updated_at: new Date().toISOString()
        })
        .eq('id', session.id);

      if (updateError) throw updateError;

      // Update local state immediately
      setSession(prev => prev ? { ...prev, current_index: newIndex } : null);
    } catch (err) {
      console.error('Error moving to next mufradat:', err);
    }
  }, [session, role, currentIndex, totalMufradat]);

  // Navigate to previous mufradat (Guru only)
  const previousMufradat = useCallback(async () => {
    if (!session || role !== 'guru' || currentIndex <= 0) return;

    const newIndex = currentIndex - 1;

    try {
      const { error: updateError } = await getSessionsTable()
        .update({ 
          current_index: newIndex,
          updated_at: new Date().toISOString()
        })
        .eq('id', session.id);

      if (updateError) throw updateError;

      // Update local state immediately
      setSession(prev => prev ? { ...prev, current_index: newIndex } : null);
    } catch (err) {
      console.error('Error moving to previous mufradat:', err);
    }
  }, [session, role, currentIndex]);

  // Submit assessment (Guru only)
  const submitAssessment = useCallback(async (
    membaca: boolean,
    mengartikan: boolean,
    kalimat: boolean
  ) => {
    if (!session || !currentMufradat || role !== 'guru' || hasSubmitted) return;

    try {
      const baseScore = calculateBaseScore(
        currentMufradat.level,
        membaca,
        mengartikan,
        kalimat
      );

      const membacaMengartikanCorrect = isMembacaMengartikanCorrect(membaca, mengartikan);
      const { newStreak, bonusPoints } = updateStreak(streak, membacaMengartikanCorrect);

      // Insert result
      const { data: insertedResult, error: insertError } = await getResultsTable()
        .insert({
          session_id: session.id,
          mufradat_id: currentMufradat.id,
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

      // Update local results state immediately
      if (insertedResult) {
        setResults(prev => [...prev, insertedResult as SessionResult]);
      }

      // Update session scores
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

      // Update local session state immediately
      setSession(prev => prev ? {
        ...prev,
        total_score: newTotalScore,
        streak: newStreak,
        max_streak: newMaxStreak,
      } : null);
    } catch (err) {
      console.error('Error submitting assessment:', err);
    }
  }, [session, currentMufradat, role, hasSubmitted, streak, totalScore, maxStreak]);

  // End session (Guru only)
  const endSession = useCallback(async () => {
    if (!session || role !== 'guru') return;

    try {
      await getSessionsTable()
        .update({ is_active: false, updated_at: new Date().toISOString() })
        .eq('id', session.id);
      
      setSession(null);
      setRole(null);
      setResults([]);
      setMufradatList([]);
    } catch (err) {
      console.error('Error ending session:', err);
    }
  }, [session, role]);

  // Leave session (both roles)
  const leaveSession = useCallback(() => {
    setSession(null);
    setRole(null);
    setResults([]);
    setMufradatList([]);
    setError(null);
  }, []);

  return {
    session,
    results,
    mufradatList,
    currentMufradat,
    role,
    isLoading,
    error,
    createSession,
    nextMufradat,
    previousMufradat,
    submitAssessment,
    endSession,
    joinSession,
    leaveSession,
    currentIndex,
    totalMufradat,
    totalScore,
    streak,
    maxStreak,
    hasSubmitted,
    isComplete,
  };
}

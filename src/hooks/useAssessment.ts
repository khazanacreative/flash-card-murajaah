import { useState, useCallback, useEffect } from 'react';
import {
  Vocabulary as Kosakata,
  AssessmentResult,
  SessionState,
  HSKLevel as Level,
  calculateBaseScore,
  updateStreak,
  isMembacaMengartikanCorrect,
  prepareVocabularyList,
} from '@/utils/scoring';

const STORAGE_KEY = 'kosakata-assessment-session';

interface GameSettings {
  level: Level | 'all';
}

interface UseAssessmentReturn {
  // Game state
  isGameStarted: boolean;
  gameSettings: GameSettings | null;
  
  // Current state
  kosakataList: Kosakata[];
  currentKosakata: Kosakata | null;
  currentIndex: number;
  totalKosakata: number;
  
  // Scoring
  totalScore: number;
  streak: number;
  maxStreak: number;
  
  // Current assessment
  currentMembaca: boolean | null;
  currentMengartikan: boolean | null;
  currentKalimat: boolean | null;
  
  // Results
  results: AssessmentResult[];
  
  // Actions
  startGame: (level: Level | 'all') => void;
  setMembaca: (value: boolean) => void;
  setMengartikan: (value: boolean) => void;
  setKalimat: (value: boolean) => void;
  submitAssessment: () => void;
  nextKosakata: () => void;
  previousKosakata: () => void;
  goToKosakata: (index: number) => void;
  resetSession: () => void;
  
  // Flags
  isComplete: boolean;
  canSubmit: boolean;
  hasSubmitted: boolean;
}

export function useAssessment(): UseAssessmentReturn {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameSettings, setGameSettings] = useState<GameSettings | null>(null);
  const [kosakataList, setKosakataList] = useState<Kosakata[]>([]);
  const [session, setSession] = useState<SessionState>({
    currentIndex: 0,
    results: [],
    totalScore: 0,
    streak: 0,
    maxStreak: 0,
  });
  
  const [currentMembaca, setCurrentMembaca] = useState<boolean | null>(null);
  const [currentMengartikan, setCurrentMengartikan] = useState<boolean | null>(null);
  const [currentKalimat, setCurrentKalimat] = useState<boolean | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Load saved session
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.gameSettings && parsed.kosakataList?.length > 0) {
          setGameSettings(parsed.gameSettings);
          setKosakataList(parsed.kosakataList);
          setSession(parsed.session || {
            currentIndex: 0,
            results: [],
            totalScore: 0,
            streak: 0,
            maxStreak: 0,
          });
          setIsGameStarted(true);
        }
      } catch {
        // Invalid saved data, start fresh
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isGameStarted && kosakataList.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        gameSettings,
        kosakataList,
        session,
      }));
    }
  }, [isGameStarted, gameSettings, kosakataList, session]);

  // Check if current kosakata has been submitted
  useEffect(() => {
    const existingResult = session.results.find(
      r => r.kosakataId === kosakataList[session.currentIndex]?.id
    );
    if (existingResult) {
      setCurrentMembaca(existingResult.membaca);
      setCurrentMengartikan(existingResult.mengartikan);
      setCurrentKalimat(existingResult.kalimat);
      setHasSubmitted(true);
    } else {
      setCurrentMembaca(null);
      setCurrentMengartikan(null);
      setCurrentKalimat(null);
      setHasSubmitted(false);
    }
  }, [session.currentIndex, session.results, kosakataList]);

  const currentKosakata = kosakataList[session.currentIndex] || null;
  const isComplete = session.results.length === kosakataList.length && kosakataList.length > 0;
  const canSubmit = currentMembaca !== null && currentMengartikan !== null && currentKalimat !== null;

  const startGame = useCallback((level: Level | 'all') => {
    const list = prepareVocabularyList(level);
    setGameSettings({ level });
    setKosakataList(list);
    setSession({
      currentIndex: 0,
      results: [],
      totalScore: 0,
      streak: 0,
      maxStreak: 0,
    });
    setCurrentMembaca(null);
    setCurrentMengartikan(null);
    setCurrentKalimat(null);
    setHasSubmitted(false);
    setIsGameStarted(true);
  }, []);

  const setMembaca = useCallback((value: boolean) => {
    if (!hasSubmitted) setCurrentMembaca(value);
  }, [hasSubmitted]);

  const setMengartikan = useCallback((value: boolean) => {
    if (!hasSubmitted) setCurrentMengartikan(value);
  }, [hasSubmitted]);

  const setKalimat = useCallback((value: boolean) => {
    if (!hasSubmitted) setCurrentKalimat(value);
  }, [hasSubmitted]);

  const submitAssessment = useCallback(() => {
    if (!currentKosakata || !canSubmit || hasSubmitted) return;

    const baseScore = calculateBaseScore(
      currentKosakata.level,
      currentMembaca!,
      currentMengartikan!,
      currentKalimat!
    );

    const membacaMengartikanCorrect = isMembacaMengartikanCorrect(currentMembaca, currentMengartikan);
    const { newStreak, bonusPoints } = updateStreak(session.streak, membacaMengartikanCorrect);

    const result: AssessmentResult = {
      kosakataId: currentKosakata.id,
      membaca: currentMembaca,
      mengartikan: currentMengartikan,
      kalimat: currentKalimat,
      baseScore,
      bonusScore: bonusPoints,
      totalScore: baseScore + bonusPoints,
      timestamp: new Date(),
    };

    setSession(prev => ({
      ...prev,
      results: [...prev.results, result],
      totalScore: prev.totalScore + result.totalScore,
      streak: newStreak,
      maxStreak: Math.max(prev.maxStreak, newStreak),
    }));

    setHasSubmitted(true);
  }, [currentKosakata, canSubmit, hasSubmitted, currentMembaca, currentMengartikan, currentKalimat, session.streak]);

  const nextKosakata = useCallback(() => {
    if (session.currentIndex < kosakataList.length - 1) {
      setSession(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
      }));
    }
  }, [session.currentIndex, kosakataList.length]);

  const previousKosakata = useCallback(() => {
    if (session.currentIndex > 0) {
      setSession(prev => ({
        ...prev,
        currentIndex: prev.currentIndex - 1,
      }));
    }
  }, [session.currentIndex]);

  const goToKosakata = useCallback((index: number) => {
    if (index >= 0 && index < kosakataList.length) {
      setSession(prev => ({
        ...prev,
        currentIndex: index,
      }));
    }
  }, [kosakataList.length]);

  const resetSession = useCallback(() => {
    setIsGameStarted(false);
    setGameSettings(null);
    setKosakataList([]);
    setSession({
      currentIndex: 0,
      results: [],
      totalScore: 0,
      streak: 0,
      maxStreak: 0,
    });
    setCurrentMembaca(null);
    setCurrentMengartikan(null);
    setCurrentKalimat(null);
    setHasSubmitted(false);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    isGameStarted,
    gameSettings,
    kosakataList,
    currentKosakata,
    currentIndex: session.currentIndex,
    totalKosakata: kosakataList.length,
    totalScore: session.totalScore,
    streak: session.streak,
    maxStreak: session.maxStreak,
    currentMembaca,
    currentMengartikan,
    currentKalimat,
    results: session.results,
    startGame,
    setMembaca,
    setMengartikan,
    setKalimat,
    submitAssessment,
    nextKosakata,
    previousKosakata,
    goToKosakata,
    resetSession,
    isComplete,
    canSubmit,
    hasSubmitted,
  };
}

import { useState, useCallback, useEffect } from 'react';
import {
  Mufradat,
  AssessmentResult,
  SessionState,
  Level,
  calculateBaseScore,
  updateStreak,
  isMembacaMengartikanCorrect,
  prepareMufradatList,
} from '@/utils/scoring';

const STORAGE_KEY = 'mufradat-assessment-session';

interface GameSettings {
  level: Level | 'all';
}

interface UseAssessmentReturn {
  // Game state
  isGameStarted: boolean;
  gameSettings: GameSettings | null;
  
  // Current state
  mufradatList: Mufradat[];
  currentMufradat: Mufradat | null;
  currentIndex: number;
  totalMufradat: number;
  
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
  nextMufradat: () => void;
  previousMufradat: () => void;
  goToMufradat: (index: number) => void;
  resetSession: () => void;
  
  // Flags
  isComplete: boolean;
  canSubmit: boolean;
  hasSubmitted: boolean;
}

export function useAssessment(): UseAssessmentReturn {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [gameSettings, setGameSettings] = useState<GameSettings | null>(null);
  const [mufradatList, setMufradatList] = useState<Mufradat[]>([]);
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
        if (parsed.gameSettings && parsed.mufradatList?.length > 0) {
          setGameSettings(parsed.gameSettings);
          setMufradatList(parsed.mufradatList);
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
    if (isGameStarted && mufradatList.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        gameSettings,
        mufradatList,
        session,
      }));
    }
  }, [isGameStarted, gameSettings, mufradatList, session]);

  // Check if current mufradat has been submitted
  useEffect(() => {
    const existingResult = session.results.find(
      r => r.mufradatId === mufradatList[session.currentIndex]?.id
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
  }, [session.currentIndex, session.results, mufradatList]);

  const currentMufradat = mufradatList[session.currentIndex] || null;
  const isComplete = session.results.length === mufradatList.length && mufradatList.length > 0;
  const canSubmit = currentMembaca !== null && currentMengartikan !== null && currentKalimat !== null;

  const startGame = useCallback((level: Level | 'all') => {
    const list = prepareMufradatList(level);
    setGameSettings({ level });
    setMufradatList(list);
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
    if (!currentMufradat || !canSubmit || hasSubmitted) return;

    const baseScore = calculateBaseScore(
      currentMufradat.level,
      currentMembaca!,
      currentMengartikan!,
      currentKalimat!
    );

    // Streak bonus only applies to membaca and mengartikan (NOT kalimat)
    const membacaMengartikanCorrect = isMembacaMengartikanCorrect(currentMembaca, currentMengartikan);
    const { newStreak, bonusPoints } = updateStreak(session.streak, membacaMengartikanCorrect);

    const result: AssessmentResult = {
      mufradatId: currentMufradat.id,
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
  }, [currentMufradat, canSubmit, hasSubmitted, currentMembaca, currentMengartikan, currentKalimat, session.streak]);

  const nextMufradat = useCallback(() => {
    if (session.currentIndex < mufradatList.length - 1) {
      setSession(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
      }));
    }
  }, [session.currentIndex, mufradatList.length]);

  const previousMufradat = useCallback(() => {
    if (session.currentIndex > 0) {
      setSession(prev => ({
        ...prev,
        currentIndex: prev.currentIndex - 1,
      }));
    }
  }, [session.currentIndex]);

  const goToMufradat = useCallback((index: number) => {
    if (index >= 0 && index < mufradatList.length) {
      setSession(prev => ({
        ...prev,
        currentIndex: index,
      }));
    }
  }, [mufradatList.length]);

  const resetSession = useCallback(() => {
    setIsGameStarted(false);
    setGameSettings(null);
    setMufradatList([]);
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
    mufradatList,
    currentMufradat,
    currentIndex: session.currentIndex,
    totalMufradat: mufradatList.length,
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
    nextMufradat,
    previousMufradat,
    goToMufradat,
    resetSession,
    isComplete,
    canSubmit,
    hasSubmitted,
  };
}

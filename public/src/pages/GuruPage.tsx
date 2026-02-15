import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { MufradatCard } from '@/components/MufradatCard';
import { ScoreBoard } from '@/components/ScoreBoard';
import { ControlPanel } from '@/components/ControlPanel';
import { FlashcardNav } from '@/components/FlashcardNav';
import { CompletionView } from '@/components/CompletionView';
import { SessionCodeDisplay } from '@/components/SessionCodeDisplay';
import { GuruSetup } from '@/components/GuruSetup';
import { HistoryView } from '@/components/HistoryView';
import { ResetDialog } from '@/components/ResetDialog';
import { useSession } from '@/hooks/useSession';
import { Button } from '@/components/ui/button';
import { ArrowLeft, History, Settings, LogOut } from 'lucide-react';
import { Level } from '@/utils/scoring';
import { AssessmentResult } from '@/utils/scoring';

const GuruPage = () => {
  const navigate = useNavigate();
  const {
    session,
    results,
    mufradatList,
    currentMufradat,
    isLoading,
    error,
    createSession,
    nextMufradat,
    previousMufradat,
    submitAssessment,
    endSession,
    leaveSession,
    currentIndex,
    totalMufradat,
    totalScore,
    streak,
    maxStreak,
    hasSubmitted,
    isComplete,
  } = useSession();

  const [currentMembaca, setCurrentMembaca] = useState<boolean | null>(null);
  const [currentMengartikan, setCurrentMengartikan] = useState<boolean | null>(null);
  const [currentKalimat, setCurrentKalimat] = useState<boolean | null>(null);
  const [flashAnimation, setFlashAnimation] = useState<'correct' | 'wrong' | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showEndDialog, setShowEndDialog] = useState(false);

  // Reset assessment when mufradat changes
  useEffect(() => {
    const existingResult = results.find(r => r.mufradat_id === currentMufradat?.id);
    if (existingResult) {
      setCurrentMembaca(existingResult.membaca);
      setCurrentMengartikan(existingResult.mengartikan);
      setCurrentKalimat(existingResult.kalimat);
    } else {
      setCurrentMembaca(null);
      setCurrentMengartikan(null);
      setCurrentKalimat(null);
    }
  }, [currentMufradat?.id, results]);

  const handleStartSession = useCallback(async (level: Level | 'all') => {
    await createSession(level);
  }, [createSession]);

  const handleSubmit = useCallback(async () => {
    if (currentMembaca === null || currentMengartikan === null || currentKalimat === null) return;
    
    const allCorrect = currentMembaca && currentMengartikan && currentKalimat;
    setFlashAnimation(allCorrect ? 'correct' : 'wrong');
    
    await submitAssessment(currentMembaca, currentMengartikan, currentKalimat);
    
    setTimeout(() => {
      setFlashAnimation(null);
    }, 500);
  }, [currentMembaca, currentMengartikan, currentKalimat, submitAssessment]);

  // Auto-advance after submit
  useEffect(() => {
    if (hasSubmitted && !isComplete) {
      const timer = setTimeout(() => {
        nextMufradat();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasSubmitted, isComplete, nextMufradat]);

  const handleEndSession = useCallback(() => {
    setShowEndDialog(true);
  }, []);

  const confirmEndSession = useCallback(async () => {
    await endSession();
    setShowEndDialog(false);
    navigate('/');
  }, [endSession, navigate]);

  const handleBack = useCallback(() => {
    if (session) {
      setShowEndDialog(true);
    } else {
      navigate('/');
    }
  }, [session, navigate]);

  const canSubmit = currentMembaca !== null && currentMengartikan !== null && currentKalimat !== null;
  const perfectCount = results.filter(r => r.membaca && r.mengartikan && r.kalimat).length;

  // Convert results to AssessmentResult format for HistoryView
  const assessmentResults: AssessmentResult[] = results.map(r => ({
    mufradatId: r.mufradat_id,
    membaca: r.membaca,
    mengartikan: r.mengartikan,
    kalimat: r.kalimat,
    baseScore: r.base_score,
    bonusScore: r.bonus_score,
    totalScore: r.total_score,
    timestamp: new Date(r.created_at),
  }));

  // Setup phase
  if (!session) {
    return (
      <div className="min-h-screen bg-background pattern-geometric">
        <Header />
        <main className="container mx-auto max-w-lg p-4 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali
          </Button>
          <GuruSetup onStart={handleStartSession} isLoading={isLoading} error={error} />
        </main>
      </div>
    );
  }

  // History view
  if (showHistory) {
    return (
      <div className="min-h-screen bg-background pattern-geometric">
        <Header />
        <main className="container mx-auto max-w-lg p-4 py-8">
          <Button
            variant="ghost"
            onClick={() => setShowHistory(false)}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Penilaian
          </Button>
          <HistoryView
            results={assessmentResults}
            mufradatList={mufradatList}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pattern-geometric">
      <Header />
      
      <main className="container mx-auto max-w-lg p-4 py-4">
        {/* Session info bar */}
        <div className="mb-4 space-y-3">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={handleBack}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Keluar
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setShowHistory(true)}>
                <History className="mr-2 h-4 w-4" />
                Riwayat
              </Button>
            </div>
          </div>
          
          <SessionCodeDisplay code={session.code} />
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Settings className="h-3 w-3" />
            <span>
              {session.level === 'all' ? 'Semua Level' : `Level ${session.level}`}
            </span>
            <span>•</span>
            <span>Mode Acak</span>
          </div>
          
          <ScoreBoard
            totalScore={totalScore}
            streak={streak}
            maxStreak={maxStreak}
            completedCount={results.length}
            totalCount={totalMufradat}
            compact
          />
        </div>

        {isComplete ? (
          <CompletionView
            totalScore={totalScore}
            maxStreak={maxStreak}
            totalQuestions={totalMufradat}
            perfectCount={perfectCount}
            onReset={handleEndSession}
          />
        ) : currentMufradat ? (
          <div className="space-y-4">
            <FlashcardNav
              current={currentIndex + 1}
              total={totalMufradat}
              onPrev={previousMufradat}
              onNext={nextMufradat}
              canPrev={currentIndex > 0}
              canNext={currentIndex < totalMufradat - 1}
            />

            <MufradatCard
              mufradat={currentMufradat}
              flashAnimation={flashAnimation}
            />

            <ControlPanel
              membaca={currentMembaca}
              mengartikan={currentMengartikan}
              kalimat={currentKalimat}
              onMembacaChange={setCurrentMembaca}
              onMengartikanChange={setCurrentMengartikan}
              onKalimatChange={setCurrentKalimat}
              onSubmit={handleSubmit}
              onNext={nextMufradat}
              onPrevious={previousMufradat}
              canSubmit={canSubmit}
              hasSubmitted={hasSubmitted}
              canGoNext={currentIndex < totalMufradat - 1}
              canGoPrevious={currentIndex > 0}
            />
          </div>
        ) : (
          <div className="text-center text-muted-foreground">
            Memuat mufradat...
          </div>
        )}
      </main>

      <ResetDialog
        open={showEndDialog}
        onOpenChange={setShowEndDialog}
        onConfirm={confirmEndSession}
      />
    </div>
  );
};

export default GuruPage;

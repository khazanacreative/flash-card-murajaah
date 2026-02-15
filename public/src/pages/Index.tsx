import { useState, useCallback, useEffect, useRef } from 'react';
import { Header } from '@/components/Header';
import { MufradatCard } from '@/components/MufradatCard';
import { ScoreBoard } from '@/components/ScoreBoard';
import { ControlPanel } from '@/components/ControlPanel';
import { BottomNavbar, NavView } from '@/components/BottomNavbar';
import { HistoryView } from '@/components/HistoryView';
import { ResetDialog } from '@/components/ResetDialog';
import { CompletionView } from '@/components/CompletionView';
import { GameSetup } from '@/components/GameSetup';
import { useAssessment } from '@/hooks/useAssessment';
import { Button } from '@/components/ui/button';
import { RotateCcw, BookOpen, Trophy, History, Settings, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Level } from '@/utils/scoring';
import { toPng } from 'html-to-image';
import { FlashcardNav } from '@/components/FlashcardNav';

const Index = () => {
  const [currentView, setCurrentView] = useState<NavView>('assessment');
  const [showResetDialog, setShowResetDialog] = useState(false);
  const [flashAnimation, setFlashAnimation] = useState<'correct' | 'wrong' | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const {
    isGameStarted,
    gameSettings,
    currentMufradat,
    currentIndex,
    totalMufradat,
    totalScore,
    streak,
    maxStreak,
    currentMembaca,
    currentMengartikan,
    currentKalimat,
    results,
    mufradatList,
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
  } = useAssessment();

  // Flash animation on submit
  const handleSubmit = useCallback(() => {
    if (!canSubmit) return;
    
    const allCorrect = currentMembaca && currentMengartikan && currentKalimat;
    setFlashAnimation(allCorrect ? 'correct' : 'wrong');
    submitAssessment();
    
    setTimeout(() => {
      setFlashAnimation(null);
    }, 500);
  }, [canSubmit, currentMembaca, currentMengartikan, currentKalimat, submitAssessment]);

  // Auto-advance after submit
  useEffect(() => {
    if (hasSubmitted && !isComplete) {
      const timer = setTimeout(() => {
        nextMufradat();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasSubmitted, isComplete, nextMufradat]);

  const handleReset = useCallback(() => {
    setShowResetDialog(true);
  }, []);

  const confirmReset = useCallback(() => {
    resetSession();
    setShowResetDialog(false);
    setCurrentView('assessment');
  }, [resetSession]);

  const handleSelectFromHistory = useCallback((index: number) => {
    goToMufradat(index);
    setCurrentView('assessment');
  }, [goToMufradat]);

  const handleStartGame = useCallback((level: Level | 'all') => {
    startGame(level);
  }, [startGame]);

  const handleDownloadCard = useCallback(async () => {
    if (!cardRef.current || !currentMufradat) return;
    try {
      const dataUrl = await toPng(cardRef.current, {
        backgroundColor: '#f8f6f0',
        pixelRatio: 2,
      });
      const link = document.createElement('a');
      link.download = `mufradat-${currentMufradat.arabic}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Failed to download card:', error);
    }
  }, [currentMufradat]);

  // Desktop sidebar navigation
  const desktopNavItems = [
    { id: 'assessment' as const, label: 'Penilaian', icon: BookOpen },
    { id: 'score' as const, label: 'Skor', icon: Trophy },
    { id: 'history' as const, label: 'Riwayat', icon: History },
  ];

  const perfectCount = results.filter(r => r.membaca && r.mengartikan && r.kalimat).length;

  // Show game setup if not started
  if (!isGameStarted) {
    return (
      <div className="min-h-screen bg-background pattern-geometric">
        <Header />
        <main className="container mx-auto max-w-lg p-4 py-8">
          <GameSetup onStart={handleStartGame} />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pattern-geometric">
      <Header />

      {/* Desktop layout */}
      <div className="hidden md:flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-[73px] h-[calc(100vh-73px)] w-64 overflow-y-auto border-r border-border bg-card">
          <div className="flex flex-col p-4">
            <nav className="space-y-2">
              {desktopNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left transition-colors',
                    currentView === item.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>

            {/* Game settings info */}
            {gameSettings && (
              <div className="mt-4 rounded-lg bg-muted p-3 text-center text-sm">
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Settings className="h-4 w-4" />
                  <span>
                    {gameSettings.level === 'all' ? 'Semua Level' : `Level ${gameSettings.level}`}
                  </span>
                  <span>•</span>
                  <span>Acak</span>
                </div>
              </div>
            )}

            {/* Compact scoreboard in sidebar */}
            <div className="mt-4 space-y-4">
              <ScoreBoard
                totalScore={totalScore}
                streak={streak}
                maxStreak={maxStreak}
                completedCount={results.length}
                totalCount={totalMufradat}
              />

              <Button
                variant="outline"
                onClick={handleReset}
                className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Sesi
              </Button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="ml-64 flex-1 p-6">
          <div className="mx-auto max-w-3xl">
            {currentView === 'assessment' && (
              <>
                {isComplete ? (
                  <CompletionView
                    totalScore={totalScore}
                    maxStreak={maxStreak}
                    totalQuestions={totalMufradat}
                    perfectCount={perfectCount}
                    onReset={handleReset}
                  />
                ) : currentMufradat ? (
                  <div className="space-y-6">
                    {/* Question counter above the card */}
                    <div className="space-y-6">
                      <FlashcardNav
                        current={currentIndex + 1}
                        total={totalMufradat}
                        onPrev={previousMufradat}
                        onNext={nextMufradat}
                        canPrev={currentIndex > 0}
                        canNext={currentIndex < totalMufradat - 1}
                      />
                    </div>

                    <MufradatCard
                      mufradat={currentMufradat}
                      flashAnimation={flashAnimation}
                    />
                    <ControlPanel
                      membaca={currentMembaca}
                      mengartikan={currentMengartikan}
                      kalimat={currentKalimat}
                      onMembacaChange={setMembaca}
                      onMengartikanChange={setMengartikan}
                      onKalimatChange={setKalimat}
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
              </>
            )}

            {currentView === 'score' && (
              <div className="space-y-6">
                <h2 className="text-center text-xl font-semibold text-foreground">
                  Detail Skor
                </h2>
                <ScoreBoard
                  totalScore={totalScore}
                  streak={streak}
                  maxStreak={maxStreak}
                  completedCount={results.length}
                  totalCount={totalMufradat}
                />
              </div>
            )}

            {currentView === 'history' && (
              <HistoryView
                results={results}
                mufradatList={mufradatList}
                onSelectMufradat={handleSelectFromHistory}
              />
            )}
          </div>
        </main>
      </div>

      {/* Mobile layout */}
      <main className="pb-20 md:hidden">
        <div className="container mx-auto p-4">
          {currentView === 'assessment' && (
            <>
              {/* Compact score bar with settings and download button */}
              <div className="mb-4 space-y-2">
                {gameSettings && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Settings className="h-3 w-3" />
                      <span>
                        {gameSettings.level === 'all' ? 'Semua Level' : `Level ${gameSettings.level}`}
                      </span>
                      <span>•</span>
                      <span>Acak</span>
                    </div>
                    {currentMufradat && !isComplete && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleDownloadCard}
                        className="h-8 w-8 p-0"
                        title="Download Flashcard"
                      >
                        <Download className="h-4 w-4 text-primary" />
                      </Button>
                    )}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <ScoreBoard
                      totalScore={totalScore}
                      streak={streak}
                      maxStreak={maxStreak}
                      completedCount={results.length}
                      totalCount={totalMufradat}
                      compact
                    />
                  </div>
                  {!gameSettings && currentMufradat && !isComplete && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleDownloadCard}
                      className="h-8 w-8 p-0"
                      title="Download Flashcard"
                    >
                      <Download className="h-4 w-4 text-primary" />
                    </Button>
                  )}
                </div>
              </div>

              {isComplete ? (
                <CompletionView
                  totalScore={totalScore}
                  maxStreak={maxStreak}
                  totalQuestions={totalMufradat}
                  perfectCount={perfectCount}
                  onReset={handleReset}
                />
              ) : currentMufradat ? (
                <div className="space-y-4">
                  {/* Question counter above the card */}
                  {!isComplete && currentMufradat && (
                    <FlashcardNav
                      current={currentIndex + 1}
                      total={totalMufradat}
                      onPrev={previousMufradat}
                      onNext={nextMufradat}
                      canPrev={currentIndex > 0}
                      canNext={currentIndex < totalMufradat - 1}
                    />
                  )}

                  <MufradatCard
                    ref={cardRef}
                    mufradat={currentMufradat}
                    flashAnimation={flashAnimation}
                  />
                  <ControlPanel
                    membaca={currentMembaca}
                    mengartikan={currentMengartikan}
                    kalimat={currentKalimat}
                    onMembacaChange={setMembaca}
                    onMengartikanChange={setMengartikan}
                    onKalimatChange={setKalimat}
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
            </>
          )}

          {currentView === 'score' && (
            <ScoreBoard
              totalScore={totalScore}
              streak={streak}
              maxStreak={maxStreak}
              completedCount={results.length}
              totalCount={totalMufradat}
            />
          )}

          {currentView === 'history' && (
            <HistoryView
              results={results}
              mufradatList={mufradatList}
              onSelectMufradat={handleSelectFromHistory}
            />
          )}
        </div>
      </main>

      {/* Bottom navigation (mobile only) */}
      <BottomNavbar
        currentView={currentView}
        onViewChange={setCurrentView}
        onReset={handleReset}
      />

      {/* Reset confirmation dialog */}
      <ResetDialog
        open={showResetDialog}
        onOpenChange={setShowResetDialog}
        onConfirm={confirmReset}
      />
    </div>
  );
};

export default Index;

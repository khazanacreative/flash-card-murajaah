import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { MufradatCard } from '@/components/MufradatCard';
import { JoinSessionForm } from '@/components/JoinSessionForm';
import { useSession } from '@/hooks/useSession';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Wifi, WifiOff, Trophy, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

const MuridPage = () => {
  const navigate = useNavigate();
  const {
    session,
    currentMufradat,
    isLoading,
    error,
    joinSession,
    leaveSession,
    currentIndex,
    totalMufradat,
    totalScore,
    streak,
  } = useSession();

  const handleJoin = useCallback(async (code: string) => {
    await joinSession(code);
  }, [joinSession]);

  const handleLeave = useCallback(() => {
    leaveSession();
  }, [leaveSession]);

  // Join phase
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
          <JoinSessionForm 
            onJoin={handleJoin} 
            isLoading={isLoading} 
            error={error} 
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
            <Button variant="ghost" size="sm" onClick={handleLeave}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Keluar
            </Button>
            <div className="flex items-center gap-2 text-sm">
              <div className={cn(
                "flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
                session.is_active 
                  ? "bg-success/20 text-success" 
                  : "bg-destructive/20 text-destructive"
              )}>
                {session.is_active ? (
                  <>
                    <Wifi className="h-3 w-3" />
                    <span>Terhubung</span>
                  </>
                ) : (
                  <>
                    <WifiOff className="h-3 w-3" />
                    <span>Sesi Berakhir</span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="rounded-xl bg-muted p-3 text-center">
            <p className="text-xs text-muted-foreground mb-1">Kode Sesi</p>
            <p className="text-xl font-bold tracking-widest text-foreground">
              {session.code}
            </p>
          </div>

          {/* Score display */}
          <div className="flex gap-3">
            <div className="flex-1 rounded-xl bg-primary/10 p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Trophy className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">Total Nilai</span>
              </div>
              <p className="text-2xl font-bold text-primary">{totalScore}</p>
            </div>
            <div className="flex-1 rounded-xl bg-accent/50 p-3 text-center">
              <div className="flex items-center justify-center gap-1 mb-1">
                <Flame className="h-4 w-4 text-accent-foreground" />
                <span className="text-xs text-muted-foreground">Streak</span>
              </div>
              <p className="text-2xl font-bold text-accent-foreground">{streak}</p>
            </div>
          </div>
        </div>

        {/* Read-only flashcard view */}
        {!session.is_active ? (
          <div className="text-center py-12 space-y-4">
            <WifiOff className="h-16 w-16 mx-auto text-muted-foreground" />
            <h2 className="text-xl font-semibold text-foreground">
              Sesi Telah Berakhir
            </h2>
            <p className="text-muted-foreground">
              Guru telah mengakhiri sesi murojaah ini.
            </p>
            <Button onClick={handleLeave}>
              Kembali ke Beranda
            </Button>
          </div>
        ) : currentMufradat ? (
          <div className="space-y-4">
            {/* Progress indicator */}
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>Soal</span>
              <span className="font-bold text-foreground text-lg">
                {currentIndex + 1}
              </span>
              <span>dari</span>
              <span className="font-bold text-foreground text-lg">
                {totalMufradat}
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / totalMufradat) * 100}%` }}
              />
            </div>

            {/* Flashcard (read-only) */}
            <MufradatCard
              mufradat={currentMufradat}
              showMeaningToggle={false}
            />

            {/* Info text */}
            <div className="text-center text-sm text-muted-foreground p-4 rounded-xl bg-muted/50">
              <p>
                Ikuti instruksi guru. Flashcard akan berganti secara otomatis.
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <div className="animate-pulse">
              Menunggu guru memulai...
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MuridPage;

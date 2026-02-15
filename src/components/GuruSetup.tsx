import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GraduationCap, Loader2, Sparkles } from 'lucide-react';
import { Level, getMufradatCounts } from '@/utils/scoring';
import { cn } from '@/lib/utils';

interface GuruSetupProps {
  onStart: (level: Level | 'all') => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function GuruSetup({ onStart, isLoading, error }: GuruSetupProps) {
  const [selectedLevel, setSelectedLevel] = useState<Level | 'all' | null>(null);
  const counts = getMufradatCounts();

  const levelOptions: { id: Level | 'all'; label: string; description: string; count: number }[] = [
    { id: 'A', label: 'Level A', description: 'Dasar', count: counts.A },
    { id: 'B', label: 'Level B', description: 'Menengah', count: counts.B },
    { id: 'C', label: 'Level C', description: 'Lanjutan', count: counts.C },
    { id: 'all', label: 'Semua', description: 'Soal Acak', count: 30 },
  ];

  const handleStart = async () => {
    if (!selectedLevel) return;
    await onStart(selectedLevel);
  };

  return (
    <Card className="card-islamic p-6 space-y-6">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <GraduationCap className="h-7 w-7 text-primary" />
          </div>
        </div>
        <h2 className="text-xl font-bold text-foreground">
          Mulai Sesi Baru
        </h2>
        <p className="text-sm text-muted-foreground">
          Pilih level mufradat untuk sesi ini
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {levelOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => setSelectedLevel(option.id)}
            disabled={isLoading}
            className={cn(
              'rounded-xl border-2 p-4 text-left transition-all',
              selectedLevel === option.id
                ? 'border-primary bg-primary/10'
                : 'border-border bg-card hover:border-primary/50',
              isLoading && 'opacity-50 cursor-not-allowed'
            )}
          >
            <div className="font-semibold text-foreground">{option.label}</div>
            <div className="text-xs text-muted-foreground">{option.description}</div>
            <div className="mt-2 text-xs text-primary font-medium">
              {option.count} soal
            </div>
          </button>
        ))}
      </div>

      {error && (
        <p className="text-sm text-destructive text-center">
          {error}
        </p>
      )}

      <Button 
        onClick={handleStart} 
        className="w-full" 
        size="lg"
        disabled={isLoading || !selectedLevel}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Membuat sesi...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Mulai Murojaah
          </>
        )}
      </Button>

      <div className="text-center text-xs text-muted-foreground space-y-1">
        <p>Mufradat akan diacak secara otomatis</p>
        <p>Kode sesi akan dibuat setelah memulai</p>
      </div>
    </Card>
  );
}

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GraduationCap, Loader2, Sparkles } from 'lucide-react';
import { HSKLevel, getVocabularyCounts } from '@/data/hskVocabulary';
import { cn } from '@/lib/utils';

interface GuruSetupProps {
  onStart: (level: HSKLevel | 'all') => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function GuruSetup({ onStart, isLoading, error }: GuruSetupProps) {
  const [selectedLevel, setSelectedLevel] = useState<HSKLevel | 'all' | null>(null);
  const counts = getVocabularyCounts();

  const levelOptions: { id: HSKLevel | 'all'; label: string; description: string; count: number }[] = [
    { id: 1, label: 'HSK 1', description: 'Dasar', count: counts[1] },
    { id: 2, label: 'HSK 2', description: 'Pemula', count: counts[2] },
    { id: 3, label: 'HSK 3', description: 'Menengah', count: counts[3] },
    { id: 4, label: 'HSK 4', description: 'Lanjutan', count: counts[4] },
    { id: 5, label: 'HSK 5', description: 'Mahir', count: counts[5] },
    { id: 'all', label: 'Semua HSK', description: 'Soal Acak', count: 30 },
  ];

  const handleStart = async () => {
    if (selectedLevel === null) return;
    await onStart(selectedLevel);
  };

  return (
    <Card className="card-chinese p-6 space-y-6">
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
          Pilih level HSK untuk sesi ini
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
              {option.count} kata
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
        disabled={isLoading || selectedLevel === null}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Membuat sesi...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Mulai Belajar
          </>
        )}
      </Button>

      <div className="text-center text-xs text-muted-foreground space-y-1">
        <p>Kosakata akan diacak secara otomatis</p>
        <p>Kode sesi akan dibuat setelah memulai</p>
      </div>
    </Card>
  );
}

import { cn } from '@/lib/utils';
import { Level } from '@/utils/scoring';
import { BookOpen } from 'lucide-react';

interface GameSetupProps {
  onStart: (level: Level | 'all') => void;
}

export function GameSetup({ onStart }: GameSetupProps) {
  const levelOptions: { id: Level | 'all'; label: string; description: string; count: number }[] = [
    { id: 'A', label: 'Level A', description: 'Dasar', count: 30 },
    { id: 'B', label: 'Level B', description: 'Menengah', count: 30 },
    { id: 'C', label: 'Level C', description: 'Lanjutan', count: 30 },
    { id: 'all', label: 'Semua Level', description: 'Semua', count: 30 },
  ];

  return (
    <div className="card-islamic space-y-5 rounded-xl p-5">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
          <BookOpen className="h-7 w-7 text-primary" />
        </div>
        <h2 className="font-arabic text-2xl font-bold text-primary">بسم الله</h2>
        <p className="mt-1 text-sm text-muted-foreground">Pilih level penilaian</p>
      </div>

      {/* Divider */}
      <div className="islamic-divider">
        <span className="text-sm">✦</span>
      </div>

      {/* Level Selection - 2x2 Grid */}
      <div className="grid grid-cols-2 gap-3">
        {levelOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onStart(option.id)}
            className={cn(
              'group flex flex-col items-center justify-center rounded-lg border-2 border-border p-3 transition-all hover:border-emerald-400 hover:shadow-card',
              'min-h-[100px]'
            )}
          >
            {/* Badge */}
            <span
              className={cn(
                'mb-1.5 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold',
                option.id === 'A' && 'badge-level-a',
                option.id === 'B' && 'badge-level-b',
                option.id === 'C' && 'badge-level-c',
                option.id === 'all' && 'bg-primary/10 text-primary'
              )}
            >
              {option.label}
            </span>
            
            {/* Description */}
            <p className="mb-1 text-xs text-muted-foreground">{option.description}</p>
            
            {/* Count */}
            <p className="text-xl font-bold text-foreground group-hover:text-primary">
              {option.count}
            </p>
            <p className="text-[10px] text-muted-foreground">soal acak</p>
          </button>
        ))}
      </div>

      {/* Info */}
      <div className="rounded-lg bg-muted p-3 text-center text-xs text-muted-foreground">
        <p>📖 Al-Arabiyyah Bayna Yadaik • Juz II Bab 1 & 2</p>
        <p className="mt-1">Soal selalu diacak dari 90 mufradat</p>
      </div>
    </div>
  );
}

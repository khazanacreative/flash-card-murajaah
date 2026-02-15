import { cn } from '@/lib/utils';
import { HSKLevel } from '@/utils/scoring';
import { BookOpen } from 'lucide-react';
import logoNaga from '@/assets/logo-naga.png';

interface GameSetupProps {
  onStart: (level: HSKLevel | 'all') => void;
}

export function GameSetup({ onStart }: GameSetupProps) {
  const levelOptions: { id: HSKLevel | 'all'; label: string; description: string; count: number }[] = [
    { id: 1, label: 'HSK 1', description: 'Dasar', count: 30 },
    { id: 2, label: 'HSK 2', description: 'Pemula', count: 30 },
    { id: 3, label: 'HSK 3', description: 'Menengah', count: 30 },
    { id: 4, label: 'HSK 4', description: 'Lanjutan', count: 30 },
    { id: 5, label: 'HSK 5', description: 'Mahir', count: 30 },
    { id: 'all', label: 'Semua HSK', description: 'Acak', count: 30 },
  ];

  return (
    <div className="card-chinese space-y-5 rounded-xl p-5">
      {/* Header */}
      <div className="text-center">
        <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center">
          <img src={logoNaga} alt="Logo Naga" className="h-20 w-20 object-contain" />
        </div>
        <h2 className="font-chinese text-2xl font-bold text-primary">中文学习</h2>
        <p className="mt-1 text-sm text-muted-foreground">Pilih level HSK untuk belajar</p>
      </div>

      {/* Divider */}
      <div className="chinese-divider">
        <span className="text-sm text-primary">龍</span>
      </div>

      {/* Level Selection - 2x3 Grid */}
      <div className="grid grid-cols-2 gap-3">
        {levelOptions.map((option) => (
          <button
            key={option.id}
            onClick={() => onStart(option.id)}
            className={cn(
              'group flex flex-col items-center justify-center rounded-lg border-2 border-border p-3 transition-all hover:border-primary hover:shadow-card',
              'min-h-[100px]'
            )}
          >
            {/* Badge */}
            <span
              className={cn(
                'mb-1.5 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold',
                option.id === 1 && 'badge-hsk-1',
                option.id === 2 && 'badge-hsk-2',
                option.id === 3 && 'badge-hsk-3',
                option.id === 4 && 'badge-hsk-4',
                option.id === 5 && 'badge-hsk-5',
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
            <p className="text-[10px] text-muted-foreground">kata acak</p>
          </button>
        ))}
      </div>

      {/* Info */}
      <div className="rounded-lg bg-muted p-3 text-center text-xs text-muted-foreground">
        <p>📚 HSK (汉语水平考试) • Beijing Institute Pare</p>
        <p className="mt-1">Kosakata akan diacak secara otomatis</p>
      </div>
    </div>
  );
}

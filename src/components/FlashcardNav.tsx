import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FlashcardNavProps {
  current: number;
  total: number;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
}

export function FlashcardNav({
  current,
  total,
  onPrev,
  onNext,
  canPrev,
  canNext,
}: FlashcardNavProps) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-card px-3 py-2">
      <Button
        variant="ghost"
        size="sm"
        onClick={onPrev}
        disabled={!canPrev}
        className="flex items-center gap-1 px-2 sm:px-3"
      >
        <ChevronLeft className="h-5 w-5 shrink-0" />
        <span className="hidden sm:inline text-sm">Sebelumnya</span>
      </Button>

      <span className="text-sm font-medium text-muted-foreground">
        Soal {current} / {total}
      </span>

      <Button
        variant="ghost"
        size="sm"
        onClick={onNext}
        disabled={!canNext}
        className="flex items-center gap-1 px-2 sm:px-3"
      >
        <span className="hidden sm:inline text-sm">Selanjutnya</span>
        <ChevronRight className="h-5 w-5 shrink-0" />
      </Button>
    </div>
  );
}

import { cn } from '@/lib/utils';
import { Mufradat, getLevelInfo } from '@/utils/scoring';
import { Eye, EyeOff } from 'lucide-react';
import { useState, forwardRef } from 'react';

interface MufradatCardProps {
  mufradat: Mufradat;
  flashAnimation?: 'correct' | 'wrong' | null;
  showMeaningToggle?: boolean;
}

export const MufradatCard = forwardRef<HTMLDivElement, MufradatCardProps>(
  ({ mufradat, flashAnimation, showMeaningToggle = true }, ref) => {
    const [showMeaning, setShowMeaning] = useState(false);
    const levelInfo = getLevelInfo(mufradat.level);

    const levelBadgeClass = {
      A: 'badge-level-a',
      B: 'badge-level-b',
      C: 'badge-level-c',
    }[mufradat.level];

    return (
      <div
        ref={ref}
        className={cn(
          'card-islamic relative overflow-hidden rounded-xl p-6 transition-all',
          flashAnimation === 'correct' && 'animate-correct-flash',
          flashAnimation === 'wrong' && 'animate-wrong-flash'
        )}
      >
        {/* Decorative corner pattern */}
        <div className="absolute right-0 top-0 h-20 w-20 opacity-5">
          <svg viewBox="0 0 100 100" className="h-full w-full fill-primary">
            <path d="M100 0 L100 100 L0 100 Q50 50 100 0" />
          </svg>
        </div>

        {/* Level badge (left) and max points (right) */}
        <div className="mb-6 flex items-center justify-between">
          <span
            className={cn(
              'rounded-full px-3 py-1 text-xs font-semibold',
              levelBadgeClass
            )}
          >
            {levelInfo.label}
          </span>
          <span className="text-xs text-muted-foreground">
            {levelInfo.maxPoints} poin maks
          </span>
        </div>

        {/* Islamic divider */}
        <div className="islamic-divider mb-6">
          <span className="text-lg">✦</span>
        </div>

        {/* Arabic text */}
        <div className="mb-6 text-center">
          <p className="font-arabic text-5xl leading-relaxed text-foreground sm:text-6xl md:text-7xl">
            {mufradat.arabic}
          </p>
        </div>

        {/* Islamic divider */}
        <div className="islamic-divider mb-4">
          <span className="text-lg">✦</span>
        </div>

        {/* Meaning toggle */}
        {showMeaningToggle && (
          <div className="text-center">
            <button
              onClick={() => setShowMeaning(!showMeaning)}
              className="inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              {showMeaning ? (
                <>
                  <EyeOff className="h-4 w-4" />
                  Sembunyikan Arti
                </>
              ) : (
                <>
                  <Eye className="h-4 w-4" />
                  Tampilkan Arti
                </>
              )}
            </button>

            {showMeaning && (
              <p className="mt-4 animate-fade-in text-xl font-medium text-foreground">
                {mufradat.meaning}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
);

MufradatCard.displayName = 'MufradatCard';

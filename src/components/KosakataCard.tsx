import { cn } from '@/lib/utils';
import { Vocabulary, getLevelInfo } from '@/utils/scoring';
import { Eye, EyeOff, Volume2 } from 'lucide-react';
import { useState, forwardRef } from 'react';
import beijingLogo from '@/assets/beijing-institute-pare.png';

interface KosakataCardProps {
  kosakata: Vocabulary;
  flashAnimation?: 'correct' | 'wrong' | null;
  showMeaningToggle?: boolean;
}

export const KosakataCard = forwardRef<HTMLDivElement, KosakataCardProps>(
  ({ kosakata, flashAnimation, showMeaningToggle = true }, ref) => {
    const [showPinyin, setShowPinyin] = useState(false);
    const [showMeaning, setShowMeaning] = useState(false);
    const levelInfo = getLevelInfo(kosakata.level);

    const levelBadgeClass = {
      1: 'badge-hsk-1',
      2: 'badge-hsk-2',
      3: 'badge-hsk-3',
      4: 'badge-hsk-4',
      5: 'badge-hsk-5',
    }[kosakata.level];

    return (
      <div
        ref={ref}
        className={cn(
          'card-chinese relative overflow-hidden rounded-xl p-6 transition-all',
          flashAnimation === 'correct' && 'animate-correct-flash',
          flashAnimation === 'wrong' && 'animate-wrong-flash'
        )}
      >
        <div className="absolute right-0 top-0 h-24 w-24 opacity-10">
          <svg viewBox="0 0 100 100" className="h-full w-full fill-primary">
            <circle cx="80" cy="20" r="15" />
            <circle cx="60" cy="40" r="10" />
            <circle cx="85" cy="50" r="8" />
          </svg>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <span className={cn('rounded-full px-3 py-1 text-xs font-semibold', levelBadgeClass)}>
            {levelInfo.label}
          </span>
          <div className="flex items-center gap-2">
            <img src={beijingLogo} alt="Beijing Institute Pare" className="h-6 object-contain" />
          </div>
        </div>

        <div className="chinese-divider mb-6">
          <span className="text-lg text-primary">龍</span>
        </div>

        <div className="mb-6 text-center">
          <p className="font-chinese text-6xl leading-relaxed text-foreground sm:text-7xl md:text-8xl">
            {kosakata.hanzi}
          </p>
        </div>

        <div className="chinese-divider mb-4">
          <span className="text-lg text-primary">龍</span>
        </div>

        <div className="mb-4 text-center">
          <button
            onClick={() => setShowPinyin(!showPinyin)}
            className="inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-secondary/80"
          >
            {showPinyin ? (
              <>
                <EyeOff className="h-4 w-4" />
                Sembunyikan Pinyin
              </>
            ) : (
              <>
                <Volume2 className="h-4 w-4" />
                Tampilkan Pinyin
              </>
            )}
          </button>

          {showPinyin && (
            <p className="mt-3 animate-fade-in text-2xl font-medium text-primary">
              {kosakata.pinyin}
            </p>
          )}
        </div>

        {showMeaningToggle && (
          <div className="text-center">
            <button
              onClick={() => setShowMeaning(!showMeaning)}
              className="inline-flex items-center gap-2 rounded-lg bg-accent/20 px-4 py-2 text-sm font-medium text-accent-foreground transition-colors hover:bg-accent/30"
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
              <div className="mt-4 animate-fade-in space-y-1">
                <p className="text-xl font-medium text-foreground">
                  {kosakata.meaning}
                </p>
                {kosakata.english && (
                  <p className="text-sm text-muted-foreground">
                    ({kosakata.english})
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

KosakataCard.displayName = 'KosakataCard';

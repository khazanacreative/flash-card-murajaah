import { cn } from '@/lib/utils';
import { formatScore, MAX_STREAK_BONUS } from '@/utils/scoring';
import { Trophy, Flame, Target, Star } from 'lucide-react';

interface ScoreBoardProps {
  totalScore: number;
  streak: number;
  maxStreak: number;
  completedCount: number;
  totalCount: number;
  compact?: boolean;
}

export function ScoreBoard({
  totalScore,
  streak,
  maxStreak,
  completedCount,
  totalCount,
  compact = false,
}: ScoreBoardProps) {
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const isStreakActive = streak > 0;
  const isMaxStreak = streak >= MAX_STREAK_BONUS;

  if (compact) {
    return (
      <div className="flex items-center gap-4 rounded-lg bg-card p-3 shadow-soft">
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-gold" />
          <span className="font-semibold text-foreground">{formatScore(totalScore)}</span>
        </div>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-2">
          <Flame className={cn('h-4 w-4', isStreakActive ? 'text-destructive' : 'text-muted-foreground')} />
          <span className={cn('font-semibold', isStreakActive ? 'text-destructive' : 'text-muted-foreground')}>
            {streak}
          </span>
        </div>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-2">
          <Target className="h-4 w-4 text-primary" />
          <span className="text-sm text-muted-foreground">
            {completedCount}/{totalCount}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="card-islamic space-y-4 rounded-xl p-5">
      {/* Total Score */}
      <div className="text-center">
        <div className="mb-1 flex items-center justify-center gap-2">
          <Trophy className="h-5 w-5 text-gold" />
          <span className="text-sm font-medium text-muted-foreground">Total Skor</span>
        </div>
        <p className="text-4xl font-bold text-foreground">{formatScore(totalScore)}</p>
      </div>

      {/* Divider */}
      <div className="islamic-divider">
        <span className="text-sm">✦</span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-3">
        {/* Streak */}
        <div
          className={cn(
            'rounded-lg p-3 text-center transition-all',
            isStreakActive
              ? isMaxStreak
                ? 'bg-gold/20 animate-streak-pulse'
                : 'bg-destructive/10'
              : 'bg-muted'
          )}
        >
          <Flame
            className={cn(
              'mx-auto mb-1 h-5 w-5',
              isStreakActive ? 'text-destructive' : 'text-muted-foreground'
            )}
          />
          <p
            className={cn(
              'text-xl font-bold',
              isStreakActive ? 'text-destructive' : 'text-muted-foreground'
            )}
          >
            {streak}
          </p>
          <p className="text-xs text-muted-foreground">Beruntun</p>
        </div>

        {/* Max Streak */}
        <div className="rounded-lg bg-muted p-3 text-center">
          <Star className="mx-auto mb-1 h-5 w-5 text-gold" />
          <p className="text-xl font-bold text-foreground">{maxStreak}</p>
          <p className="text-xs text-muted-foreground">Tertinggi</p>
        </div>

        {/* Progress */}
        <div className="rounded-lg bg-muted p-3 text-center">
          <Target className="mx-auto mb-1 h-5 w-5 text-primary" />
          <p className="text-xl font-bold text-foreground">{completedCount}</p>
          <p className="text-xs text-muted-foreground">dari {totalCount}</p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Streak bonus info */}
      {isStreakActive && (
        <div className="rounded-lg bg-success/10 p-3 text-center">
          <p className="text-sm font-medium text-success">
            🎉 Bonus +1 poin per jawaban benar!
          </p>
          <p className="text-xs text-success/80">
            {isMaxStreak
              ? 'Streak maksimum tercapai!'
              : `${MAX_STREAK_BONUS - streak} lagi untuk streak maksimum`}
          </p>
        </div>
      )}
    </div>
  );
}

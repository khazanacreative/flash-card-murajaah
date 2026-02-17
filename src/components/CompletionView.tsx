import { formatScore } from '@/utils/scoring';
import { Trophy, Star, Target, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CompletionViewProps {
  totalScore: number;
  maxStreak: number;
  totalQuestions: number;
  perfectCount: number;
  onReset: () => void;
}

export function CompletionView({
  totalScore,
  maxStreak,
  totalQuestions,
  perfectCount,
  onReset,
}: CompletionViewProps) {
  const perfectPercentage = Math.round((perfectCount / totalQuestions) * 100);

  return (
    <div className="card-islamic space-y-6 rounded-xl p-6 text-center">
      {/* Celebration header */}
      <div>
        <div className="mb-4 text-6xl">🎉</div>
        <h2 className="font-arabic text-2xl font-bold text-primary">
          ما شاء الله
        </h2>
        <p className="text-lg font-semibold text-foreground">Penilaian Selesai!</p>
      </div>

      {/* Divider */}
      <div className="islamic-divider">
        <span className="text-lg">✦</span>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-primary/10 p-4">
          <Trophy className="mx-auto mb-2 h-8 w-8 text-gold" />
          <p className="text-3xl font-bold text-foreground">{formatScore(totalScore)}</p>
          <p className="text-sm text-muted-foreground">Total Skor</p>
        </div>
        <div className="rounded-lg bg-primary/10 p-4">
          <Star className="mx-auto mb-2 h-8 w-8 text-gold" />
          <p className="text-3xl font-bold text-foreground">{maxStreak}</p>
          <p className="text-sm text-muted-foreground">Streak Tertinggi</p>
        </div>
      </div>

      <div className="rounded-lg bg-success/10 p-4">
        <Target className="mx-auto mb-2 h-8 w-8 text-success" />
        <p className="text-3xl font-bold text-success">{perfectCount}/{totalQuestions}</p>
        <p className="text-sm text-muted-foreground">
          Jawaban Sempurna ({perfectPercentage}%)
        </p>
      </div>

      {/* Encouragement message */}
      <div className="rounded-lg bg-muted p-4">
        {perfectPercentage >= 80 ? (
          <p className="text-foreground">
            <span className="font-arabic text-lg">ممتاز!</span> Luar biasa! Siswa menguasai kosakata dengan sangat baik.
          </p>
        ) : perfectPercentage >= 60 ? (
          <p className="text-foreground">
            <span className="font-arabic text-lg">جيد جداً!</span> Bagus! Terus berlatih untuk hasil yang lebih baik.
          </p>
        ) : (
          <p className="text-foreground">
            <span className="font-arabic text-lg">استمر!</span> Teruslah belajar dan berlatih. Setiap usaha akan membuahkan hasil.
          </p>
        )}
      </div>

      {/* Reset button */}
      <Button
        onClick={onReset}
        variant="outline"
        className="w-full"
      >
        <RotateCcw className="mr-2 h-5 w-5" />
        Mulai Sesi Baru
      </Button>
    </div>
  );
}

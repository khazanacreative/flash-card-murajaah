import { cn } from '@/lib/utils';
import { AssessmentResult, Vocabulary, getLevelInfo } from '@/utils/scoring';
import { Check, X, ChevronRight } from 'lucide-react';

interface HistoryViewProps {
  results: AssessmentResult[];
  mufradatList: Vocabulary[];
  onSelectMufradat?: (index: number) => void;
}

export function HistoryView({ results, mufradatList, onSelectMufradat }: HistoryViewProps) {
  if (results.length === 0) {
    return (
      <div className="card-chinese flex flex-col items-center justify-center rounded-xl p-8 text-center">
        <div className="mb-4 text-6xl">📝</div>
        <h3 className="mb-2 text-lg font-semibold text-foreground">Belum ada riwayat</h3>
        <p className="text-sm text-muted-foreground">
          Mulai belajar untuk melihat riwayat di sini
        </p>
      </div>
    );
  }

  const getVocabularyById = (id: string) => mufradatList.find((m) => m.id === id);
  const getVocabularyIndex = (id: string) => mufradatList.findIndex((m) => m.id === id);

  return (
    <div className="space-y-3">
      <h3 className="text-center text-sm font-semibold text-muted-foreground">
        Riwayat Belajar ({results.length} kata)
      </h3>

      <div className="space-y-2">
        {results.map((result, index) => {
          const vocabulary = getVocabularyById(result.mufradatId);
          if (!vocabulary) return null;

          const levelInfo = getLevelInfo(vocabulary.level);
          const allCorrect = result.membaca && result.mengartikan && result.kalimat;
          const vocabularyIndex = getVocabularyIndex(result.mufradatId);

          return (
            <button
              key={result.mufradatId}
              onClick={() => onSelectMufradat?.(vocabularyIndex)}
              className="card-chinese group w-full rounded-lg p-4 text-left transition-all hover:shadow-elevated"
            >
              <div className="flex items-center gap-4">
                {/* Number badge */}
                <div
                  className={cn(
                    'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold',
                    allCorrect
                      ? 'bg-success/20 text-success'
                      : 'bg-destructive/20 text-destructive'
                  )}
                >
                  {index + 1}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="font-chinese text-xl text-foreground">
                      {vocabulary.hanzi}
                    </span>
                    <span
                      className={cn(
                        'rounded px-1.5 py-0.5 text-xs font-medium',
                        {
                          1: 'badge-hsk-1',
                          2: 'badge-hsk-2',
                          3: 'badge-hsk-3',
                          4: 'badge-hsk-4',
                          5: 'badge-hsk-5',
                        }[vocabulary.level]
                      )}
                    >
                      {levelInfo.label}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{vocabulary.meaning}</p>
                </div>

                {/* Score and status icons */}
                <div className="flex flex-shrink-0 items-center gap-3">
                  <div className="flex gap-1">
                    {result.membaca ? (
                      <Check className="h-4 w-4 text-success" />
                    ) : (
                      <X className="h-4 w-4 text-destructive" />
                    )}
                    {result.mengartikan ? (
                      <Check className="h-4 w-4 text-success" />
                    ) : (
                      <X className="h-4 w-4 text-destructive" />
                    )}
                    {result.kalimat ? (
                      <Check className="h-4 w-4 text-success" />
                    ) : (
                      <X className="h-4 w-4 text-destructive" />
                    )}
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-foreground">+{result.totalScore}</span>
                    {result.bonusScore > 0 && (
                      <span className="ml-1 text-xs text-gold">+{result.bonusScore}</span>
                    )}
                  </div>

                  <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Summary */}
      <div className="card-chinese rounded-lg p-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-foreground">
              {results.reduce((sum, r) => sum + r.totalScore, 0)}
            </p>
            <p className="text-xs text-muted-foreground">Total Skor</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-success">
              {results.filter((r) => r.membaca && r.mengartikan && r.kalimat).length}
            </p>
            <p className="text-xs text-muted-foreground">Sempurna</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-gold">
              {results.reduce((sum, r) => sum + r.bonusScore, 0)}
            </p>
            <p className="text-xs text-muted-foreground">Bonus</p>
          </div>
        </div>
      </div>
    </div>
  );
}

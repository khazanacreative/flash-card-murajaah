import { cn } from '@/lib/utils';
import { Check, X, ChevronLeft, ChevronRight, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AssessmentButtonsProps {
  label: string;
  value: boolean | null;
  onChange: (value: boolean) => void;
  disabled?: boolean;
}

function AssessmentButtons({ label, value, onChange, disabled }: AssessmentButtonsProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-muted-foreground">{label}</label>
      <div className="flex gap-2">
        <button
          onClick={() => onChange(true)}
          disabled={disabled}
          className={cn(
            'btn-assessment flex flex-1 items-center justify-center gap-2 rounded-lg border-2 transition-all',
            value === true
              ? 'border-success bg-success text-success-foreground'
              : 'border-border bg-card text-foreground hover:border-success/50 hover:bg-success/10',
            disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          <Check className="h-5 w-5" />
          <span>Benar</span>
        </button>
        <button
          onClick={() => onChange(false)}
          disabled={disabled}
          className={cn(
            'btn-assessment flex flex-1 items-center justify-center gap-2 rounded-lg border-2 transition-all',
            value === false
              ? 'border-destructive bg-destructive text-destructive-foreground'
              : 'border-border bg-card text-foreground hover:border-destructive/50 hover:bg-destructive/10',
            disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          <X className="h-5 w-5" />
          <span>Salah</span>
        </button>
      </div>
    </div>
  );
}

interface ControlPanelProps {
  membaca: boolean | null;
  mengartikan: boolean | null;
  kalimat: boolean | null;
  onMembacaChange: (value: boolean) => void;
  onMengartikanChange: (value: boolean) => void;
  onKalimatChange: (value: boolean) => void;
  onSubmit: () => void;
  onNext: () => void;
  onPrevious: () => void;
  canSubmit: boolean;
  hasSubmitted: boolean;
  canGoNext: boolean;
  canGoPrevious: boolean;
}

export function ControlPanel({
  membaca,
  mengartikan,
  kalimat,
  onMembacaChange,
  onMengartikanChange,
  onKalimatChange,
  onSubmit,
  canSubmit,
  hasSubmitted,
}: ControlPanelProps) {
  return (
    <div className="space-y-4">
      {/* Assessment criteria */}
      <div className="card-islamic space-y-4 rounded-xl p-4">
        <h3 className="text-center text-sm font-semibold text-foreground">
          Penilaian Guru
        </h3>

        <AssessmentButtons
          label="1. Membaca tanpa harakat"
          value={membaca}
          onChange={onMembacaChange}
          disabled={hasSubmitted}
        />

        <AssessmentButtons
          label="2. Mengartikan mufradat"
          value={mengartikan}
          onChange={onMengartikanChange}
          disabled={hasSubmitted}
        />

        <AssessmentButtons
          label="3. Menyebutkan dalam kalimat"
          value={kalimat}
          onChange={onKalimatChange}
          disabled={hasSubmitted}
        />
      </div>

      {/* Submit button */}
      {!hasSubmitted && (
        <Button
          onClick={onSubmit}
          disabled={!canSubmit}
          className="btn-assessment w-full bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Send className="mr-2 h-5 w-5" />
          Simpan Nilai
        </Button>
      )}
    </div>
  );
}

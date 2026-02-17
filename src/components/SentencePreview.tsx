import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff, BookOpen, Languages, MessageSquare } from 'lucide-react';
import { Vocabulary } from '@/data/hskVocabulary';

interface SentencePreviewProps {
  kosakata: Vocabulary;
}

function PreviewToggle({
  label,
  icon: Icon,
  content,
  fallback = 'Tidak tersedia',
}: {
  label: string;
  icon: React.ElementType;
  content?: string;
  fallback?: string;
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-2">
      <button
        onClick={() => setShow(!show)}
        className={cn(
          'flex w-full items-center justify-between rounded-lg border-2 px-4 py-3 text-left transition-all',
          show
            ? 'border-primary bg-primary/10'
            : 'border-border bg-card hover:border-primary/50'
        )}
      >
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">{label}</span>
        </div>
        {show ? (
          <EyeOff className="h-4 w-4 text-muted-foreground" />
        ) : (
          <Eye className="h-4 w-4 text-muted-foreground" />
        )}
      </button>

      {show && (
        <div className="animate-fade-in rounded-lg bg-muted/50 px-4 py-3">
          <p className={cn(
            'text-base leading-relaxed',
            content ? 'text-foreground' : 'text-muted-foreground italic'
          )}>
            {content || fallback}
          </p>
        </div>
      )}
    </div>
  );
}

export function SentencePreview({ kosakata }: SentencePreviewProps) {
  return (
    <div className="space-y-4">
      <div className="card-islamic space-y-4 rounded-xl p-4">
        <h3 className="text-center text-sm font-semibold text-foreground">
          Contoh Kalimat
        </h3>

        <PreviewToggle
          label="Hanzi Kalimat"
          icon={BookOpen}
          content={kosakata.kalimat}
        />

        <PreviewToggle
          label="Pinyin Kalimat"
          icon={Languages}
          content={kosakata.pinyinKalimat}
        />

        <PreviewToggle
          label="Arti Kalimat"
          icon={MessageSquare}
          content={kosakata.artiKalimat}
        />
      </div>
    </div>
  );
}

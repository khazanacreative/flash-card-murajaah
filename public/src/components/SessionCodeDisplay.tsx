import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SessionCodeDisplayProps {
  code: string;
}

export function SessionCodeDisplay({ code }: SessionCodeDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="rounded-xl bg-primary/10 border-2 border-primary/30 p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Kode Sesi</p>
          <p className="text-3xl font-bold tracking-widest text-primary font-mono">
            {code}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className={cn(
            "transition-all",
            copied && "bg-success text-success-foreground border-success"
          )}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-1" />
              Disalin
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-1" />
              Salin
            </>
          )}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground mt-2">
        Bagikan kode ini kepada murid untuk bergabung
      </p>
    </div>
  );
}

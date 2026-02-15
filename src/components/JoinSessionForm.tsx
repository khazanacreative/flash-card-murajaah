import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Users, Loader2 } from 'lucide-react';
import { isValidSessionCode } from '@/utils/sessionCode';

interface JoinSessionFormProps {
  onJoin: (code: string) => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export function JoinSessionForm({ onJoin, isLoading, error }: JoinSessionFormProps) {
  const [code, setCode] = useState('');
  const [localError, setLocalError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    const cleanCode = code.toUpperCase().replace(/[^A-Z0-9]/g, '');
    
    if (!isValidSessionCode(cleanCode)) {
      setLocalError('Kode sesi harus 5 karakter (huruf dan angka)');
      return;
    }

    await onJoin(cleanCode);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 5);
    setCode(value);
    setLocalError(null);
  };

  const displayError = localError || error;

  return (
    <Card className="card-islamic p-6 space-y-6">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/50">
            <Users className="h-7 w-7 text-foreground" />
          </div>
        </div>
        <h2 className="text-xl font-bold text-foreground">
          Gabung Sesi
        </h2>
        <p className="text-sm text-muted-foreground">
          Masukkan kode sesi dari guru untuk bergabung
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="text"
            placeholder="Masukkan kode sesi"
            value={code}
            onChange={handleCodeChange}
            className="text-center text-xl tracking-widest font-mono uppercase h-14"
            maxLength={5}
            disabled={isLoading}
            autoFocus
          />
          {displayError && (
            <p className="text-sm text-destructive text-center">
              {displayError}
            </p>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full" 
          size="lg"
          disabled={isLoading || code.length < 5}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Mencari sesi...
            </>
          ) : (
            'Gabung Sesi'
          )}
        </Button>
      </form>

      <div className="text-center text-xs text-muted-foreground">
        <p>Contoh kode: A7K9Q</p>
      </div>
    </Card>
  );
}

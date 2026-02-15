import { BookOpen } from 'lucide-react';

interface HeaderProps {
  title?: string;
}

export function Header({ title = 'بطاقات مراجعة المفردات' }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border px-4 py-3 shadow-soft">
      <div className="container mx-auto flex items-center justify-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <BookOpen className="h-5 w-5 text-primary" />
        </div>
        <div className="text-center">
          <h1 className="font-arabic text-2xl font-bold text-primary">{title}</h1>
          <p className="text-xs text-muted-foreground">Flashcard Murojaah Mufradat</p>
        </div>
      </div>
    </header>
  );
}

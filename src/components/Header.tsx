import logoNaga from '@/assets/logo-naga.png';

interface HeaderProps {
  title?: string;
}

export function Header({ title = '中文学习卡片' }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border px-4 py-3 shadow-soft">
      <div className="container mx-auto flex items-center justify-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center">
          <img 
            src={logoNaga} 
            alt="Logo Naga" 
            className="h-12 w-12 object-contain"
          />
        </div>
        <div className="text-center">
          <h1 className="font-chinese text-2xl font-bold text-primary">{title}</h1>
          <p className="text-xs text-muted-foreground">Flashcard Belajar Mandarin</p>
        </div>
      </div>
    </header>
  );
}

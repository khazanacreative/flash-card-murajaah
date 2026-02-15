import { cn } from '@/lib/utils';
import { BookOpen, Trophy, History, RotateCcw } from 'lucide-react';

export type NavView = 'assessment' | 'score' | 'history' | 'reset';

interface BottomNavbarProps {
  currentView: NavView;
  onViewChange: (view: NavView) => void;
  onReset: () => void;
}

const navItems = [
  { id: 'assessment' as const, label: 'Soal', icon: BookOpen },
  { id: 'score' as const, label: 'Skor', icon: Trophy },
  { id: 'history' as const, label: 'Riwayat', icon: History },
];

export function BottomNavbar({ currentView, onViewChange, onReset }: BottomNavbarProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card safe-bottom md:hidden">
      <div className="grid grid-cols-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id)}
            className={cn(
              'flex flex-col items-center justify-center gap-1 py-3 transition-colors',
              currentView === item.id
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
        <button
          onClick={onReset}
          className="flex flex-col items-center justify-center gap-1 py-3 text-muted-foreground transition-colors hover:text-destructive"
        >
          <RotateCcw className="h-5 w-5" />
          <span className="text-xs font-medium">Reset</span>
        </button>
      </div>
    </nav>
  );
}

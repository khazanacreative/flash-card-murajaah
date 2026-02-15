import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Card } from '@/components/ui/card';
import { GraduationCap, Users, BookOpen } from 'lucide-react';
import logoNaga from '@/assets/logo-naga.png';

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pattern-geometric">
      <Header />
      
      <main className="container mx-auto max-w-lg p-4 py-8">
        <div className="space-y-8">
          {/* Hero section */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                <img src={logoNaga} alt="Logo Naga" className="h-24 w-24 object-contain" />
                <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-success animate-pulse" />
              </div>
            </div>
            <h1 className="font-chinese text-3xl font-bold text-primary">
              中文学习卡片
            </h1>
            <p className="text-lg font-semibold text-foreground">
              Flashcard Belajar Mandarin
            </p>
            <p className="text-muted-foreground">
              Mode Interaktif Guru & Murid
            </p>
          </div>

          {/* Role selection */}
          <div className="space-y-4">
            <Card 
              className="card-chinese p-6 cursor-pointer hover:border-primary/50 transition-all"
              onClick={() => navigate('/guru')}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <GraduationCap className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-foreground">
                    Mulai sebagai Guru
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Buat sesi baru, kontrol flashcard, dan nilai murid
                  </p>
                </div>
              </div>
            </Card>

            <Card 
              className="card-chinese p-6 cursor-pointer hover:border-primary/50 transition-all"
              onClick={() => navigate('/murid')}
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary/50">
                  <Users className="h-7 w-7 text-foreground" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-foreground">
                    Gabung sebagai Murid
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Masukkan kode sesi untuk bergabung
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Info section */}
          <div className="rounded-xl bg-muted/50 p-4 text-center text-sm text-muted-foreground">
            <p>
              Guru membuat kode sesi, murid mengikuti flashcard secara realtime.
              <br />
              Tidak perlu login atau daftar akun.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Landing;

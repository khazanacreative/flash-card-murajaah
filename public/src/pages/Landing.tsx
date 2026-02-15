import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { GraduationCap, Users, BookOpen } from 'lucide-react';

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
                <BookOpen className="h-16 w-16 text-primary" />
                <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-success animate-pulse" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-foreground arabic-heading">
              مُرَاجَعَةُ المُفْرَدَات
            </h1>
            <p className="text-lg font-semibold text-foreground">
              Murojaah Mufradat
            </p>
            <p className="text-muted-foreground">
              Mode Interaktif Guru & Murid
            </p>
          </div>

          {/* Role selection */}
          <div className="space-y-4">
            <Card 
              className="card-islamic p-6 cursor-pointer hover:border-primary/50 transition-all"
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
              className="card-islamic p-6 cursor-pointer hover:border-primary/50 transition-all"
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

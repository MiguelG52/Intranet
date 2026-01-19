'use client';

import { useEffect, useState } from 'react';
import { useSession } from '@/lib/context/session-provider';
import { GradientHeader } from '@/components/common/header/gradient-header';

export function WelcomeHeader() {
  const [date, setDate] = useState<Date | null>(null);
  const [greeting, setGreeting] = useState('');
  const { user } = useSession();

  useEffect(() => {
    setDate(new Date());
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setGreeting('Buenos días');
    } else if (hour >= 12 && hour < 20) {
      setGreeting('Buenas tardes');
    } else {
      setGreeting('Buenas noches');
    }
  }, []);

  if (!date) return null;

  return (
    <header className="flex flex-col md:flex-row justify-between items-end mb-8">
      <GradientHeader
        title={`👋 ${greeting}, ${user?.name || 'Usuario'}`}
        subtitle="Innovamos juntos, construimos el futuro"
        className="py-0 p-0"
      />
      <div className="hidden md:flex items-center text-gray-500 mt-4 md:mt-0">
        <div className="text-right">
          <div className="text-sm font-medium">
            {date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>
      </div>
    </header>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { useSession } from '@/lib/context/session-provider';
import { Greeting } from './greeting';

export function WelcomeHeader() {
  const [date, setDate] = useState<Date | null>(null);
  const { user } = useSession();

  useEffect(() => {
    setDate(new Date());
  }, []);

  if (!date) return null;

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-white p-6 rounded-lg shadow-sm border">
      <div>
        <Greeting name={user?.name || 'Usuario'} />
        <p className="text-gray-500 mt-1">
          Innovamos juntos, construimos el futuro
        </p>
      </div>
      <div className="flex items-center text-gray-500 mt-4 md:mt-0">
        <div className="text-right">
          <div className="text-sm font-medium">
            {date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </div>
        </div>
      </div>
    </div>
  );
}

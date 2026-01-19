'use client';

import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

export function CalendarWidget() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-3xl shadow-md border w-full flex justify-center bg-white"
    />
  );
}

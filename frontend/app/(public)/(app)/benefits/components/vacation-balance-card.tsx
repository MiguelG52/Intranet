"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function VacationBalanceCard() {
  const total = 20
  const used = 5
  const available = total - used
  const percentage = (available / total) * 100
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">Saldo de Vacaciones</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center pb-6">
        <div className="relative flex items-center justify-center">
            {/* SVG Circle */}
            <svg className="transform -rotate-90 w-48 h-48">
              <circle
                cx="96"
                cy="96"
                r={radius}
                stroke="currentColor"
                strokeWidth="15"
                fill="transparent"
                className="text-slate-100"
              />
              <circle
                cx="96"
                cy="96"
                r={radius}
                stroke="currentColor"
                strokeWidth="15"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                className="text-primary"
              />
            </svg>
            <div className="absolute flex flex-col items-center text-primary">
               <span className="text-4xl font-bold">{available}</span>
               <span className="text-xs font-semibold uppercase tracking-wider">Días</span>
            </div>
        </div>

        <div className="w-full flex justify-between px-4 mt-6 text-sm">
            <div className="flex flex-col items-center">
                <span className="text-slate-400 font-medium">Total</span>
                <span className="font-bold text-slate-700">{total} días</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-slate-400 font-medium">Usados</span>
                <span className="font-bold text-slate-700">{used} días</span>
            </div>
        </div>
      </CardContent>
    </Card>
  )
}

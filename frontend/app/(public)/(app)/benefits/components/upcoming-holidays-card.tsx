"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "lucide-react"

export function UpcomingHolidaysCard() {
  const holidays = [
    { date: "25", month: "DIC", title: "Navidad", day: "Miércoles" },
    { date: "01", month: "ENE", title: "Año Nuevo", day: "Miércoles" },
    { date: "01", month: "MAY", title: "Día del Trabajo", day: "Jueves" },
  ]

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-2 flex flex-row items-center gap-2 space-y-0">
        <Calendar className="w-5 h-5 text-primary" />
        <CardTitle className="text-lg font-bold">Próximos Feriados</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        {holidays.map((holiday, index) => (
            <div key={index} className="flex items-center gap-4 p-3 bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex flex-col items-center justify-center min-w-[3rem]">
                    <span className="text-xs font-bold text-primary">{holiday.month}</span>
                    <span className="text-xl font-bold text-slate-800">{holiday.date}</span>
                </div>
                <div className="flex flex-col border-l pl-4 border-slate-100">
                    <span className="font-bold text-slate-800">{holiday.title}</span>
                    <span className="text-xs text-slate-400">{holiday.day}</span>
                </div>
            </div>
        ))}
      </CardContent>
    </Card>
  )
}

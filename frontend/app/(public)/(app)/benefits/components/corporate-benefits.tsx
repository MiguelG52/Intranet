"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, ArrowUpRight, HeartPulse, Utensils, Move, GraduationCap } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CorporateBenefits() {
  const benefits = [
    {
        title: "Seguro Médico",
        description: "Cobertura total con Sanitas. Incluye dental y visión.",
        icon: HeartPulse,
        color: "bg-red-50 text-red-500"
    },
    {
        title: "Ticket Restaurante",
        description: "Tarjeta monedero mensual para gastos de comida.",
        icon: Utensils,
        color: "bg-red-50 text-red-500"
    },
    {
        title: "GymPass",
        description: "Acceso a más de 2000 gimnasios a precio reducido.",
        icon: Move,
        color: "bg-red-50 text-red-500"
    },
    {
        title: "Formación",
        description: "Presupuesto anual para cursos y certificaciones.",
        icon: GraduationCap,
        color: "bg-red-50 text-red-500"
    }
  ]

  return (
    <Card className="border-none shadow-md bg-white">
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg font-bold">Beneficios</CardTitle>
        </div>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 h-auto p-0 font-bold cursor-pointer">
            Ver todos <ArrowUpRight className="w-4 h-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-5 pt-4">
        {benefits.map((benefit, index) => (
             <div key={index} className="flex items-start gap-4 group cursor-pointer p-2 hover:bg-slate-50 rounded-lg transition-colors">
                <div className={`p-2 rounded-full ${benefit.color} shrink-0 group-hover:scale-110 transition-transform mt-0.5`}>
                    <benefit.icon className="w-4 h-4" />
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-slate-800 text-sm group-hover:text-primary transition-colors">{benefit.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mt-0.5">
                        {benefit.description}
                    </p>
                </div>
            </div>
        ))}
      </CardContent>
    </Card>
  )
}

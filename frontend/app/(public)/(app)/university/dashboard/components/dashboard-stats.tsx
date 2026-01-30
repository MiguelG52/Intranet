"use client"

import { UniversityCard } from "@/components/ui/university-card"
import { CardContent } from "@/components/ui/card"
import { Trophy, Clock, Map } from "lucide-react"
import { motion } from "framer-motion"

export function DashboardStats() {
    const stats = [
        {
            title: "COMPLETADOS",
            value: "12",
            subtitle: "+2 este mes",
            subtitleColor: "text-green-500", // Red in design but usually green for positive trend, design shows red graph line but maybe red text too? Screenshot says "+2 este mes" with a graph. I will use a simple text for now or keep it like design red if needed. Screenshot has red text.
            icon: Trophy,
            iconColor: "text-red-500",
            bgIcon: "bg-red-50",
            trend: "up"
        },
        {
            title: "HORAS TOTALES",
            value: "24.5h",
            subtitle: "Acumulado anual",
            subtitleColor: "text-slate-400",
            icon: Clock,
            iconColor: "text-slate-700",
            bgIcon: "bg-slate-100",
            trend: "neutral"
        },
        {
            title: "RUTAS ACTIVAS",
            value: "2",
            subtitle: "En progreso",
            subtitleColor: "text-amber-500",
            icon: Map,
            iconColor: "text-slate-700",
            bgIcon: "bg-slate-100",
            trend: "neutral"
        }
    ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                    <UniversityCard className="h-full">
                        <CardContent className="p-6 flex items-start justify-between">
                            <div className="space-y-4">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{stat.title}</p>
                                <div className="space-y-1">
                                    <h3 className="text-4xl font-bold text-slate-900">{stat.value}</h3>
                                    <p className={`text-xs font-medium ${stat.subtitleColor} flex items-center gap-1`}>
                                        {stat.trend === 'up' && <span className="text-lg">↗</span>}
                                        {stat.subtitle}
                                    </p>
                                </div>
                            </div>
                            <div className={`p-3 rounded-full ${stat.bgIcon}`}>
                                <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                            </div>
                        </CardContent>
                    </UniversityCard>
                </motion.div>
            ))}
        </div>
    )
}

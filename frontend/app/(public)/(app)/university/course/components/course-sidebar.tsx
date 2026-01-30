"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Layers, HelpCircle, User } from "lucide-react"

export interface SidebarTab {
    id: string
    label: string
    icon: any
}

interface CourseSidebarProps {
    activeTab: string
    onTabChange: (id: string) => void
    progress: number
    levelLabel: string
}

export function CourseSidebar({ activeTab, onTabChange, progress, levelLabel }: CourseSidebarProps) {
    
    // Circular Progress Calculation
    const radius = 40
    const circumference = 2 * Math.PI * radius
    const strokeDashoffset = circumference - (progress / 100) * circumference

    const tabs: SidebarTab[] = [
        { id: "summary", label: "Resumen del Curso", icon: LayoutDashboard },
        { id: "modules", label: "Módulos", icon: Layers },
    ]

    return (
        <aside className="w-full lg:w-72 flex-shrink-0 space-y-8">
            {/* Progress Circle Card */}
            <div className="bg-white/50 backdrop-blur-3xl rounded-[32px] p-8 flex flex-col items-center justify-center text-center border border-white/60 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-red-50/50 to-transparent pointer-events-none" />
                
                <div className="relative mb-4">
                     {/* SVG Circle */}
                     <svg className="transform -rotate-90 w-32 h-32">
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ff9a9e" />
                            <stop offset="100%" stopColor="#fecfef" />
                            </linearGradient>
                        </defs>
                        <circle
                            cx="64"
                            cy="64"
                            r={radius}
                            stroke="#f1f5f9"
                            strokeWidth="8"
                            fill="transparent"
                        />
                        <circle
                            cx="64"
                            cy="64"
                            r={radius}
                            stroke="#D93036"
                            strokeWidth="8"
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            className="transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(217,48,54,0.5)]"
                        />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xl font-bold text-slate-800">
                        {progress}%
                    </span>
                </div>

                <div className="space-y-1 relative z-10">
                    <h3 className="font-bold text-slate-900">Mi Progreso</h3>
                    <p className="text-xs text-slate-500 font-medium">{levelLabel}</p>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-2">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id
                    const Icon = tab.icon
                    
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={cn(
                                "w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-200 text-sm font-bold",
                                isActive 
                                    ? "bg-white text-[#D93036] shadow-md shadow-slate-200/50" 
                                    : "text-slate-400 hover:text-slate-600 hover:bg-white/40"
                            )}
                        >
                            <Icon className={cn("w-5 h-5", isActive ? "text-[#D93036]" : "currentColor")} />
                            {tab.label}
                            
                            {/* Active Indicator dot */}
                            {isActive && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#D93036]" />
                            )}
                        </button>
                    )
                })}
            </nav>

            {/* Support Card */}
            <div className="bg-white rounded-[24px] p-4 flex items-center gap-4 shadow-sm border border-slate-100 mt-auto">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                    <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                     <p className="text-xs font-bold text-slate-800">¿Necesitas ayuda?</p>
                     <p className="text-[10px] text-slate-500">Contactar mentor</p>
                </div>
            </div>
        </aside>
    )
}

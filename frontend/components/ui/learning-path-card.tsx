"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress" // Keeping Progress for fallback if circle not desired, but user screenshot shows circle.
import { Clock, Layers } from "lucide-react"
import { motion } from "framer-motion"

interface LearningPathCardProps {
  title: string
  subtitle?: string // e.g. "Development" in screenshot
  progress: number
  totalModules: number
  completedModules?: number
  timeRemaining?: string
  image?: string // For background or icon
  className?: string
  onClick?: () => void
}

export function LearningPathCard({
  title,
  subtitle,
  progress,
  totalModules,
  completedModules,
  timeRemaining,
  className,
  onClick
}: LearningPathCardProps) {

  // Calculate generic modules completed if not provided
  const modulesDone = completedModules ?? Math.round((progress / 100) * totalModules)

  // Circular progress calculation
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div 
        onClick={onClick}
        className={cn(
            "group relative overflow-hidden rounded-[32px] cursor-pointer transition-all duration-300 hover:scale-[1.02]",
            "bg-white/80 backdrop-blur-xl border border-white/40 shadow-sm", // Liquid Glass / White Theme Base
            "hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-white/60",
            className
        )}
    >
        {/* Background Decorative Blur/Gradient */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-gradient-to-br from-red-50/50 to-blue-50/50 rounded-full blur-3xl opacity-60 group-hover:opacity-80 transition-opacity" />
        
        <div className="relative p-8 h-full flex flex-col justify-between min-h-[280px]">
            
            {/* Top Section: Tag and Progress Circle */}
            <div className="flex justify-between items-start mb-8">
                {subtitle && (
                    <Badge variant="outline" className="rounded-xl px-3 py-1.5 text-[10px] font-bold tracking-wider text-slate-500 border-slate-200/60 bg-white/50 backdrop-blur-md uppercase">
                        {subtitle}
                    </Badge>
                )}

                {/* Circular Progress */}
                <div className="relative flex items-center justify-center w-14 h-14">
                    {/* Background Circle */}
                    <svg className="transform -rotate-90 w-full h-full">
                        <circle
                            cx="28"
                            cy="28"
                            r={radius}
                            stroke="currentColor"
                            strokeWidth="3.5" // Slightly thicker
                            fill="transparent"
                            className="text-slate-100"
                        />
                        {/* Progress Circle */}
                        <circle
                            cx="28"
                            cy="28"
                            r={radius}
                            stroke="currentColor"
                            strokeWidth="3.5"
                            fill="transparent"
                            strokeDasharray={circumference}
                            strokeDashoffset={strokeDashoffset}
                            strokeLinecap="round"
                            className={cn(
                                "transition-all duration-1000 ease-out",
                                progress === 100 ? "text-emerald-500" : "text-[#D93036]"
                            )}
                        />
                    </svg>
                    <span className="absolute text-[10px] font-bold text-slate-700">
                        {progress}%
                    </span>
                </div>
            </div>

            {/* Bottom Section: Icon, Title, Stats */}
            <div className="space-y-4">
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-white/60 shadow-sm flex items-center justify-center text-slate-700 group-hover:scale-110 transition-transform duration-300">
                    <Layers className="w-5 h-5 text-slate-600" />
                </div>

                <div>
                    <h3 className="text-2xl font-bold text-slate-800 tracking-tight leading-tight group-hover:text-[#D93036] transition-colors">
                        {title}
                    </h3>
                </div>

                <div className="flex items-center gap-4 text-xs font-medium text-slate-400 pt-2">
                    {timeRemaining && (
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{timeRemaining} restantes</span>
                        </div>
                    )}
                    <div className="flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5" />
                        <span>{modulesDone}/{totalModules} Módulos</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

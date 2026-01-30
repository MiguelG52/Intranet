"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, Share2, ChevronRight } from "lucide-react"
import Link from "next/link"
import { GradientHeader } from "@/components/common/header/gradient-header"

interface CourseHeaderProps {
  title: string
  progress: number
  onBack?: () => void
}

export function CourseHeader({ title, progress, onBack }: CourseHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-4">
      <div className="flex items-center gap-4">
        <Link href="/university/my-learn">
            <Button variant="ghost" size="icon" className="hover:bg-slate-100 rounded-full mt-1">
            <ArrowLeft className="w-5 h-5 text-slate-700" />
            </Button>
        </Link>
        <div className="flex-1">
             <h1 className="text-xl md:text-2xl font-bold text-slate-900">{title}</h1>
        </div>
      </div>

      <div className="flex items-center gap-4 w-full md:w-auto justify-end">
        {/* Progress */}
        <div className="flex items-center gap-2">
           <div className="relative w-10 h-10 flex items-center justify-center">
                <svg className="transform -rotate-90 w-full h-full">
                    <circle cx="20" cy="20" r="16" stroke="#e2e8f0" strokeWidth="3" fill="transparent" />
                    <circle cx="20" cy="20" r="16" stroke="#D93036" strokeWidth="3" fill="transparent" 
                        strokeDasharray={100} 
                        strokeDashoffset={100 - progress} 
                        className="transition-all duration-500"
                    />
                </svg>
                <span className="absolute text-[10px] font-bold text-slate-700">{progress}%</span>
           </div>
        </div>

        <Button variant="ghost" className="text-slate-500 hover:text-slate-700 gap-2">
            <Share2 className="w-4 h-4" />
            <span className="hidden sm:inline">Compartir</span>
        </Button>

        <Button className="rounded-full bg-[#D93036] hover:bg-[#b02227] text-white px-6 font-bold shadow-lg shadow-red-500/20">
            Siguiente
            <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  )
}

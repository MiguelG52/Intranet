"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Check, Lock, RotateCw, Clock, ArrowRight } from "lucide-react"

export type ModuleStatus = 'completed' | 'in-progress' | 'locked'

export interface ModuleData {
  id: string
  number: string
  title: string
  description: string
  duration: string
  status: ModuleStatus
  tags?: string[]
  progress?: number
}

interface ModuleTimelineCardProps {
  module: ModuleData
  isLast?: boolean
  onClick?: () => void
}

export function ModuleTimelineCard({ module, isLast, onClick }: ModuleTimelineCardProps) {
  return (
    <div className="flex gap-6 group relative">
       {/* Timeline Line - Connecting lines */}
      {!isLast && (
        <div className="absolute left-[24px] top-12 bottom-[-24px] w-0.5 bg-slate-200" />
      )}
      
      {/* Icon Node */}
      <div className="relative z-10 flex-shrink-0 mt-5">
        {module.status === 'completed' && (
          <div className="w-12 h-12 rounded-full bg-[#D93036] flex items-center justify-center shadow-md shadow-red-200">
            <Check className="w-6 h-6 text-white" />
          </div>
        )}
        
        {module.status === 'in-progress' && (
          <div className="w-12 h-12 rounded-full bg-white border-4 border-[#D93036] flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
            <RotateCw className="w-5 h-5 text-[#D93036] animate-pulse-slow" /> 
          </div>
        )}
        
        {module.status === 'locked' && (
          <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
            <Lock className="w-5 h-5 text-slate-400" />
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className={cn(
        "flex-1 rounded-[24px] p-8 transition-all duration-300 border relative overflow-hidden",
        
        // Styles based on status
        module.status === 'completed' && 
          "bg-white/80 backdrop-blur-sm shadow-sm border-white/60 hover:shadow-md",
          
        module.status === 'in-progress' && 
          "bg-white backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.06)] border-[#D93036] ring-1 ring-[#D93036]/20",
          
        module.status === 'locked' && 
          "bg-slate-50/50 border-slate-100 opacity-80"
      )}>
        {/* Glow effect for in-progress */}
        {module.status === 'in-progress' && (
           <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 bg-red-500/5 rounded-full blur-3xl" />
        )}

        {/* Header: Tag + Time */}
        <div className="flex justify-between items-center mb-3">
          <div className={cn(
            "text-[10px] font-extrabold tracking-widest uppercase flex items-center gap-1.5",
            module.status === 'completed' ? "text-[#D93036]" : 
            module.status === 'in-progress' ? "text-[#D93036]" : "text-slate-400"
          )}>
            {module.status === 'in-progress' && <span className="w-1.5 h-1.5 rounded-full bg-[#D93036] animate-pulse" />}
            MÓDULO {module.number} • {module.status === 'completed' ? 'COMPLETADO' : module.status === 'in-progress' ? 'EN CURSO' : 'BLOQUEADO'}
          </div>
          
          <div className="flex items-center gap-1 text-xs font-medium text-slate-400">
             <Clock className="w-3.5 h-3.5" />
             <span>{module.duration}</span>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className={cn(
            "text-xl font-bold mb-2",
            module.status === 'locked' ? "text-slate-400" : "text-slate-800"
        )}>
            {module.title}
        </h3>
        <p className="text-sm text-slate-500 mb-6 leading-relaxed max-w-2xl">
            {module.description}
        </p>

        {/* Footer Actions / Tags */}
        {module.status === 'completed' && (
            <div className="flex gap-2">
                {module.tags?.map(tag => (
                   <Badge key={tag} variant="secondary" className="bg-slate-100 text-slate-600 hover:bg-slate-200 border-0 rounded-lg px-3 font-medium">
                     {tag}
                   </Badge> 
                ))}
            </div>
        )}

        {module.status === 'in-progress' && (
            <div className="space-y-5">
                 <div className="space-y-2">
                     <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                         <span>Progreso del módulo</span>
                         <span className="text-[#D93036]">{module.progress}%</span>
                     </div>
                     <Progress value={module.progress} className="h-2 bg-slate-100" indicatorClassName="bg-[#D93036]" />
                 </div>
                 
                 <Button onClick={onClick} className="rounded-xl bg-[#D93036] hover:bg-[#b02227] text-white shadow-lg shadow-red-500/20 px-6 h-11 transition-all hover:scale-105">
                     Continuar Lección
                     <ArrowRight className="ml-2 w-4 h-4" />
                 </Button>
            </div>
        )}
      </div>
    </div>
  )
}

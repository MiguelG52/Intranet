"use client"

import { cn } from "@/lib/utils"
import { Check, Lock, PlayCircle, Clock } from "lucide-react"

export type LessonStatus = 'locked' | 'completed' | 'current' | 'available'

interface LessonItemProps {
  title: string
  duration: string
  status: LessonStatus
  onClick?: () => void
}

export function LessonItem({ title, duration, status, onClick }: LessonItemProps) {
  return (
    <div 
        onClick={status !== 'locked' ? onClick : undefined}
        className={cn(
            "flex items-start gap-4 p-4 rounded-2xl transition-all duration-200 cursor-pointer group",
            // Styles based on status
            status === 'current' ? "bg-[#D93036] text-white shadow-lg shadow-red-500/20" : "hover:bg-slate-50",
            status === 'locked' && "opacity-50 cursor-not-allowed hover:bg-transparent"
        )}
    >
      {/* Status Icon */}
      <div className="flex-shrink-0 mt-0.5">
          {status === 'current' && (
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <PlayCircle className="w-5 h-5 text-white fill-white/20" />
              </div>
          )}
          
          {status === 'completed' && (
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-4 h-4 text-green-600" />
              </div>
          )}

          {status === 'locked' && (
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200">
                  <Lock className="w-4 h-4 text-slate-400" />
              </div>
          )}

          {status === 'available' && (
               <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm transition-all">
                  <PlayCircle className="w-5 h-5 text-slate-400 group-hover:text-[#D93036]" />
               </div>
          )}
      </div>

      <div className="flex-1 min-w-0">
          <h4 className={cn(
              "text-sm font-bold mb-1 leading-snug",
              status === 'current' ? "text-white" : "text-slate-700"
          )}>
              {title}
          </h4>
          
          <div className={cn(
              "flex items-center gap-1.5 text-xs font-medium",
              status === 'current' ? "text-red-100" : "text-slate-400"
          )}>
               {status === 'current' ? (
                   <>
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    Reproduciendo
                   </>
               ) : (
                   <span>{duration}</span>
               )}
          </div>
      </div>
    </div>
  )
}

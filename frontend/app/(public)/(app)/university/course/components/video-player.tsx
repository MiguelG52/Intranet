"use client"

import { Play } from "lucide-react"

export function VideoPlayer() {
  return (
    <div className="relative aspect-video w-full rounded-[32px] overflow-hidden bg-slate-900 shadow-xl group cursor-pointer">
      <img 
        src="/images/placeholder-video.jpg" 
        alt="Video thumbnail"
        className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-300"
      />
      
      {/* Play Button Overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 transition-transform duration-300 group-hover:scale-110">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-lg">
                <Play className="w-5 h-5 text-slate-900 fill-slate-900 ml-1" />
            </div>
        </div>
      </div>
    </div>
  )
}

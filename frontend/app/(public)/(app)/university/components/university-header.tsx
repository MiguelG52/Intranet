"use client"

import { cn } from "@/lib/utils"

interface UniversityHeaderProps {
  className?: string
}

export function UniversityHeader({ className }: UniversityHeaderProps) {
  return (
    <div className={cn("relative flex flex-col items-start justify-center py-12", className)}>
      <h1 
        className="text-6xl md:text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-primary bg-300% animate-gradient duration-500 cursor-default select-none"
        style={{
             backgroundSize: "200% auto",
        }}
      >
        Universidad Asha
      </h1>
      <p className="mt-4 text-muted-foreground text-xl md:text-2xl font-light hover:text-primary transition-colors duration-300">
        Empoderando el futuro a través del conocimiento.
      </p>
    </div>
  )
}

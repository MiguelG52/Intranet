"use client"

import { cn } from "@/lib/utils"

interface GradientHeaderProps {
  title: string
  subtitle?: string
  className?: string
  children?: React.ReactNode
}

export function GradientHeader({ title, subtitle, className, children }: GradientHeaderProps) {
  return (
    <div className={cn("relative flex flex-col items-start justify-center py-6", className)}>
      <h1 
        className="text-4xl md:text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary via-blue-500 to-primary bg-300% animate-gradient duration-500 cursor-default select-none pb-2"
        style={{
             backgroundSize: "200% auto",
        }}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 text-muted-foreground text-lg md:text-xl font-light hover:text-primary transition-colors duration-300">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  )
}

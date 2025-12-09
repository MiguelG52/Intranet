import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

interface LiquidHeaderProps {
  title: string
  subtitle: string
  icon: LucideIcon
  children?: React.ReactNode
  className?: string
}

export function LiquidHeader({ title, subtitle, icon: Icon, children, className }: LiquidHeaderProps) {
  return (
    <div className={cn("relative overflow-hidden rounded-3xl bg-white/40 p-8 shadow-md backdrop-blur-xl border border-white/20", className)}>
        {/* Floating Elements - Updated to Primary/Reddish tones */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
            <Icon className="h-8 w-8" />
          </div>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {title}
            </h1>
            <p className="text-gray-500">
              {subtitle}
            </p>
          </div>
        </div>

        {children && (
            <div className="mt-8">
                {children}
            </div>
        )}
      </div>
  )
}

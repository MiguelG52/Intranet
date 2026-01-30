import * as React from "react"
import { cn } from "@/lib/utils"

const UniversityCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-[2rem] bg-white border-none shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300",
      className
    )}
    {...props}
  />
))
UniversityCard.displayName = "UniversityCard"

export { UniversityCard }

"use client"

import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react"

export interface FilterTabItem {
  id: string
  label: string
  icon: LucideIcon
  count?: number
}

interface FilterTabsProps {
  items: FilterTabItem[]
  activeTab: string
  onTabChange: (id: string) => void
  className?: string
}

export function FilterTabs({ items, activeTab, onTabChange, className }: FilterTabsProps) {
  return (
    <div className={cn("flex flex-col md:flex-row justify-start items-center gap-4 bg-white p-2 rounded-3xl shadow-sm mb-8 w-fit shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]", className)}>
      <div className="bg-gray-100/50 p-1 rounded-2xl h-auto flex gap-1 flex-wrap">
        {items.map((item) => {
          const isActive = activeTab === item.id
          const Icon = item.icon
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-2 transition-all text-sm font-medium",
                isActive 
                  ? "bg-white text-red-600 shadow-sm" 
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
              {item.count !== undefined && (
                <span className={cn(
                  "ml-1 rounded-full px-2 py-0.5 text-xs font-medium",
                  isActive ? "bg-red-100 text-red-600" : "bg-gray-200 text-gray-600"
                )}>
                  {item.count}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

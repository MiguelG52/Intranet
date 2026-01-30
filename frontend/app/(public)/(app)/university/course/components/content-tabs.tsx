"use client"

import { cn } from "@/lib/utils"

interface ContentTabsProps {
    activeTab: string
    onTabChange: (id: string) => void
}

export function ContentTabs({ activeTab, onTabChange }: ContentTabsProps) {
    const tabs = [
        { id: 'description', label: 'Descripción' },
        { id: 'resources', label: 'Recursos' },
        { id: 'notes', label: 'Notas' }
    ]

    return (
        <div className="bg-white p-1.5 rounded-[20px] inline-flex items-center gap-1 shadow-sm border border-slate-100">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={cn(
                        "px-6 py-2.5 rounded-2xl text-sm font-bold transition-all duration-200",
                        activeTab === tab.id 
                            ? "bg-slate-900 text-white shadow-md" 
                            : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                    )}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    )
}

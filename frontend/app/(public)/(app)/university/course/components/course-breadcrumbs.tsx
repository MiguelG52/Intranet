"use client"

import { ChevronRight, Home, Grid } from "lucide-react"
import Link from "next/link"

interface BreadcrumbsProps {
  items: {
    label: string
    href: string
  }[]
}

export function CourseBreadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-2">
       <Link href="/university" className="hover:text-slate-600 transition-colors">
            <LayoutGridIcon className="w-4 h-4" />
       </Link>
       
       {items.map((item, index) => (
         <div key={item.href} className="flex items-center gap-2">
            <ChevronRight className="w-3 h-3 text-slate-300" />
            <Link 
                href={item.href} 
                className={`hover:text-slate-600 transition-colors ${index === items.length - 1 ? 'text-slate-600 font-bold' : ''}`}
            >
                {item.label}
            </Link>
         </div>
       ))}
    </nav>
  )
}

function LayoutGridIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 13H17V17H7V13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7 7H11V11H7V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13 7H17V11H13V7Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

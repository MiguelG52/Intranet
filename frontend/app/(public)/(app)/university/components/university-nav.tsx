"use client"

import Link from "next/link"
import { NavTabs, TabItem } from "@/components/common/nav-tabs"
import { LayoutDashboard, BookOpen, GraduationCap, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export function UniversityNav() {
  const navItems: TabItem[] = [
    {
      name: "Resumen",
      href: "/university/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Mi Aprendizaje",
      href: "/university/my-learn",
      icon: BookOpen,
    },
    {
      name: "Certificados",
      href: "/university/certificates",
      icon: GraduationCap,
    },
  ]

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 w-full">
        <Link href="/university">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Inicio
            </Button>
        </Link>
        
        <div className="w-full md:w-auto">
             <NavTabs tabs={navItems} />
        </div>
    </div>
  )
}

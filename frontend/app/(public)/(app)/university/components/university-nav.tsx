"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BookOpen, GraduationCap, LayoutDashboard, Home, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  {
    title: "Panel",
    href: "/university/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Mis Cursos",
    href: "/university/my-learn",
    icon: BookOpen,
  },
  {
    title: "Certificados",
    href: "/university/certificates",
    icon: GraduationCap,
  },
]

export function UniversityNav() {
  const pathname = usePathname()

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <Link href="/university">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver al Inicio
            </Button>
        </Link>

        <nav className="flex items-center gap-1 p-1 bg-muted/50 rounded-xl w-fit">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href)

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                  isActive 
                    ? "bg-white text-primary shadow-sm" 
                    : "text-muted-foreground hover:text-foreground hover:bg-white/50"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            )
          })}
        </nav>
    </div>
  )
}

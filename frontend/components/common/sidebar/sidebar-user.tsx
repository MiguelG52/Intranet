'use client'
import { memo, useMemo } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useSession } from "@/lib/context/session-provider"
import { LogOut, Settings } from "lucide-react"
import { usePathname } from "next/navigation"
import { useSidebar } from "@/components/ui/sidebar"


interface AdminBadgeProps {
  isOpen: boolean
}

const AdminBadge = memo(function AdminBadge({ isOpen }: AdminBadgeProps) {
  const pathname = usePathname()
  const isAdminRoute = pathname.startsWith('/admin')
  // Mostrar solo si es ruta de admin y el sidebar está abierto
  if (!isAdminRoute || !isOpen) return null
  return (
    <h2 className="mb-1 px-2 text-center text-xs font-semibold uppercase text-muted-foreground">
      admin panel
    </h2>
  )
})

const SidebarUser = () => {
  const { user } = useSession()
  const {open} = useSidebar();

  const { displayName, email, initials } = useMemo(() => {
    const name = user ? `${user.name} ${user.lastname}` : 'Usuario'
    const mail = user?.email ?? 'sin-email@ashasolution.com'
    const ini = (user ? `${user.name?.[0] ?? ''}${user.lastname?.[0] ?? ''}` : 'US').toUpperCase()
    return { displayName: name, email: mail, initials: ini }
  }, [user])

  return (
    <header className="py-2">
      <AdminBadge isOpen={open} />
      <div className="cursor-pointer">
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer" asChild>
            <Button variant="ghost" className="w-full justify-start gap-3 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              {open && (
                <div className="flex flex-col items-start text-sm">
                  <span className="font-medium">{displayName}</span>
                  <span className="text-xs text-gray-500">{email}</span>
                </div>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Configuración
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default memo(SidebarUser)

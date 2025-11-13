'use client'
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import SidebarNavigation from './sidebarMenu'
import { PrivateRoutes } from '@/lib/consts/routes'
import { BookOpen, ClipboardList, Clock, FileText, Gift, Home, LucideProps, Settings, ShieldUserIcon, User, Users } from 'lucide-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'


export type SidebarNavigationItem = {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

const CustomSidebar = () => {

  const items: SidebarNavigationItem[] = [
  { title: 'Inicio', url: PrivateRoutes.HOME, icon: Home },
  { title: 'Perfil', url: PrivateRoutes.PROFILE, icon: User },
  { title: 'Beneficios', url: PrivateRoutes.BENEFICIOS, icon: Gift },
  { title: 'Directorio', url: PrivateRoutes.DIRECTORIO, icon: Users },
  { title: 'Tiempo Libre', url: PrivateRoutes.TIEMPO_LIBRE, icon: Clock },
  { title: 'Cursos', url: PrivateRoutes.CURSOS, icon: BookOpen },
  { title: 'Encuestas', url: PrivateRoutes.ENCUESTAS, icon: ClipboardList },
  { title: 'Documentos', url: PrivateRoutes.DOCUMENTOS, icon: FileText },
  { title: 'Configuración', url: PrivateRoutes.SETTINGS, icon: Settings },
  { title: 'Administración', url: PrivateRoutes.ADMIN, icon: ShieldUserIcon },
]


  return (
    <Sidebar collapsible='icon' >
      <SidebarHeader>
      </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarNavigation items={items} />
          </SidebarGroup>
        </SidebarContent>
      
    </Sidebar>
  )
}

export default CustomSidebar
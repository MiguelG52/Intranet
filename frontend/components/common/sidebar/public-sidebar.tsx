'use client'
import CustomSidebar, { SidebarNavigationItem } from './sidebar'
import { PrivateRoutes } from '@/lib/consts/routes'
import { BookOpen, ClipboardList, Clock, FileText, Gift, Home, NewspaperIcon, Settings, ShieldUserIcon, User, Users } from 'lucide-react'

const PublicSidebar = () => {
    
  const items: SidebarNavigationItem[] = [
  { title: 'Inicio', url: PrivateRoutes.HOME, icon: Home },
  { title: 'Perfil', url: PrivateRoutes.PROFILE, icon: User },
  { title: 'Noticias', url: PrivateRoutes.NEWS, icon: NewspaperIcon },
  { title: 'Beneficios', url: PrivateRoutes.BENEFICIOS, icon: Gift },
  { title: 'Directorio', url: PrivateRoutes.DIRECTORIO, icon: Users },
  { title: 'Universidad', url: PrivateRoutes.CURSOS, icon: BookOpen },
  { title: 'Encuestas', url: PrivateRoutes.ENCUESTAS, icon: ClipboardList },
  { title: 'Documentos', url: PrivateRoutes.DOCUMENTOS, icon: FileText },
  { title: 'Administración', url: PrivateRoutes.ADMIN, icon: ShieldUserIcon },
]
  return (
    <CustomSidebar items={items} />
  )
}

export default PublicSidebar
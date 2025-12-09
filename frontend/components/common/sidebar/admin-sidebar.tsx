'use client'
import CustomSidebar, { SidebarNavigationItem } from './sidebar'
import { AdminRoutes } from '@/lib/consts/routes'
import { BookOpen, ClipboardList, FileTextIcon, GiftIcon, LayoutDashboardIcon, NewspaperIcon, Users, Building2 } from 'lucide-react'

const AdminSidebar = () => {
    
  const items: SidebarNavigationItem[] = [
  { title: 'Dashboard', url: AdminRoutes.ADMIN_DASHBOARD, icon: LayoutDashboardIcon },
  { title: 'Noticias', url: AdminRoutes.ADMIN_NEWS, icon: NewspaperIcon },
  { title: 'Documentos', url: AdminRoutes.ADMIN_DOCUMENTS, icon: FileTextIcon },
  { title: 'Usuarios', url: AdminRoutes.ADMIN_USERS, icon: Users },
  { title: 'Cursos', url: AdminRoutes.ADMIN_COURSES, icon: BookOpen },
  { title: 'Encuestas', url: AdminRoutes.ADMIN_QUIZ, icon: ClipboardList },
  { title: 'Beneficios', url: AdminRoutes.ADMIN_BENEFITS, icon: GiftIcon },
  { title: 'Organización', url: AdminRoutes.ADMIN_ORGANIZATION, icon: Building2 },
]
  return (
    <CustomSidebar items={items} />
  )
}

export default AdminSidebar
'use client'
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader} from '@/components/ui/sidebar'
import SidebarNavigation from './sidebarMenu'
import { LucideProps } from 'lucide-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'
import SidebarUser from './sidebar-user'
import { Separator } from '@/components/ui/separator'


export type SidebarNavigationItem = {
  title: string;
  url: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
}

const CustomSidebar = ({ items }: { items: SidebarNavigationItem[] }) => {

  return (
    <Sidebar collapsible='icon' >
      <SidebarHeader>
        <SidebarUser/>
        <Separator/>
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
import { SidebarMenuButton, SidebarMenuItem, SidebarMenu } from '@/components/ui/sidebar'
import Link from 'next/link'
import { SidebarNavigationItem } from './sidebar';
import { ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

export type SibarNavigationProps ={
  items: SidebarNavigationItem[];
}

const SidebarNavigation = ({items = []}: SibarNavigationProps) => {
  const pathname = usePathname()
  return (
    <SidebarMenu>
        {items.map((item) => {
          const isActive = pathname === item.url
          return(
            <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
                <Link 
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        isActive ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100"
                  }`}

                  href={item.url}>
                    <item.icon className='text-primary'/>
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
          )
        })}
    </SidebarMenu>
  )
}

export default SidebarNavigation
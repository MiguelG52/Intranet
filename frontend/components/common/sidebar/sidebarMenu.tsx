import { SidebarMenuButton, SidebarMenuItem, SidebarMenu } from '@/components/ui/sidebar'
import Link from 'next/link'
import { SidebarNavigationItem } from './sidebar';
import { ChevronRight } from 'lucide-react';

export type SibarNavigationProps ={
  items: SidebarNavigationItem[];
}

const SidebarNavigation = ({items = []}: SibarNavigationProps) => {
  return (
    <SidebarMenu>
        {items.map((item) => (
        <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild>
                <Link href={item.url}>
                    <item.icon className='text-primary'/>
                    <span className='font-semibold'>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    ))}
    </SidebarMenu>
  )
}

export default SidebarNavigation
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Building2, Globe, Briefcase } from 'lucide-react';

export function OrganizationNav() {
  const pathname = usePathname();

  const tabs = [
    {
      name: 'Países',
      href: '/admin/organization/countries',
      icon: Globe,
      count: 5, // This could be dynamic if passed as prop
      activePattern: /\/countries/,
    },
    {
      name: 'Áreas',
      href: '/admin/organization/areas',
      icon: Building2,
      count: 6,
      activePattern: /\/areas/,
    },
    {
      name: 'Puestos',
      href: '/admin/organization/positions',
      icon: Briefcase,
      count: 7,
      activePattern: /\/positions/,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-white p-2 rounded-3xl shadow-sm mb-6">
      <div className="bg-gray-100/50 p-1 rounded-2xl h-auto flex gap-1">
        {tabs.map((tab) => {
          const isActive = tab.activePattern.test(pathname);
          const Icon = tab.icon;
          
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "flex items-center gap-2 rounded-xl px-4 py-2 transition-all text-sm font-medium",
                isActive 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50"
              )}
            >
              <Icon className="h-4 w-4" />
              {tab.name}
              <span className={cn(
                "ml-1 rounded-full px-2 py-0.5 text-xs font-medium",
                isActive ? "bg-red-100 text-red-600" : "bg-gray-200 text-gray-600"
              )}>
                {tab.count}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

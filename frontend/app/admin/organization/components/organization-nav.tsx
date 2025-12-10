'use client';

import { Building2, Globe, Briefcase } from 'lucide-react';
import { NavTabs, TabItem } from '@/components/common/nav-tabs';

export function OrganizationNav() {
  const tabs: TabItem[] = [
    {
      name: 'Países',
      href: '/admin/organization/countries',
      icon: Globe,
      activePattern: /\/countries/,
    },
    {
      name: 'Áreas',
      href: '/admin/organization/areas',
      icon: Building2,
      activePattern: /\/areas/,
    },
    {
      name: 'Puestos',
      href: '/admin/organization/positions',
      icon: Briefcase,
      activePattern: /\/positions/,
    },
  ];

  return <NavTabs tabs={tabs} />;
}

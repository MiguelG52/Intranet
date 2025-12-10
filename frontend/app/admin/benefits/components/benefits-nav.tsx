'use client';

import { Gift, Tag } from 'lucide-react';
import { NavTabs, TabItem } from '@/components/common/nav-tabs';

export function BenefitsNav() {
  const tabs: TabItem[] = [
    {
      name: 'Beneficios',
      href: '/admin/benefits/list',
      icon: Gift,
    },
    {
      name: 'Tipos de Beneficios',
      href: '/admin/benefits/types',
      icon: Tag,
    },
  ];

  return <NavTabs tabs={tabs} />;
}

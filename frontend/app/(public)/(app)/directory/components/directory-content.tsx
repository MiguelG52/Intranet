'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Users, Network } from "lucide-react";
import { UserProfile } from '@/lib/schemas/responses/users.response';
import { OrgChart } from '@/components/common/tree/org-chart';
import { DirectoryList } from './directory-list';
import { LiquidHeader } from '@/components/common/header/liquid-header';


interface DirectoryContentProps {
  initialUsers: UserProfile[];
}

export function DirectoryContent({ initialUsers }: DirectoryContentProps) {
  const [search, setSearch] = useState('');
  const [activeSearch, setActiveSearch] = useState('');

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  return (
    <>
      <LiquidHeader
        title="Directorio de Empleados"
        subtitle="Encuentra y conecta con tu equipo"
        icon={Users}
      />

      <div className="mb-8 mt-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Buscar por nombre, cargo, departamento..." 
            className="pl-10 border-gray-200 h-12 rounded-xl"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <Tabs defaultValue="directory" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="directory" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Directorio
          </TabsTrigger>
          <TabsTrigger value="org-chart" className="flex items-center gap-2">
            <Network className="h-4 w-4" />
            Organigrama
          </TabsTrigger>
        </TabsList>
        
        <div className="mt-6 min-h-[400px] rounded-3xl bg-white/50 p-6 shadow-xl ring-1 ring-gray-900/5 backdrop-blur-xl">
          <TabsContent value="directory" className="mt-0">
            <DirectoryList 
              key={activeSearch} 
              search={activeSearch} 
              initialUsers={activeSearch === '' ? initialUsers : []} 
            />
          </TabsContent>

          <TabsContent value="org-chart" className="mt-0">
            <OrgChart />
          </TabsContent>
        </div>
      </Tabs>
    </>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search, Users, Network } from "lucide-react";
import { UserProfile } from '@/lib/schemas/responses/users.response';
import { OrgChart } from '@/components/common/tree/org-chart';
import { DirectoryList } from './directory-list';


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
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 bg-white p-6 rounded-lg shadow-md">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Directorio de Empleados</h1>
          <p className="text-gray-500">Encuentra y conecta con tu equipo</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input 
            placeholder="Buscar por nombre, cargo, departamento..." 
            className="pl-10 border-primary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

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
        
        <TabsContent value="directory" className="mt-6">
          <DirectoryList 
            key={activeSearch} 
            search={activeSearch} 
            initialUsers={activeSearch === '' ? initialUsers : []} 
          />
        </TabsContent>

        <TabsContent value="org-chart">
          <OrgChart />
        </TabsContent>
      </Tabs>
    </>
  );
}

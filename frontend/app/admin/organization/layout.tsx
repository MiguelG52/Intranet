import { LiquidHeader } from '@/components/common/header/liquid-header';
import { Building2, Globe, MapPin, Briefcase } from 'lucide-react';
import { OrganizationNav } from './components/organization-nav';

export default function OrganizationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-8 p-6 min-h-screen bg-gray-50/50">
      <LiquidHeader
        title="Estructura Organizacional"
        subtitle="Gestiona la jerarquía y distribución global de la empresa"
        icon={Building2}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="group relative overflow-hidden rounded-2xl bg-white/60 p-4 transition-all hover:bg-white/80 hover:shadow-lg cursor-default">
                <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-green-100 p-3 text-green-600">
                        <Globe className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Países Activos</p>
                        <p className="text-2xl font-bold text-gray-900">--</p>
                    </div>
                </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl bg-white/60 p-4 transition-all hover:bg-white/80 hover:shadow-lg cursor-default">
                <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
                        <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Áreas Operativas</p>
                        <p className="text-2xl font-bold text-gray-900">--</p>
                    </div>
                </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl bg-white/60 p-4 transition-all hover:bg-white/80 hover:shadow-lg cursor-default">
                <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-purple-100 p-3 text-purple-600">
                        <Briefcase className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Puestos Definidos</p>
                        <p className="text-2xl font-bold text-gray-900">--</p>
                    </div>
                </div>
            </div>
        </div>
      </LiquidHeader>

      <OrganizationNav />

      <div className="min-h-[400px] rounded-3xl bg-white/50 p-6 shadow-xl ring-1 ring-gray-900/5 backdrop-blur-xl">
        {children}
      </div>
    </div>
  );
}

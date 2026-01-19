import { LiquidHeader } from '@/components/common/header/liquid-header';
import { Gift, Tag, Heart } from 'lucide-react';
import { BenefitsNav } from './components/benefits-nav';

export default function BenefitsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-8 p-6 min-h-screen bg-gray-50/50">
      <LiquidHeader
        title="Gestión de Beneficios"
        subtitle="Administra los beneficios y sus categorías para los empleados"
        icon={Gift}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="group relative overflow-hidden rounded-2xl bg-white/60 p-4 transition-all hover:bg-white/80 hover:shadow-lg cursor-default">
                <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-pink-100 p-3 text-pink-600">
                        <Heart className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Total Beneficios</p>
                        <p className="text-2xl font-bold text-gray-900">--</p>
                    </div>
                </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl bg-white/60 p-4 transition-all hover:bg-white/80 hover:shadow-lg cursor-default">
                <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-indigo-100 p-3 text-indigo-600">
                        <Tag className="h-6 w-6" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">Tipos Definidos</p>
                        <p className="text-2xl font-bold text-gray-900">--</p>
                    </div>
                </div>
            </div>
        </div>
      </LiquidHeader>

      <div className="space-y-6">
        <BenefitsNav />
        <div className="min-h-[400px] rounded-3xl bg-white/50 p-6 shadow-xl ring-1 ring-gray-900/5 backdrop-blur-xl">
          {children}
        </div>
      </div>
    </div>
  );
}

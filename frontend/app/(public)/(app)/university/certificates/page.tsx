"use client"

import { UniversityNav } from "../components/university-nav"
import { GradientHeader } from "@/components/common/header/gradient-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { UniversityCard } from "@/components/ui/university-card"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Search, CheckCircle, Award, Shield, BarChart3, Calendar, Download } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
// Using the same filter component usage pattern
import { FilterTabs, FilterTabItem } from "@/components/common/filter-tabs"

const certificatesData = [
    {
        id: "1",
        title: "Gestión del Tiempo",
        category: "Liderazgo Efectivo",
        date: "15 Oct 2023",
        icon: Award,
        downloadUrl: "#"
    },
    {
        id: "2",
        title: "Comunicación Asertiva",
        category: "Soft Skills",
        date: "22 Sep 2023",
        icon: CheckCircle, 
        downloadUrl: "#"
    },
    {
        id: "3",
        title: "Seguridad de la Información",
        category: "Cumplimiento Normativo",
        date: "10 Ago 2023",
        icon: Shield,
        downloadUrl: "#"
    },
    {
        id: "4",
        title: "Excel Avanzado",
        category: "Herramientas Digitales",
        date: "05 Jul 2023",
        icon: BarChart3,
        downloadUrl: "#"
    }
]

export default function CertificatesPage() {
  const [activeTab, setActiveTab] = useState("all")

  const tabs: FilterTabItem[] = [
      { id: "all", label: "Todos", icon: CheckCircle },
      { id: "recent", label: "Recientes", icon: Calendar },
      { id: "archived", label: "Archivados", icon: Shield }, // Just using Shield as placeholder/archive icon equivalent if Archive unavailable or Shield context
  ]

  return (
    <div className="public-container">
      <UniversityNav />
      
      <div className="pt-2 pb-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1600px] mx-auto">
         {/* Header & Search */}
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <GradientHeader 
                title="Mis Certificados" 
                subtitle="Accede y descarga tus credenciales oficiales de los cursos y rutas que has completado con éxito."
                className="mb-0 max-w-2xl"
            />
             <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                    placeholder="Buscar certificados..." 
                    className="pl-10 bg-white border-0 shadow-sm rounded-[1rem] h-12"
                />
            </div>
        </div>

        <FilterTabs 
            items={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
        />

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {certificatesData.map((cert, index) => (
                <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.05 * index, duration: 0.4 }}
                >
                    <UniversityCard className="h-full flex flex-col items-center text-center p-6 relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                        
                        {/* Certificado Badge */}
                        <Badge variant="outline" className="text-xs font-semibold text-slate-500 border-slate-200 bg-white shadow-sm ml-auto absolute top-6 right-6">
                            Certificado
                        </Badge>
                        
                        {/* Icon Circle */}
                        <div className="mt-8 mb-6 p-5 rounded-full bg-red-50 text-[#D93036] shadow-sm transform group-hover:scale-110 transition-transform duration-300">
                            <cert.icon className="h-10 w-10" />
                        </div>

                        {/* Content */}
                        <CardContent className="p-0 flex-1 w-full space-y-4">
                            <div>
                                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                                    {cert.title}
                                </h3>
                            </div>
                            
                            <Badge className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium border-0 px-3 py-1 text-xs">
                                {cert.category}
                            </Badge>

                            <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium pt-2">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>Emitido: {cert.date}</span>
                            </div>
                        </CardContent>

                        {/* Footer Action */}
                        <CardFooter className="p-0 w-full mt-8">
                             <Button className="w-full h-11 rounded-xl bg-[#D93036] hover:bg-[#b91c22] text-white font-bold shadow-lg shadow-red-100 flex items-center gap-2">
                                <Download className="h-4 w-4" />
                                Descargar
                             </Button>
                        </CardFooter>
                    </UniversityCard>
                </motion.div>
            ))}
        </div>

      </div>
    </div>
  )
}

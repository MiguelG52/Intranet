"use client"

import { UniversityNav } from "../components/university-nav"
import { GradientHeader } from "@/components/common/header/gradient-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { FilterTabs, FilterTabItem } from "@/components/common/filter-tabs" // Using the new component
import { UniversityCard } from "@/components/ui/university-card"
import { LearningPathCard } from "@/components/ui/learning-path-card"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
// Import correct icons
import { Search, Clock, PlayCircle, BookOpen, Filter, Book, CheckCircle, List } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Extended Mock Data
const allCourses = [
  {
    id: "101",
    title: "Gestión del Tiempo",
    subtitle: "Liderazgo Efectivo",
    progress: 60,
    time: "2h 30m",
    slug: "gestion-del-tiempo",
    status: "in-progress",
    imageColor: "bg-gradient-to-b from-[#D1E1F0] to-[#EAF2F8]",
    type: "course"
  },
  {
    id: "102",
    title: "Comunicación Asertiva",
    subtitle: "Liderazgo Efectivo",
    progress: 0,
    time: "1h 45m",
    slug: "comunicacion-asertiva",
    status: "not-started",
    imageColor: "bg-gradient-to-b from-[#E2E8F0] to-[#F8FAFC]",
    type: "course"
  },
  {
    id: "103",
    title: "Seguridad de la Información",
    subtitle: "Cumplimiento Normativo",
    progress: 10,
    time: "45m",
    slug: "seguridad-informacion",
    status: "in-progress",
    imageColor: "bg-gradient-to-b from-[#FDE68A] to-[#FFFBEB]",
    type: "course"
  },
  {
    id: "104",
    title: "Introducción a Excel Avanzado",
    subtitle: "Herramientas Digitales",
    progress: 0,
    time: "3h 15m",
    slug: "excel-avanzado",
    status: "not-started",
    imageColor: "bg-gradient-to-b from-[#D4E8D4] to-[#F1F8F1]",
    type: "course"
  },
  {
    id: "105",
    title: "Bienestar en el Trabajo",
    subtitle: "Salud y Seguridad",
    progress: 100,
    time: "1h 00m",
    slug: "bienestar-trabajo",
    status: "completed",
    imageColor: "bg-gradient-to-b from-[#A5D1D1] to-[#E8F3F3]",
    type: "course"
  }
]

const learningPaths = [
    {
      id: "1",
      title: "Onboarding Institucional",
      description: "Conoce la cultura, valores y procesos de nuestra organización.",
      progress: 100,
      totalCourses: 4,
      slug: "onboarding-institucional",
      image: "/images/university/onboarding.jpg",
      type: "path"
    },
    {
      id: "2",
      title: "Liderazgo Efectivo",
      description: "Desarrolla habilidades clave para liderar equipos de alto rendimiento.",
      progress: 45,
      totalCourses: 8,
      slug: "liderazgo-efectivo",
      image: "/images/university/leadership.jpg",
      type: "path"
    }
]

export default function MyLearningPage() {
  const [activeTab, setActiveTab] = useState("all")
  
  const filteredCourses = activeTab === "all" 
    ? allCourses 
    : activeTab === "in-progress" 
      ? allCourses.filter(c => c.status === "in-progress")
      : activeTab === "completed"
        ? allCourses.filter(c => c.status === "completed")
        : [];
  
  const tabs: FilterTabItem[] = [
      { id: "all", label: "Todos", icon: Book },
      { id: "in-progress", label: "En Progreso", icon: PlayCircle },
      { id: "completed", label: "Completados", icon: CheckCircle },
      { id: "paths", label: "Rutas de Aprendizaje", icon: List },
  ]

  return (
    <div className="public-container">
      <UniversityNav />
      
      <div className="pt-2 pb-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1600px] mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <GradientHeader 
                title="Mi Aprendizaje" 
                subtitle="Explora todo el catálogo de cursos y rutas asignadas a tu perfil."
                className="mb-0"
            />
             <div className="relative w-full md:w-72">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                    placeholder="Buscar cursos..." 
                    className="pl-10 bg-white border-0 shadow-sm rounded-xl h-11"
                />
            </div>
        </div>

        {/* Replaced local manual tabs with Reusable FilterTabs component */}
        <FilterTabs 
            items={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
        />

        {activeTab === "paths" ? (
             /* Learning Paths View - Using New LearningPathCard component */
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                 {learningPaths.map((path) => (
                    <Link key={path.id} href={`/university/paths/${path.slug}`}>
                        <LearningPathCard 
                            title={path.title}
                            subtitle="Ruta de Aprendizaje" // Static for now, or could come from data
                            progress={path.progress}
                            totalModules={path.totalCourses}
                            timeRemaining="4h 30m" // Mock data for now
                        />
                    </Link>
                ))}
            </div>
        ) : (
            /* Courses Grid - Using New Card Design */
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {filteredCourses.map((course, index) => (
                    <motion.div
                        key={course.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.05 * index, duration: 0.4 }}
                    >
                        <Link href={`/university/course/${course.slug}`}>
                            <UniversityCard className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                {/* Image / Header Section */}
                            <div className={`h-40 relative ${course.imageColor} flex items-center justify-center`}>
                                {/* Fade Effect at bottom */}
                                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent" />
                                
                                {/* Badge */}
                                <div className="absolute top-4 right-4 z-10 w-fit">
                                    <Badge className="bg-white text-slate-700 hover:bg-white rounded-full px-3 py-0.5 text-[10px] font-bold tracking-wider shadow-sm border-0 pointer-events-none">
                                        Curso
                                    </Badge>
                                </div>

                                {/* Abstract Course Icon */}
                                <div className="z-10 bg-white/40 backdrop-blur-sm p-3 rounded-2xl shadow-sm transform transition-transform group-hover:scale-110">
                                     <div className="w-8 h-8 rounded-full border-2 border-slate-400/50" />
                                </div>
                            </div>

                            <CardContent className="p-6 pt-2 flex-col flex-1 flex">
                                {/* Title & Subtitle */}
                                <div className="mb-4">
                                    <h3 className="text-[17px] font-bold text-slate-900 leading-snug mb-1">
                                        {course.title}
                                    </h3>
                                    <p className="text-xs font-medium text-slate-500">
                                        <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                                            {course.subtitle}
                                        </span>
                                    </p>
                                </div>

                                 {/* Time Meta */}
                                <div className="flex items-center gap-2 text-xs text-slate-400 mb-6 font-medium">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>{course.time}</span>
                                </div>

                                {/* Progress Section */}
                                <div className="mt-auto space-y-2">
                                    <div className="flex justify-between items-end text-[10px] font-bold tracking-wider uppercase">
                                        <span className="text-slate-400">
                                            {course.status === 'not-started' ? 'SIN INICIAR' : 'PROGRESO'}
                                        </span>
                                        {course.status !== 'not-started' && (
                                            <span className={course.progress === 100 ? 'text-[#D93036]' : 'text-slate-900'}>
                                                {course.progress}%
                                            </span>
                                        )}
                                    </div>
                                    
                                    {course.status !== 'not-started' && (
                                        <Progress 
                                            value={course.progress} 
                                            className="h-1.5 bg-slate-100" 
                                            indicatorClassName="bg-[#D93036]" // Custom Red Brand Color
                                        />
                                    )}
                                </div>
                            </CardContent>
                             
                            {/* Actions */}
                            <CardFooter className="p-6 pt-0">
                                {course.status === 'completed' ? (
                                    <Button variant="outline" className="w-full rounded-xl h-11 border-slate-200 text-slate-600 hover:text-[#D93036] hover:border-[#D93036]/30 hover:bg-red-50 font-bold text-sm">
                                        Ver Repaso
                                    </Button>
                                ) : course.status === 'in-progress' ? (
                                    <Button variant="outline" className="w-full rounded-xl h-11 border-slate-200 text-slate-700 hover:text-[#D93036] hover:border-[#D93036]/30 hover:bg-slate-50 font-bold text-sm">
                                        Reanudar
                                    </Button>
                                ) : (
                                    <Button variant="outline" className="w-full rounded-xl h-11 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-bold text-sm">
                                        Comenzar
                                    </Button>
                                )}
                            </CardFooter>
                        </UniversityCard>
                        </Link>
                    </motion.div>
                ))}
            </div>
        )}

      </div>
    </div>
  )
}

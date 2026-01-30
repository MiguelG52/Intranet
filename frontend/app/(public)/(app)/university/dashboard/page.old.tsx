"use client"

import { UniversityNav } from "../components/university-nav"
import { GradientHeader } from "@/components/common/header/gradient-header"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PlayCircle, Award, BookOpen, Clock, ChevronRight, MoreHorizontal } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Mock data for learning paths
const learningPaths = [
  {
    id: "1",
    title: "Onboarding Institucional",
    description: "Conoce la cultura, valores y procesos de nuestra organización.",
    progress: 100,
    totalCourses: 4,
    completedCourses: 4,
    slug: "onboarding-institucional",
    image: "/images/university/onboarding.jpg", // Placeholder
  },
  {
    id: "2",
    title: "Liderazgo Efectivo",
    description: "Desarrolla habilidades clave para liderar equipos de alto rendimiento.",
    progress: 45,
    totalCourses: 8,
    completedCourses: 3,
    slug: "liderazgo-efectivo",
    image: "/images/university/leadership.jpg", // Placeholder
  }
]

// Mock data for active courses
const activeCourses = [
  {
    id: "101",
    title: "Gestión del Tiempo",
    path: "Liderazgo Efectivo",
    progress: 60,
    duration: "2h 30m",
    slug: "gestion-del-tiempo",
    image: "/images/university/time-management.jpg", // Placeholder
    thumbnail: "bg-sky-100" // Placeholder color
  },
  {
    id: "102",
    title: "Comunicación Asertiva",
    path: "Liderazgo Efectivo",
    progress: 0,
    duration: "1h 45m",
    slug: "comunicacion-asertiva",
    image: "/images/university/communication.jpg", // Placeholder
    thumbnail: "bg-indigo-100"
  },
  {
    id: "103",
    title: "Seguridad de la Información",
    path: "Cumplimiento Normativo",
    progress: 10,
    duration: "45m",
    slug: "seguridad-informacion",
    image: "/images/university/security.jpg", // Placeholder
    thumbnail: "bg-amber-100"
  }
]

export default function UniversityDashboardPage() {
  return (
    <div className="public-container">
      <UniversityNav />
      
      <div className="py-6 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Welcome Section */}
        <section>
           <GradientHeader 
              title="Mi Panel de Aprendizaje" 
              subtitle="Gestiona tu progreso y continúa desarrollando tus habilidades profesionalmente."
              className="mb-8"
            />
            
            <div className="grid gap-6 md:grid-cols-3">
              <div className="p-6 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/50 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Cursos Completados</p>
                  <p className="text-3xl font-bold mt-1">12</p>
                  <p className="text-xs text-green-600 font-medium mt-1">+2 este mes</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="h-6 w-6 text-primary" />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/50 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Horas Totales</p>
                  <p className="text-3xl font-bold mt-1">24.5h</p>
                  <p className="text-xs text-muted-foreground mt-1">Acumulado anual</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-blue-600" />
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/50 shadow-sm flex items-center justify-between">
                <div>
                   <p className="text-sm font-medium text-muted-foreground">Rutas Activas</p>
                   <p className="text-3xl font-bold mt-1">2</p>
                   <p className="text-xs text-amber-600 font-medium mt-1">En progreso</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-amber-600" />
                </div>
              </div>
            </div>
        </section>

        {/* Continue Learning Section - Updated Cards */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
                Continuar Estudiando
            </h2>
            <Link href="/university/my-learn">
                <Button variant="ghost" className="text-primary hover:bg-primary/5">Ver todo <ChevronRight className="ml-1 h-4 w-4" /></Button>
            </Link>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeCourses.map((course) => (
              <div 
                key={course.id} 
                className="group relative flex flex-col justify-between rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden"
              >
                 {/* Image Header with Badge */}
                 <div className="h-40 bg-gray-100 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                    {/* Placeholder for real image implementation using Next/Image */}
                    <div className={`absolute inset-0 ${course.thumbnail} flex items-center justify-center`}>
                        <img 
                            src={course.image} 
                            alt={course.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            onError={(e) => {
                                e.currentTarget.style.display = 'none'; 
                                e.currentTarget.parentElement?.classList.add('bg-primary/10');
                            }} 
                        />
                        {/* Fallback Icon if Image Fails/Missing */}
                         <PlayCircle className="absolute h-12 w-12 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" />
                    </div>
                    <Badge variant="secondary" className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm text-gray-800 font-medium shadow-sm border-0">
                        {course.path}
                    </Badge>
                 </div>

                 <div className="p-6 space-y-4 flex-1 flex flex-col">
                    <div className="flex-1">
                        <h3 className="text-xl font-bold leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                            {course.title}
                        </h3>
                        <div className="flex items-center text-sm text-muted-foreground gap-3">
                             <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {course.duration}</span>
                             <span>•</span>
                             <span>{course.progress === 0 ? "Sin iniciar" : `${course.progress}% completado`}</span>
                        </div>
                    </div>

                    {/* Minimal Progress Bar */}
                    <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden mt-auto">
                        <div 
                            className="bg-primary h-full rounded-full transition-all duration-500 ease-out" 
                            style={{ width: `${course.progress}%` }}
                        />
                    </div>
                 </div>

                 <div className="px-6 pb-6 pt-0">
                     <Button asChild className="w-full rounded-xl h-11 shadow-none text-base font-medium bg-gray-900 text-white hover:bg-primary transition-colors" size="lg">
                         <Link href={`/university/course/${course.slug}`}>
                            {course.progress > 0 ? "Reanudar lección" : "Comenzar curso"}
                         </Link>
                     </Button>
                 </div>
              </div>
            ))}
          </div>
        </section>

        {/* Learning Paths Section */}
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
              Mis Rutas de Aprendizaje
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {learningPaths.map((path) => (
              <div 
                key={path.id} 
                className="group relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row h-full"
              >
                  <div className="w-full md:w-2/5 relative h-48 md:h-auto bg-gradient-to-br from-gray-100 to-gray-200 group-hover:from-primary/5 group-hover:to-primary/10 transition-colors">
                      <div className="absolute inset-0 flex items-center justify-center">
                           <div className="h-16 w-16 rounded-2xl bg-white/50 backdrop-blur-sm flex items-center justify-center shadow-sm">
                                <BookOpen className="h-8 w-8 text-primary/80" />
                           </div>
                      </div>
                  </div>
                  
                  <div className="flex flex-col p-6 md:w-3/5">
                      <div className="flex-1 space-y-3">
                          <h3 className="font-bold text-xl leading-tight group-hover:text-primary transition-colors">
                              {path.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                              {path.description}
                          </p>
                      </div>

                      <div className="mt-6 space-y-4">
                          <div className="space-y-2">
                              <div className="flex justify-between text-xs font-medium text-muted-foreground">
                                  <span>Progreso General</span>
                                  <span>{path.progress}%</span>
                              </div>
                              <Progress value={path.progress} className="h-2" />
                          </div>

                          <div className="flex gap-3 pt-2">
                            {path.progress === 100 ? (
                                <div className="flex w-full gap-2">
                                     <Button asChild variant="outline" className="flex-1 border-gray-200 hover:bg-gray-50 rounded-xl">
                                         <Link href={`/university/paths/${path.slug}`}>
                                             Detalles
                                         </Link>
                                     </Button>
                                     <Button asChild className="flex-1 bg-green-600 hover:bg-green-700 rounded-xl shadow-green-200 shadow-lg text-white hover:text-white">
                                         <Link href="/university/certificates"> 
                                             <Award className="mr-2 h-4 w-4" /> Certificado
                                         </Link>
                                     </Button>
                                </div>
                            ) : (
                                <Button asChild className="w-full rounded-xl">
                                    <Link href={`/university/paths/${path.slug}`}>
                                        Continuar Ruta
                                    </Link>
                                </Button>
                            )}
                          </div>
                      </div>
                  </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}

"use client"

import { UniversityNav } from "../components/university-nav"
import { GradientHeader } from "@/components/common/header/gradient-header"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Clock, PlayCircle, BookOpen, Filter } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Extended Mock Data
const allCourses = [
  {
    id: "101",
    title: "Gestión del Tiempo",
    path: "Liderazgo Efectivo",
    progress: 60,
    duration: "2h 30m",
    slug: "gestion-del-tiempo",
    image: "/images/university/time-management.jpg",
    type: "course"
  },
  {
    id: "102",
    title: "Comunicación Asertiva",
    path: "Liderazgo Efectivo",
    progress: 0,
    duration: "1h 45m",
    slug: "comunicacion-asertiva",
    image: "/images/university/communication.jpg",
    type: "course"
  },
  {
    id: "103",
    title: "Seguridad de la Información",
    path: "Cumplimiento Normativo",
    progress: 10,
    duration: "45m",
    slug: "seguridad-informacion",
    image: "/images/university/security.jpg",
    type: "course"
  },
  {
    id: "104",
    title: "Introducción a Excel Avanzado",
    path: "Herramientas Digitales",
    progress: 0,
    duration: "3h 15m",
    slug: "excel-avanzado",
    image: "/images/university/excel.jpg",
    type: "course"
  },
  {
    id: "105",
    title: "Bienestar en el Trabajo",
    path: "Salud y Seguridad",
    progress: 100,
    duration: "1h 00m",
    slug: "bienestar-trabajo",
    image: "/images/university/wellness.jpg",
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
  return (
    <div className="public-container">
      <UniversityNav />
      
      <div className="py-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1600px] mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <GradientHeader 
                title="Mi Aprendizaje" 
                subtitle="Explora todo el catálogo de cursos y rutas asignadas a tu perfil."
                className="mb-0"
            />
            
            <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Buscar cursos..." className="pl-9 bg-white" />
                </div>
                <Button variant="outline" size="icon" className="bg-white">
                    <Filter className="h-4 w-4" />
                </Button>
            </div>
        </div>

        <Tabs defaultValue="all" className="space-y-8">
            <TabsList className="bg-transparent p-0 gap-6 border-b rounded-none w-full justify-start h-auto">
                <TabsTrigger value="all" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 text-sm font-medium text-muted-foreground data-[state=active]:text-foreground shadow-none">
                    Todo
                </TabsTrigger>
                <TabsTrigger value="courses" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 text-sm font-medium text-muted-foreground data-[state=active]:text-foreground shadow-none">
                    Cursos ({allCourses.length})
                </TabsTrigger>
                <TabsTrigger value="paths" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3 text-sm font-medium text-muted-foreground data-[state=active]:text-foreground shadow-none">
                    Rutas de Aprendizaje ({learningPaths.length})
                </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-8">
                {/* Mixed Content - Just stacking them for now or grid */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {/* Render Paths First */}
                    {learningPaths.map(path => (
                         <div 
                         key={path.id} 
                         className="group relative flex flex-col rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                       >
                         <div className="h-48 relative overflow-hidden bg-gray-100">
                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                             {/* Image Placeholder */}
                             <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                                 <img 
                                     src={path.image} 
                                     alt={path.title}
                                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                     onError={(e) => {
                                         e.currentTarget.style.display = 'none'; 
                                     }} 
                                 />
                                 <BookOpen className="absolute h-10 w-10 text-gray-400 opacity-50" />
                             </div>
                             <Badge className="absolute top-4 right-4 z-20 bg-primary text-white border-0 shadow-lg">
                                Ruta
                             </Badge>
                             <div className="absolute bottom-4 left-4 z-20 text-white">
                                 <h3 className="font-bold text-lg leading-tight line-clamp-2">{path.title}</h3>
                                 <p className="text-sm text-white/80 line-clamp-1 mt-1">{path.totalCourses} Cursos</p>
                             </div>
                         </div>
         
                         <div className="p-5 flex-1 flex flex-col">
                             <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">
                                 {path.description}
                             </p>
                             
                             <div className="space-y-4 mt-auto">
                                 <div className="space-y-1.5">
                                     <div className="flex justify-between text-xs font-medium text-muted-foreground">
                                         <span>Progreso</span>
                                         <span>{path.progress}%</span>
                                     </div>
                                     <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                         <div 
                                             className="bg-primary h-full rounded-full transition-all duration-500 ease-out" 
                                             style={{ width: `${path.progress}%` }}
                                         />
                                     </div>
                                 </div>
                                 
                                 <Button asChild className="w-full rounded-xl" variant={path.progress === 100 ? "outline" : "default"}>
                                     <Link href={`/university/paths/${path.slug}`}>
                                         {path.progress === 100 ? "Ver certificado" : "Continuar"}
                                     </Link>
                                 </Button>
                             </div>
                         </div>
                       </div>
                    ))}

                    {/* Render Courses */}
                    {allCourses.map(course => (
                         <div 
                         key={course.id} 
                         className="group relative flex flex-col justify-between rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                       >
                          <div className="h-40 bg-gray-50 relative overflow-hidden">
                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-60" />
                             <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                 <img 
                                     src={course.image} 
                                     alt={course.title}
                                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                     onError={(e) => {
                                         e.currentTarget.style.display = 'none'; 
                                     }} 
                                 />
                                 
                                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                      <div className="h-12 w-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                                          <PlayCircle className="h-8 w-8 text-white fill-white/20" />
                                      </div>
                                 </div>
                             </div>
                             <Badge variant="secondary" className="absolute top-3 left-3 z-20 bg-white/90 backdrop-blur-sm text-xs font-medium shadow-sm border-0">
                                 Curso
                             </Badge>
                          </div>
         
                          <div className="p-5 space-y-3 flex-1 flex flex-col">
                             <div className="flex-1">
                                 <h3 className="font-bold text-base leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                     {course.title}
                                 </h3>
                                 <div className="flex items-center text-xs text-muted-foreground gap-3">
                                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {course.duration}</span>
                                      <span className="line-clamp-1">{course.path}</span>
                                 </div>
                             </div>
         
                             <div className="mt-auto pt-2">
                                 {course.progress > 0 ? (
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                                            <span>En progreso</span>
                                            <span>{course.progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                                            <div 
                                                className="bg-green-500 h-full rounded-full transition-all duration-500 ease-out" 
                                                style={{ width: `${course.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                 ) : (
                                     <div className="h-4 flex items-center text-xs text-muted-foreground">
                                         Sin iniciar
                                     </div>
                                 )}
                             </div>
                          </div>
         
                          <div className="px-5 pb-5 pt-0">
                              <Button asChild className="w-full rounded-xl h-10 shadow-none text-sm font-medium bg-gray-50 text-gray-900 border border-gray-200 hover:bg-gray-900 hover:text-white transition-all" variant="ghost">
                                  <Link href={`/university/course/${course.slug}`}>
                                     {course.progress > 0 ? "Reanudar" : "Comenzar"}
                                  </Link>
                              </Button>
                          </div>
                       </div>
                    ))}
                </div>
            </TabsContent>

            <TabsContent value="courses">
                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                 {allCourses.map(course => (
                         <div 
                         key={course.id} 
                         className="group relative flex flex-col justify-between rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                       >
                          <div className="h-40 bg-gray-50 relative overflow-hidden">
                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-60" />
                             <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                                 <img 
                                     src={course.image} 
                                     alt={course.title}
                                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                     onError={(e) => {
                                         e.currentTarget.style.display = 'none'; 
                                     }} 
                                 />
                                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                                      <div className="h-12 w-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                                          <PlayCircle className="h-8 w-8 text-white fill-white/20" />
                                      </div>
                                 </div>
                             </div>
                             <Badge variant="secondary" className="absolute top-3 left-3 z-20 bg-white/90 backdrop-blur-sm text-xs font-medium shadow-sm border-0">
                                 Curso
                             </Badge>
                          </div>
         
                          <div className="p-5 space-y-3 flex-1 flex flex-col">
                             <div className="flex-1">
                                 <h3 className="font-bold text-base leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                     {course.title}
                                 </h3>
                                 <div className="flex items-center text-xs text-muted-foreground gap-3">
                                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {course.duration}</span>
                                      <span className="line-clamp-1">{course.path}</span>
                                 </div>
                             </div>
         
                             <div className="mt-auto pt-2">
                                 {course.progress > 0 ? (
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[10px] uppercase font-bold text-muted-foreground tracking-wider">
                                            <span>En progreso</span>
                                            <span>{course.progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 h-1 rounded-full overflow-hidden">
                                            <div 
                                                className="bg-green-500 h-full rounded-full transition-all duration-500 ease-out" 
                                                style={{ width: `${course.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                 ) : (
                                     <div className="h-4 flex items-center text-xs text-muted-foreground">
                                         Sin iniciar
                                     </div>
                                 )}
                             </div>
                          </div>
         
                          <div className="px-5 pb-5 pt-0">
                              <Button asChild className="w-full rounded-xl h-10 shadow-none text-sm font-medium bg-gray-50 text-gray-900 border border-gray-200 hover:bg-gray-900 hover:text-white transition-all" variant="ghost">
                                  <Link href={`/university/course/${course.slug}`}>
                                     {course.progress > 0 ? "Reanudar" : "Comenzar"}
                                  </Link>
                              </Button>
                          </div>
                       </div>
                    ))}
                 </div>
            </TabsContent>

            <TabsContent value="paths">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {learningPaths.map(path => (
                         <div 
                         key={path.id} 
                         className="group relative flex flex-col rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
                       >
                         <div className="h-48 relative overflow-hidden bg-gray-100">
                             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                             {/* Image Placeholder */}
                             <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                                 <img 
                                     src={path.image} 
                                     alt={path.title}
                                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                     onError={(e) => {
                                         e.currentTarget.style.display = 'none'; 
                                     }} 
                                 />
                                 <BookOpen className="absolute h-10 w-10 text-gray-400 opacity-50" />
                             </div>
                             <Badge className="absolute top-4 right-4 z-20 bg-primary text-white border-0 shadow-lg">
                                Ruta
                             </Badge>
                             <div className="absolute bottom-4 left-4 z-20 text-white">
                                 <h3 className="font-bold text-lg leading-tight line-clamp-2">{path.title}</h3>
                                 <p className="text-sm text-white/80 line-clamp-1 mt-1">{path.totalCourses} Cursos</p>
                             </div>
                         </div>
         
                         <div className="p-5 flex-1 flex flex-col">
                             <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-1">
                                 {path.description}
                             </p>
                             
                             <div className="space-y-4 mt-auto">
                                 <div className="space-y-1.5">
                                     <div className="flex justify-between text-xs font-medium text-muted-foreground">
                                         <span>Progreso</span>
                                         <span>{path.progress}%</span>
                                     </div>
                                     <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                                         <div 
                                             className="bg-primary h-full rounded-full transition-all duration-500 ease-out" 
                                             style={{ width: `${path.progress}%` }}
                                         />
                                     </div>
                                 </div>
                                 
                                 <Button asChild className="w-full rounded-xl" variant={path.progress === 100 ? "outline" : "default"}>
                                     <Link href={`/university/paths/${path.slug}`}>
                                         {path.progress === 100 ? "Ver certificado" : "Continuar"}
                                     </Link>
                                 </Button>
                             </div>
                         </div>
                       </div>
                    ))}
                </div>
            </TabsContent>
        </Tabs>

      </div>
    </div>
  )
}

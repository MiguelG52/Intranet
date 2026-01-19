"use client"

import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { ArrowLeft, CheckCircle, ChevronDown, ChevronRight, FileText, Play, PlayCircle, Download, Clock, Star, Share2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { GradientHeader } from "@/components/common/header/gradient-header"

export default function CoursePage({ params }: { params: { slug: string } }) {
  const [activeLesson, setActiveLesson] = useState("1-1")
  
  // Mock data - would normally fetch based on slug
  const course = {
    title: "Gestión del Tiempo para Líderes",
    description: "Aprende a priorizar tareas, delegar eficazmente y maximizar tu productividad como líder de equipo. Este curso está diseñado para managers que buscan optimizar su flujo de trabajo.",
    instructor: "Ana Martínez",
    role: "Senior Project Manager",
    rating: 4.8,
    students: 1234,
    progress: 35,
    modules: [
      {
        id: "1",
        title: "Introducción a la Productividad",
        duration: "25 min",
        lessons: [
          { id: "1-1", title: "Bienvenida al curso", duration: "2:30", completed: true },
          { id: "1-2", title: "¿Por qué nos falta tiempo?", duration: "5:45", completed: true },
          { id: "1-3", title: "La matriz de Eisenhower", duration: "8:20", completed: false },
        ]
      },
      {
        id: "2",
        title: "Técnicas de Priorización",
        duration: "45 min",
        lessons: [
          { id: "2-1", title: "El método ABCDE", duration: "6:15", completed: false },
          { id: "2-2", title: "Ley de Pareto (80/20)", duration: "7:30", completed: false },
          { id: "2-3", title: "Time Blocking", duration: "10:00", completed: false },
        ]
      }
    ]
  }

  const LessonList = () => (
    <div className="space-y-6">
      {course.modules.map((module) => (
        <div key={module.id} className="space-y-3">
          <div className="flex items-center justify-between px-2">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <span className="bg-primary/10 text-primary h-6 w-6 rounded flex items-center justify-center text-xs font-bold">
                   {module.id}
                </span> 
                {module.title}
              </h3>
              <span className="text-xs text-muted-foreground">{module.duration}</span>
          </div>
          
          <div className="space-y-1">
            {module.lessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => setActiveLesson(lesson.id)}
                className={cn(
                  "w-full text-left py-3 px-4 rounded-xl text-sm transition-all flex items-center gap-4 group",
                  activeLesson === lesson.id 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" 
                    : "hover:bg-white hover:shadow-sm text-muted-foreground bg-transparent"
                )}
              >
                 <div className={cn(
                     "h-8 w-8 rounded-full flex items-center justify-center border transition-colors",
                     activeLesson === lesson.id ? "border-transparent bg-white/20" : "border-gray-200 group-hover:border-primary/30"
                 )}>
                    {lesson.completed ? (
                        <CheckCircle className="h-4 w-4" />
                    ) : (
                        <Play className="h-3 w-3 fill-current ml-0.5" />
                    )}
                 </div>
                 <div className="flex-1">
                    <p className={cn("font-medium", activeLesson === lesson.id ? "text-white" : "text-gray-900")}>
                        {lesson.title}
                    </p>
                    <span className={cn("text-xs opacity-70", activeLesson === lesson.id ? "text-white/80" : "text-muted-foreground")}>
                        {lesson.duration}
                    </span>
                 </div>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div className="flex flex-col h-screen bg-gray-50/50">
      {/* Top Glass Bar */}
      <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-white/20 bg-white/60 backdrop-blur-xl z-20 sticky top-0">
        <div className="flex items-center gap-4">
          <Link href="/university/dashboard">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-black/5">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="hidden md:block">
            <h1 className="text-sm font-semibold text-foreground/80 truncate max-w-md">{course.title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-3">
             <Button size="sm" variant="ghost" className="hidden sm:flex text-muted-foreground">
                <Share2 className="h-4 w-4 mr-2" /> Compartir
             </Button>
             <Button size="sm" className="rounded-full px-6 shadow-lg shadow-primary/20">
                Siguiente <ChevronRight className="ml-1 h-3 w-3" />
             </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto scroll-smooth">
          <div className="max-w-[1600px] mx-auto p-4 md:p-6 space-y-8">
            
            {/* Video Player Container */}
            <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-2xl shadow-black/10 bg-black group ring-1 ring-white/20">
              <div className="absolute inset-0 flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center">
                 <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
                 <Button className="h-20 w-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 hover:scale-110 transition-all shadow-2xl">
                    <Play className="h-8 w-8 ml-1 fill-white" />
                 </Button>
              </div>
              
              {/* Video Controls overlay (mock) */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h2 className="font-medium text-lg leading-none mb-2">1.3 La matriz de Eisenhower</h2>
                <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
                     <div className="w-[30%] h-full bg-primary" />
                </div>
              </div>
            </div>

            <div className="lg:hidden">
               <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
               <div className="flex items-center text-sm text-muted-foreground gap-4 mb-6">
                    <span className="flex items-center gap-1"><Star className="h-4 w-4 text-orange-400 fill-orange-400" /> {course.rating}</span>
                    <span>{course.students} estudiantes</span>
               </div>
            </div>

            {/* Mobile/Tablet Tabs */}
            <Tabs defaultValue="modules" className="w-full">
              <TabsList className="w-full justify-start h-auto p-1 bg-gray-100/50 backdrop-blur-md rounded-xl mb-6 overflow-x-auto flex-nowrap">
                <TabsTrigger value="modules" className="rounded-lg px-4 py-2 text-sm flex-1 lg:hidden data-[state=active]:bg-white data-[state=active]:shadow-sm">Capítulos</TabsTrigger>
                <TabsTrigger value="overview" className="rounded-lg px-4 py-2 text-sm flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">Descripción</TabsTrigger>
                <TabsTrigger value="resources" className="rounded-lg px-4 py-2 text-sm flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">Recursos</TabsTrigger>
                <TabsTrigger value="notes" className="rounded-lg px-4 py-2 text-sm flex-1 data-[state=active]:bg-white data-[state=active]:shadow-sm">Notas</TabsTrigger>
              </TabsList>

              <TabsContent value="modules" className="lg:hidden mt-0 animate-in slide-in-from-left-4 duration-300">
                  <div className="bg-white/50 backdrop-blur-xl rounded-3xl p-6 border border-white/50 shadow-sm">
                     <LessonList />
                  </div>
              </TabsContent>

              <TabsContent value="overview" className="space-y-6 mt-0 animate-in slide-in-from-bottom-2 duration-300">
                <div className="bg-white/50 backdrop-blur-xl rounded-3xl p-6 lg:p-8 border border-white/50 shadow-sm space-y-6">
                    <div className="hidden lg:block">
                        <h2 className="text-2xl font-bold mb-2">{course.title}</h2>
                        <p className="text-muted-foreground text-lg">{course.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-4 p-4 bg-white/60 rounded-2xl border border-white/50">
                        <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                            {course.instructor.charAt(0)}
                        </div>
                        <div>
                            <p className="font-bold text-lg">{course.instructor}</p>
                            <p className="text-sm text-muted-foreground">{course.role}</p>
                        </div>
                    </div>

                    <div className="prose prose-gray max-w-none">
                        <h3>Lo que aprenderás</h3>
                        <ul>
                            <li>Identificar ladrones de tiempo comunes</li>
                            <li>Aplicar marcos de priorización probados</li>
                            <li>Delegar tareas sin perder el control</li>
                        </ul>
                    </div>
                </div>
              </TabsContent>

              <TabsContent value="resources" className="mt-0 animate-in slide-in-from-bottom-2 duration-300">
                 <div className="bg-white/50 backdrop-blur-xl rounded-3xl p-6 border border-white/50 shadow-sm grid gap-3">
                    <div className="flex items-center justify-between p-4 border border-gray-100 bg-white rounded-2xl hover:shadow-md transition-all cursor-pointer group">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-red-50 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-red-500" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 group-hover:text-primary transition-colors">Plantilla Matrices de Eisenhower</p>
                          <p className="text-xs text-muted-foreground">PDF - 2.4 MB</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="icon" className="text-gray-400 group-hover:text-primary"><Download className="h-5 w-5" /></Button>
                    </div>
                 </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Sidebar Lesson List (Desktop Only) */}
        <div className="w-[400px] border-l border-white/20 bg-white/40 backdrop-blur-2xl hidden lg:flex flex-col z-10 shadow-[-10px_0_30px_-15px_rgba(0,0,0,0.05)]">
          <div className="p-6 pb-2">
             <h3 className="font-bold text-lg mb-1">Contenido del Curso</h3>
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 w-[35%] rounded-full" />
                </span>
                <span>{course.progress}%</span>
             </div>
          </div>
          <ScrollArea className="flex-1 p-6 pt-2">
            <LessonList />
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

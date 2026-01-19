"use client"

import { UniversityNav } from "../../components/university-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, CheckCircle, Lock, PlayCircle, Clock, BookOpen, Trophy } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default function LearningPathPage({ params }: { params: { slug: string } }) {
  // Mock data
  const path = {
    title: "Onboarding Institucional",
    description: "Este programa de integración está diseñado para ayudarte a navegar tu viaje en nuestra empresa. Aprenderás sobre nuestra historia, misión, herramientas clave y políticas de seguridad.",
    progress: 75,
    estimatedTime: "8 horas",
    level: "Principiante",
    courses: [
      {
        id: "1",
        title: "Bienvenido a Nuestra Cultura",
        description: "Misión, visión y valores que nos definen.",
        duration: "45 min",
        status: "completed", // completed, in-progress, locked
        slug: "cultura"
      },
      {
        id: "2",
        title: "Herramientas Digitales",
        description: "Dominando el ecosistema de trabajo remoto.",
        duration: "2h 30m",
        status: "completed",
        slug: "herramientas"
      },
      {
        id: "3",
        title: "Políticas de Seguridad",
        description: "Ciberseguridad básica y protección de datos.",
        duration: "1h 15m",
        status: "completed",
        slug: "seguridad"
      },
      {
        id: "4",
        title: "Beneficios y Compensaciones",
        description: "Conoce todo lo que ofrecemos para ti.",
        duration: "1h",
        status: "in-progress",
        slug: "beneficios"
      },
      {
        id: "5",
        title: "Evaluación Final",
        description: "Pon a prueba tus conocimientos para obtener tu certificado.",
        duration: "30 min",
        status: "locked",
        slug: "evaluacion"
      }
    ]
  }

  return (
    <div className="public-container">
       <UniversityNav />
       
       <div className="grid gap-8 lg:grid-cols-3">
          
          {/* Main Content - Course List */}
          <div className="lg:col-span-2 space-y-8 animate-in slide-in-from-left-4 duration-500">
             
             <div>
                <Badge variant="outline" className="mb-2 text-primary border-primary/20">Ruta de Aprendizaje</Badge>
                <h1 className="text-3xl font-bold tracking-tight mb-4">{path.title}</h1>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    {path.description}
                </p>
                
                <div className="flex gap-6 text-sm text-muted-foreground border-y py-4">
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {path.estimatedTime}
                    </div>
                    <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        {path.courses.length} Cursos
                    </div>
                     <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4" />
                        {path.level}
                    </div>
                </div>
             </div>

             <div className="relative">
                {/* Vertical Line */}
                <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-muted-foreground/20" />

                <div className="space-y-6">
                    {path.courses.map((course, index) => (
                        <div key={course.id} className="relative pl-16 group">
                            {/* Status Icon */}
                            <div className={cn(
                                "absolute left-2 top-0 h-9 w-9 rounded-full border-4 border-background flex items-center justify-center shadow-sm z-10 transition-colors",
                                course.status === 'completed' ? "bg-green-500 text-white" :
                                course.status === 'in-progress' ? "bg-primary text-white" :
                                "bg-muted text-muted-foreground"
                            )}>
                                {course.status === 'completed' && <CheckCircle className="h-5 w-5 fill-current" />}
                                {course.status === 'in-progress' && <PlayCircle className="h-5 w-5 fill-current" />}
                                {course.status === 'locked' && <Lock className="h-4 w-4" />}
                            </div>

                            <Card className={cn(
                                "transition-all duration-300",
                                course.status === 'locked' ? "opacity-60 bg-muted/30" : "hover:shadow-md border-muted-foreground/20"
                            )}>
                                <CardContent className="p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                     <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-semibold text-lg">{course.title}</h3>
                                            {course.status === 'in-progress' && <Badge className="text-[10px] h-5">En Curso</Badge>}
                                        </div>
                                        <p className="text-sm text-muted-foreground">{course.description}</p>
                                     </div>
                                     
                                     <div className="flex items-center gap-4 w-full sm:w-auto mt-2 sm:mt-0">
                                        <span className="text-xs text-muted-foreground whitespace-nowrap">{course.duration}</span>
                                        
                                        {course.status !== 'locked' ? (
                                             <Button size="sm" variant={course.status === 'completed' ? "outline" : "default"} asChild>
                                                <Link href={`/university/course/${course.slug}`}>
                                                    {course.status === 'completed' ? "Repasar" : "Comenzar"} 
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </Link> 
                                             </Button>
                                        ) : (
                                            <Button size="sm" disabled variant="ghost">Bloqueado</Button>
                                        )}
                                     </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
             </div>
          </div>

          {/* Sidebar - Progress & Cert */}
          <div className="lg:col-start-3 space-y-6 animate-in slide-in-from-right-4 duration-500 delay-100">
             <Card className="border-primary/20 shadow-lg bg-primary/5">
                <CardContent className="p-6 text-center space-y-4">
                    <h3 className="font-semibold text-lg">Tu Progreso</h3>
                    <div className="relative h-32 w-32 mx-auto flex items-center justify-center">
                        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-muted-foreground/20" />
                            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-primary transition-all duration-1000 ease-out" 
                                strokeDasharray="283" 
                                strokeDashoffset={283 - (283 * path.progress) / 100} 
                            />
                        </svg>
                        <span className="absolute text-2xl font-bold">{path.progress}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        {path.courses.filter(c => c.status === 'completed').length} de {path.courses.length} cursos completados
                    </p>
                </CardContent>
             </Card>

             <Card>
                 <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3 text-amber-500 mb-2">
                        <Trophy className="h-6 w-6" />
                        <h3 className="font-semibold text-foreground">Certificado</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Completa todos los cursos de esta ruta para desbloquear tu certificado oficial.
                    </p>
                    <Button className="w-full" disabled={path.progress < 100} variant={path.progress === 100 ? "default" : "secondary"}>
                        {path.progress === 100 ? "Descargar Certificado" : "No disponible"}
                    </Button>
                 </CardContent>
             </Card>
          </div>

       </div>
    </div>
  )
}

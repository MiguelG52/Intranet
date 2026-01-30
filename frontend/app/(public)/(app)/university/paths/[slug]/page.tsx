"use client"

import { UniversityNav } from "../../components/university-nav"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
    Clock, 
    BookOpen, 
    Trophy, 
    Check, 
    Play, 
    Lock, 
    ArrowRight 
} from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
// Import CornerGradient for background effect
import { CornerGradient } from "@/components/common/background/corner-gradient"
import { use } from "react"

export default function LearningPathPage({ params }: { params: Promise<{ slug: string }> }) {
  // Unwrap params
  const { slug } = use(params)

  // Mock data matching the screenshot
  const path = {
    title: "Onboarding Institucional",
    description: "Este programa de integración está diseñado para ayudarte a navegar tu viaje en nuestra empresa. Aprenderás sobre nuestra historia, misión, herramientas clave y políticas de seguridad para comenzar con el pie derecho.",
    totalHours: "8 horas",
    totalCourses: 5,
    level: "Principiante",
    progress: 75,
    completedCount: 3,
    courses: [
      {
        id: "1",
        title: "Bienvenido a Nuestra Cultura",
        description: "Misión, visión y valores que nos definen como organización.",
        duration: "45 min",
        status: "completed", // completed, in-progress, locked
        slug: "cultura"
      },
      {
        id: "2",
        title: "Herramientas Digitales",
        description: "Dominando el ecosistema de trabajo remoto y colaborativo.",
        duration: "2h 30m",
        status: "completed",
        slug: "herramientas"
      },
      {
        id: "3",
        title: "Políticas de Seguridad",
        description: "Ciberseguridad básica y protección de datos confidenciales.",
        duration: "1h 15m",
        status: "completed",
        slug: "seguridad"
      },
      {
        id: "4",
        title: "Beneficios y Compensaciones",
        description: "Conoce todo lo que ofrecemos para ti, desde salud hasta bonos.",
        duration: "1h",
        status: "in-progress",
        progress: 25,
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
    ],
    instructors: [
        { name: "Ana López", role: "Gerente de RRHH", avatar: "/avatars/ana.jpg" },
        { name: "Carlos Ruiz", role: "Director de TI", avatar: "/avatars/carlos.jpg" }
    ]
  }

  // Circular Chart Helpers
  const radius = 35
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (path.progress / 100) * circumference

  return (
    <div className="min-h-screen bg-slate-50/50">
       <CornerGradient />
       
       <div className="public-container relative z-10 pb-20">

            {/* Header Section */}
            <div className="max-w-4xl mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <Badge variant="secondary" className="mb-4 bg-red-50 text-[#D93036] hover:bg-red-100 border-red-100 px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    Ruta de Aprendizaje
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
                    {path.title}
                </h1>
                <p className="text-slate-600 text-lg leading-relaxed mb-8 max-w-3xl">
                    {path.description}
                </p>
                
                <div className="flex flex-wrap gap-6 text-sm font-medium text-slate-500">
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200/60 shadow-sm">
                        <Clock className="h-4 w-4 text-[#D93036]" />
                        {path.totalHours}
                    </div>
                    <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200/60 shadow-sm">
                        <BookOpen className="h-4 w-4 text-[#D93036]" />
                        {path.totalCourses} Cursos
                    </div>
                     <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-full border border-slate-200/60 shadow-sm">
                        <Trophy className="h-4 w-4 text-[#D93036]" />
                        {path.level}
                    </div>
                </div>
            </div>

            <div className="grid gap-10 lg:grid-cols-3">
                {/* Main Column: Timeline */}
                <div className="lg:col-span-2 relative">
                    {/* Vertical Line Connector */}
                    <div className="absolute left-[27px] top-8 bottom-8 w-0.5 bg-slate-200" />

                    <div className="space-y-8">
                        {path.courses.map((course, index) => {
                            const isLast = index === path.courses.length - 1;
                            
                            return (
                                <div key={course.id} className="relative pl-20 animate-in slide-in-from-left duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                                    {/* Timeline Node */}
                                    <div className="absolute left-0 top-0 w-14 h-14 flex items-center justify-center bg-slate-50 z-10">
                                        {course.status === 'completed' ? (
                                            <div className="w-14 h-14 rounded-full bg-white border-2 border-emerald-500 flex items-center justify-center shadow-[0_0_0_4px_rgba(255,255,255,1)]">
                                                <Check className="h-6 w-6 text-emerald-500" strokeWidth={3} />
                                            </div>
                                        ) : course.status === 'in-progress' ? (
                                            <div className="w-14 h-14 rounded-full bg-red-50 border-2 border-[#D93036] flex items-center justify-center shadow-[0_0_0_4px_rgba(255,255,255,1)]">
                                                <Play className="h-6 w-6 text-[#D93036] ml-1 fill-current" />
                                            </div>
                                        ) : (
                                            <div className="w-14 h-14 rounded-full bg-slate-50 border-2 border-slate-200 flex items-center justify-center shadow-[0_0_0_4px_rgba(255,255,255,1)]">
                                                <Lock className="h-5 w-5 text-slate-300" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Card Content */}
                                    <div 
                                        className={cn(
                                            "bg-white rounded-2xl border p-6 transition-all duration-300",
                                            course.status === 'in-progress' 
                                                ? "border-[#D93036]/20 shadow-[0_8px_30px_rgba(217,48,54,0.06)] relative overflow-hidden" 
                                                : "border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200"
                                        )}
                                    >
                                        {/* Active State Gradient Line */}
                                        {course.status === 'in-progress' && (
                                           <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#D93036]" /> 
                                        )}

                                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <h3 className={cn(
                                                        "text-lg font-bold",
                                                        course.status === 'locked' ? "text-slate-400" : "text-slate-900"
                                                    )}>
                                                        {course.title}
                                                    </h3>
                                                    {course.status === 'in-progress' && (
                                                        <Badge className="bg-[#D93036] hover:bg-[#D93036] text-[10px] uppercase tracking-wider px-2 py-0.5">
                                                            En Curso
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className={cn(
                                                    "text-sm mb-4 leading-relaxed",
                                                    course.status === 'locked' ? "text-slate-400" : "text-slate-500"
                                                )}>
                                                    {course.description}
                                                </p>
                                                
                                                {/* Progress Bar for Active Course */}
                                                {course.status === 'in-progress' && (
                                                    <div className="space-y-2 mb-2 max-w-md">
                                                        <Progress value={course.progress} className="h-1.5" indicatorClassName="bg-[#D93036]" />
                                                        <p className="text-xs text-slate-400 text-right">{course.progress}% completado</p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Action Button */}
                                            <div className="flex-shrink-0 self-center md:self-start">
                                                {course.status === 'completed' ? (
                                                     <div className="flex items-center gap-4">
                                                        <span className="text-xs font-semibold text-slate-400">{course.duration}</span>
                                                        <Button variant="outline" size="sm" className="rounded-xl border-slate-200 text-slate-500 hover:text-slate-700">
                                                            Repasar <ArrowRight className="ml-2 h-3 w-3" />
                                                        </Button>
                                                     </div>
                                                ) : course.status === 'in-progress' ? (
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-xs font-semibold text-slate-400">{course.duration}</span>
                                                        <Button size="sm" className="rounded-xl bg-[#D93036] hover:bg-[#b92b30] text-white shadow-lg shadow-red-200">
                                                            Continuar <ArrowRight className="ml-2 h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-xs font-semibold text-slate-300">{course.duration}</span>
                                                        <Badge variant="secondary" className="bg-slate-100 text-slate-400 pointer-events-none">
                                                            Bloqueado
                                                        </Badge>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="space-y-6 animate-in fade-in slide-in-from-right duration-500 delay-100">
                    
                    {/* Progress Widget */}
                    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-50/50 rounded-full blur-2xl -mr-10 -mt-10" />
                        
                        <div className="relative text-center">
                            <h3 className="text-lg font-bold text-slate-900 mb-6">Tu Progreso</h3>
                            
                            <div className="relative flex items-center justify-center w-32 h-32 mx-auto mb-6">
                                <svg className="transform -rotate-90 w-full h-full">
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r={radius}
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="transparent"
                                        className="text-slate-100"
                                    />
                                    <circle
                                        cx="64"
                                        cy="64"
                                        r={radius}
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        fill="transparent"
                                        strokeDasharray={circumference}
                                        strokeDashoffset={strokeDashoffset}
                                        strokeLinecap="round"
                                        className="text-[#D93036] transition-all duration-1000 ease-out"
                                    />
                                </svg>
                                <span className="absolute text-3xl font-bold text-slate-800 tracking-tighter">
                                    {path.progress}%
                                </span>
                            </div>

                            <p className="text-sm font-medium text-slate-500">
                                Has completado <span className="text-slate-900 font-bold">{path.completedCount} de {path.totalCourses}</span> cursos
                            </p>
                        </div>
                    </div>

                    {/* Certificate Widget */}
                    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center flex-shrink-0">
                                <Trophy className="h-6 w-6 text-amber-500" />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-slate-900 mb-1">Certificado</h3>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Completa todos los cursos de esta ruta para desbloquear tu certificado oficial y validable.
                                </p>
                            </div>
                        </div>
                        <Button className="w-full rounded-xl bg-slate-50 text-slate-400 border-slate-100 border hover:bg-slate-100 cursor-not-allowed" disabled>
                            No disponible aún
                        </Button>
                    </div>

                    {/* Instructors Widget */}
                    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Instructores</h3>
                        <div className="space-y-4">
                            {path.instructors.map((instructor, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#0F3555] flex items-center justify-center text-white font-bold text-xs ring-2 ring-white shadow-sm">
                                        {/* Avatar placeholder if no image */}
                                        {instructor.name.split(' ').map(n=>n[0]).join('')}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">{instructor.name}</p>
                                        <p className="text-xs text-slate-500">{instructor.role}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
       </div>
    </div>
  )
}

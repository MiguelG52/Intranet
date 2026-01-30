"use client"

import { UniversityCard } from "@/components/ui/university-card"
import { CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Clock, BookOpen, Users } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

const learningItems = [
  {
    id: "path-1",
    type: "path",
    label: "Ruta",
    title: "Onboarding Institucional",
    subtitle: "4 Cursos",
    description: "Conoce la cultura, valores y procesos de nuestra organización.",
    progress: 100,
    status: "completed",
    imageColor: "bg-gradient-to-b from-[#A5D1D1] to-[#E8F3F3]", // Teal-ish fade
    icon: BookOpen,
    slug: "onboarding"
  },
  {
    id: "path-2",
    type: "path",
    label: "Ruta",
    title: "Liderazgo Efectivo",
    subtitle: "8 Cursos",
    description: "Desarrolla habilidades clave para liderar equipos de alto rendimiento.",
    progress: 45,
    status: "in-progress",
    imageColor: "bg-gradient-to-b from-[#D4E8D4] to-[#F1F8F1]", // Green-ish fade
    icon: Users,
    slug: "liderazgo"
  },
  {
    id: "course-1",
    type: "course",
    label: "Curso",
    title: "Gestión del Tiempo",
    subtitle: "Liderazgo Efectivo", // Context
    time: "2h 30m",
    progress: 60,
    status: "in-progress",
    imageColor: "bg-gradient-to-b from-[#D1E1F0] to-[#EAF2F8]", // Blue-ish fade
    slug: "gestion-tiempo"
  },
  {
    id: "course-2",
    type: "course",
    label: "Curso",
    title: "Comunicación Asertiva",
    subtitle: "Liderazgo Efectivo",
    time: "1h 45m",
    progress: 0,
    status: "not-started",
    imageColor: "bg-gradient-to-b from-[#E2E8F0] to-[#F8FAFC]", // Gray-ish fade
    slug: "comunicacion"
  }
]

export function ContinueStudying() {
  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-900">Continuar Estudiando</h2>
            <Link href="/university/my-learn" className="text-xs font-bold text-red-500 hover:text-red-600 flex items-center gap-1 uppercase tracking-wide transition-colors">
                VER TODO <span className="text-lg">→</span>
            </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {learningItems.map((item, index) => (
                 <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                    <Link href={`/university/course/${item.slug}`}>
                        <UniversityCard className="h-full flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
                            {/* Image / Header Section */}
                        <div className={`h-40 relative ${item.imageColor} flex items-center justify-center`}>
                           {/* Fade Effect at bottom */}
                           <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent" />
                           
                           {/* Badge */}
                           <div className="absolute top-4 right-4 z-10 w-fit">
                                <Badge className={`
                                    rounded-full px-3 py-0.5 text-[10px] font-bold tracking-wider shadow-sm border-0 w-fit pointer-events-none
                                    ${item.type === 'path' ? 'bg-[#D93036] text-white hover:bg-[#D93036]' : 'bg-white text-slate-700 hover:bg-white'}
                                `}>
                                    {item.label}
                                </Badge>
                           </div>

                           {/* Icon/Illustration Placeholder */}
                           <div className="z-10 bg-white/40 backdrop-blur-sm p-3 rounded-2xl shadow-sm transform transition-transform group-hover:scale-110">
                                {item.type === 'path' && item.icon && <item.icon className="w-8 h-8 text-slate-600" />}
                                {item.type === 'course' && (
                                     // Simple abstract shapes for courses if no icon
                                     <div className="w-8 h-8 rounded-full border-2 border-slate-400/50" />
                                )}
                           </div>
                        </div>

                        <CardContent className="p-6 pt-2 flex-col flex-1 flex">
                            {/* Title & Subtitle */}
                            <div className="mb-4">
                                <h3 className="text-[17px] font-bold text-slate-900 leading-snug mb-1">
                                    {item.title}
                                </h3>
                                <p className="text-xs font-medium text-slate-500">
                                    {item.type === 'path' ? item.subtitle : (
                                        <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                                            {item.subtitle}
                                        </span>
                                    )}
                                </p>
                            </div>

                            {/* Description for Paths */}
                            {item.type === 'path' && (
                                <p className="text-xs text-slate-500 line-clamp-2 mb-4">
                                    {item.description}
                                </p>
                            )}

                            {/* Meta Info for Courses */}
                            {item.type === 'course' && (
                                <div className="flex items-center gap-2 text-xs text-slate-400 mb-6 font-medium">
                                    <Clock className="w-3.5 h-3.5" />
                                    <span>{item.time}</span>
                                </div>
                            )}

                            {/* Progress Section */}
                            <div className="mt-auto space-y-2">
                                <div className="flex justify-between items-end text-[10px] font-bold tracking-wider uppercase">
                                    <span className="text-slate-400">
                                        {item.status === 'not-started' ? 'SIN INICIAR' : 'PROGRESO'}
                                    </span>
                                    {item.status !== 'not-started' && (
                                        <span className={item.progress === 100 ? 'text-[#D93036]' : 'text-slate-900'}>
                                            {item.progress}%
                                        </span>
                                    )}
                                </div>
                                
                                {item.status !== 'not-started' && (
                                    <Progress 
                                        value={item.progress} 
                                        className="h-1.5 bg-slate-100" 
                                        indicatorClassName="bg-[#D93036]" // Custom Red Brand Color
                                    />
                                )}
                            </div>
                        </CardContent>

                        <CardFooter className="p-6 pt-0">
                            {item.type === 'path' ? (
                                item.status === 'completed' ? (
                                    <Button variant="outline" className="w-full rounded-xl h-11 border-slate-200 text-slate-600 hover:text-[#D93036] hover:border-[#D93036]/30 hover:bg-red-50 font-bold text-sm">
                                        Ver certificado
                                    </Button>
                                ) : (
                                    <Button className="w-full rounded-xl h-11 bg-[#D93036] hover:bg-[#b91c22] text-white font-bold text-sm shadow-lg shadow-red-100">
                                        Continuar
                                    </Button>
                                )
                            ) : (
                                item.status === 'in-progress' ? (
                                    <Button variant="outline" className="w-full rounded-xl h-11 border-slate-200 text-slate-700 hover:text-[#D93036] hover:border-[#D93036]/30 hover:bg-slate-50 font-bold text-sm">
                                        Reanudar
                                    </Button>
                                ) : (
                                    <Button variant="outline" className="w-full rounded-xl h-11 border-slate-200 text-slate-700 hover:text-slate-900 hover:bg-slate-50 font-bold text-sm">
                                        Comenzar
                                    </Button>
                                )
                            )}
                        </CardFooter>
                    </UniversityCard>
                    </Link>
                </motion.div>
            ))}
        </div>
    </div>
  )
}

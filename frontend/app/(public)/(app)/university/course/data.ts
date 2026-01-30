
import { LessonStatus } from "./components/lesson-item"

export interface Lesson {
    id: string
    title: string
    duration: string
    status: LessonStatus
}

export interface Section {
    id: string
    number: number
    title: string
    duration: string
    lessons: Lesson[]
}

export interface CourseData {
    slug: string
    title: string
    progress: number
    description: string
    sections: Section[]
}

export const coursesData: CourseData[] = [
    {
        slug: "gestion-del-tiempo",
        title: "Gestión del Tiempo para Líderes",
        progress: 35,
        description: "En esta sesión introductoria, exploraremos los fundamentos de la productividad personal y cómo la gestión del tiempo impacta directamente en tu capacidad de liderazgo. Analizaremos los errores comunes que cometen los líderes novatos y cómo reestructurar tu día para maximizar el impacto.",
        sections: [
            {
                id: "s1",
                number: 1,
                title: "Introducción a la Productividad",
                duration: "25 min",
                lessons: [
                    { id: "1-1", title: "Bienvenida al curso", duration: "2:30", status: "current" },
                    { id: "1-2", title: "¿Por qué nos falta tiempo?", duration: "5:45", status: "completed" },
                    { id: "1-3", title: "La matriz de Eisenhower", duration: "8:20", status: "available" },
                ]
            },
            {
                id: "s2",
                number: 2,
                title: "Técnicas de Priorización",
                duration: "45 min",
                lessons: [
                    { id: "2-1", title: "El método ABCDE", duration: "6:15", status: "available" },
                    { id: "2-2", title: "Ley de Pareto (80/20)", duration: "7:30", status: "locked" },
                    { id: "2-3", title: "Time Blocking", duration: "10:00", status: "locked" },
                ]
            }
        ]
    },
    {
        slug: "onboarding-institucional",
        title: "Onboarding Institucional 2024",
        progress: 15,
        description: "Domina nuestra cultura, herramientas y procesos. Tu viaje hacia la excelencia comienza aquí. Este curso cubre todo lo necesario para tus primeros días en la empresa.",
        sections: [
            {
                id: "m1",
                number: 1,
                title: "Bienvenida al Equipo",
                duration: "45 min",
                lessons: [
                    { id: "l1", title: "Historia de la Empresa", duration: "15:00", status: "completed" },
                    { id: "l2", title: "Nuestra Misión y Visión", duration: "10:00", status: "current" },
                    { id: "l3", title: "Conoce a tus líderes", duration: "20:00", status: "available" },
                ]
            },
            {
                id: "m2",
                number: 2,
                title: "Cultura y Valores",
                duration: "1h 20m",
                lessons: [
                    { id: "l4", title: "Pilares Fundamentales", duration: "30:00", status: "locked" },
                    { id: "l5", title: "Código de Conducta", duration: "50:00", status: "locked" },
                ]
            }
        ]
    }
]

export function getCourseBySlug(slug: string): CourseData {
    return coursesData.find(c => c.slug === slug) || coursesData[0];
}

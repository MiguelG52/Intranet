"use client"

import { LessonItem, LessonStatus } from "./lesson-item"

interface SectionData {
    id: string
    number: number
    title: string
    duration: string
    lessons: {
        id: string
        title: string
        duration: string
        status: LessonStatus
    }[]
}

interface CourseContentListProps {
    sections: SectionData[]
    currentLessonId: string
    onLessonSelect: (id: string) => void
}

export function CourseContentList({ sections, currentLessonId, onLessonSelect }: CourseContentListProps) {
    return (
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 h-full">
            <h2 className="text-lg font-bold text-slate-900 mb-6 px-2">Contenido del Curso</h2>
            
            <div className="space-y-8">
                {sections.map((section) => (
                    <div key={section.id}>
                        <div className="flex items-baseline justify-between px-2 mb-4">
                            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-red-50 text-[#D93036] flex items-center justify-center text-[10px] font-extrabold">
                                    {section.number}
                                </span>
                                {section.title}
                            </h3>
                            <span className="text-[10px] font-bold text-slate-400">{section.duration}</span>
                        </div>
                        
                        <div className="space-y-2">
                            {section.lessons.map(lesson => {
                                // Logic to determine display status
                                const isSelected = lesson.id === currentLessonId;
                                const displayStatus = isSelected ? 'current' : (lesson.status === 'current' ? 'available' : lesson.status);

                                return (
                                    <LessonItem 
                                        key={lesson.id}
                                        title={lesson.title}
                                        duration={lesson.duration}
                                        status={displayStatus}
                                        onClick={() => onLessonSelect(lesson.id)}
                                    />
                                )
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

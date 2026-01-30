"use client"

import { useState, use } from "react"
import { CourseHeader } from "../components/course-header"
import { VideoPlayer } from "../components/video-player"
import { ContentTabs } from "../components/content-tabs"
import { CourseContentList } from "../components/course-content-list"
import { CourseBreadcrumbs } from "../components/course-breadcrumbs"
import { getCourseBySlug } from "../data"
import { CornerGradient } from "@/components/common/background/corner-gradient"

export default function CoursePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const [activeTab, setActiveTab] = useState("description")
  const [currentLesson, setCurrentLesson] = useState("1-1")

  const course = getCourseBySlug(slug)
  
  if (!course) return <div>Curso no encontrado</div>

  const breadcrumbItems = [
      { label: "Intranet", href: "/" },
      { label: "University", href: "/university" },
      { label: "Course", href: "/university/my-learn" },
      { label: course.title, href: "#" }
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-6 lg:p-8 font-sans relative overflow-hidden">
        {/* Background Decorative Blob */}
        <CornerGradient />

      <div className="max-w-[1600px] mx-auto space-y-6 relative z-10">
        
        {/* Header */}
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 ease-out">
            <CourseHeader 
              title={course.title} 
              progress={course.progress} 
            />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Video & Content */}
            <div className="lg:col-span-2 space-y-8 animate-in slide-in-from-left-8 fade-in duration-700 delay-150 ease-out fill-mode-both">
                <VideoPlayer />

                <div className="space-y-6">
                    <ContentTabs activeTab={activeTab} onTabChange={setActiveTab} />
                    
                    <div className="bg-white rounded-[32px] p-8 shadow-sm border border-slate-100">
                      {activeTab === 'description' && (
                        <div className="space-y-4 animate-in fade-in duration-500">
                          <h3 className="text-xl font-bold text-slate-900">Sobre esta lección</h3>
                          <p className="text-slate-500 leading-relaxed text-lg">
                            {course.description}
                          </p>
                        </div>
                      )}
                      
                      {activeTab === 'resources' && (
                        <div className="p-8 text-center text-slate-500 animate-in fade-in duration-500">
                          <p>No hay recursos descargables para esta lección.</p>
                        </div>
                      )}

                      {activeTab === 'notes' && (
                        <div className="p-8 text-center text-slate-500 animate-in fade-in duration-500">
                          <p>Tus notas personales aparecerán aquí.</p>
                        </div>
                      )}
                    </div>
                </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-1 animate-in slide-in-from-right-8 fade-in duration-700 delay-300 ease-out fill-mode-both">
                <CourseContentList 
                    sections={course.sections} 
                    currentLessonId={currentLesson}
                    onLessonSelect={setCurrentLesson}
                />
            </div>
        </div>

      </div>
    </div>
  )
}

"use client"

import { UniversityNav } from "../components/university-nav"
import { GradientHeader } from "@/components/common/header/gradient-header"
import { DashboardStats } from "./components/dashboard-stats"
import { ContinueStudying } from "./components/continue-studying"

export default function UniversityDashboardPage() {
  return (
    <div className="public-container">
      <UniversityNav />
      
      <div className="pt-2 pb-6 space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Header Section */}
        <section>
           <GradientHeader 
              title="Universidad ASHA" 
              subtitle="Gestiona tu progreso y continúa desarrollando tus habilidades profesionalmente."
              className="mb-8"
            />
            
            <DashboardStats />
        </section>

        {/* Continue Studying Section */}
        <section>
          <ContinueStudying />
        </section>

      </div>
    </div>
  )
}

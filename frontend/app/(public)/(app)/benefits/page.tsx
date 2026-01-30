import { GradientHeader } from "@/components/common/header/gradient-header"
import { CornerGradient } from "@/components/common/background/corner-gradient"
import { VacationBalanceCard } from "./components/vacation-balance-card"
import { UpcomingHolidaysCard } from "./components/upcoming-holidays-card"
import { VacationRequestForm } from "./components/vacation-request-form"
import { CorporateBenefits } from "./components/corporate-benefits"

export default function BenefitsPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 space-y-12 max-w-[1600px] min-h-screen relative">
       <CornerGradient />
       
       <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-12">
       <GradientHeader
        title="Gestión de Beneficios"
        subtitle="Visualiza tu saldo, solicita vacaciones y disfruta tus beneficios."
        className="py-0 relative z-10"
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8 relative z-10 items-start">
        <div className="space-y-8 xl:col-span-1">
            <VacationBalanceCard />
            <UpcomingHolidaysCard />
        </div>
        <div className="xl:col-span-2">
            <VacationRequestForm />
        </div>
        <div className="xl:col-span-1">
           <CorporateBenefits />
        </div>
      </div>
      </div>
    </div>
  )
}

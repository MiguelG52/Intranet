import { GradientHeader } from "@/components/common/header/gradient-header"
import { UniversityCarousel } from "./components/university-carousel"
import { Award, BookOpen, Lightbulb, LayoutDashboard } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function UniversityPage() {
  return (
    <div className="public-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start py-8">
            {/* Left Column: Text Content */}
            <div className="order-2 lg:order-1 space-y-8 sticky top-8">
                <GradientHeader 
                   title="Universidad Asha"
                   subtitle="Empoderando el futuro a través del conocimiento."
                   className="py-0" 
                >
                    <div className="mt-6">
                        <Link href="/university/dashboard">
                            <Button size="lg" className="rounded-full px-8 text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                                <LayoutDashboard className="mr-2 h-5 w-5" />
                                Ir a mi Aprendizaje
                            </Button>
                        </Link>
                    </div>
                </GradientHeader>

                {/* Additional Content / Description */}
                <div className="flex flex-col gap-4">
                    {/* Card 1 */}
                    <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/40 border border-white/20 backdrop-blur-xl hover:bg-white/60 transition-all duration-300 shadow-sm hover:shadow-md group cursor-default">
                        <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                             <Award className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                                Lorem Ipsum
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </div>
                    </div>

                    {/* Card 2 */}
                    <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/40 border border-white/20 backdrop-blur-xl hover:bg-white/60 transition-all duration-300 shadow-sm hover:shadow-md group cursor-default">
                        <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                             <BookOpen className="h-6 w-6" />
                        </div>
                         <div>
                            <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                                Dolor Sit Amet
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                        </div>
                    </div>

                    {/* Card 3 */}
                    <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/40 border border-white/20 backdrop-blur-xl hover:bg-white/60 transition-all duration-300 shadow-sm hover:shadow-md group cursor-default">
                        <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                             <Lightbulb className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                                Consectetur Adipiscing
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Carousel */}
            <div className="order-1 lg:order-2 h-full min-h-[600px]">
                <UniversityCarousel />
            </div>
        </div>
    </div>
  )
}

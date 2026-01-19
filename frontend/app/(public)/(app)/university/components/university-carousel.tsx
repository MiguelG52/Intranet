"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const carouselItems = [
  {
    id: 1,
    title: "Investigación Innovadora",
    description: "Ampliando los límites de lo posible.",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 2,
    title: "Comunidad Global",
    description: "Conectando mentes de todo el mundo.",
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 3,
    title: "Líderes del Futuro",
    description: "Dando forma a los visionarios del mañana.",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1000",
  },
  {
    id: 4,
    title: "Arte y Cultura",
    description: "Explorando la profundidad de la expresión humana.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000",
  },
]

export function UniversityCarousel() {
  const tripleItems = [...carouselItems, ...carouselItems, ...carouselItems];

  return (
    <div className="h-[600px] w-full flex items-center justify-center p-4 relative overflow-hidden">
        {/* Gradients to mask edges - Using neutral/transparent to blend with gray background */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-zinc-100/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-zinc-100/90 to-transparent z-10 pointer-events-none" />

        <div className="relative w-full h-full grid grid-cols-3 gap-4">
             {/* Column 1: Moves Down */}
            <div className="relative w-full h-full overflow-hidden">
                <div className="absolute top-0 left-0 w-full animate-marquee-vertical-reverse hover:[animation-play-state:paused] flex flex-col gap-6">
                    {tripleItems.map((item, idx) => (
                         <CarouselCard key={`col1-${item.id}-${idx}`} item={item} />
                    ))}
                </div>
            </div>

            {/* Column 2: Moves Up */}
            <div className="relative w-full h-full overflow-hidden">
                <div className="absolute top-0 left-0 w-full animate-marquee-vertical hover:[animation-play-state:paused] flex flex-col gap-6">
                    {tripleItems.map((item, idx) => (
                         <CarouselCard key={`col2-${item.id}-${idx}`} item={item} />
                    ))}
                </div>
            </div>

            {/* Column 3: Moves Down */}
            <div className="relative w-full h-full overflow-hidden">
                <div className="absolute top-0 left-0 w-full animate-marquee-vertical-reverse hover:[animation-play-state:paused] flex flex-col gap-6">
                    {tripleItems.map((item, idx) => (
                         <CarouselCard key={`col3-${item.id}-${idx}`} item={item} />
                    ))}
                </div>
            </div>
        </div>
    </div>
  )
}

function CarouselCard({ item }: { item: typeof carouselItems[0] }) {
    return (
        <div className="w-full flex-shrink-0 h-64 p-2">
            <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/20 shadow-xl bg-white/5 backdrop-blur-sm group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-primary/50">
                 {/* Background Image */}
                <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                    style={{ backgroundImage: `url(${item.image})` }} 
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                   <div className="translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                        <h3 className="text-lg font-bold text-white mb-1 drop-shadow-md leading-tight">
                            {item.title}
                        </h3>
                        <p className="text-xs text-white/90 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                            {item.description}
                        </p>
                   </div>
                </div>
            </div>
        </div>
    )
}

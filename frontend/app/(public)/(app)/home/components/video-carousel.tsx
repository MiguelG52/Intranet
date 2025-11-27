'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Play } from "lucide-react";

const videos = [
  {
    id: 1,
    title: "Programa de Capacitación 2024",
    subtitle: "Inscripciones abiertas",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop",
    duration: "12:30"
  },
  {
    id: 2,
    title: "Mensaje del CEO - Q1",
    subtitle: "Resultados y Objetivos",
    thumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2574&auto=format&fit=crop",
    duration: "05:45"
  },
  {
    id: 3,
    title: "Nuevo Centro de Bienestar",
    subtitle: "Inauguración próxima",
    thumbnail: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2575&auto=format&fit=crop",
    duration: "03:20"
  }
];

export function VideoCarousel() {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">Contenido Destacado</h2>
      </div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {videos.map((video) => (
            <CarouselItem key={video.id} className="md:basis-1/2 lg:basis-1/2">
              <div className="p-1">
                <Card className="border-0 shadow-none bg-transparent">
                  <CardContent className="p-0 relative aspect-video rounded-xl overflow-hidden group cursor-pointer">
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 text-white fill-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-white font-bold truncate">{video.title}</h3>
                      <p className="text-gray-200 text-sm">{video.subtitle}</p>
                    </div>
                    <div className="absolute top-2 right-2 bg-black/60 px-2 py-1 rounded text-xs text-white font-medium">
                      {video.duration}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
}

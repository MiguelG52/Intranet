"use client"

import { UniversityNav } from "../components/university-nav"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Award, Calendar } from "lucide-react"

const certificates = [
    {
        id: "1",
        title: "Onboarding Institucional",
        date: "15 Oct 2023",
        instructor: "Recursos Humanos",
        image: "/images/university/cert-placeholder.jpg"
    }
]

export default function CertificatesPage() {
  return (
    <div className="container py-8 max-w-7xl">
        <UniversityNav />
        
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Mis Certificados</h1>
                <p className="text-muted-foreground mt-2">
                    Aquí encontrarás todos los certificados obtenidos al completar tus rutas de aprendizaje.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {certificates.map((cert) => (
                     <Card key={cert.id} className="group hover:shadow-lg transition-all duration-300">
                        <div className="aspect-[4/3] bg-muted relative overflow-hidden rounded-t-xl">
                            {/* Placeholder pattern */}
                            <div className="absolute inset-0 bg-secondary/20 flex items-center justify-center">
                                <Award className="h-20 w-20 text-secondary-foreground/20 group-hover:scale-110 transition-transform duration-500" />
                            </div>
                        </div>
                        <CardHeader>
                            <CardTitle>{cert.title}</CardTitle>
                            <CardDescription>Otorgado por {cert.instructor}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center text-sm text-muted-foreground gap-2">
                                <Calendar className="h-4 w-4" />
                                Completado el {cert.date}
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">
                                <Download className="mr-2 h-4 w-4" /> Descargar PDF
                            </Button>
                        </CardFooter>
                     </Card>
                ))}

                {/* Empty State / Placeholder if needed */}
                <Card className="flex flex-col items-center justify-center text-center p-8 border-dashed">
                    <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center mb-4">
                        <Award className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg">Sigue aprendiendo</h3>
                    <p className="text-sm text-muted-foreground max-w-xs mt-2 mb-4">
                        Completa más rutas de aprendizaje para desbloquear nuevos certificados.
                    </p>
                    <Button variant="secondary" size="sm">Ir al Catálogo</Button>
                </Card>
            </div>
        </div>
    </div>
  )
}

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, AlertCircle, Calendar, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const announcements = [
  {
    id: 1,
    title: "Actualización del Sistema de Nóminas",
    type: "Comunicado",
    date: "Hace 2 horas",
    icon: FileText,
    color: "bg-blue-100 text-blue-600"
  },
  {
    id: 2,
    title: "Mantenimiento Programado - Servidores",
    type: "Aviso",
    date: "Hace 4 horas",
    icon: AlertCircle,
    color: "bg-red-100 text-red-600",
    badge: "Urgente"
  },
  {
    id: 3,
    title: "Celebración Aniversario de la Empresa",
    type: "Evento",
    date: "Hace 1 día",
    icon: Calendar,
    color: "bg-purple-100 text-purple-600"
  },
  {
    id: 4,
    title: "Nueva Política de Vacaciones",
    type: "Política",
    date: "Hace 2 días",
    icon: FileText,
    color: "bg-green-100 text-green-600"
  }
];

export function AnnouncementsWidget() {
  return (
    <Card className="border-none shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-gray-800">
          Centro de Comunicados
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {announcements.map((item) => (
          <div key={item.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border border-transparent hover:border-gray-100">
            <div className={`p-2 rounded-lg ${item.color} shrink-0 flex items-center justify-center`}>
              <item.icon className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  {item.type}
                </span>
                {item.badge && (
                  <Badge variant="destructive" className="text-[10px] h-5 px-1.5">
                    {item.badge}
                  </Badge>
                )}
              </div>
              <h4 className="text-sm font-medium text-gray-900 leading-tight mb-1 truncate">
                {item.title}
              </h4>
              <p className="text-xs text-gray-400 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mr-1.5"></span>
                {item.date}
              </p>
            </div>
          </div>
        ))}
        
        <div className="pt-2">
          <button className="text-xs text-red-600 font-medium flex items-center hover:underline">
            Ver todos los comunicados
            <ArrowRight className="w-3 h-3 ml-1" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

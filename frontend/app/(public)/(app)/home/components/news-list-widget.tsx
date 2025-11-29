import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const news = [
  {
    id: 1,
    title: "Resultados Trimestrales Q3 2024",
    category: "Finanzas",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2626&auto=format&fit=crop",
    date: "10 Oct"
  },
  {
    id: 2,
    title: "Iniciativa Verde: Reducción de Huella de Carbono",
    category: "Sostenibilidad",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2613&auto=format&fit=crop",
    date: "08 Oct"
  },
  {
    id: 3,
    title: "Bienvenida a los Nuevos Talentos",
    category: "RRHH",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2684&auto=format&fit=crop",
    date: "05 Oct"
  },
  {
    id: 4,
    title: "Tech Talk: Inteligencia Artificial en el Trabajo",
    category: "Tecnología",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2670&auto=format&fit=crop",
    date: "01 Oct"
  }
];

export function NewsListWidget() {
  return (
    <Card className="border-none shadow-lg">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-gray-800">
          Últimas Noticias
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {news.map((item) => (
          <div key={item.id} className="flex gap-3 group cursor-pointer">
            <div className="w-20 h-20 shrink-0 rounded-lg overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-xs font-semibold text-blue-600 mb-1">
                {item.category}
              </span>
              <h4 className="text-sm font-medium text-gray-900 leading-snug mb-1 group-hover:text-blue-700 transition-colors line-clamp-2">
                {item.title}
              </h4>
              <span className="text-xs text-gray-400">
                {item.date}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

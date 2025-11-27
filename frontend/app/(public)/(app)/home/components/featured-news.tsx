interface FeaturedNewsProps {
  title: string;
  description: string;
  date: string;
  category: string;
  imageUrl: string;
  likes: number;
  comments: number;
}

export function FeaturedNews({ 
  title = "Asha Solution",
  description = "Las cosas como deben como deben ser",
  imageUrl = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2671&auto=format&fit=crop",

}: Partial<FeaturedNewsProps>) {
  return (
    <div className="relative h-[400px] w-full rounded-xl overflow-hidden group cursor-pointer">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 p-8 w-full text-white">
        
        <h2 className="text-3xl font-bold mb-3 leading-tight">
          {title}
        </h2>
        
        <p className="text-gray-200 mb-6 line-clamp-2">
          {description}
        </p>
        
      </div>
    </div>
  );
}

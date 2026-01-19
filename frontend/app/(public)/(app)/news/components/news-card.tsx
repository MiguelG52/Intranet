import { NewsItem } from "@/lib/types/news";
import { Calendar, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NewsCardProps {
  news: NewsItem;
  className?: string;
}

export function NewsCard({ news, className }: NewsCardProps) {

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>?/gm, '').slice(0, 150) + '...';
  };

  return (
    <Link 
      href={news.link} 
      target="_blank" 
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl bg-card border border-border/50 transition-all hover:shadow-lg hover:border-primary/20 hover:-translate-y-1",
        className
      )}
    >
      {news.image && (
        <div className="relative aspect-video w-full overflow-hidden bg-muted">
          <img
            src={news.image}
            alt={news.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
      )}
      
      <div className="flex flex-1 flex-col p-4 gap-3">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1 bg-secondary px-2 py-0.5 rounded-md font-medium text-secondary-foreground">
            {news.source}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(news.pubDate).toLocaleDateString()}
          </span>
        </div>

        <h3 className="font-bold leading-tight tracking-tight group-hover:text-primary transition-colors line-clamp-2">
          {news.title}
        </h3>

        <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
          {stripHtml(news.content)}
        </p>
        
        <div className="mt-auto pt-2 flex items-center text-xs font-medium text-primary opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0">
          Leer más <ExternalLink className="ml-1 h-3 w-3" />
        </div>
      </div>
    </Link>
  );
}

'use client';

import { NewsItem } from "@/lib/types/news";
import { getNews } from "@/lib/actions/news/news.actions";
import { NewsCard } from "./news-card";
import { Loader2 } from "lucide-react";
import { useInfiniteScroll } from "@/hooks/use-infinite-scroll";

interface NewsGridProps {
  initialNews: NewsItem[];
}

export function NewsGrid({ initialNews }: NewsGridProps) {
  const { items: news, hasMore, ref } = useInfiniteScroll<NewsItem>({
    initialData: initialNews,
    fetchData: (page) => getNews(page),
  });

  return (
    <div className="space-y-8 pb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr">
        {news.map((item, index) => (
          <NewsCard 
            key={`${item.link}-${index}`} 
            news={item} 
            className={index === 0 ? "md:col-span-2 md:row-span-2" : ""}
          />
        ))}
      </div>

      {hasMore && (
        <div ref={ref} className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )}
      
      {!hasMore && (
        <div className="text-center text-muted-foreground py-8">
          No hay más noticias para mostrar
        </div>
      )}
    </div>
  );
}


import { Suspense } from "react";
import { getNews } from "@/lib/actions/news/news.actions";
import { NewsGrid } from "./components/news-grid";
import { NewsHeader } from "./components/news-header";
import { Loader2 } from "lucide-react";

export default async function NewsPage() {
  const { data: initialNews } = await getNews(1, 20);

  return (
    <div className="public-container">
      <NewsHeader />
      
      <main className="public-container pt-24">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Últimas Noticias</h2>
          <p className="text-muted-foreground mt-2">
            Mantente informado con las últimas novedades en ciberseguridad
          </p>
        </div>

        <Suspense 
          fallback={
            <div className="flex h-[50vh] items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          }
        >
          <NewsGrid initialNews={initialNews} />
        </Suspense>
      </main>
    </div>
  );
}
import { Suspense } from "react";
import { getNews } from "@/lib/actions/news/news.actions";
import { NewsGrid } from "./components/news-grid";
import { Loader2 } from "lucide-react";
import { GradientHeader } from "@/components/common/header/gradient-header";

export default async function NewsPage() {
  const { data: initialNews } = await getNews(1, 20);

  return (
    <div className="public-container space-y-8">
      <GradientHeader
        title="Últimas Noticias"
        subtitle="Mantente informado con las últimas novedades en ciberseguridad"
        className="py-0"
      />
      
      <main>
        <div className="min-h-[400px] rounded-3xl bg-white/50 p-6 shadow-xl ring-1 ring-gray-900/5 backdrop-blur-xl">
          <Suspense 
            fallback={
              <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            }
          >
            <NewsGrid initialNews={initialNews} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
export interface NewsItem {
  title: string;
  link: string;
  content: string;
  pubDate: string;
  image: string | null;
  source: string;
}

export interface NewsResponse {
  data: NewsItem[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

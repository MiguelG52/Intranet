import { useState, useEffect, useCallback, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface FetchResponse<T> {
  data: T[];
}

interface UseInfiniteScrollOptions<T> {
  initialData: T[];
  fetchData: (page: number) => Promise<FetchResponse<T>>;
  initialPage?: number;
}

export function useInfiniteScroll<T>({ 
  initialData, 
  fetchData, 
  initialPage = 2 
}: UseInfiniteScrollOptions<T>) {
  const [items, setItems] = useState<T[]>(initialData);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { ref, inView } = useInView();
  
  const pageRef = useRef(initialPage);
  const isLoadingRef = useRef(false);
  const hasMoreRef = useRef(true);
  const fetchDataRef = useRef(fetchData);

  useEffect(() => {
    fetchDataRef.current = fetchData;
  }, [fetchData]);

  const loadMore = useCallback(async () => {
    if (isLoadingRef.current || !hasMoreRef.current) return;
    
    isLoadingRef.current = true;
    setIsLoading(true);
    try {
      const response = await fetchDataRef.current(pageRef.current);
      if (response.data.length === 0) {
        setHasMore(false);
        hasMoreRef.current = false;
      } else {
        setItems((prev) => [...prev, ...response.data]);
        pageRef.current += 1;
      }
    } catch (error) {
      console.error("Error loading more items:", error);
    } finally {
      // Add a delay to prevent multiple rapid calls
      setTimeout(() => {
        isLoadingRef.current = false;
        setIsLoading(false);
      }, 500);
    }
  }, []);

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView, loadMore]);

  return {
    items,
    isLoading,
    hasMore,
    ref
  };
}

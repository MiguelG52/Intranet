'use server';

import { NewsResponse } from '@/lib/types/news';
import { api } from '@/lib/api/client';
import { cache } from 'react';

export const getNews = cache(async(page: number = 1, limit: number = 10, search: string = ''): Promise<NewsResponse> => {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search,
    });

    const response = await api.get(`/news?${params.toString()}`, {
      next: { revalidate: 60 }
    });

    return response as NewsResponse;
  } catch (error) {
    console.error('Error fetching news:', error);
    return {
      data: [],
      meta: {
        total: 0,
        page,
        limit,
        totalPages: 0,
      },
    };
  }
})


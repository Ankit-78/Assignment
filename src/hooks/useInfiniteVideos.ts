import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchVideos } from '../api/videos';

const VIDEOS_PER_PAGE = 12;

export const useInfiniteVideos = () => {
  return useInfiniteQuery({
    queryKey: ['videos'],
    queryFn: ({ pageParam = 0 }) => fetchVideos(pageParam, VIDEOS_PER_PAGE),
    getNextPageParam: (lastPage, allPages) => {
      if (!lastPage.hasMore) return undefined;
      return allPages.length * VIDEOS_PER_PAGE;
    },
    staleTime: 1000 * 60 * 5, 
    initialPageParam: 0,
  });
};
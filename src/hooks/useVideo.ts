import { useQuery } from '@tanstack/react-query';
import { fetchVideoById } from '../api/videos';

export const useVideo = (generationId: string) => {
  return useQuery({
    queryKey: ['video', generationId],
    queryFn: () => fetchVideoById(generationId),
    enabled: !!generationId,
    staleTime: 1000 * 60 * 10, 
  });
};
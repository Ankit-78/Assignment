import React, { useEffect } from 'react';
import { VideoCard } from './VideoCard';
import { SkeletonLoader, InlineSkeletonLoader } from './SkeletonLoader';
import { useInfiniteVideos } from '../hooks/useInfiniteVideos';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { AlertCircle, RefreshCw } from 'lucide-react';

export const Gallery: React.FC = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
    refetch
  } = useInfiniteVideos();

  const { ref: loadMoreRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px'
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const videos = data?.pages.flatMap(page => page.videos) ?? [];

  if (status === 'pending') {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Creative Gallery
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              Discover amazing content from our community
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <SkeletonLoader count={12} />
          </div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">
            {error instanceof Error ? error.message : 'Failed to load content'}
          </p>
          <button
            onClick={() => refetch()}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Creative Gallery
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Discover amazing content from our community
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
          
          {isFetchingNextPage && <SkeletonLoader count={8} />}
        </div>

        {}
        {hasNextPage && (
          <div ref={loadMoreRef} className="mt-8">
            {isFetchingNextPage && <InlineSkeletonLoader />}
          </div>
        )}

        {!hasNextPage && videos.length > 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">
              You've reached the end! 🎉
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
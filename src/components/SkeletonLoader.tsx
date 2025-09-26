import React from 'react';

interface SkeletonLoaderProps {
  count?: number;
}

const SkeletonCard: React.FC<{ aspectRatio: number }> = ({ aspectRatio }) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
    <div 
      className="bg-gray-200 relative"
      style={{ aspectRatio }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer bg-[length:200%_100%]" />
    </div>
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-200 rounded-md animate-shimmer bg-[length:200%_100%]" />
      <div className="h-3 bg-gray-200 rounded-md w-2/3 animate-shimmer bg-[length:200%_100%]" />
      <div className="flex gap-2">
        <div className="h-6 bg-gray-200 rounded-full w-16 animate-shimmer bg-[length:200%_100%]" />
        <div className="h-6 bg-gray-200 rounded-full w-20 animate-shimmer bg-[length:200%_100%]" />
      </div>
    </div>
  </div>
);

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ count = 12 }) => {
  const aspectRatios = [0.75, 1, 1.33, 0.6, 1.6, 0.8, 1.2];
  
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <SkeletonCard
          key={i}
          aspectRatio={aspectRatios[i % aspectRatios.length]}
        />
      ))}
    </>
  );
};

export const InlineSkeletonLoader: React.FC = () => (
  <div className="col-span-full flex justify-center py-8">
    <div className="flex items-center space-x-2">
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
    </div>
  </div>
);
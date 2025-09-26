import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Clock, Image as ImageIcon } from 'lucide-react';
import type { Video } from '../types';

interface VideoCardProps {
  video: Video;
}

const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const handleClick = () => {
    navigate(`/g/${video.generation_id}`);
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden"
      onClick={handleClick}
    >
      <div className="relative overflow-hidden">
        {!imageLoaded && !imageError && (
          <div 
            className="w-full bg-gray-200 animate-pulse flex items-center justify-center"
            style={{ aspectRatio: video.aspect_ratio }}
          >
            <ImageIcon className="w-8 h-8 text-gray-400" />
          </div>
        )}
        
        {imageError && (
          <div 
            className="w-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300"
            style={{ aspectRatio: video.aspect_ratio }}
          >
            <div className="text-center">
              <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-xs text-gray-500">Image unavailable</p>
            </div>
          </div>
        )}
        
        <img
          src={video.thumbnail}
          alt={video.title}
          className={`w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ aspectRatio: video.aspect_ratio }}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
        />
        
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
          <div className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300">
            <Play className="w-5 h-5 text-gray-800 ml-0.5" fill="currentColor" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {formatDuration(video.duration)}
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {video.title}
        </h3>
        
        <div className="flex flex-wrap gap-1 mb-3">
          {video.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full hover:bg-gray-200 transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
        
        <p className="text-xs text-gray-500">
          {new Date(video.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};
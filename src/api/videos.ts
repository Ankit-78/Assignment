import type { Video, ApiResponse } from '../types';

const pexelsImages = [
  'https://images.pexels.com/photos/3571551/pexels-photo-3571551.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1526909/pexels-photo-1526909.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1323712/pexels-photo-1323712.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1366957/pexels-photo-1366957.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1526909/pexels-photo-1526909.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/3571551/pexels-photo-3571551.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1366630/pexels-photo-1366630.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=400',
  'https://images.pexels.com/photos/1624496/pexels-photo-1624496.jpeg?auto=compress&cs=tinysrgb&w=400'
];

const videoUrls = [
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4'
];

const generateDummyVideo = (id: number): Video => {
  const aspectRatios = [0.75, 1, 1.33, 0.6, 1.6, 0.8, 1.2];
  const titles = [
    'Sunset Ocean Waves',
    'Urban City Lights',
    'Mountain Forest Path',
    'Abstract Art Motion',
    'Coffee Shop Vibes',
    'Desert Sand Dunes',
    'Rainy Window View',
    'Flower Garden Bloom',
    'Space Galaxy Stars',
    'Winter Snow Fall'
  ];
  
  const tags = [
    ['nature', 'ocean', 'sunset'],
    ['city', 'lights', 'urban'],
    ['forest', 'mountain', 'hiking'],
    ['abstract', 'art', 'motion'],
    ['coffee', 'lifestyle', 'cozy'],
    ['desert', 'nature', 'sand'],
    ['rain', 'weather', 'mood'],
    ['flowers', 'garden', 'spring'],
    ['space', 'galaxy', 'stars'],
    ['winter', 'snow', 'cold']
  ];

  const aspectRatio = aspectRatios[id % aspectRatios.length];
  
  return {
    id: `video-${id}`,
    generation_id: `gen-${Math.random().toString(36).substr(2, 9)}`,
    title: titles[id % titles.length],
    thumbnail: pexelsImages[id % pexelsImages.length],
    video_url: videoUrls[id % videoUrls.length],
    aspect_ratio: aspectRatio,
    duration: 15 + (id % 45),
    created_at: new Date(Date.now() - (id * 86400000)).toISOString(),
    tags: tags[id % tags.length]
  };
};

const TOTAL_VIDEOS = 200;
const allVideos = Array.from({ length: TOTAL_VIDEOS }, (_, i) => generateDummyVideo(i));

export const fetchVideos = async (offset: number = 0, limit: number = 12): Promise<ApiResponse> => {
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
  
  const videos = allVideos.slice(offset, offset + limit);
  const hasMore = offset + limit < TOTAL_VIDEOS;
  
  return {
    videos,
    hasMore,
    total: TOTAL_VIDEOS
  };
};

export const fetchVideoById = async (generationId: string): Promise<Video | null> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const video = allVideos.find(v => v.generation_id === generationId);
  return video || null;
};
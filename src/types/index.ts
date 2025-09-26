export interface Video {
  id: string;
  generation_id: string;
  title: string;
  thumbnail: string;
  video_url: string;
  aspect_ratio: number;
  duration: number;
  created_at: string;
  tags: string[];
}

export interface ApiResponse {
  videos: Video[];
  hasMore: boolean;
  total: number;
}
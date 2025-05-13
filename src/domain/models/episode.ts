export type Episode = {
  id: number;
  title: string;
  description?: string;
  episodeNumber: number;
  previewUrl: string;
  url: string;
  thumbnailUrl: string;
  durationInMinutes: number;
  releaseDate: Date;
  movieId: number;
};

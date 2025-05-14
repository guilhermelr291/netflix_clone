import { AddEpisode } from '../../../domain/use-cases/episode/add-episode';

export const mockAddEpisodeParams = (): AddEpisode.Params => ({
  title: 'Test Episode',
  description: 'This is a test episode description',
  episodeNumber: 1,
  previewUrl: 'https://example.com/previews/test-episode.mp4',
  url: 'https://example.com/videos/test-episode.mp4',
  movieId: 1,
  durationInMinutes: 45,
  thumbnailUrl: 'https://example.com/thumbnails/test-episode.jpg',
  releaseDate: new Date('2023-01-01'),
});

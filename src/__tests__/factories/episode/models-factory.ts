import { Episode } from '../../../domain/models/episode';

export const mockEpisode = (): Episode => ({
  id: 1,
  title: 'any_title',
  description: 'any_description',
  episodeNumber: 1,
  previewUrl: 'any_preview_url',
  url: 'any_url',
  thumbnailUrl: 'any_thumbnail_url',
  durationInMinutes: 1,
  releaseDate: new Date(),
  movieId: 1,
});

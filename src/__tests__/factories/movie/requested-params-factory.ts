import { Movie } from '../../../domain/models/movie';

export const mockAddMovieParams = (): Omit<Movie, 'id'> => ({
  title: 'Fake Movie',
  previewUrl: 'http://example.com/preview',
  thumbnailUrl: 'http://example.com/thumbnail',
  description: 'This is a fake movie description.',
  rating: 4.5,
  releaseYear: 2023,
  durationInMinutes: 120,
});

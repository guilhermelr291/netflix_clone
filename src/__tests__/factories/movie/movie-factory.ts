import { Movie } from '../../../domain/models/movie';

export const mockMovie = (): Movie => ({
  id: 1,
  title: 'Fake Movie',
  previewUrl: 'http://example.com/preview',
  thumbnailUrl: 'http://example.com/thumbnail',
  description: 'This is a fake movie description.',
  rating: 4.5,
  releaseYear: 2023,
  durationInMinutes: 120,
});

export const mockMoviesModel = () => [
  {
    id: 1,
    title: 'Test Movie 1',
    previewUrl: 'http://example.com/preview1',
    thumbnailUrl: 'http://example.com/thumbnail1',
    description: 'A test movie description',
    rating: 4.5,
    releaseYear: 2023,
    duration: 120,
    favorites: [],
    cast: [],
    episodes: [],
    genres: [],
  },
  {
    id: 2,
    title: 'Test Movie 2',
    previewUrl: 'http://example.com/preview2',
    thumbnailUrl: 'http://example.com/thumbnail2',
    description: 'Another test movie description',
    rating: 3.8,
    releaseYear: 2022,
    duration: 105,
    favorites: [],
    cast: [],
    episodes: [],
    genres: [],
  },
];

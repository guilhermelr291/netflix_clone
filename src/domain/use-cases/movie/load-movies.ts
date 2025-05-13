import { Movie } from '../../models/movie';

export interface LoadMovies {
  loadAll(): Promise<Movie[]>;
}

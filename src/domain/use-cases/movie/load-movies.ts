import { Movie } from '../../models/movie';

export interface loadMovies {
  loadAll(): Promise<Movie[]>;
}

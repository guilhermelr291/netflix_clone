import { Movie } from '../../../domain/models/movie';

export interface LoadMoviesRepository {
  loadAll(): Promise<Movie[]>;
}

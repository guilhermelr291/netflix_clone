import { Movie } from '../../models/movie';

export interface LoadMovieById {
  loadById: (id: string) => Promise<Movie | null>;
}

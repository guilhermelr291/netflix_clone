import { Movie } from '../../models/movie';

export interface LoadMovieById {
  loadById(id: number): Promise<Movie | null>;
}

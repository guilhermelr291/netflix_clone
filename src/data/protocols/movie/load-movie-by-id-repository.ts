import { Movie } from '../../../domain/models/movie';

export interface LoadMovieByIdRepository {
  loadById(id: string): Promise<Movie | null>;
}

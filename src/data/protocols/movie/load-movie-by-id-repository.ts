import { Movie } from '../../../domain/models/movie';

export interface LoadMovieByIdRepository {
  loadById(id: number): Promise<Movie | null>;
}

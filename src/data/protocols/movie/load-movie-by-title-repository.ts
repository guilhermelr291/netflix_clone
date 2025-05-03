import { Movie } from '../../../domain/models/movie';

export interface LoadMovieByTitleRepository {
  loadByTitle(title: string): Promise<Movie | null>;
}

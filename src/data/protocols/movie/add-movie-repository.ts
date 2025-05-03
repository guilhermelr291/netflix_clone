import { Movie } from '../../../domain/models/movie';
import { AddMovie } from '../../../domain/use-cases/movie/add-movie';

export interface AddMovieRepository {
  add(data: AddMovie.Params): Promise<Movie>;
}

import { DeleteMovie } from '../../../domain/use-cases/movie/delete-movie';

export interface DeleteMovieRepository {
  deleteById(id: DeleteMovie.Params): Promise<void>;
}

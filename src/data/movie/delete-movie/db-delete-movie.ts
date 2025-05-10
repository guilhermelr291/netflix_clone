import { DeleteMovie } from '../../../domain/use-cases/movie/delete-movie';

export class DbDeleteMovie implements DeleteMovie {
  constructor(private readonly deleteMovieRepository: DeleteMovieRepository) {}

  async delete(id: DeleteMovie.Params): Promise<void> {}
}

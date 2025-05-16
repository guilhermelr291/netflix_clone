import { DeleteMovie } from '../../../domain/use-cases/movie/delete-movie';
import { DeleteMovieRepository } from '../../protocols/movie/delete-movie-repository';
import { LoadMovieByIdRepository } from '../../protocols/movie/load-movie-by-id-repository';
import { NotFoundError } from '../../../shared/errors/index';

export class DbDeleteMovie implements DeleteMovie {
  constructor(
    private readonly deleteMovieRepository: DeleteMovieRepository,
    private readonly loadMovieByIdRepository: LoadMovieByIdRepository
  ) {}

  async delete(id: string): Promise<void> {
    const movie = await this.loadMovieByIdRepository.loadById(id);
    if (!movie) {
      throw new NotFoundError('Movie not found');
    }

    await this.deleteMovieRepository.deleteById(id);
  }
}

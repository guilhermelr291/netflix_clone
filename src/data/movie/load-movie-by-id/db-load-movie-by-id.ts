import { Movie } from '../../../domain/models/movie';
import { LoadMovieById } from '../../../domain/use-cases/movie/load-movie-by-id';
import { NotFoundError } from '../../../shared/errors';
import { LoadMovieByIdRepository } from '../../protocols/movie/load-movie-by-id-repository';

export class DbLoadMovieById implements LoadMovieById {
  constructor(
    private readonly loadMovieByIdRepository: LoadMovieByIdRepository
  ) {}

  async loadById(id: string): Promise<Movie | null> {
    const movie = await this.loadMovieByIdRepository.loadById(id);
    if (!movie) {
      throw new NotFoundError('Movie not found');
    }
    return movie;
  }
}

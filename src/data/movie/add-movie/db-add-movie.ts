import { Movie } from '../../../domain/models/movie';
import { AddMovie } from '../../../domain/use-cases/movie/add-movie';
import { ConflictError } from '../../../shared/errors';
import { AddMovieRepository } from '../../protocols/movie/add-movie-repository';
import { LoadMovieByTitleRepository } from '../../protocols/movie/load-movie-by-title-repository';

export class DbAddMovie implements AddMovie {
  constructor(
    private readonly loadMovieByTitleRepository: LoadMovieByTitleRepository,
    private readonly addMovieRepository: AddMovieRepository
  ) {}
  async add(data: AddMovie.Params): Promise<Movie> {
    const movieExists = await this.loadMovieByTitleRepository.loadByTitle(
      data.title
    );
    if (movieExists)
      throw new ConflictError('Movie with this title already exists');

    const movie = await this.addMovieRepository.add(data);

    return movie;
  }
}

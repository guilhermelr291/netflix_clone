import { Movie } from '../../../domain/models/movie';
import { AddMovie } from '../../../domain/use-cases/movie/add-movie';
import { LoadMovieByTitleRepository } from '../../protocols/movie/load-movie-by-title-repository';

export class DbAddMovie implements AddMovie {
  constructor(
    private readonly loadMovieByTitleRepository: LoadMovieByTitleRepository
  ) {}
  async add(data: AddMovie.Params): Promise<Movie> {
    const movie = await this.loadMovieByTitleRepository.loadByTitle(data.title);
  }
}

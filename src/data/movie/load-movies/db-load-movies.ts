import { Movie } from '../../../domain/models/movie';
import { loadMovies } from '../../../domain/use-cases/movie/load-movies';
import { LoadMoviesRepository } from '../../protocols/movie/load-movies-repository';

export class DbLoadMovies implements loadMovies {
  constructor(private readonly loadMoviesRepository: LoadMoviesRepository) {}

  async loadAll(): Promise<Movie[]> {
    const movies = await this.loadMoviesRepository.loadAll();
    return movies;
  }
}

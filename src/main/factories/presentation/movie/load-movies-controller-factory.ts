import { LoadMoviesController } from '../../../../presentation/controllers/movie/load-movies/load-movies-controller';
import { makeDbLoadMovies } from '../../data/movie/db-load-movies-factory';

export const makeLoadMoviesController = (): LoadMoviesController => {
  return new LoadMoviesController(makeDbLoadMovies());
};

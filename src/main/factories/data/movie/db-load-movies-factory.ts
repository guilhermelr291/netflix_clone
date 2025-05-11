import { DbLoadMovies } from '../../../../data/movie/load-movies/db-load-movies';
import { makeMovieRepository } from '../../infra';

export const makeDbLoadMovies = (): DbLoadMovies => {
  return new DbLoadMovies(makeMovieRepository());
};

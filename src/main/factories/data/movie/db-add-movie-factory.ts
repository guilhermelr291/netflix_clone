import { DbAddMovie } from '../../../../data/movie/add-movie/db-add-movie';
import { makeMovieRepository } from '../../infra';

export const makeDbAddMovie = (): DbAddMovie => {
  const movieRepository = makeMovieRepository();
  return new DbAddMovie(movieRepository, movieRepository);
};

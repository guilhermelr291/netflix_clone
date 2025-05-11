import { DbDeleteMovie } from '../../../../data/movie/delete-movie/db-delete-movie';
import { makeMovieRepository } from '../../infra';

export const makeDbDeleteMovie = (): DbDeleteMovie => {
  const movieRepository = makeMovieRepository();
  return new DbDeleteMovie(movieRepository, movieRepository);
};

import { DbDeleteMovie } from '../../../../data/movie/delete-movie/db-delete-movie';
import { makeMovieRepository } from '../../infra';

export const makeDbDeleteMovie = (): DbDeleteMovie => {
  return new DbDeleteMovie(makeMovieRepository());
};

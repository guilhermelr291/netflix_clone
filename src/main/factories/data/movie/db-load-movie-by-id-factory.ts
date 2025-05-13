import { DbLoadMovieById } from '../../../../data/movie/load-movie-by-id/db-load-movie-by-id';

import { makeMovieRepository } from '../../infra';

export const makeDbLoadMovieById = (): DbLoadMovieById => {
  return new DbLoadMovieById(makeMovieRepository());
};

import { MovieRepository } from '../../../infra/db/movie/movie-repository';

export const makeMovieRepository = (): MovieRepository => {
  return new MovieRepository();
};

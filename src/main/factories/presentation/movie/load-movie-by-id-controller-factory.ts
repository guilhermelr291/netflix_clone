import { LoadMovieByIdController } from '../../../../presentation/controllers/movie/load-movie-by-id/load-movie-by-id-controller';
import { makeDbLoadMovieById } from '../../data';

export const makeLoadMovieByIdController = (): LoadMovieByIdController => {
  return new LoadMovieByIdController(makeDbLoadMovieById());
};

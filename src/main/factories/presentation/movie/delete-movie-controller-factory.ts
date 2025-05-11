import { DeleteMovieController } from '../../../../presentation/controllers/movie/delete-movie/delete-movie-controller';
import { makeDbDeleteMovie } from '../../data';

export const makeDeleteMovieController = (): DeleteMovieController => {
  return new DeleteMovieController(makeDbDeleteMovie());
};

import { AddMovieController } from '../../../../presentation/controllers/movie/add-movie/add-movie-controller';
import { makeDbAddMovie } from '../../data';

export const makeAddMovieController = (): AddMovieController => {
  return new AddMovieController(makeDbAddMovie());
};

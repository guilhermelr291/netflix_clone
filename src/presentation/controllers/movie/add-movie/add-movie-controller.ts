import { AddMovie } from '../../../../domain/use-cases/movie/add-movie';
import { Controller } from '../../../protocols/controller';
import { HttpResponse } from '../../../protocols/http';

export class AddMovieController implements Controller {
  handle(request: AddMovie.Params): Promise<HttpResponse> {
    try {
    } catch (error) {
      console.error('Error on AddMovieController: ', error);
      throw error;
    }
  }
}

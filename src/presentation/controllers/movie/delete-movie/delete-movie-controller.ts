import { DeleteMovie } from '../../../../domain/use-cases/movie/delete-movie';
import { ok } from '../../../helpers/http-helper';
import { Controller } from '../../../protocols/controller';
import { HttpResponse } from '../../../protocols/http';

export class DeleteMovieController implements Controller {
  constructor(private readonly deleteMovie: DeleteMovie) {}

  async handle(request: DeleteMovieController.Params): Promise<HttpResponse> {
    try {
      const { id } = request;

      await this.deleteMovie.delete(id);

      return ok({ message: 'movie deleted successfully' });
    } catch (error) {
      console.error('Error when deleting movie: ', error);
      throw error;
    }
  }
}

export namespace DeleteMovieController {
  export type Params = {
    id: string;
  };
}

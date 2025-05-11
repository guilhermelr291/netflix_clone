import { LoadMovieById } from '../../../../domain/use-cases/movie/load-movie-by-id';
import { ok } from '../../../helpers/http-helper';
import { Controller } from '../../../protocols/controller';
import { HttpResponse } from '../../../protocols/http';

export class LoadMovieByIdController implements Controller {
  constructor(private readonly loadMovieById: LoadMovieById) {}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const id = Number(request.params.id);
      const movie = await this.loadMovieById.loadById(id);

      return ok(movie);
    } catch (error) {
      console.error('Error on loading move by id: ', error);

      throw error;
    }
  }
}

import { LoadMovies } from '../../../../domain/use-cases/movie/load-movies';
import { ok } from '../../../helpers/http-helper';
import { Controller } from '../../../protocols/controller';
import { HttpResponse } from '../../../protocols/http';

export class LoadMoviesController implements Controller {
  constructor(private readonly loadMovies: LoadMovies) {}

  async handle(request: any): Promise<HttpResponse> {
    try {
      const movies = await this.loadMovies.loadAll();

      return ok(movies);
    } catch (error) {
      console.error('Error on loading movies', error);
      throw error;
    }
  }
}

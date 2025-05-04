import { AddMovie } from '../../../../domain/use-cases/movie/add-movie';
import { created } from '../../../helpers/http-helper';
import { Controller } from '../../../protocols/controller';
import { HttpResponse } from '../../../protocols/http';

export class AddMovieController implements Controller {
  constructor(private readonly addMovie: AddMovie) {}

  async handle(request: AddMovie.Params): Promise<HttpResponse> {
    try {
      const movieData: AddMovie.Params = {
        title: request.title,
        previewUrl: request.previewUrl,
        description: request.description,
        durationInMinutes: request.durationInMinutes,
        rating: request.rating,
        releaseYear: request.releaseYear,
        thumbnailUrl: request.thumbnailUrl,
      };

      const movie = await this.addMovie.add(movieData);

      return created(movie);
    } catch (error) {
      console.error('Error on AddMovieController: ', error);
      throw error;
    }
  }
}

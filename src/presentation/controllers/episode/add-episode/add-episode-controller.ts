import { AddEpisode } from '../../../../domain/use-cases/episode/add-episode';
import { created } from '../../../helpers/http-helper';
import { Controller } from '../../../protocols/controller';
import { HttpResponse } from '../../../protocols/http';

export class AddEpisodeController implements Controller {
  constructor(private readonly addEpisode: AddEpisode) {}
  async handle(request: AddEpisode.Params): Promise<HttpResponse> {
    try {
      const episodeData: AddEpisode.Params = {
        description: request.description,
        title: request.title,
        episodeNumber: request.episodeNumber,
        previewUrl: request.previewUrl,
        url: request.url,
        thumbnailUrl: request.thumbnailUrl,
        durationInMinutes: request.durationInMinutes,
        releaseDate: request.releaseDate,
        movieId: request.movieId,
      };

      const episode = await this.addEpisode.add(episodeData);

      return created(episode);
    } catch (error) {
      console.error('Error on AddEpisodeController: ', error);
      throw error;
    }
  }
}

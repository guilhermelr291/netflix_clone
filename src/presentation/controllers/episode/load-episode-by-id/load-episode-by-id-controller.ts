import { LoadEpisodeById } from '../../../../domain/use-cases/episode/load-episode-by-id';
import { ok } from '../../../helpers/http-helper';
import { Controller } from '../../../protocols/controller';
import { HttpResponse } from '../../../protocols/http';

export class LoadEpisodeByIdController implements Controller {
  constructor(private readonly loadEpisodeById: LoadEpisodeById) {}

  async handle(
    request: LoadEpisodeByIdController.Params
  ): Promise<HttpResponse> {
    try {
      const { id } = request;
      const episode = await this.loadEpisodeById.load(id);

      return ok(episode);
    } catch (error) {
      console.error('Error in LoadEpisodeByIdController:', error);
      throw error;
    }
  }
}

export namespace LoadEpisodeByIdController {
  export type Params = {
    id: string;
  };
}

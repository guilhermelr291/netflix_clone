import { DeleteEpisode } from '../../../../domain/use-cases/episode/delete-episode';
import { ok } from '../../../helpers/http-helper';
import { Controller } from '../../../protocols/controller';
import { HttpResponse } from '../../../protocols/http';

export class DeleteEpisodeController implements Controller {
  constructor(private readonly deleteEpisode: DeleteEpisode) {}

  async handle(request: DeleteEpisodeController.Params): Promise<HttpResponse> {
    try {
      const id = Number(request.id);

      await this.deleteEpisode.delete(id);

      return ok({ message: 'episode deleted successfully' });
    } catch (error) {
      console.error('Error in DeleteEpisodeController:', error);
      throw error;
    }
  }
}

export namespace DeleteEpisodeController {
  export type Params = {
    id: number;
  };
}

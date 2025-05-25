import { LoadActorById } from '../../../../domain/use-cases/actor/load-actor-by-id';
import { ok } from '../../../helpers/http-helper';
import { Controller } from '../../../protocols/controller';
import { HttpResponse } from '../../../protocols/http';

export class LoadActorByIdController implements Controller {
  constructor(private readonly loadActorById: LoadActorById) {}

  async handle(request: LoadActorByIdController.Params): Promise<HttpResponse> {
    try {
      const { id } = request;

      const actor = await this.loadActorById.loadById(id);

      return ok(actor);
    } catch (error) {
      console.error('Error loading actor by ID:', error);
      throw error;
    }
  }
}

export namespace LoadActorByIdController {
  export type Params = {
    id: string;
  };
}

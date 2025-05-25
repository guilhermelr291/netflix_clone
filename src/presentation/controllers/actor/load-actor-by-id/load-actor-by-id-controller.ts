import { LoadActorById } from '../../../../domain/use-cases/actor/load-actor-by-id';
import { ok } from '../../../helpers/http-helper';
import { Controller } from '../../../protocols/controller';
import { HttpResponse } from '../../../protocols/http';

export class LoadActorByIdController implements Controller {
  constructor(private readonly loadActorById: LoadActorById) {}

  async handle(request: LoadActorByIdController.Params): Promise<HttpResponse> {
    const { id } = request;

    const actor = await this.loadActorById.loadById(id);

    return ok(actor);
  }
}

export namespace LoadActorByIdController {
  export type Params = {
    id: string;
  };
}

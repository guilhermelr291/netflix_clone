import { DeleteActor } from '../../../../domain/use-cases/actor/delete-actor';
import { ok } from '../../../helpers/http-helper';
import { Controller } from '../../../protocols/controller';
import { HttpResponse } from '../../../protocols/http';

export class DeleteActorController implements Controller {
  constructor(private readonly deleteActor: DeleteActor) {}
  async handle(request: DeleteActorController.Params): Promise<HttpResponse> {
    try {
      const { id } = request;

      await this.deleteActor.delete(id);

      return ok({ message: 'Actor deleted successfully' });
    } catch (error) {
      console.error('Error in DeleteActorController:', error);
      throw error;
    }
  }
}

export namespace DeleteActorController {
  export type Params = {
    id: string;
  };
}

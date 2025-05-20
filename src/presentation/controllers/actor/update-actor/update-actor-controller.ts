import { UpdateActor } from '../../../../domain/use-cases/actor/update-actor';
import { ok } from '../../../helpers/http-helper';
import { Controller } from '../../../protocols/controller';
import { HttpResponse } from '../../../protocols/http';

export class UpdateActorController implements Controller {
  constructor(private readonly updateActor: UpdateActor) {}
  async handle(request: UpdateActorController.Params): Promise<HttpResponse> {
    try {
      const { id } = request;
      const data: UpdateActor.Params = {
        fullName: request.fullName,
        imageUrl: request.imageUrl,
        bio: request.bio,
      };

      const updatedActor = await this.updateActor.update(id, data);

      return ok(updatedActor);
    } catch (error) {
      console.error('Error in UpdateActorController:', error);
      throw error;
    }
  }
}

export namespace UpdateActorController {
  export type Params = {
    id: string;
    fullName?: string;
    imageUrl?: string;
    bio?: string;
  };
}

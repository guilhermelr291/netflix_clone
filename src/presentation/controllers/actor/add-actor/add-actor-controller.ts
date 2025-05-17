import { AddActor } from '../../../../domain/use-cases/actor/add-actor';
import { created } from '../../../helpers/http-helper';
import { Controller } from '../../../protocols/controller';
import { HttpResponse } from '../../../protocols/http';

export class AddActorController implements Controller {
  constructor(private readonly addActor: AddActor) {}
  async handle(request: AddActor.Params): Promise<HttpResponse> {
    try {
      const addActorData: AddActor.Params = {
        fullName: request.fullName,
        imageUrl: request.imageUrl,
        bio: request.bio,
      };

      const actor = await this.addActor.add(addActorData);

      return created(actor);
    } catch (error) {
      console.error('Error in AddActorController:', error);
      throw error;
    }
  }
}

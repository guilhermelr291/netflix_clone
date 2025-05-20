import { Actor } from '../../../domain/models/actor';
import { UpdateActor } from '../../../domain/use-cases/actor/update-actor';

export interface UpdateActorRepository {
  update(actorId: string, actorData: UpdateActor.Params): Promise<Actor>;
}

import { Actor } from '../../../domain/models/actor';
import { AddActor } from '../../../domain/use-cases/actor/add-actor';

export interface AddActorRepository {
  add(data: AddActor.Params): Promise<Actor>;
}

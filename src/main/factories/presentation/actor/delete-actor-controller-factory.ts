import { DeleteActorController } from '../../../../presentation/controllers/actor/delete-actor/delete-actor-controller';
import { makeDbDeleteActor } from '../../data/actor/db-delete-actor-factory';

export const makeDeleteActorController = (): DeleteActorController => {
  return new DeleteActorController(makeDbDeleteActor());
};

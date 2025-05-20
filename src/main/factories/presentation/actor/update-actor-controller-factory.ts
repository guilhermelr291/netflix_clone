import { UpdateActorController } from '../../../../presentation/controllers/actor/update-actor/update-actor-controller';
import { makeDbUpdateActor } from '../../data/actor/db-update-actor-factory';

export const makeUpdateActorController = (): UpdateActorController => {
  return new UpdateActorController(makeDbUpdateActor());
};

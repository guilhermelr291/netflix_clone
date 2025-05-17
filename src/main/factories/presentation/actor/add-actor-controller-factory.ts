import { AddActorController } from '../../../../presentation/controllers/actor/add-actor/add-actor-controller';
import { makeDbAddActor } from '../../data/actor/db-add-actor-factory';

export const makeAddActorController = (): AddActorController => {
  return new AddActorController(makeDbAddActor());
};

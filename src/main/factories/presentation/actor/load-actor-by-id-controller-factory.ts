import { LoadActorByIdController } from '../../../../presentation/controllers/actor/load-actor-by-id/load-actor-by-id-controller';
import { makeDbLoadActorById } from '../../data/actor/db-load-actor-by-id-factory';

export const makeLoadActorByIdController = () => {
  return new LoadActorByIdController(makeDbLoadActorById());
};

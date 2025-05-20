import { DbUpdateActor } from '../../../../data/actor/update-actor/db-update-actor';
import { makeActorRepository } from '../../infra/actor-repository-factory';

export const makeDbUpdateActor = (): DbUpdateActor => {
  const actorRepository = makeActorRepository();
  return new DbUpdateActor(actorRepository, actorRepository);
};

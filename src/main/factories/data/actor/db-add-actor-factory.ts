import { DbAddActor } from '../../../../data/actor/add-actor/db-add-actor';
import { makeActorRepository } from '../../infra/actor-repository-factory';

export const makeDbAddActor = (): DbAddActor => {
  return new DbAddActor(makeActorRepository());
};

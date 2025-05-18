import { DbDeleteActor } from '../../../../data/actor/delete-actor/db-delete-actor';
import { makeActorRepository } from '../../infra/actor-repository-factory';

export const makeDbDeleteActor = (): DbDeleteActor => {
  return new DbDeleteActor(makeActorRepository(), makeActorRepository());
};

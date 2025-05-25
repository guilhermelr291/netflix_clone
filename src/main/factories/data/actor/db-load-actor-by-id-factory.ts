import { DbLoadActorById } from '../../../../data/actor/load-actor-by-id/db-load-actor-by-id';
import { makeActorRepository } from '../../infra/actor-repository-factory';

export const makeDbLoadActorById = () => {
  return new DbLoadActorById(makeActorRepository());
};

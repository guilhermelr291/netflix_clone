import { ActorRepository } from '../../../infra/db/actor/actor-repository';
import { ActorMapperImpl } from '../../../infra/db/mappers/actor-mapper';

export const makeActorRepository = (): ActorRepository => {
  return new ActorRepository(new ActorMapperImpl());
};

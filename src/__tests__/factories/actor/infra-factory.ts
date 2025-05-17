import { Actor as PrismaActor } from '../../../../generated/prisma';
import { Actor } from '../../../domain/models/actor';
import { AddActorRepository } from '../../../data/protocols/actor/add-actor-repository';
import { mockActor, mockPrismaActor } from './models-factory';
import { ActorMapper } from '../../../infra/db/protocols/actor-mapper';

export const makeAddActorRepositoryStub = (): AddActorRepository => {
  class AddActorRepositoryStub implements AddActorRepository {
    async add(data: any): Promise<any> {
      return Promise.resolve(mockActor());
    }
  }
  return new AddActorRepositoryStub();
};

export const makeActorMapperStub = () => {
  class ActorMapperStub implements ActorMapper {
    toDomainModel(data: PrismaActor): Actor {
      return mockActor();
    }
    toPersistenceModel(data: Actor): Omit<PrismaActor, 'id'> {
      return mockPrismaActor();
    }
  }

  return new ActorMapperStub();
};

import { Actor as PrismaActor } from '../../../../generated/prisma';
import { Actor } from '../../../domain/models/actor';
import { AddActorRepository } from '../../../data/protocols/actor/add-actor-repository';
import { mockActor, mockPrismaActor } from './models-factory';
import { ActorMapper } from '../../../infra/db/protocols/actor-mapper';
import { LoadActorByIdRepository } from '../../../data/protocols/actor/load-actor-by-id-repository';
import { DeleteActorRepository } from '../../../data/protocols/actor/delete-actor-repository';

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

export const makeLoadActorByIdRepository = () => {
  class LoadActorByIdRepositoryStub implements LoadActorByIdRepository {
    async loadById(id: string): Promise<Actor | null> {
      return Promise.resolve(mockActor());
    }
  }
  return new LoadActorByIdRepositoryStub();
};

export const makeDeleteActorRepositoryStub = () => {
  class DeleteActorRepositoryStub implements DeleteActorRepository {
    async delete(id: string): Promise<void> {}
  }

  return new DeleteActorRepositoryStub();
};

import { AddActorRepository } from '../../../data/protocols/actor/add-actor-repository';
import { mockActor } from './models-factory';

export const makeAddActorRepositoryStub = (): AddActorRepository => {
  class AddActorRepositoryStub implements AddActorRepository {
    async add(data: any): Promise<any> {
      return Promise.resolve(mockActor());
    }
  }
  return new AddActorRepositoryStub();
};

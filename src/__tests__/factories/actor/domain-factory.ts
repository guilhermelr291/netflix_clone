import { Actor } from '../../../domain/models/actor';
import { AddActor } from '../../../domain/use-cases/actor/add-actor';
import { DeleteActor } from '../../../domain/use-cases/actor/delete-actor';
import { mockActor } from './models-factory';

export const makeAddActorStub = (): AddActor => {
  class AddActorStub implements AddActor {
    async add(data: AddActor.Params): Promise<Actor> {
      return new Promise(resolve => resolve(mockActor()));
    }
  }
  return new AddActorStub();
};

export const makeDeleteActorStub = (): DeleteActor => {
  class DeleteActorStub implements DeleteActor {
    async delete(id: string): Promise<void> {}
  }
  return new DeleteActorStub();
};

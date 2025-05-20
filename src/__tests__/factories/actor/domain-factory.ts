import { Actor } from '../../../domain/models/actor';
import { AddActor } from '../../../domain/use-cases/actor/add-actor';
import { DeleteActor } from '../../../domain/use-cases/actor/delete-actor';
import { UpdateActor } from '../../../domain/use-cases/actor/update-actor';
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

export const makeUpdateActorStub = (): UpdateActor => {
  class UpdateActorStub implements UpdateActor {
    async update(
      actorId: string,
      actorData: UpdateActor.Params
    ): Promise<Actor> {
      return new Promise(resolve => resolve(mockActor()));
    }
  }
  return new UpdateActorStub();
};

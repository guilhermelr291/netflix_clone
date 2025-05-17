import { Actor } from '../../../domain/models/actor';
import { AddActor } from '../../../domain/use-cases/actor/add-actor';
import { mockActor } from './models-factory';

export const makeAddActorStub = (): AddActor => {
  class AddActorStub implements AddActor {
    async add(data: AddActor.Params): Promise<Actor> {
      return new Promise(resolve => resolve(mockActor()));
    }
  }
  return new AddActorStub();
};

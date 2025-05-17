import { Actor } from '../../../domain/models/actor';
import { AddActor } from '../../../domain/use-cases/actor/add-actor';
import { AddActorRepository } from '../../protocols/actor/add-actor-repository';

export class DbAddActor implements AddActor {
  constructor(private readonly addActorRepository: AddActorRepository) {}

  async add(data: AddActor.Params): Promise<Actor> {}
}

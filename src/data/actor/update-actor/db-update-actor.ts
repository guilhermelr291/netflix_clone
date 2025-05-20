import { Actor } from '../../../domain/models/actor';
import { UpdateActor } from '../../../domain/use-cases/actor/update-actor';
import { UpdateActorRepository } from '../../protocols/actor/update-actor-repository';

export class DbUpdateActor implements UpdateActor {
  constructor(private readonly updateActorRepository: UpdateActorRepository) {}
  async update(
    actorId: string,
    actorData: UpdateActor.Params
  ): Promise<Actor> {}
}

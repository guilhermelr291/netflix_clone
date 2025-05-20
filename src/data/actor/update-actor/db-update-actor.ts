import { Actor } from '../../../domain/models/actor';
import { UpdateActor } from '../../../domain/use-cases/actor/update-actor';
import { NotFoundError } from '../../../shared/errors';
import { LoadActorByIdRepository } from '../../protocols/actor/load-actor-by-id-repository';
import { UpdateActorRepository } from '../../protocols/actor/update-actor-repository';

export class DbUpdateActor implements UpdateActor {
  constructor(
    private readonly updateActorRepository: UpdateActorRepository,
    private readonly loadActorByIdRepository: LoadActorByIdRepository
  ) {}
  async update(actorId: string, actorData: UpdateActor.Params): Promise<Actor> {
    const actor = await this.loadActorByIdRepository.loadById(actorId);
    if (!actor) {
      throw new NotFoundError('Actor not found');
    }

    const updatedActor = await this.updateActorRepository.update(
      actorId,
      actorData
    );
    return updatedActor;
  }
}

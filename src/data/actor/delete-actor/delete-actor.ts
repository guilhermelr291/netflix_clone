import { DeleteActor } from '../../../domain/use-cases/actor/delete-actor';
import { NotFoundError } from '../../../shared/errors';
import { DeleteActorRepository } from '../../protocols/actor/delete-actor-repository';
import { LoadActorByIdRepository } from '../../protocols/actor/load-actor-by-id-repository';

export class DbDeleteActor implements DeleteActor {
  constructor(
    private readonly deleteActorRepository: DeleteActorRepository,
    private readonly loadActorByIdRepository: LoadActorByIdRepository
  ) {}
  async delete(id: string): Promise<void> {
    const actor = await this.loadActorByIdRepository.loadById('any_id');

    if (!actor) {
      throw new NotFoundError('Actor not found');
    }

    await this.deleteActorRepository.delete(id);
  }
}

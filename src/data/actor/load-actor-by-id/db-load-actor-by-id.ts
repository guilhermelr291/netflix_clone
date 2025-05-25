import { Actor } from '../../../domain/models/actor';
import { LoadActorById } from '../../../domain/use-cases/actor/load-actor-by-id';
import { NotFoundError } from '../../../shared/errors';
import { LoadActorByIdRepository } from '../../protocols/actor/load-actor-by-id-repository';

export class DbLoadActorById implements LoadActorById {
  constructor(
    private readonly loadActorByIdRepository: LoadActorByIdRepository
  ) {}
  async loadById(id: string): Promise<Actor | null> {
    const actor = await this.loadActorByIdRepository.loadById(id);

    if (!actor) {
      throw new NotFoundError('Actor not found');
    }

    return actor;
  }
}

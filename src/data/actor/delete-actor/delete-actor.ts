import { DeleteActor } from '../../../domain/use-cases/actor/delete-actor';
import { DeleteActorRepository } from '../../protocols/actor/delete-actor-repository';
import { LoadActorByIdRepository } from '../../protocols/actor/load-actor-by-id-repository';

export class DbDeleteActor implements DeleteActor {
  constructor(
    private readonly deleteActorRepository: DeleteActorRepository,
    private readonly loadActorByIdRepository: LoadActorByIdRepository
  ) {}
  async delete(): Promise<void> {}
}

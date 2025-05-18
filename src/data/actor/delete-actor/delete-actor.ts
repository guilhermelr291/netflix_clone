import { DeleteActor } from '../../../domain/use-cases/actor/delete-actor';
import { DeleteActorRepository } from '../../protocols/actor/delete-actor-repository';

export class DbDeleteActor implements DeleteActor {
  constructor(private readonly deleteActorRepository: DeleteActorRepository) {}
  async delete(): Promise<void> {}
}

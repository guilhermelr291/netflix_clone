import { Actor } from '../../../domain/models/actor';

export interface LoadActorByIdRepository {
  loadById(id: string): Promise<Actor | null>;
}

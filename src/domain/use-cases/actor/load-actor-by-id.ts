import { Actor } from '../../models/actor';

export interface LoadActorById {
  loadById(id: string): Promise<Actor | null>;
}

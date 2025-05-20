import { Actor } from '../../models/actor';

export interface UpdateActor {
  update(actorId: string, actorData: UpdateActor.Params): Promise<Actor>;
}

export namespace UpdateActor {
  export type Params = Partial<Omit<Actor, 'id'>>;
}

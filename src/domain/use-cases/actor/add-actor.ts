import { Actor } from '../../models/actor';

export interface AddActor {
  add(data: AddActor.Params): Promise<Actor>;
}

export namespace AddActor {
  export type Params = {
    fullName: string;
    imageUrl?: string;
    bio?: string;
  };
}

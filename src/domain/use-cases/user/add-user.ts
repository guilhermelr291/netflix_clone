export interface AddUser {
  add(data: AddUser.Params): Promise<void>;
}

export namespace AddUser {
  export type Params = {
    name: string;
    email: string;
    password: string;
  };
}

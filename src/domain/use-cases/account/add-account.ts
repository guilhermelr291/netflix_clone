export interface AddAccount {
  add(data: AddAccount.Params): Promise<void>;
}

export namespace AddAccount {
  export type Params = {
    name: string;
    email: string;
    password: string;
  };
}

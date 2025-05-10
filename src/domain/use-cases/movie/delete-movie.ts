export interface DeleteMovie {
  delete(id: DeleteMovie.Params): Promise<void>;
}
export namespace DeleteMovie {
  export type Params = {
    id: number;
  };
}

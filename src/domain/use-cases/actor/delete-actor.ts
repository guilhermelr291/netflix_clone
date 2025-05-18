export interface DeleteActor {
  delete(id: string): Promise<void>;
}

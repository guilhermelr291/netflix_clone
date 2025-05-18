export interface DeleteActorRepository {
  delete(id: string): Promise<void>;
}

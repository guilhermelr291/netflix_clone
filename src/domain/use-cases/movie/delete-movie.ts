export interface DeleteMovie {
  delete(id: number): Promise<void>;
}

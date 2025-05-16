export interface DeleteMovie {
  delete(id: string): Promise<void>;
}

export interface Hasher {
  hash(): Promise<string>;
}

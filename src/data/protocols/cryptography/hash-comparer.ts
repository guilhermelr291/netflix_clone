export interface HashComparer {
  compare(valueToCompare: string, hash: string): Promise<boolean>;
}

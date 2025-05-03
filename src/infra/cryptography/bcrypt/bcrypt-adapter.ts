import bcrypt from 'bcrypt';
import { Hasher } from '../../../data/protocols/cryptography/hasher';
import { HashComparer } from '../../../data/protocols/cryptography/hash-comparer';

export class BcryptAdapter implements Hasher, HashComparer {
  constructor(private readonly salt: number) {
    this.salt = salt;
  }
  async hash(value: string): Promise<string> {
    const salt = await bcrypt.genSalt(this.salt);

    const hashedValue = await bcrypt.hash(value, salt);

    return hashedValue;
  }

  async compare(valueToCompare: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(valueToCompare, hash);
  }
}

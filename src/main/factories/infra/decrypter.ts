import { Decrypter } from '../../../data/protocols/cryptography/decrypter';
import { JwtAdapter } from '../../../infra/hash/jwt-adapter';

export const makeDecrypter = (): Decrypter => {
  return new JwtAdapter();
};

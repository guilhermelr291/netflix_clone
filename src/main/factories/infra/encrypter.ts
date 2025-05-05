import { Encrypter } from '../../../data/protocols/cryptography/encrypter';
import { JwtAdapter } from '../../../infra/hash/jwt-adapter';

export const makeEncrypter = (): Encrypter => {
  return new JwtAdapter();
};

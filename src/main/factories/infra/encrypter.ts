import { Encrypter } from '../../../data/protocols/cryptography/encrypter';
import { JwtAdapter } from '../../../infra/cryptography/jwt/jwt-adapter';

export const makeEncrypter = (): Encrypter => {
  return new JwtAdapter();
};

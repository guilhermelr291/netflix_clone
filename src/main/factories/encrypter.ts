import { JwtAdapter } from '../../infra/hash/jwt-adapter';

export const makeEncrypter = (): JwtAdapter => {
  return new JwtAdapter();
};

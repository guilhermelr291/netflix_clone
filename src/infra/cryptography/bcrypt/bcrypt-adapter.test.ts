import { describe, expect, test, vi } from 'vitest';
import bcrypt, { genSalt } from 'bcrypt';
import { BcryptAdapter } from './bcrypt-adapter';

vi.mock('bcrypt', () => ({
  default: {
    hash: vi.fn().mockResolvedValue('hashed_value'),
    genSalt: vi.fn().mockResolvedValue('any_salt'),
  },
}));

const SALT = 10;

const makeSut = (): BcryptAdapter => {
  const sut = new BcryptAdapter(SALT);
  return sut;
};

describe('BcryptAdapter', () => {
  describe('hash()', () => {
    test('should call bcrypt.hash with correct value', async () => {
      const sut = makeSut();
      const value = 'any_value';

      await sut.hash(value);

      expect(bcrypt.hash).toHaveBeenCalledWith(value, 'any_salt');
    });
    test('should call bcrypt.genSalt with correct value', async () => {
      const sut = makeSut();
      const value = 'any_value';

      await sut.hash(value);

      expect(bcrypt.genSalt).toHaveBeenCalledWith(SALT);
    });
  });
});

import { describe, expect, test, vi } from 'vitest';
import bcrypt, { genSalt } from 'bcrypt';
import { BcryptAdapter } from './bcrypt-adapter';

vi.mock('bcrypt', () => ({
  default: {
    hash: vi.fn().mockResolvedValue('hashed_value'),
    genSalt: vi.fn().mockResolvedValue('any_salt'),
    compare: vi.fn().mockResolvedValue(true),
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
    test('should return value returned by bcrypt.hash on success', async () => {
      const sut = makeSut();
      const value = 'any_value';

      const result = await sut.hash(value);

      expect(result).toBe('hashed_value');
    });
    test('should throw if bcrypt throws', async () => {
      const sut = makeSut();
      vi.spyOn(bcrypt, 'compare').mockRejectedValueOnce(new Error());

      const promise = sut.compare('any_value', 'hashed_value');

      await expect(promise).rejects.toThrow();
    });
  });
  describe('compare()', () => {
    test('should call bcrypt.compare with correct values', async () => {
      const sut = makeSut();
      const value = 'any_value';
      const hash = 'hashed_value';

      await sut.compare(value, hash);

      expect(bcrypt.compare).toHaveBeenCalledWith(value, hash);
    });
    test('should return value returned by bcrypt.compare on success', async () => {
      const sut = makeSut();
      const value = 'any_value';
      const hash = 'hashed_value';

      const result = await sut.compare(value, hash);

      expect(result).toBe(true);
    });

    test('should throw if bcrypt throws', async () => {
      const sut = makeSut();
      const value = 'any_value';
      vi.spyOn(bcrypt, 'hash').mockRejectedValueOnce(new Error());

      const promise = sut.hash(value);

      await expect(promise).rejects.toThrow();
    });
  });
});

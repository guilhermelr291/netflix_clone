import { describe, expect, test, vi } from 'vitest';

import { JwtAdapter } from './jwt-adapter';
import jwt from 'jsonwebtoken';

vi.mock('jsonwebtoken', () => ({
  default: {
    sign: vi.fn().mockReturnValue('encrypted_value'),
    verify: vi.fn().mockReturnValue({ value: 'any_value' }),
  },
}));

const makeSut = (): JwtAdapter => {
  process.env.JWT_SECRET = 'test_secret';
  const sut = new JwtAdapter();
  return sut;
};

describe('JwtAdapter', () => {
  describe('encrypt()', () => {
    test('should call jwt.sign with correct values', async () => {
      const sut = makeSut();
      const value = 'any_value';

      sut.encrypt(value);

      expect(jwt.sign).toHaveBeenCalledWith(value, 'test_secret');
    });
    test('should return value return by jwt.sign', async () => {
      const sut = makeSut();
      const value = 'any_value';

      const result = sut.encrypt(value);

      expect(result).toBe('encrypted_value');
    });
    test('should throw if jwt throws', async () => {
      const sut = makeSut();
      const value = 'any_value';

      vi.mocked(jwt.sign).mockImplementationOnce(() => {
        throw new Error();
      });

      expect(() => sut.encrypt(value)).toThrow();
    });

    test('should throw if JWT_SECRET is not provided', () => {
      const originalSecret = process.env.JWT_SECRET;

      delete process.env.JWT_SECRET;

      expect(() => new JwtAdapter()).toThrow('JwtSecret not found!');

      process.env.JWT_SECRET = originalSecret;
    });
  });
  describe('decrypt()', () => {
    test('should call verify with correct values', () => {
      const sut = makeSut();
      sut.decrypt('any_token');

      expect(jwt.verify).toHaveBeenCalledWith('any_token', 'test_secret');
    });
    test('should return correct value on verify success', () => {
      const sut = makeSut();
      const value = sut.decrypt('any_token');

      expect(value).toEqual({ value: 'any_value' });
    });
    test('should throw if verify throws', () => {
      const sut = makeSut();
      vi.mocked(jwt.verify).mockImplementationOnce(() => {
        throw new Error();
      });

      expect(() => sut.decrypt('any_token')).toThrow();
    });
  });
});

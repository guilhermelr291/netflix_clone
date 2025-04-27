import { describe, expect, test, vi } from 'vitest';

import { JwtAdapter } from './jwt-adapter';
import jwt from 'jsonwebtoken';

vi.mock('jsonwebtoken', () => ({
  default: {
    sign: vi.fn().mockReturnValue('encrypted_value'),
  },
}));

const SALT = 10;

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

      expect(jwt.sign).toHaveBeenCalledWith({ value }, 'test_secret');
    });
    test('should return value return by jwt.sign', async () => {
      const sut = makeSut();
      const value = 'any_value';

      const result = sut.encrypt(value);

      expect(result).toBe('encrypted_value');
    });
  });
});

import { test, describe, expect } from 'vitest';
import { EmailValidatorImpl } from './email-validator';

const makeSut = (): EmailValidatorImpl => {
  return new EmailValidatorImpl();
};
describe('EmailValidatorImpl', () => {
  test('Should return true is provided value is an email', () => {
    const sut = makeSut();
    const validEmail = 'any_email@mail.com';

    const result = sut.isValid(validEmail);

    expect(result).toBe(true);
  });
});

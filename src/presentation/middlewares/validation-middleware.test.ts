import { describe, expect, test, vi } from 'vitest';
import { ValidateData } from './validation-middleware';
import { Schema, ZodError } from 'zod';
import { ok } from '../helpers/http-helper';
import { UnprocessableEntityError } from '../../shared/errors';

const schema = {
  safeParseAsync: vi.fn().mockResolvedValue({
    success: true,
    data: 'validated data',
  }),
} as unknown as Schema;

const makeSut = (): ValidateData => new ValidateData(schema);

const mockValidData = () => ({
  name: 'any_name',
  email: 'valid_email@mail.com',
});

describe('ValidateData', () => {
  test('Should return ok with validated data on validation success', async () => {
    const sut = makeSut();

    const result = await sut.handle({ body: mockValidData() });

    expect(result).toEqual(ok('validated data'));
  });
  test('Should call safeParseAsync with correct values', async () => {
    const sut = makeSut();

    const safeParseAsyncSpy = vi.spyOn(schema, 'safeParseAsync');
    await sut.handle({ body: mockValidData() });

    expect(safeParseAsyncSpy).toHaveBeenCalledWith(mockValidData());
  });
  test('Should throw UnprocessableEntityError is safeParseAsync validation fails', async () => {
    const sut = makeSut();

    const error = new ZodError([]);
    vi.spyOn(schema, 'safeParseAsync').mockResolvedValueOnce({
      success: false,
      error,
    });

    const errorDetails = error.errors
      .map(
        error =>
          `${error.path.join ? error.path.join('.') : error.path}: ${
            error.message
          }`
      )
      .join('; ');

    expect(sut.handle({ body: mockValidData() })).rejects.toThrowError(
      new UnprocessableEntityError(`Validation failed: ${errorDetails}`)
    );
  });
  test('Should throw if zod throws', async () => {
    const sut = makeSut();

    vi.spyOn(schema, 'safeParseAsync').mockImplementationOnce(() => {
      throw new Error();
    });

    expect(sut.handle({ body: mockValidData() })).rejects.toThrow();
  });
});

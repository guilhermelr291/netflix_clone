import { describe, expect, test, vi } from 'vitest';
import { ValidateData } from './validation-middleware';
import { z } from 'zod';
import { ok } from '../helpers/http-helper';

const schema = {
  safeParseAsync: vi.fn().mockResolvedValue({
    success: true,
    data: 'validated data',
  }),
} as unknown as z.Schema;

const makeSut = (): ValidateData => new ValidateData(schema);

const mockValidData = () => ({
  name: 'any_name',
  email: 'valid_email@mail.com',
});

describe('ValidateData', () => {
  test('Should return ok with validated data on validation success', async () => {
    const sut = makeSut();

    const result = await sut.handle({ bodyContent: mockValidData() });

    expect(result).toEqual(ok('validated data'));
  });
  test('Should call safeParseAsync with correct values', async () => {
    const sut = makeSut();

    const safeParseAsyncSpy = vi.spyOn(schema, 'safeParseAsync');
    await sut.handle({ bodyContent: mockValidData() });

    expect(safeParseAsyncSpy).toHaveBeenCalledWith(mockValidData());
  });
});

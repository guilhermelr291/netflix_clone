import { vi, test, describe, expect } from 'vitest';
import { LoadActorById } from '../../../../domain/use-cases/actor/load-actor-by-id';
import { LoadActorByIdController } from './load-actor-by-id-controller';
import { makeLoadActorByIdStub } from '../../../../__tests__/factories/actor/domain-factory';
import { ok } from '../../../helpers/http-helper';
import { mockActor } from '../../../../__tests__/factories/actor/models-factory';

type SutTypes = {
  sut: LoadActorByIdController;
  loadActorByIdStub: LoadActorById;
};

const makeSut = () => {
  const loadActorByIdStub = makeLoadActorByIdStub();
  const sut = new LoadActorByIdController(loadActorByIdStub);
  return {
    sut,
    loadActorByIdStub,
  };
};

const mockRequest = {
  id: 'any_id',
};

describe('LoadActorByIdController', () => {
  test('should call LoadActorById with correct values', async () => {
    const { sut, loadActorByIdStub } = makeSut();
    const loadByIdSpy = vi.spyOn(loadActorByIdStub, 'loadById');

    await sut.handle(mockRequest);

    expect(loadByIdSpy).toHaveBeenCalledWith(mockRequest.id);
  });
  test('should return 200 and actor on success', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.handle(mockRequest);
    expect(httpResponse).toEqual(ok(mockActor()));
  });
  test('should throw if LoadActorById throws', async () => {
    const { sut, loadActorByIdStub } = makeSut();
    vi.spyOn(loadActorByIdStub, 'loadById').mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(sut.handle(mockRequest)).rejects.toThrow();
  });
});

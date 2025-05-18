import { vi, test, expect, describe } from 'vitest';

import { DeleteActorController } from './delete-actor-controller';
import { DeleteActor } from '../../../../domain/use-cases/actor/delete-actor';
import { makeDeleteActorStub } from '../../../../__tests__/factories/actor/domain-factory';
import { ok } from '../../../helpers/http-helper';

type SutTypes = {
  sut: DeleteActorController;
  deleteActorStub: DeleteActor;
};

const makeSut = (): SutTypes => {
  const deleteActorStub = makeDeleteActorStub();
  const sut = new DeleteActorController(deleteActorStub);
  return {
    sut,
    deleteActorStub,
  };
};

const mockRequest = {
  id: '1',
};

describe('DeleteActorController', () => {
  test('should call DeleteActor with correct values', async () => {
    const { sut, deleteActorStub } = makeSut();
    const deleteSpy = vi.spyOn(deleteActorStub, 'delete');
    await sut.handle(mockRequest);
    expect(deleteSpy).toHaveBeenCalledWith(mockRequest.id);
  });
  test('should return ok on success', async () => {
    const { sut } = makeSut();
    const response = await sut.handle(mockRequest);
    expect(response).toEqual(ok({ message: 'Actor deleted successfully' }));
  });
});

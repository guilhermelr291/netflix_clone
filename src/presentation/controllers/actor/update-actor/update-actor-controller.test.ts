import { vi, test, expect, describe } from 'vitest';
import { makeUpdateActorStub } from '../../../../__tests__/factories/actor/domain-factory';
import { ok } from '../../../helpers/http-helper';
import { UpdateActor } from '../../../../domain/use-cases/actor/update-actor';
import { UpdateActorController } from './update-actor-controller';
import { mockUpdateActorParams } from '../../../../__tests__/factories/actor/requested-params-factory';
import { mockActor } from '../../../../__tests__/factories/actor/models-factory';

type SutTypes = {
  sut: UpdateActorController;
  updateActorStub: UpdateActor;
};

const makeSut = (): SutTypes => {
  const updateActorStub = makeUpdateActorStub();
  const sut = new UpdateActorController(updateActorStub);
  return {
    sut,
    updateActorStub,
  };
};

const mockRequest = () => ({ id: 'any_id', ...mockUpdateActorParams() });

describe('UpdateActorController', () => {
  test('should call UpdateActor with correct values', async () => {
    const { sut, updateActorStub } = makeSut();
    const updateSpy = vi.spyOn(updateActorStub, 'update');
    const data = mockRequest();
    await sut.handle(data);
    expect(updateSpy).toHaveBeenCalledWith(data.id, {
      fullName: data.fullName,
      imageUrl: data.imageUrl,
      bio: data.bio,
    });
  });
  test('should return ok on success', async () => {
    const { sut } = makeSut();
    const response = await sut.handle(mockRequest());
    expect(response).toEqual(ok(mockActor()));
  });
  test('should throw if UpdateActor throws', async () => {
    const { sut, updateActorStub } = makeSut();
    vi.spyOn(updateActorStub, 'update').mockImplementationOnce(() => {
      throw new Error();
    });

    await expect(sut.handle(mockRequest())).rejects.toThrow();
  });
});

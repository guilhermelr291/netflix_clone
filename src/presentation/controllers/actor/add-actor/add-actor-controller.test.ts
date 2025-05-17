import { vi, test, expect, describe } from 'vitest';
import { AddActorController } from './add-actor-controller';
import { AddActor } from '../../../../domain/use-cases/actor/add-actor';
import { makeAddActorStub } from '../../../../__tests__/factories/actor/domain-factory';
import { mockAddActorParams } from '../../../../__tests__/factories/actor/requested-params-factory';
import { created } from '../../../helpers/http-helper';
import { mockActor } from '../../../../__tests__/factories/actor/models-factory';

type SutTypes = {
  sut: AddActorController;
  addActorStub: AddActor;
};

const makeSut = (): SutTypes => {
  const addActorStub = makeAddActorStub();
  const sut = new AddActorController(addActorStub);
  return {
    sut,
    addActorStub,
  };
};

describe('AddActorController', () => {
  test('should call AddActor with correct values', async () => {
    const { sut, addActorStub } = makeSut();
    const addActorSpy = vi.spyOn(addActorStub, 'add');
    const request = mockAddActorParams();
    await sut.handle(request);
    expect(addActorSpy).toHaveBeenCalledWith(request);
  });
  test('should return 201 and actor on success on success', async () => {
    const { sut } = makeSut();

    const response = await sut.handle(mockAddActorParams());
    expect(response).toEqual(created(mockActor()));
  });
  test('should throw if AddActor throws', async () => {
    const { sut, addActorStub } = makeSut();
    vi.spyOn(addActorStub, 'add').mockImplementationOnce(() => {
      throw new Error();
    });
    const promise = sut.handle(mockAddActorParams());
    await expect(promise).rejects.toThrow();
  });
});

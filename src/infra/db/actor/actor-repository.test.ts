import { vi, describe, test, expect } from 'vitest';
import { ActorMapper } from '../protocols/actor-mapper';
import { ActorRepository } from './actor-repository';
import { makeActorMapperStub } from '../../../__tests__/factories/actor/infra-factory';
import { mockActor } from '../../../__tests__/factories/actor/models-factory';
import prisma from '../../../../prisma/db';
import { mockAddActorParams } from '../../../__tests__/factories/actor/requested-params-factory';

vi.mock('../../../../prisma/db', () => ({
  default: {
    actor: {
      create: vi.fn().mockResolvedValueOnce({
        id: 1,
        fullName: 'any_full_name',
        imageUrl: 'any_image_url',
        bio: 'any_bio',
      }),
    },
  },
}));

type SutTypes = {
  sut: ActorRepository;
  actorMapperStub: ActorMapper;
};

const makeSut = (): SutTypes => {
  const actorMapperStub = makeActorMapperStub();
  const sut = new ActorRepository(actorMapperStub);
  return {
    sut,
    actorMapperStub,
  };
};

describe('Actor Repository', () => {
  describe('add()', () => {
    test('should call prisma with correct values', async () => {
      const { sut } = makeSut();
      const data = mockAddActorParams();
      await sut.add(data);
      expect(prisma.actor.create).toHaveBeenCalledWith({
        data,
      });
    });
  });
});

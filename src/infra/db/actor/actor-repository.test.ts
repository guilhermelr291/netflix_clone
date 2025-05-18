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
      create: vi.fn().mockResolvedValue({
        id: 1,
        fullName: 'any_full_name',
        imageUrl: 'any_image_url',
        bio: 'any_bio',
      }),
      delete: vi.fn(),
      findUnique: vi.fn().mockResolvedValue({
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
    test('should return an actor on success', async () => {
      const { sut } = makeSut();
      const result = await sut.add(mockAddActorParams());
      expect(result).toEqual(mockActor());
    });
    test('should call ActorMapper with correct values', async () => {
      const { sut, actorMapperStub } = makeSut();
      const data = mockAddActorParams();
      const toDomainModelSpy = vi.spyOn(actorMapperStub, 'toDomainModel');
      await sut.add(data);
      expect(toDomainModelSpy).toHaveBeenCalledWith({
        id: 1,
        fullName: 'any_full_name',
        imageUrl: 'any_image_url',
        bio: 'any_bio',
      });
    });
    test('should throw if prisma throws', async () => {
      const { sut } = makeSut();
      vi.spyOn(prisma.actor, 'create').mockRejectedValueOnce(new Error());
      await expect(sut.add(mockAddActorParams())).rejects.toThrow();
    });
  });
  describe('delete()', () => {
    test('should call prisma with correct values', async () => {
      const { sut } = makeSut();
      const id = '1';
      await sut.delete(id);
      expect(prisma.actor.delete).toHaveBeenCalledWith({
        where: {
          id: Number(id),
        },
      });
    });
    test('should throw if prisma throws', async () => {
      const { sut } = makeSut();
      vi.spyOn(prisma.actor, 'delete').mockRejectedValueOnce(new Error());
      await expect(sut.delete('1')).rejects.toThrow();
    });
  });

  describe('loadById()', () => {
    test('should call prisma with correct values', async () => {
      const { sut } = makeSut();
      const id = '1';
      await sut.loadById(id);
      expect(prisma.actor.findUnique).toHaveBeenCalledWith({
        where: {
          id: Number(id),
        },
      });
    });
    test('should return null if actor is not found', async () => {
      const { sut } = makeSut();
      vi.mocked(prisma.actor.findUnique).mockResolvedValueOnce(null);

      const result = await sut.loadById('1');

      expect(result).toBeNull();
    });
  });
});

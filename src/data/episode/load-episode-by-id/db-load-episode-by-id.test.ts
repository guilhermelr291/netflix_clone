import { vi, test, describe, expect } from 'vitest';
import { DbLoadEpisodeById } from './db-load-episode-by-id';
import { LoadEpisodeByIdRepository } from '../../protocols/episode/load-episode-by-id-repository';
import { makeLoadEpisodeByIdRepository as makeLoadEpisodeByIdRepositoryStub } from '../../../__tests__/factories/episode/infra-factory';

type SutTypes = {
  sut: DbLoadEpisodeById;
  loadEpisodeByIdRepositoryStub: LoadEpisodeByIdRepository;
};

const makeSut = (): SutTypes => {
  const loadEpisodeByIdRepositoryStub = makeLoadEpisodeByIdRepositoryStub();
  const sut = new DbLoadEpisodeById(loadEpisodeByIdRepositoryStub);
  return {
    sut,
    loadEpisodeByIdRepositoryStub,
  };
};

describe('DbLoadEpisodeById', () => {
  test('should call LoadEpisodeByIdRepository with correct value', async () => {
    const { sut, loadEpisodeByIdRepositoryStub } = makeSut();
    const loadByIdSpy = vi.spyOn(loadEpisodeByIdRepositoryStub, 'loadById');
    const id = 'any_id';
    await sut.load(id);
    expect(loadByIdSpy).toHaveBeenCalledWith(id);
  });
  test('should throw if LoadEpisodeByIdRepository throws', async () => {
    const { sut, loadEpisodeByIdRepositoryStub } = makeSut();
    vi.spyOn(loadEpisodeByIdRepositoryStub, 'loadById').mockRejectedValueOnce(
      new Error()
    );

    await expect(sut.load('any_id')).rejects.toThrow();
  });
});

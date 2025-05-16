import { vi, test, describe, expect, beforeAll, afterAll } from 'vitest';
import { DbLoadEpisodeById } from './db-load-episode-by-id';
import { LoadEpisodeByIdRepository } from '../../protocols/episode/load-episode-by-id-repository';
import { makeLoadEpisodeByIdRepository as makeLoadEpisodeByIdRepositoryStub } from '../../../__tests__/factories/episode/infra-factory';
import { mockEpisode } from '../../../__tests__/factories/episode/models-factory';
import mockDate from 'mockdate';
import { NotFoundError } from '../../../shared/errors';

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
  beforeAll(() => {
    mockDate.set(new Date());
  });
  afterAll(() => {
    mockDate.reset();
  });

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
  test('should return episode on success', async () => {
    const { sut } = makeSut();
    const episode = await sut.load('any_id');
    expect(episode).toEqual(mockEpisode());
  });
  test('should throw NotFoundError if LoadEpisodeByIdRepository returns null', async () => {
    const { sut, loadEpisodeByIdRepositoryStub } = makeSut();
    vi.spyOn(loadEpisodeByIdRepositoryStub, 'loadById').mockResolvedValueOnce(
      null
    );

    await expect(sut.load('any_id')).rejects.toThrow(
      new NotFoundError('Episode not found')
    );
  });
});

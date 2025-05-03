import { vi, test, describe, expect } from 'vitest';
import { Movie } from '../../../domain/models/movie';
import prisma from '../../../../prisma/db';
import { MovieRepository } from './movie-repository';

const mockMovie = (): Movie => ({
  id: 1,
  title: 'Fake Movie',
  previewUrl: 'http://example.com/preview',
  thumbnailUrl: 'http://example.com/thumbnail',
  description: 'This is a fake movie description.',
  rating: 4.5,
  releaseYear: 2023,
  durationInMinutes: 120,
});

vi.mock('../../../../prisma/db', () => ({
  default: {
    movie: {
      findUnique: vi.fn().mockResolvedValueOnce({
        id: 1,
        title: 'Fake Movie',
        previewUrl: 'http://example.com/preview',
        thumbnailUrl: 'http://example.com/thumbnail',
        description: 'This is a fake movie description.',
        rating: 4.5,
        releaseYear: 2023,
        durationInMinutes: 120,
      }),
    },
  },
}));

const makeSut = (): MovieRepository => {
  return new MovieRepository();
};

describe('MovieRepository', () => {
  describe('loadByTitle()', () => {
    test('should call prisma with correct value', async () => {
      const sut = makeSut();

      const title = 'any_title';
      await sut.loadByTitle(title);

      expect(prisma.movie.findUnique).toHaveBeenCalledWith({
        where: { title },
      });
    });
    test('should throw if prisma throws', async () => {
      const sut = makeSut();

      vi.mocked(prisma.movie.findUnique).mockImplementationOnce(() => {
        throw new Error();
      });

      const title = 'any_title';

      expect(sut.loadByTitle(title)).rejects.toThrow();
    });
  });
});

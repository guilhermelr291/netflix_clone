import { vi, test, describe, expect } from 'vitest';
import { Movie } from '../../../domain/models/movie';
import prisma from '../../../../prisma/db';
import { MovieRepository } from './movie-repository';

vi.mock('../../../../prisma/db', () => ({
  default: {
    movie: {
      findUnique: vi.fn().mockResolvedValue({
        id: 1,
        title: 'Fake Movie',
        previewUrl: 'http://example.com/preview',
        thumbnailUrl: 'http://example.com/thumbnail',
        description: 'This is a fake movie description.',
        rating: 4.5,
        releaseYear: 2023,
        durationInMinutes: 120,
      }),
      create: vi.fn().mockResolvedValue({
        id: 1,
        title: 'Fake Movie',
        previewUrl: 'http://example.com/preview',
        thumbnailUrl: 'http://example.com/thumbnail',
        description: 'This is a fake movie description.',
        rating: 4.5,
        releaseYear: 2023,
        durationInMinutes: 120,
      }),
      delete: vi.fn(),
      findMany: vi.fn().mockResolvedValue([
        {
          id: 1,
          title: 'Fake Movie',
          previewUrl: 'http://example.com/preview',
          thumbnailUrl: 'http://example.com/thumbnail',
          description: 'This is a fake movie description.',
          rating: 4.5,
          releaseYear: 2023,
          durationInMinutes: 120,
        },
      ]),
    },
  },
}));

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

const mockAddMovieParams = (): Omit<Movie, 'id'> => ({
  title: 'Fake Movie',
  previewUrl: 'http://example.com/preview',
  thumbnailUrl: 'http://example.com/thumbnail',
  description: 'This is a fake movie description.',
  rating: 4.5,
  releaseYear: 2023,
  durationInMinutes: 120,
});

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

      await expect(sut.loadByTitle(title)).rejects.toThrow();
    });
    test('should return value returned by prisma on success', async () => {
      const sut = makeSut();

      const result = await sut.loadByTitle('any_title');

      expect(result).toEqual(mockMovie());
    });
  });

  describe('add()', () => {
    test('should call prisma with correct value', async () => {
      const sut = makeSut();

      const data = mockAddMovieParams();
      await sut.add(data);

      expect(prisma.movie.create).toHaveBeenCalledWith({
        data,
      });
    });

    test('should throw if prisma throws', async () => {
      const sut = makeSut();

      vi.mocked(prisma.movie.create).mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(sut.add(mockAddMovieParams())).rejects.toThrow();
    });

    test('should return value returned by prisma on success', async () => {
      const sut = makeSut();

      const result = await sut.add(mockAddMovieParams());

      expect(result).toEqual(mockMovie());
    });
  });
  describe('deleteById()', () => {
    test('should call prisma with correct value', async () => {
      const sut = makeSut();
      const id = 1;
      await sut.deleteById(id);

      expect(prisma.movie.delete).toHaveBeenCalledWith({ where: { id } });
    });

    test('should throw if prisma throws', async () => {
      const sut = makeSut();

      vi.mocked(prisma.movie.delete).mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(sut.deleteById(1)).rejects.toThrow();
    });
  });

  describe('loadById()', () => {
    test('should call prisma with correct value', async () => {
      const sut = makeSut();

      const id = 1;
      await sut.loadById(id);

      expect(prisma.movie.findUnique).toHaveBeenCalledWith({
        where: { id },
      });
    });

    test('should throw if prisma throws', async () => {
      const sut = makeSut();

      vi.mocked(prisma.movie.findUnique).mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(sut.loadById(1)).rejects.toThrow();
    });

    test('should return value returned by prisma on success', async () => {
      const sut = makeSut();

      const result = await sut.loadById(1);

      expect(result).toEqual(mockMovie());
    });
  });

  describe('loadAll()', () => {
    test('should call prisma.findMany', async () => {
      const sut = makeSut();

      await sut.loadAll();

      expect(prisma.movie.findMany).toHaveBeenCalled();
    });
    test('should throw if prisma throws', async () => {
      const sut = makeSut();

      vi.mocked(prisma.movie.findMany).mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(sut.loadAll()).rejects.toThrow();
    });
  });
});

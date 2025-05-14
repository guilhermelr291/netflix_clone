import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: [
        'src/**/protocols/**',
        'src/domain',
        'src/main',
        'src/__tests__',
        'src/infra/db/mappers',
      ],

      include: ['src/**/*.ts'],
    },
  },
});

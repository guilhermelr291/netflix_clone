import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      exclude: ['src/**/protocols/**', 'src/domain'],

      include: ['src/**/*.ts'],
    },
  },
});

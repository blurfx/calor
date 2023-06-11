import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/themes/*.css'],

  format: ['cjs', 'esm'],
  splitting: true,
  sourcemap: false,
  clean: true,
  minify: true,
  dts: true,
});

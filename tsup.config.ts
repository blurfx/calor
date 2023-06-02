import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/themes/*.css'],

  format: ["cjs", "esm"],
  splitting: false,
  sourcemap: false,
  clean: true,
  minify: true,
  dts: true,
})
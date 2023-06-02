export default {
  'src/**/*.{ts,tsx}': () => 'pnpm typecheck',
  'src/**/*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint --fix'],
};

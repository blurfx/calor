module.exports = {
  'packages/**/*.{ts,tsx}': () => 'pnpm typecheck',
  'packages/**/*.{js,jsx,ts,tsx}': ['prettier --write', 'eslint --fix'],
};

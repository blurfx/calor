module.exports = {
  plugins: ['@typescript-eslint', 'import', 'unused-imports'],
  parser: '@typescript-eslint/parser',
  extends: ['prettier'],
  rules: {
    'no-unused-vars': 'off',
    'no-use-before-define': 'off',
    'max-len': 'off',
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
      },
    ],
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'import/order': 'error',
    'keyword-spacing': 'error',
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],
    'no-console': [
      'error',
      {
        allow: ['warn', 'error'],
      },
    ],
    semi: 'off',
    'space-before-blocks': 'error',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/semi': ['error'],
    '@typescript-eslint/type-annotation-spacing': [
      'error',
      {
        before: false,
        after: true,
        overrides: {
          colon: {
            before: false,
            after: true,
          },
          arrow: {
            before: true,
            after: true,
          },
        },
      },
    ],
  },
};

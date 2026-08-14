module.exports = {
  root: true,
  ignorePatterns: ['lib/react-native-expressive/**'],
  extends: '@react-native',
  overrides: [
    {
      files: ['**/*.{ts,tsx}'],
      rules: {
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            args: 'all',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
      },
    },
  ],
};

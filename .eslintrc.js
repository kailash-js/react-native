module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.tsx'],
      rules: {
        'react-hooks/exhaustive-deps': 'off',
        'react-native/no-inline-styles': 'off',
      },
    },
  ],
};

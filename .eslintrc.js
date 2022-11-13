module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    es2021: true,
    browser: true,
    node: true,
  },
  plugins: ['@typescript-eslint', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    'no-console': 'error',
    'react-hooks/exhaustive-deps': 'off',
    'no-inner-declarations': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'no-empty-pattern': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'react/no-unescaped-entities': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'no-extra-boolean-cast': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/ban-types': 'off',
    'prefer-rest-params': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'react-hooks/rules-of-hooks': 'off',
    'no-constant-condition': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'react/react-in-jsx-scope': 'off',
  },
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
  },
}
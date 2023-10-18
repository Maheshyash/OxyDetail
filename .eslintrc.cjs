module.exports = {
  root: true, // Indicates this is the root ESLint configuration file

  // Specifies the environment where the code will run
  env: { browser: true, es2020: true },

  // Extends various ESLint rule sets for different purposes
  extends: [
    'eslint:recommended', // ESLint recommended rules
    'plugin:@typescript-eslint/eslint-recommended', // ESLint rules for TypeScript
    'plugin:@typescript-eslint/recommended', // TypeScript recommended rules
    'plugin:react/recommended', // React recommended rules
    'plugin:react/jsx-runtime', // JSX runtime rules
    'plugin:react-hooks/recommended' // Rules for React Hooks
  ],

  // Defines patterns to ignore when linting files
  ignorePatterns: ['dist', 'public', '.eslintrc.cjs'],

  // Specifies the parser to be used for TypeScript files
  parser: '@typescript-eslint/parser',

  // Specifies ESLint plugins to be used in the project
  plugins: ['react-refresh', 'prettier'],

  // Configures specific ESLint rules and their options
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],

    // Configuration for Prettier integration, enforcing consistent code formatting
    "prettier/prettier": "error"
  },

  // Settings specific to ESLint and the libraries being used
  settings: {
    react: {
      version: 'detect', // Use automatic detection of the React version
    },
  }
};

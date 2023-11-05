module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    // 'standard-with-typescript',
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
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  
  plugins: [
    'react','react-refresh', 'prettier'
  ],
  rules: {
    'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'no-explicit-any': 'off', // Disables the "no-explicit-any" rule
      '@typescript-eslint/no-explicit-any': 'off', // Disables TypeScript "no-explicit-any" rule
      // Configuration for Prettier integration, enforcing consistent code formatting
      "prettier/prettier": "error"
  }
}

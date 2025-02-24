const js = require('@eslint/js');
const ts = require('@typescript-eslint/eslint-plugin');
const tsParser = require('@typescript-eslint/parser');
const prettier = require('eslint-plugin-prettier');
const unusedImports = require('eslint-plugin-unused-imports');

module.exports = [
  js.configs.recommended,
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': ts,
      prettier,
      'unused-imports': unusedImports,
    },
    rules: {
      'prettier/prettier': 'off', // Enforce Prettier formatting
      'no-console': ['warn', { allow: ['warn', 'error'] }], // Allow console.warn and console.error
      'no-debugger': 'warn', // Warn about debugger statements
      semi: ['error', 'always'], // Enforce semicolons
      quotes: ['error', 'single'], // Enforce single quotes for strings
      eqeqeq: ['error', 'always'], // Enforce strict equality
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }, // Ignore DI-prefixed variables
      ],
      '@typescript-eslint/explicit-module-boundary-types': 'off', // Disable explicit return types for functions
      '@typescript-eslint/no-explicit-any': 'warn', // Warn about the usage of 'any'
      '@typescript-eslint/consistent-type-imports': 'error', // Enforce consistent type imports
      'unused-imports/no-unused-imports': 'error', // Remove unused imports automatically
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', args: 'after-used', argsIgnorePattern: '^_' },
      ],
      'no-undef': 'off', // TypeScript already handles undefined vars
      'no-unused-vars': 'off', // Disabled as it's covered by TypeScript's rule
    },
  },
  {
    ignores: ['dist'],
    rules: {
      'no-unused-vars': 'off',
      'no-undef': 'off',
      'no-cond-assign': 'off',
    },
  },
  // Override rules for testing and other configurations
  {
    files: ['src/**/*test.ts'],
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn', // Disable no-unused-vars in test files
      'unused-imports/no-unused-imports': 'off', // Disable unused-imports for test files
      'no-console': 'off', // Allow console.log in tests
    },
  },
];

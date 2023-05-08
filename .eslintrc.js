module.exports = {
    parser: '@typescript-eslint/parser',
    plugins: [
      '@typescript-eslint'
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier',
    ],
    env: {
      node: true,
      es6: true,
    },
    parserOptions: {
      project: './tsconfig.json',
    },
    ignorePatterns: [
        '.eslintrc.js',
        'jest.config.js', 
        'node_modules/'
    ],
};
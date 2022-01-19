module.exports = {
  ...require('eslintconfig/eslint.json'),
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.lint.json'],
  },
};

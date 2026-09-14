import eslintConfig from './core/eslint.config.mjs';

export default [
  ...eslintConfig,
  {
    // Ignore the Prisma-generated client (Likes feature).
    ignores: ['**/generated/**'],
  },
];

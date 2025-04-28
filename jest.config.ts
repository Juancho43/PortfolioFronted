import type { Config } from 'jest';

export default {
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@environments/(.*)$': '<rootDir>/src/environments/$1',
    '^@test/(.*)$': '<rootDir>/src/test/$1',
    '^@model/(.*)$': '<rootDir>/src/app/core/interfaces/$1',
    '^@core/(.*)$': '<rootDir>/src/app/core/$1',
    '^@services/(.*)$': '<rootDir>/src/app/core/services/$1',
    '^@dao/(.*)$': '<rootDir>/src/app/core/services/DAO/$1',
    '^@endpoints/(.*)$': '<rootDir>/src/app/core/services/endpoints/$1',
    '^@modules/(.*)$': '<rootDir>/src/app/modules/$1',
  },
  coverageDirectory: './coverage',
  collectCoverageFrom: ['src/app/**/*.ts', '!<rootDir>/node_modules/', '!<rootDir>/test/'],
} satisfies Config;

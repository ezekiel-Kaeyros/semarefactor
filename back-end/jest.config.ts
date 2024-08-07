import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/test'],
    setupFiles: ['<rootDir>/src/core/config/logging.ts']
};

export default config;

module.exports = {
  testTimeout: 100000,
  testMatch: ['**/test/**/*test.ts', '**/test/**/*test.tsx'],
  moduleNameMapper: {
    // replace non-script module with a mock
    '\\.(css|less|scss|sass)$': '<rootDir>/test/__mocks__/styleMock',
    // map module paths as defined in the 'compilerOptions' of 'tsconfig.json'
    '~/(.*)': '<rootDir>/src/$1',
  },
  // configuration to use an alternative config file
  transform: {
    '\\.[jt]sx?$': ['babel-jest', { configFile: './babel.config.jest.js' }],
  },
  reporters: [
    'default',
    [
      'jest-md-reporter',
      {
        outputFile: 'test-results.md',
      },
    ],
  ],
  testEnvironment: 'jsdom',
  globals: {
    IS_REACT_ACT_ENVIRONMENT: true,
  },
}

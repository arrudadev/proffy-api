module.exports = {
  bail: true,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.{js,ts}'],
  coverageReporters: ['json', 'lcov'],
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json',
    },
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
};

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
const config = {
  collectCoverageFrom: [
    'src/*.ts'
  ],
  coveragePathIgnorePatterns: [
    'src/index.ts'
  ],
  reporters: [
    'default',
    'jest-html-reporters',
  ],
  coverageReporters: [
    'json-summary',
    ['lcov', {
      subdir: 'lcov-report'
    }],
  ],
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageThreshold: {
    global: {
      branches: 93.33,
      functions: 61.53,
      lines: 86.61,
      statements: 86.61
    }
  }
};

module.exports = config;